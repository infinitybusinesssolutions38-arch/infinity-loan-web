import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import BusinessLoanModel from "../models/business-loan-schema";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";
import { createGmailTransporter } from "../lib/apply-now-email";

export const runtime = "nodejs";
export const maxDuration = 60;
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

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

      if (typeof file === "string") {
        const v = file.trim();
        return v ? v : null;
      }

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

    const normalizeEmailList = (...values) => {
      const raw = values
        .filter(Boolean)
        .flatMap((v) => String(v).split(","))
        .map((v) => v.trim())
        .map((v) => v.replace(/,+$/g, ""))
        .map((v) => v.trim())
        .filter(Boolean);
      return Array.from(new Set(raw));
    };

    const normalizeEmail = (value) => {
      if (!value) return "";
      return String(value).trim().toLowerCase();
    };

    const internalEmailSet = new Set(
      normalizeEmailList(
        process.env.DIRECTOR_EMAIL,
        process.env.ADMIN_USER,
        process.env.ADMIN_EMAIL,
        process.env.SUPPORT_EMAIL
      ).map((e) => normalizeEmail(e))
    );

    const isInternalEmail = (value) => {
      const email = normalizeEmail(value);
      if (!email) return false;
      return internalEmailSet.has(email);
    };

    // =============================
    // Client Confirmation Email (Template)
    // =============================
    const emailTasks = [];
    const personalEmail = saved?.personalEmail;
    const businessEmail = saved?.businessEmail;
    const candidateCustomerEmail = !isInternalEmail(personalEmail)
      ? personalEmail
      : !isInternalEmail(businessEmail)
        ? businessEmail
        : null;

    if (candidateCustomerEmail) {
      emailTasks.push(
        withTimeout(
          sendLoanApplicationConfirmationEmail(candidateCustomerEmail, {
            customerName: saved?.firstName,
            applicationNumber: applicationRef,
            applicationDate,
            loanType: "Business Loan",
            loanAmount: saved?.requiredLoanAmount,
          }),
          12000
        )
      );
    }

    // =============================
    // Internal Email (Full Details) via Gmail SMTP
    // =============================
    const gmailTransporter = createGmailTransporter();
    const internalRecipients = normalizeEmailList(
      process.env.DIRECTOR_EMAIL,
      process.env.SUPPORT_EMAIL,
      process.env.ADMIN_USER
    );

    const safe = (v) => {
      if (v === null || typeof v === "undefined") return "";
      return String(v);
    };

    const asLink = (u) => {
      const url = typeof u === "string" ? u.trim() : "";
      if (!url) return "-";
      return `<a href="${url}" target="_blank" rel="noreferrer">View</a>`;
    };

    const internalHtml = `
      <h2>New Business Loan Application</h2>
      <p><strong>Application Ref:</strong> ${safe(applicationRef)}</p>
      <p><strong>Application Date:</strong> ${safe(applicationDate)}</p>

      <h3>Service Category</h3>
      <p>${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey) || "-"}</p>

      <h3>Applicant Details</h3>
      <p><strong>Name:</strong> ${safe(saved?.firstName)} ${safe(saved?.middleName)} ${safe(saved?.lastName)}</p>
      <p><strong>Mobile:</strong> ${safe(saved?.mobileNumber)}</p>
      <p><strong>Alternate Mobile:</strong> ${safe(saved?.alternateMobile || saved?.alternateMobileNumber) || "-"}</p>
      <p><strong>WhatsApp:</strong> ${safe(saved?.whatsAppNumber) || "-"}</p>
      <p><strong>Personal Email:</strong> ${safe(saved?.personalEmail) || "-"}</p>
      <p><strong>Business Email:</strong> ${safe(saved?.businessEmail) || "-"}</p>
      <p><strong>Gender:</strong> ${safe(saved?.gender) || "-"}</p>
      <p><strong>Marital Status:</strong> ${safe(saved?.maritalStatus) || "-"}</p>
      <p><strong>DOB:</strong> ${safe(saved?.dob) || "-"}</p>

      <h3>KYC</h3>
      <p><strong>PAN Number:</strong> ${safe(saved?.panNumber) || "-"}</p>
      <p><strong>Aadhaar Number:</strong> ${safe(saved?.aadhaarNumber) || "-"}</p>
      <p><strong>GST Number:</strong> ${safe(saved?.gstNumber) || "-"}</p>
      <p><strong>Voter ID:</strong> ${safe(saved?.voterId) || "-"}</p>
      <p><strong>Driving License:</strong> ${safe(saved?.drivingLicense) || "-"}</p>
      <p><strong>Passport:</strong> ${safe(saved?.passportNo) || "-"}</p>

      <h3>Addresses</h3>
      <p><strong>Residential Address:</strong> ${safe(saved?.currentResidentialAddress) || "-"}</p>
      <p><strong>Residential City/State/Pincode:</strong> ${safe(saved?.residentialCity) || "-"}, ${safe(saved?.residentialState) || "-"} - ${safe(saved?.currentResidentialPincode) || "-"}</p>
      <p><strong>Office/Shop Address:</strong> ${safe(saved?.currentOfficeOrShopAddress) || "-"}</p>
      <p><strong>Office City/State/Pincode:</strong> ${safe(saved?.officeCity) || "-"}, ${safe(saved?.officeOrShopState) || "-"} - ${safe(saved?.currentOfficePincode) || "-"}</p>

      <h3>Business Details</h3>
      <p><strong>Business Name:</strong> ${safe(saved?.businessName) || "-"}</p>
      <p><strong>Business Type:</strong> ${safe(saved?.businessType) || "-"}</p>
      <p><strong>Industry:</strong> ${safe(saved?.industryType) || "-"}</p>
      <p><strong>Business Address:</strong> ${safe(saved?.businessAddress) || "-"}</p>
      <p><strong>Business Pincode:</strong> ${safe(saved?.businessPincode) || "-"}</p>
      <p><strong>Years in Business:</strong> ${safe(saved?.yearsInBusiness) || "-"}</p>
      <p><strong>Annual Turnover:</strong> ${safe(saved?.annualTurnover) || "-"}</p>

      <h3>Loan Details</h3>
      <p><strong>Required Amount:</strong> ${safe(saved?.requiredLoanAmount) || "-"}</p>
      <p><strong>Preferred Tenure:</strong> ${safe(saved?.preferredTenure) || "-"}</p>
      <p><strong>Purpose:</strong> ${safe(saved?.purpose) || "-"}</p>
      <p><strong>Type Of Loan:</strong> ${safe(saved?.typeOfLoan) || "-"}</p>
      <p><strong>CIBIL Issues:</strong> ${safe(saved?.cibilIssuesDetails) || "-"}</p>
      <p><strong>CIBIL Available:</strong> ${safe(saved?.hasCibil) || "-"}</p>
      <p><strong>CIBIL Score:</strong> ${safe(saved?.cibilScore) || "-"}</p>
      <p><strong>Buying Goods:</strong> ${safe(saved?.isBuyingGoods) || "-"}</p>
      <p><strong>Quotation Amount:</strong> ${safe(saved?.quotationAmount) || "-"}</p>

      <h3>Bank Details</h3>
      <p><strong>Account Types:</strong> ${safe(saved?.accountType) || "-"}</p>
      <p><strong>Primary Bank Name:</strong> ${safe(saved?.bankName) || "-"}</p>
      ${Array.isArray(saved?.bankAccounts) && saved.bankAccounts.length
        ? `
          <h4>Selected Accounts</h4>
          <ul>
            ${saved.bankAccounts
              .map(
                (a) =>
                  `<li>${safe(a?.accountType) || "-"} — ${safe(a?.bankName) || "-"} — ${asLink(a?.oneYearBankStatementUrl)}</li>`
              )
              .join("")}
          </ul>
        `
        : ""}

      <h3>Co-Applicant</h3>
      <p><strong>Name:</strong> ${safe(saved?.coApplicantName) || "-"}</p>
      <p><strong>Relationship:</strong> ${safe(saved?.relationshipWithApplicant) || "-"}</p>
      <p><strong>Employment Type:</strong> ${safe(saved?.coApplicantEmploymentType) || "-"}</p>

      <h3>Documents</h3>
      <p>Applicant Photo: ${asLink(saved?.applicantPhotoUrl)}</p>
      <p>PAN Photo: ${asLink(saved?.panPhotoUrl)}</p>
      <p>Aadhaar Front: ${asLink(saved?.aadhaarPhotoUrl)}</p>
      <p>Aadhaar Back: ${asLink(saved?.aadhaarBackPhotoUrl)}</p>
      <p>GST Certificate: ${asLink(saved?.gstCertificateUrl)}</p>
      <p>Bank Statement: ${asLink(saved?.bankStatementUrl)}</p>
      <p>One Year Bank Statement: ${asLink(saved?.oneYearBankStatementUrl)}</p>
      <p>ITR File: ${asLink(saved?.itrFileUrl)}</p>
      <p>Latest Home Electricity Bill: ${asLink(saved?.latestHomeElectricityBillUrl)}</p>
      <p>Latest Office/Shop Electricity Bill: ${asLink(saved?.latestOfficeShopElectricityBillUrl)}</p>
      <p>Assessment Year 2023-24: ${asLink(saved?.assessmentYear2324Url)}</p>
      <p>Assessment Year 2024-25: ${asLink(saved?.assessmentYear2425Url)}</p>
      <p>Assessment Year 2025-26: ${asLink(saved?.assessmentYear2526Url)}</p>
      <p>Proforma Invoice: ${asLink(saved?.proformaInvoiceFileUrl)}</p>
      <p>CIBIL Report: ${asLink(saved?.cibilReportUrl)}</p>
      <p>Co-Applicant PAN: ${asLink(saved?.coApplicantPanPhotoUrl)}</p>
      <p>Co-Applicant Aadhaar Front: ${asLink(saved?.coApplicantAadhaarPhotoUrl)}</p>
      <p>Co-Applicant Aadhaar Back: ${asLink(saved?.coApplicantAadhaarBackPhotoUrl)}</p>
      ${Array.isArray(saved?.otherSupportedDocumentsUrls) && saved.otherSupportedDocumentsUrls.filter(Boolean).length
        ? `
          <h4>Other Supported Documents</h4>
          <ul>
            ${saved.otherSupportedDocumentsUrls
              .filter(Boolean)
              .map((u) => `<li>${asLink(u)}</li>`)
              .join("")}
          </ul>
        `
        : ""}
      ${Array.isArray(saved?.registrationCertificates) && saved.registrationCertificates.length
        ? `
          <h4>Business Registration Certificates</h4>
          <ul>
            ${saved.registrationCertificates
              .map(
                (c) =>
                  `<li>${safe(c?.certificateType) || "-"} — ${asLink(c?.fileUrl)}</li>`
              )
              .join("")}
          </ul>
        `
        : ""}
    `;

    const fromAddress =
      process.env.EMAIL_SMTP_USER ||
      process.env.EMAIL_HOST_USER ||
      process.env.EMAIL_USER ||
      process.env.EMAIL_FROM;

    if (internalRecipients.length > 0) {
      emailTasks.push(
        ...internalRecipients.map((to) =>
          withTimeout(
            gmailTransporter.sendMail({
              from: fromAddress,
              to,
              replyTo: safe(saved?.personalEmail) || undefined,
              subject: `New Business Loan Application - ${applicationRef}`,
              html: internalHtml,
            }),
            12000
          )
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
