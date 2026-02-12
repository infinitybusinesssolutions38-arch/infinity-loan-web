import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import BusinessLoanModel from "../models/business-loan-schema";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";
import { createGmailTransporter } from "../lib/apply-now-email";

export const runtime = "nodejs";
export const maxDuration = 60;

// =============================
// Cloudinary Config
// =============================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =============================
// POST API
// =============================
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const accountTypes = formData.getAll("accountTypes").filter(Boolean);
    const accountTypeJoined = accountTypes.length
      ? accountTypes.join(", ")
      : formData.get("accountType");

    const toAccountKey = (value) =>
      String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");

    const bankAccounts = await Promise.all(
      accountTypes.map(async (t) => {
        const key = toAccountKey(t);
        const bankName = formData.get(`bankName_${key}`);
        const oneYearBankStatementUrl = await upload(
          formData.get(`oneYearBankStatement_${key}`)
        );
        return {
          accountType: t,
          bankName,
          oneYearBankStatementUrl,
        };
      })
    );

    const otherSupportedDocumentsCountRaw = formData.get("numberOfOtherDocuments");
    const otherSupportedDocumentsCount = Number.isFinite(
      Number(otherSupportedDocumentsCountRaw)
    )
      ? parseInt(String(otherSupportedDocumentsCountRaw), 10)
      : 0;

    const otherSupportedDocumentsUrls = await Promise.all(
      Array.from({ length: Math.max(0, otherSupportedDocumentsCount) }).map(
        async (_, idx) =>
          await upload(formData.get(`otherSupportedDocument_${idx}`))
      )
    );

    const businessRegistrationCertificates = formData
      .getAll("businessRegistrationCertificates")
      .filter(Boolean);

    const registrationCertificates = await Promise.all(
      businessRegistrationCertificates.map(async (t) => {
        const key = toAccountKey(t);
        const fileUrl = await upload(
          formData.get(`businessRegistrationCertificateFile_${key}`)
        );
        return {
          certificateType: t,
          fileUrl,
        };
      })
    );

    // =============================
    // Upload Helper
    // =============================
    async function upload(file) {
      if (!file) return null;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "loan_applications/business", resource_type: "auto" },
            (err, result) => {
              if (err) return resolve(null);
              resolve(result.secure_url);
            }
          )
          .end(buffer);
      });
    }

    // =============================
    // Generate Application Ref
    // =============================
    const total = await BusinessLoanModel.countDocuments();
    const applicationRef = `BUS_${String(total + 1).padStart(4, "0")}`;

    // =============================
    // Create Document
    // =============================
    const newApplication = new BusinessLoanModel({
      applicationRef,

      serviceCategoryKey: formData.get("serviceCategoryKey"),
      serviceCategoryTitle: formData.get("serviceCategoryTitle"),

      // Personal Details
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      mobileNumber: formData.get("mobileNumber"),
      alternateMobile: formData.get("alternateMobile") || formData.get("alternateMobileNumber"),
      alternateMobileNumber: formData.get("alternateMobileNumber"),
      whatsAppNumber: formData.get("whatsAppNumber"),
      gender: formData.get("gender"),
      maritalStatus: formData.get("maritalStatus"),
      dob: formData.get("dob"),
      personalEmail: formData.get("personalEmail"),
      businessEmail: formData.get("businessEmail"),
      voterId: formData.get("voterId"),
      drivingLicense: formData.get("drivingLicense"),
      passportNo: formData.get("passportNo"),

      // Addresses
      currentResidentialAddress: formData.get("currentResidentialAddress"),
      residentialState: formData.get("residentialState"),
      residentialCity: formData.get("residentialCity"),
      currentResidentialPincode: formData.get("currentResidentialPincode"),

      currentOfficeOrShopAddress: formData.get("currentOfficeOrShopAddress"),
      officeOrShopState: formData.get("officeOrShopState"),
      officeCity: formData.get("officeCity"),
      currentOfficePincode: formData.get("currentOfficePincode"),

      // Business Details
      businessName: formData.get("businessName"),
      businessType: formData.get("businessType"),
      industryType: formData.get("industryType"),
      businessAddress: formData.get("businessAddress"),
      businessPincode: formData.get("businessPincode"),
      yearsInBusiness: formData.get("yearsInBusiness"),
      annualTurnover: formData.get("annualTurnover"),

      // Loan Details
      requiredLoanAmount: formData.get("requiredLoanAmount"),
      typeOfLoan: formData.get("typeOfLoan"),
      cibilIssuesDetails: formData.get("cibilIssuesDetails"),
      preferredTenure: formData.get("preferredTenure"),
      purpose: formData.get("purpose"),

      // Bank
      accountTypes,
      accountType: accountTypeJoined,
      bankName: bankAccounts?.[0]?.bankName || formData.get("bankName"),

      // Co-Applicant
      coApplicantName: formData.get("coApplicantName"),
      relationshipWithApplicant: formData.get("relationshipWithApplicant"),
      coApplicantEmploymentType: formData.get("coApplicantEmploymentType"),
      coApplicantPanPhotoUrl: await upload(formData.get("CoApplicantpanPhoto")),
      coApplicantAadhaarPhotoUrl: await upload(formData.get("CoApplicantAadhaarPhoto")),
      coApplicantAadhaarBackPhotoUrl: await upload(
        formData.get("CoApplicantAadhaarBackPhoto")
      ),

      // Address proof (currently submitted as text)
      latestHomeElectricityBillUrl: await upload(
        formData.get("latestHomeElectricityBill")
      ),
      latestOfficeShopElectricityBillUrl: await upload(
        formData.get("latestOfficeShopElectricityBill")
      ),

      // Registration / other
      businessRegistrationCertificates: formData.get(
        "businessRegistrationCertificates"
      ),
      businessRegistrationCertificatesList: businessRegistrationCertificates,
      registrationCertificates,

      // Buying goods
      isBuyingGoods: formData.get("isBuyingGoods"),
      quotationAmount: formData.get("quotationAmount"),

      // CIBIL
      hasCibil: formData.get("hasCibil"),
      cibilScore: formData.get("cibilScore"),

      // Counts
      numberOfExistingLoans: formData.get("numberOfExistingLoans"),
      numberOfOtherDocuments: formData.get("numberOfOtherDocuments"),

      otherSupportedDocumentsUrls: otherSupportedDocumentsUrls.filter(Boolean),

      // Identification
      panNumber: formData.get("panNumber"),
      aadhaarNumber: formData.get("aadhaarNumber"),
      gstNumber: formData.get("gstNumber"),

      // Documents
      applicantPhotoUrl: await upload(formData.get("applicantPhoto")),
      panPhotoUrl: await upload(formData.get("panPhoto")),
      aadhaarPhotoUrl: await upload(formData.get("aadhaarPhoto")),
      aadhaarBackPhotoUrl: await upload(formData.get("aadhaarBackPhoto")),
      gstCertificateUrl: await upload(formData.get("gstCertificate")),
      bankStatementUrl: await upload(formData.get("bankStatement")),
      itrFileUrl: await upload(formData.get("itrFile")),

      assessmentYear2324Url: await upload(formData.get("assessmentYear2324")),
      assessmentYear2425Url: await upload(formData.get("assessmentYear2425")),
      assessmentYear2526Url: await upload(formData.get("assessmentYear2526")),
      proformaInvoiceFileUrl: await upload(formData.get("proformaInvoiceFile")),
      cibilReportUrl: await upload(formData.get("cibilReport")),
      oneYearBankStatementUrl:
        bankAccounts?.[0]?.oneYearBankStatementUrl ||
        (await upload(formData.get("oneYearBankStatement"))),
      bankAccounts,

      loan_type: "business",
      application_status: "pending",
    });

    const saved = await newApplication.save();

    const applicationDate = new Date().toLocaleDateString("en-IN");

    const withTimeout = (promise, ms) => {
      return Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), ms)
        ),
      ]);
    };

    // =============================
    // Client Confirmation Email
    // =============================
    const emailTasks = [];
    emailTasks.push(
      withTimeout(
        sendLoanApplicationConfirmationEmail(formData.get("personalEmail"), {
          customerName: formData.get("firstName"),
          applicationNumber: applicationRef,
          applicationDate,
          loanType: "Business Loan",
          loanAmount: formData.get("requiredLoanAmount"),
        }),
        12000
      )
    );

    // =============================
    // Admin + Director Email (Full Details) via Gmail SMTP
    // =============================
    const gmailTransporter = createGmailTransporter();
    const internalTo = process.env.DIRECTOR_EMAIL;
    const internalCc = process.env.SUPPORT_EMAIL;

    if (internalTo || internalCc) {
      emailTasks.push(
        withTimeout(
          gmailTransporter.sendMail({
            from: process.env.EMAIL_HOST_USER || process.env.EMAIL_SMTP_USER,
            to: internalTo || internalCc,
            cc: internalTo && internalCc ? internalCc : undefined,
            subject: `New Business Loan Application - ${applicationRef}`,
            html: `
        <h2>New Business Loan Application</h2>
        <p><strong>Application Ref:</strong> ${applicationRef}</p>

        <h3>Service Category</h3>
        <p>${formData.get("serviceCategoryTitle") || formData.get("serviceCategoryKey") || "-"}</p>

        <h3>Applicant Details</h3>
        <p>Name: ${formData.get("firstName")} ${formData.get("lastName")}</p>
        <p>Email: ${formData.get("personalEmail")}</p>
        <p>Mobile: ${formData.get("mobileNumber")}</p>
        <p>WhatsApp: ${formData.get("whatsAppNumber") || "-"}</p>
        <p>Gender: ${formData.get("gender") || "-"}</p>
        <p>Marital Status: ${formData.get("maritalStatus") || "-"}</p>
        <p>DOB: ${formData.get("dob") || "-"}</p>

        <h3>Addresses</h3>
        <p>Residential: ${formData.get("currentResidentialAddress") || "-"}</p>
        <p>Residential City/State/Pincode: ${formData.get("residentialCity") || "-"}, ${formData.get("residentialState") || "-"} - ${formData.get("currentResidentialPincode") || "-"}</p>
        <p>Office/Shop: ${formData.get("currentOfficeOrShopAddress") || "-"}</p>
        <p>Office City/State/Pincode: ${formData.get("officeCity") || "-"}, ${formData.get("officeOrShopState") || "-"} - ${formData.get("currentOfficePincode") || "-"}</p>

        <h3>Business Details</h3>
        <p>Business Name: ${formData.get("businessName")}</p>
        <p>Business Type: ${formData.get("businessType")}</p>
        <p>Industry: ${formData.get("industryType")}</p>
        <p>Years in Business: ${formData.get("yearsInBusiness")}</p>
        <p>Annual Turnover: ${formData.get("annualTurnover")}</p>

        <h3>Bank Details</h3>
        <p>Account Type: ${accountTypeJoined || "-"}</p>
        <p>Bank Name: ${formData.get("bankName") || "-"}</p>
        ${bankAccounts?.length
          ? `
        <h4>Selected Accounts</h4>
        <ul>
          ${bankAccounts
            .map(
              (a) =>
                `<li>${a.accountType || "-"} — ${a.bankName || "-"} — ${a.oneYearBankStatementUrl || "Not Uploaded"}</li>`
            )
            .join("")}
        </ul>
        `
          : ""}

        <h3>Loan Details</h3>
        <p>Amount: ${formData.get("requiredLoanAmount")}</p>
        <p>Tenure: ${formData.get("preferredTenure")}</p>
        <p>Purpose: ${formData.get("purpose")}</p>
        <p>Type Of Loan: ${formData.get("typeOfLoan") || "-"}</p>
        <p>CIBIL Issues: ${formData.get("cibilIssuesDetails") || "-"}</p>
        <p>CIBIL Available: ${formData.get("hasCibil") || "-"}</p>
        <p>CIBIL Score: ${formData.get("cibilScore") || "-"}</p>
        <p>Buying Goods: ${formData.get("isBuyingGoods") || "-"}</p>
        <p>Quotation Amount: ${formData.get("quotationAmount") || "-"}</p>

        <h3>Documents</h3>
        <p>Applicant Photo: ${saved.applicantPhotoUrl || "Not Uploaded"}</p>
        <p>PAN: ${saved.panPhotoUrl || "Not Uploaded"}</p>
        <p>Aadhaar: ${saved.aadhaarPhotoUrl || "Not Uploaded"}</p>
        <p>GST Certificate: ${saved.gstCertificateUrl || "Not Uploaded"}</p>
        <p>Bank Statement: ${saved.bankStatementUrl || "Not Uploaded"}</p>
        <p>One Year Bank Statement: ${saved.oneYearBankStatementUrl || "Not Uploaded"}</p>
        <p>ITR File: ${saved.itrFileUrl || "Not Uploaded"}</p>
        <p>Latest Home Electricity Bill: ${saved.latestHomeElectricityBillUrl || "Not Uploaded"}</p>
        <p>Latest Office/Shop Electricity Bill: ${saved.latestOfficeShopElectricityBillUrl || "Not Uploaded"}</p>
        <p>Assessment Year 2023-24: ${saved.assessmentYear2324Url || "Not Uploaded"}</p>
        <p>Assessment Year 2024-25: ${saved.assessmentYear2425Url || "Not Uploaded"}</p>
        <p>Assessment Year 2025-26: ${saved.assessmentYear2526Url || "Not Uploaded"}</p>
        <p>Proforma Invoice: ${saved.proformaInvoiceFileUrl || "Not Uploaded"}</p>
        <p>CIBIL Report: ${saved.cibilReportUrl || "Not Uploaded"}</p>
        ${otherSupportedDocumentsUrls.filter(Boolean).length
          ? `
        <h4>Other Supported Documents</h4>
        <ul>
          ${otherSupportedDocumentsUrls
            .filter(Boolean)
            .map((u) => `<li>${u}</li>`)
            .join("")}
        </ul>
        `
          : ""}
        ${registrationCertificates?.length
          ? `
        <h4>Business Registration Certificates</h4>
        <ul>
          ${registrationCertificates
            .map(
              (c) =>
                `<li>${c.certificateType || "-"} — ${c.fileUrl || "Not Uploaded"}</li>`
            )
            .join("")}
        </ul>
        `
          : ""}
      `,
          }),
          12000
        )
      );
    }

    Promise.allSettled(emailTasks).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Business Loan Application Submitted Successfully",
      applicationRef,
      data: saved,
    });

  } catch (error) {
    console.error("Business Loan Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
