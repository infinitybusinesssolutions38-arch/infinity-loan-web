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

    const firstEnv = (...keys) => {
      for (const k of keys) {
        const v = process.env?.[k];
        if (v) return v;
      }
      return "";
    };

    const directorEmailRaw = firstEnv(
      "DIRECTOR_EMAIL",
      "DIRECTOREMAIL",
      "DIRECTOR_MAIL",
      "DIRECTORMAIL"
    );
    const supportEmailRaw = firstEnv(
      "SUPPORT_EMAIL",
      "SUPPORTEMAIL",
      "SUPPORT_MAIL",
      "SUPPORTMAIL"
    );

    const internalEmailSet = new Set(
      normalizeEmailList(
        directorEmailRaw,
        process.env.ADMIN_USER,
        process.env.ADMIN_EMAIL,
        supportEmailRaw
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
      await withTimeout(
        sendLoanApplicationConfirmationEmail(candidateCustomerEmail, {
          customerName: saved?.firstName,
          applicationNumber: applicationRef,
          applicationDate,
          loanType: "Business Loan",
          loanAmount: saved?.requiredLoanAmount,
        }),
        12000
      );
    }

    // =============================
    // Internal Email (Full Details) via Gmail SMTP
    // =============================
    const gmailTransporter = createGmailTransporter();
    const internalRecipients = normalizeEmailList(
      directorEmailRaw,
      supportEmailRaw,
      process.env.ADMIN_USER
    );

    const safe = (v) => {
      if (v === null || typeof v === "undefined") return "";
      return String(v);
    };

    const asLink = (u) => {
      const url = typeof u === "string" ? u.trim() : "";
      if (!url) return "-";
      return `<a href="${url}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline">View Document</a>`;
    };

    const internalDetailsHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <p style="margin:0 0 16px 0"><strong>Application Ref:</strong> ${safe(applicationRef)}<br/>
        <strong>Date:</strong> ${safe(applicationDate)}<br/>
        <strong>Service Category:</strong> ${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey) || "-"}</p>

        <h3 style="margin:16px 0 8px 0">Applicant Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Name</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.firstName)} ${safe(saved?.middleName)} ${safe(saved?.lastName)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Mobile</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.mobileNumber)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Alternate Mobile</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.alternateMobile || saved?.alternateMobileNumber) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>WhatsApp</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.whatsAppNumber) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Personal Email</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.personalEmail) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Business Email</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.businessEmail) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Gender</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.gender) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Marital Status</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.maritalStatus) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>DOB</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.dob) || "-"}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">KYC</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>PAN Number</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.panNumber) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Aadhaar Number</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.aadhaarNumber) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>GST Number</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.gstNumber) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Voter ID</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.voterId) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Driving License</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.drivingLicense) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Passport</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.passportNo) || "-"}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Addresses</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Residential Address</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.currentResidentialAddress) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Residential City/State/Pincode</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.residentialCity) || "-"}, ${safe(saved?.residentialState) || "-"} - ${safe(saved?.currentResidentialPincode) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Office/Shop Address</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.currentOfficeOrShopAddress) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Office City/State/Pincode</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.officeCity) || "-"}, ${safe(saved?.officeOrShopState) || "-"} - ${safe(saved?.currentOfficePincode) || "-"}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Business Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Business Name</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.businessName) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Business Type</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.businessType) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Industry</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.industryType) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Business Address</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.businessAddress) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Business Pincode</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.businessPincode) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Years in Business</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.yearsInBusiness) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Annual Turnover</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.annualTurnover) || "-"}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Loan Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Required Amount</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.requiredLoanAmount) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Preferred Tenure</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.preferredTenure) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Purpose</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.purpose) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Type Of Loan</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.typeOfLoan) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Issues</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.cibilIssuesDetails) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Available</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.hasCibil) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Score</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.cibilScore) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Buying Goods</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.isBuyingGoods) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Quotation Amount</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.quotationAmount) || "-"}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Bank Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Account Types</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.accountType) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Primary Bank Name</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.bankName) || "-"}</td></tr>
          </tbody>
        </table>
        ${Array.isArray(saved?.bankAccounts) && saved.bankAccounts.length
          ? `
            <h4 style="margin:12px 0 8px 0">Selected Accounts</h4>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <thead>
                <tr>
                  <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Account Type</th>
                  <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Bank Name</th>
                  <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Statement</th>
                </tr>
              </thead>
              <tbody>
                ${saved.bankAccounts
                  .map(
                    (a) => `
                      <tr>
                        <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(a?.accountType) || "-"}</td>
                        <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(a?.bankName) || "-"}</td>
                        <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${asLink(a?.oneYearBankStatementUrl)}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          `
          : ""}

        <h3 style="margin:16px 0 8px 0">Co-Applicant</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Name</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.coApplicantName) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Relationship</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.relationshipWithApplicant) || "-"}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Employment Type</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.coApplicantEmploymentType) || "-"}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Documents</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Applicant Photo</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.applicantPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>PAN Photo</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.panPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Aadhaar Front</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.aadhaarPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Aadhaar Back</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.aadhaarBackPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>GST Certificate</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.gstCertificateUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Bank Statement</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.bankStatementUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>One Year Bank Statement</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.oneYearBankStatementUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>ITR File</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.itrFileUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Latest Home Electricity Bill</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.latestHomeElectricityBillUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Latest Office/Shop Electricity Bill</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.latestOfficeShopElectricityBillUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Assessment Year 2023-24</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.assessmentYear2324Url)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Assessment Year 2024-25</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.assessmentYear2425Url)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Assessment Year 2025-26</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.assessmentYear2526Url)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Proforma Invoice</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.proformaInvoiceFileUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Report</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.cibilReportUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Co-Applicant PAN Photo</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.coApplicantPanPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Co-Applicant Aadhaar Front</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.coApplicantAadhaarPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Co-Applicant Aadhaar Back</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.coApplicantAadhaarBackPhotoUrl)}</td></tr>
          </tbody>
        </table>

        ${Array.isArray(saved?.otherSupportedDocumentsUrls) && saved.otherSupportedDocumentsUrls.filter(Boolean).length
          ? `
            <h3 style="margin:16px 0 8px 0">Other Supported Documents</h3>
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
            <h3 style="margin:16px 0 8px 0">Business Registration Certificates</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <thead>
                <tr>
                  <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Certificate Type</th>
                  <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">File</th>
                </tr>
              </thead>
              <tbody>
                ${saved.registrationCertificates
                  .map(
                    (c) => `
                      <tr>
                        <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(c?.certificateType) || "-"}</td>
                        <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${asLink(c?.fileUrl)}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          `
          : ""}
      </div>
    `;

    const internalBrandedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 820px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 12px; }
          .header { background: linear-gradient(135deg, #F97415 0%, #ff8c42 100%); padding: 28px 24px; border-radius: 12px 12px 0 0; color: white; text-align: center; }
          .header h1 { margin: 0; color: white; font-size: 24px; font-weight: 700; }
          .header p { margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
          .content { padding: 22px; }
          .details-box { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 18px; border-radius: 10px; margin: 16px 0; border-left: 4px solid #F97415; }
          .details-box p { margin: 10px 0; font-size: 14px; }
          .application-number { background: #F97415; color: white; padding: 6px 12px; border-radius: 999px; font-weight: 700; display: inline-block; }
          .loan-type-badge { background: #111827; color: white; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-block; }
          .footer { border-top: 1px solid #e9ecef; margin-top: 20px; padding-top: 16px; text-align: center; color: #6c757d; font-size: 12px; }
          a { color:#2563eb; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Business Loan Application</h1>
            <p>Internal Notification (Full Details + Document Links)</p>
          </div>

          <div class="content">
            <div class="details-box">
              <p><strong>Application Number:</strong> <span class="application-number">${safe(applicationRef)}</span></p>
              <p><strong>Application Date:</strong> ${safe(applicationDate)}</p>
              <p><strong>Loan Product:</strong> <span class="loan-type-badge">Business Loan</span></p>
              <p><strong>Service Category:</strong> ${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey) || "-"}</p>
            </div>

            ${internalDetailsHtml}

            <div class="footer">
              <p><strong>Infinity Loans & Business Solutions</strong></p>
              <p>www.infinityloanservices.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const internalText = `New Business Loan Application\n\nApplication Ref: ${safe(
      applicationRef
    )}\nDate: ${safe(applicationDate)}\nService Category: ${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey)}\n\nApplicant Details\nName: ${safe(
      saved?.firstName
    )} ${safe(saved?.middleName)} ${safe(saved?.lastName)}\nMobile: ${safe(
      saved?.mobileNumber
    )}\nAlternate Mobile: ${safe(saved?.alternateMobile || saved?.alternateMobileNumber) || "-"}\nWhatsApp: ${safe(saved?.whatsAppNumber) || "-"}\nPersonal Email: ${safe(saved?.personalEmail) || "-"}\nBusiness Email: ${safe(saved?.businessEmail) || "-"}\n\nKYC\nPAN: ${safe(saved?.panNumber) || "-"}\nAadhaar: ${safe(saved?.aadhaarNumber) || "-"}\nGST: ${safe(saved?.gstNumber) || "-"}\n\nAddresses\nResidential: ${safe(saved?.currentResidentialAddress) || "-"}\nOffice/Shop: ${safe(saved?.currentOfficeOrShopAddress) || "-"}\n\nBusiness Details\nBusiness Name: ${safe(saved?.businessName) || "-"}\nBusiness Type: ${safe(saved?.businessType) || "-"}\nIndustry: ${safe(saved?.industryType) || "-"}\n\nLoan Details\nAmount: ${safe(saved?.requiredLoanAmount) || "-"}\nTenure: ${safe(saved?.preferredTenure) || "-"}\nPurpose: ${safe(saved?.purpose) || "-"}\n\nDocuments\nApplicant Photo: ${safe(saved?.applicantPhotoUrl) || "-"}\nPAN Photo: ${safe(saved?.panPhotoUrl) || "-"}\nAadhaar Front: ${safe(saved?.aadhaarPhotoUrl) || "-"}\nAadhaar Back: ${safe(saved?.aadhaarBackPhotoUrl) || "-"}`;

    const fromAddress =
      process.env.EMAIL_SMTP_USER ||
      process.env.EMAIL_HOST_USER ||
      process.env.EMAIL_USER ||
      process.env.EMAIL_FROM;

    if (internalRecipients.length > 0) {
      const directorList = normalizeEmailList(directorEmailRaw);
      const supportList = normalizeEmailList(supportEmailRaw);

      const toAddress = directorList?.[0] || internalRecipients?.[0];
      const ccAddress =
        !toAddress && internalRecipients.length > 1
          ? internalRecipients.slice(1)
          : supportList.length > 0
            ? supportList
            : undefined;

      await withTimeout(
        gmailTransporter.sendMail({
          from: fromAddress,
          to: toAddress || internalRecipients,
          cc: ccAddress,
          replyTo: safe(saved?.personalEmail) || undefined,
          subject: `New Business Loan Application - ${applicationRef}`,
          html: internalBrandedHtml,
          text: internalText,
        }),
        12000
      );
    }

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
