import { NextResponse } from "next/server";
import connectDB from "../lib/db";

import SalariedLoanModel from "../models/salaried-loan-schema";

import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";
import { createGmailTransporter } from "../lib/apply-now-email";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    /* =========================================
       HELPER → CLOUDINARY UPLOAD
    ========================================== */
    async function upload(file) {
      if (!file) return null;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "loan_applications", resource_type: "auto" },
            (err, result) => {
              if (err) return resolve(null);
              resolve(result.secure_url);
            }
          )
          .end(buffer);
      });
    }

    /* =========================================
       GENERATE APPLICATION REF
    ========================================== */
    const total = await SalariedLoanModel.countDocuments();
    const applicationRef = `SAL_${String(total + 1).padStart(4, "0")}`;

    /* =========================================
       HANDLE EXISTING LOANS
    ========================================== */
    const existingLoansData = JSON.parse(
      formData.get("existingLoansData") || "[]"
    );

    const updatedExistingLoansData = await Promise.all(
      existingLoansData.map(async (loan, index) => {
        const file = formData.get(`existingLoanSanctionLetter_${index}`);
        const loanSanctionLetterUrl = file ? await upload(file) : null;

        return { ...loan, loanSanctionLetterUrl };
      })
    );

    /* =========================================
       CREATE DOCUMENT
    ========================================== */
    const newApplication = new SalariedLoanModel({
      applicationRef,

      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      serviceCategoryKey: formData.get("serviceCategoryKey"),
      serviceCategoryTitle: formData.get("serviceCategoryTitle"),
      dob: formData.get("dob"),
      gender: formData.get("gender"),
      maritalStatus: formData.get("maritalStatus"),

      mobileNumber: formData.get("mobileNumber"),
      whatsappNumber: formData.get("whatsappNumber"),
      alternateMobile: formData.get("alternateMobile"),
      personalEmail: formData.get("personalEmail"),
      officialEmail: formData.get("officialEmail"),
      officeEmailId: formData.get("officeEmailId"),

      panNumber: formData.get("panNumber"),
      aadhaarNumber: formData.get("aadhaarNumber"),
      voterIdNumber: formData.get("voterIdNumber"),
      drivingLicense: formData.get("drivingLicense"),
      passportNumber: formData.get("passportNumber"),

      currentResidentialAddress: formData.get("currentResidentialAddress"),
      currentResidentialPincode: formData.get("currentResidentialPincode"),
      state: formData.get("state"),
      city: formData.get("city"),
      residenceType: formData.get("residenceType"),
      stayingSinceDate: formData.get("stayingSinceDate"),
      jobBusiness: formData.get("jobBusiness"),

      permanentAddress: formData.get("permanentAddress"),

      companyName: formData.get("companyName"),
      organizationType: formData.get("organizationType"),
      industry: formData.get("industry"),
      industryOther: formData.get("industryOther"),
      designation: formData.get("designation"),
      employmentType: formData.get("employmentType"),
      dateOfJoining: formData.get("dateOfJoining"),
      totalExperienceYears: formData.get("totalExperienceYears"),

      officeLocation: formData.get("officeLocation"),
      officePincode: formData.get("officePincode"),

      monthlyNetSalary: formData.get("monthlyNetSalary"),
      salaryCreditMode: formData.get("salaryCreditMode"),
      salaryAccountBankName: formData.get("salaryAccountBankName"),

      numberOfExistingLoans: parseInt(
        formData.get("numberOfExistingLoans") || "0"
      ),
      existingLoansData: updatedExistingLoansData,

      hasCibil: formData.get("hasCibil"),
      cibilScore: formData.get("cibilScore"),
      cibilIssues: formData.get("cibilIssues"),

      requiredLoanAmount: formData.get("requiredLoanAmount"),
      preferredTenure: formData.get("preferredTenure"),
      purpose: formData.get("purpose"),
      isBuyingGoods: formData.get("isBuyingGoods"),
      quotationAmount: formData.get("quotationAmount"),

      coApplicantName: formData.get("coApplicantName"),
      coApplicantRelation: formData.get("coApplicantRelation"),
      coApplicantEmploymentType: formData.get(
        "coApplicantEmploymentType"
      ),

      // Uploads
      applicantPhotoUrl: await upload(formData.get("applicantPhoto")),
      panPhotoUrl: await upload(formData.get("panPhoto")),
      aadhaarPhotoUrl: await upload(formData.get("aadhaarPhoto")),
      aadhaarBackPhotoUrl: await upload(formData.get("aadhaarBackPhoto")),
      coApplicantPanPhotoUrl: await upload(formData.get("CoApplicantpanPhoto")),
      coApplicantAadhaarPhotoUrl: await upload(
        formData.get("CoApplicantAadhaarPhoto")
      ),
      coApplicantAadhaarBackPhotoUrl: await upload(
        formData.get("CoApplicantAadhaarBackPhoto")
      ),
      residencePhotoUrl: await upload(formData.get("residencePhoto")),
      lastElectricityBillUrl: await upload(formData.get("lastElectricityBill")),
      permElectricityBillUrl: await upload(formData.get("permElectricityBill")),
      rentAgreementUrl: await upload(formData.get("rentAgreement")),
      companyAllotmentLetterUrl: await upload(
        formData.get("companyAllotmentLetter")
      ),
      officeIdPhotoUrl: await upload(formData.get("officeIdPhoto")),
      salarySlipsUrl: await upload(formData.get("salarySlips")),
      bankStatementUrl: await upload(formData.get("bankStatement")),
      cibilReportUrl: await upload(formData.get("cibilReport")),
      quotationFileUrl: await upload(formData.get("quotationFile")),
      proformaInvoiceFileUrl: await upload(
        formData.get("proformaInvoiceFile")
      ),

      loan_type: "salaried",
      application_status: "pending",
      role: "borrower-salaried",
    });

    const saved = await newApplication.save();

    /* =========================================
       EMAIL NOTIFICATIONS
    ========================================== */

    const applicationDate = new Date().toLocaleDateString("en-IN");

    // Admin + Director Email via Gmail SMTP
    const gmailTransporter = createGmailTransporter();
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

    // For Salaried Loan internal notifications, send to director + support (and admin user if set)
    const internalRecipients = normalizeEmailList(
      process.env.DIRECTOR_EMAIL,
      process.env.SUPPORT_EMAIL,
      process.env.ADMIN_USER
    );

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

    // Applicant Email (customer confirmation)
    // Guard: if applicant enters internal company inbox as personal email (e.g. DIRECTOR_EMAIL),
    // do NOT send the customer confirmation template there.
    const personalEmail = formData.get("personalEmail");
    const officialEmail = formData.get("officialEmail");

    const candidateCustomerEmail = !isInternalEmail(personalEmail)
      ? personalEmail
      : !isInternalEmail(officialEmail)
        ? officialEmail
        : null;

    if (candidateCustomerEmail) {
      await sendLoanApplicationConfirmationEmail(candidateCustomerEmail, {
        customerName: formData.get("firstName"),
        applicationNumber: applicationRef,
        applicationDate,
        loanType: "Salaried Loan",
        loanAmount: formData.get("requiredLoanAmount"),
      });
    } else {
      console.warn(
        "Skipping applicant confirmation email because the provided email(s) appear to be internal admin addresses.",
        {
          applicationRef,
          personalEmail: String(personalEmail || ""),
          officialEmail: String(officialEmail || ""),
        }
      );
    }

    const fromAddress =
      process.env.EMAIL_HOST_USER ||
      process.env.EMAIL_SMTP_USER ||
      process.env.EMAIL_FROM;

    const safe = (value) => {
      if (value === undefined || value === null) return "";
      return String(value);
    };

    const asLink = (url) => {
      const u = safe(url).trim();
      if (!u) return "-";
      return `<a href="${u}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline">View Document</a>`;
    };

    const existingLoansHtml = Array.isArray(saved?.existingLoansData)
      ? saved.existingLoansData
          .map(
            (loan, idx) => `
              <tr>
                <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${idx + 1}</td>
                <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(loan?.loanType)}</td>
                <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(loan?.bankName)}</td>
                <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(loan?.totalLoanAmount)}</td>
                <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${safe(loan?.totalMonthlyEmi)}</td>
                <td style="border:1px solid #e5e7eb;padding:8px;vertical-align:top">${asLink(loan?.loanSanctionLetterUrl)}</td>
              </tr>
            `
          )
          .join("")
      : "";

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px 0">New Salaried Loan Application</h2>
        <p style="margin:0 0 16px 0"><strong>Application Ref:</strong> ${safe(applicationRef)}<br/>
        <strong>Date:</strong> ${safe(applicationDate)}<br/>
        <strong>Service Category:</strong> ${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey)}</p>

        <h3 style="margin:16px 0 8px 0">Applicant Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Name</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.firstName)} ${safe(saved?.middleName)} ${safe(saved?.lastName)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>DOB</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.dob)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Gender</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.gender)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Marital Status</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.maritalStatus)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Mobile</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.mobileNumber)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>WhatsApp</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.whatsappNumber)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Alternate Mobile</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.alternateMobile)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Personal Email</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.personalEmail)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Official Email</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.officialEmail)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Office Email</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.officeEmailId)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">KYC</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>PAN</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.panNumber)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Aadhaar</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.aadhaarNumber)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Voter ID</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.voterIdNumber)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Driving License</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.drivingLicense)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Passport</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.passportNumber)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Address</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Current Address</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.currentResidentialAddress)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Current Pincode</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.currentResidentialPincode)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>State</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.state)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>City</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.city)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Residence Type</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.residenceType)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Staying Since</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.stayingSinceDate)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Permanent Address</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.permanentAddress)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Employment</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Company</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.companyName)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Organization Type</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.organizationType)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Industry</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.industry)} ${safe(saved?.industryOther)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Designation</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.designation)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Employment Type</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.employmentType)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Date Of Joining</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.dateOfJoining)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Total Experience (Years)</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.totalExperienceYears)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Office Location</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.officeLocation)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Office Pincode</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.officePincode)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Income & Loan</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Monthly Net Salary</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.monthlyNetSalary)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Salary Credit Mode</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.salaryCreditMode)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Salary Account Bank</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.salaryAccountBankName)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Required Loan Amount</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.requiredLoanAmount)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Preferred Tenure</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.preferredTenure)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Purpose</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.purpose)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Available</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.hasCibil)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Score</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.cibilScore)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Issues</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.cibilIssues)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Buying Goods</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.isBuyingGoods)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Quotation Amount</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.quotationAmount)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Co-Applicant</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Name</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.coApplicantName)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Relation</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.coApplicantRelation)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Employment Type</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${safe(saved?.coApplicantEmploymentType)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Documents</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="border:1px solid #e5e7eb;padding:8px;width:35%"><strong>Applicant Photo</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.applicantPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>PAN Photo</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.panPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Aadhaar Front</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.aadhaarPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Aadhaar Back</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.aadhaarBackPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Co-Applicant PAN Photo</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.coApplicantPanPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Co-Applicant Aadhaar Front</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.coApplicantAadhaarPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Co-Applicant Aadhaar Back</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.coApplicantAadhaarBackPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Residence Proof</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.residencePhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Latest Electricity Bill</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.lastElectricityBillUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Permanent Address Electricity Bill</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.permElectricityBillUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Rent Agreement</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.rentAgreementUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Company Allotment Letter</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.companyAllotmentLetterUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Office ID</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.officeIdPhotoUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Salary Slips</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.salarySlipsUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Bank Statement</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.bankStatementUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>CIBIL Report</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.cibilReportUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Quotation File</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.quotationFileUrl)}</td></tr>
            <tr><td style="border:1px solid #e5e7eb;padding:8px"><strong>Proforma Invoice</strong></td><td style="border:1px solid #e5e7eb;padding:8px">${asLink(saved?.proformaInvoiceFileUrl)}</td></tr>
          </tbody>
        </table>

        <h3 style="margin:16px 0 8px 0">Existing Loans</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr>
              <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">#</th>
              <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Loan Type</th>
              <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Bank</th>
              <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Total Amount</th>
              <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Monthly EMI</th>
              <th style="border:1px solid #e5e7eb;padding:8px;text-align:left">Sanction Letter</th>
            </tr>
          </thead>
          <tbody>
            ${existingLoansHtml || `<tr><td colspan="6" style="border:1px solid #e5e7eb;padding:8px">No existing loans provided</td></tr>`}
          </tbody>
        </table>
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
            <h1>New Salaried Loan Application</h1>
            <p>Internal Notification (Full Details + Document Links)</p>
          </div>

          <div class="content">
            <div class="details-box">
              <p><strong>Application Number:</strong> <span class="application-number">${safe(applicationRef)}</span></p>
              <p><strong>Application Date:</strong> ${safe(applicationDate)}</p>
              <p><strong>Loan Product:</strong> <span class="loan-type-badge">Salaried Loan</span></p>
              <p><strong>Service Category:</strong> ${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey)}</p>
            </div>

            ${internalHtml}

            <div class="footer">
              <p><strong>Infinity Loans & Business Solutions</strong></p>
              <p>www.infinityloanservices.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const existingLoansText = Array.isArray(saved?.existingLoansData)
      ? saved.existingLoansData
          .map(
            (loan, idx) =>
              `${idx + 1}. Loan Type: ${safe(loan?.loanType)} | Bank: ${safe(
                loan?.bankName
              )} | Total Amount: ${safe(loan?.totalLoanAmount)} | Monthly EMI: ${safe(
                loan?.totalMonthlyEmi
              )} | Sanction Letter: ${safe(loan?.loanSanctionLetterUrl) || "-"}`
          )
          .join("\n")
      : "";

    const internalText = `New Salaried Loan Application\n\nApplication Ref: ${safe(
      applicationRef
    )}\nDate: ${safe(applicationDate)}\nService Category: ${safe(saved?.serviceCategoryTitle) || safe(saved?.serviceCategoryKey)}\n\nApplicant Details\nName: ${safe(
      saved?.firstName
    )} ${safe(saved?.middleName)} ${safe(saved?.lastName)}\nDOB: ${safe(saved?.dob)}\nGender: ${safe(saved?.gender)}\nMarital Status: ${safe(saved?.maritalStatus)}\nMobile: ${safe(saved?.mobileNumber)}\nWhatsApp: ${safe(saved?.whatsappNumber)}\nAlternate Mobile: ${safe(saved?.alternateMobile)}\nPersonal Email: ${safe(saved?.personalEmail)}\nOfficial Email: ${safe(saved?.officialEmail)}\nOffice Email: ${safe(saved?.officeEmailId)}\n\nKYC\nPAN: ${safe(saved?.panNumber)}\nAadhaar: ${safe(saved?.aadhaarNumber)}\nVoter ID: ${safe(saved?.voterIdNumber)}\nDriving License: ${safe(saved?.drivingLicense)}\nPassport: ${safe(saved?.passportNumber)}\n\nAddress\nCurrent Address: ${safe(saved?.currentResidentialAddress)}\nCurrent Pincode: ${safe(saved?.currentResidentialPincode)}\nState: ${safe(saved?.state)}\nCity: ${safe(saved?.city)}\nResidence Type: ${safe(saved?.residenceType)}\nStaying Since: ${safe(saved?.stayingSinceDate)}\nPermanent Address: ${safe(saved?.permanentAddress)}\n\nEmployment\nCompany: ${safe(saved?.companyName)}\nOrganization Type: ${safe(saved?.organizationType)}\nIndustry: ${safe(saved?.industry)} ${safe(saved?.industryOther)}\nDesignation: ${safe(saved?.designation)}\nEmployment Type: ${safe(saved?.employmentType)}\nDate Of Joining: ${safe(saved?.dateOfJoining)}\nTotal Experience (Years): ${safe(saved?.totalExperienceYears)}\nOffice Location: ${safe(saved?.officeLocation)}\nOffice Pincode: ${safe(saved?.officePincode)}\n\nIncome & Loan\nMonthly Net Salary: ${safe(saved?.monthlyNetSalary)}\nSalary Credit Mode: ${safe(saved?.salaryCreditMode)}\nSalary Account Bank: ${safe(saved?.salaryAccountBankName)}\nRequired Loan Amount: ${safe(saved?.requiredLoanAmount)}\nPreferred Tenure: ${safe(saved?.preferredTenure)}\nPurpose: ${safe(saved?.purpose)}\nCIBIL Available: ${safe(saved?.hasCibil)}\nCIBIL Score: ${safe(saved?.cibilScore)}\nCIBIL Issues: ${safe(saved?.cibilIssues)}\nBuying Goods: ${safe(saved?.isBuyingGoods)}\nQuotation Amount: ${safe(saved?.quotationAmount)}\n\nCo-Applicant\nName: ${safe(saved?.coApplicantName)}\nRelation: ${safe(saved?.coApplicantRelation)}\nEmployment Type: ${safe(saved?.coApplicantEmploymentType)}\n\nDocuments (Links)\nApplicant Photo: ${safe(saved?.applicantPhotoUrl) || "-"}\nPAN Photo: ${safe(saved?.panPhotoUrl) || "-"}\nAadhaar Front: ${safe(saved?.aadhaarPhotoUrl) || "-"}\nAadhaar Back: ${safe(saved?.aadhaarBackPhotoUrl) || "-"}\nResidence Proof: ${safe(saved?.residencePhotoUrl) || "-"}\nLatest Electricity Bill: ${safe(saved?.lastElectricityBillUrl) || "-"}\nPermanent Address Electricity Bill: ${safe(saved?.permElectricityBillUrl) || "-"}\nRent Agreement: ${safe(saved?.rentAgreementUrl) || "-"}\nCompany Allotment Letter: ${safe(saved?.companyAllotmentLetterUrl) || "-"}\nOffice ID: ${safe(saved?.officeIdPhotoUrl) || "-"}\nSalary Slips: ${safe(saved?.salarySlipsUrl) || "-"}\nBank Statement: ${safe(saved?.bankStatementUrl) || "-"}\nCIBIL Report: ${safe(saved?.cibilReportUrl) || "-"}\nQuotation File: ${safe(saved?.quotationFileUrl) || "-"}\nProforma Invoice: ${safe(saved?.proformaInvoiceFileUrl) || "-"}\n\nExisting Loans\n${existingLoansText || "No existing loans provided"}\n`;

    if (internalRecipients.length > 0) {
      await Promise.all(
        internalRecipients.map((to) =>
          gmailTransporter.sendMail({
            from: fromAddress,
            to,
            replyTo: safe(saved?.personalEmail) || undefined,
            subject: `New Salaried Loan Application - ${applicationRef}`,
            html: internalBrandedHtml,
            text: internalText,
          })
        )
      );
    }

    return NextResponse.json({
      success: true,
      message: "Salaried Loan Application Submitted",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
