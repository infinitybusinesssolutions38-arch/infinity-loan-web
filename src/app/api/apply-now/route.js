import { NextResponse } from "next/server";
import connectDB from "../lib/db";

import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import SalariedLoanModel from "../models/salaried-loan-schema";

import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    await connectDB();

    /* =====================================================
       HELPER → CLOUDINARY
    ===================================================== */
    async function upload(file) {
      if (!file) return null;

      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "loan_applications", resource_type: "auto" }, (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          })
          .end(buffer);
      });
    }

    /* =====================================================
       COMMON FIELDS
    ===================================================== */
    const firstName = formData.get("firstName");
    const middleName = formData.get("middleName") || "";
    const lastName = formData.get("lastName");

    const mobileNumber = formData.get("mobileNumber");
    const alternateMobile = formData.get("alternateMobile") || "";

    const personalEmail = formData.get("personalEmail");

    const aadhaarNumber = formData.get("aadhaarNumber");
    const panNumber = formData.get("panNumber");

    const loanType = (formData.get("loanType") || "").trim().toLowerCase();

    const applicationRef = `aplic_${Date.now()}`;

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */
    if (!personalEmail || !mobileNumber) {
      return NextResponse.json(
        { success: false, message: "Email & mobile required" },
        { status: 400 }
      );
    }

    let newApplication;

    /* =====================================================
       ================= SALARIED =================
    ===================================================== */
    if (loanType === "salaried") {
      newApplication = new SalariedLoanModel({
        applicationRef,

        firstName,
        middleName,
        lastName,

        dob: formData.get("dob"),
        gender: formData.get("gender"),
        maritalStatus: formData.get("maritalStatus"),

        mobileNumber,
        whatsappNumber: formData.get("whatsappNumber"),
        alternateMobile,
        personalEmail,
        officialEmail: formData.get("officialEmail"),

        panNumber,
        aadhaarNumber,
        voterIdNumber: formData.get("voterIdNumber"),
        drivingLicense: formData.get("drivingLicense"),
        passportNumber: formData.get("passportNumber"),

        currentResidentialAddress: formData.get("currentResidentialAddress"),
        currentResidentialPincode: formData.get("currentResidentialPincode"),
        state: formData.get("state"),
        city: formData.get("city"),
        residenceType: formData.get("residenceType"),
        stayingSinceYears: formData.get("stayingSinceYears"),

        permanentAddress: formData.get("permanentAddress"),

        companyName: formData.get("companyName"),
        organizationType: formData.get("organizationType"),
        industry: formData.get("industry"),
        designation: formData.get("designation"),
        employmentType: formData.get("employmentType"),
        dateOfJoining: formData.get("dateOfJoining"),
        totalExperienceYears: formData.get("totalExperienceYears"),

        officeLocation: formData.get("officeLocation"),
        officePincode: formData.get("officePincode"),

        monthlyNetSalary: formData.get("monthlyNetSalary"),
        salaryCreditMode: formData.get("salaryCreditMode"),
        salaryAccountBankName: formData.get("salaryAccountBankName"),

        hasCibil: formData.get("hasCibil"),
        cibilScore: formData.get("cibilScore"),

        requiredLoanAmount: formData.get("requiredLoanAmount"),
        preferredTenure: formData.get("preferredTenure"),
        purpose: formData.get("purpose"),

        coApplicantName: formData.get("coApplicantName"),
        coApplicantRelation: formData.get("coApplicantRelation"),
        coApplicantEmploymentType: formData.get("coApplicantEmploymentType"),

        // uploads
        applicantPhotoUrl: await upload(formData.get("applicantPhoto")),
        panPhotoUrl: await upload(formData.get("panPhoto")),
        aadhaarPhotoUrl: await upload(formData.get("aadhaarPhoto")),
        aadhaarBackPhotoUrl: await upload(formData.get("aadhaarBackPhoto")),
        residencePhotoUrl: await upload(formData.get("residencePhoto")),
        officeIdPhotoUrl: await upload(formData.get("officeIdPhoto")),
        salarySlipsUrl: await upload(formData.get("salarySlips")),
        bankStatementUrl: await upload(formData.get("bankStatement")),
        loanSanctionLetterUrl: await upload(formData.get("loanSanctionLetter")),

        loan_type: "salaried",
        application_status: "pending",
        role: "borrower-salaried",
      });
    }

    /* =====================================================
       ================= BUSINESS =================
    ===================================================== */
    else if (loanType === "business") {
      newApplication = new BusinessLoanModel({
        applicationRef,

        firstname: firstName,
        lastname: lastName,
        mobileNumber,
        alternateMobile,
        personalEmail,

        aadhaarNumber,

        bankName: formData.get("bankName"),
        accountHolderName: formData.get("accountHolderName"),
        accountNumber: formData.get("accountNumber"),
        ifscCode: formData.get("ifscCode"),
        accountType: formData.get("accountType"),
        branchName: formData.get("branchName"),
        monthlyAvgBankBalance: formData.get("monthlyAvgBankBalance"),

        businessName: formData.get("businessName"),
        businessType: formData.get("businessType"),
        businessAddress: formData.get("businessAddress"),
        businessVintageYears: formData.get("businessVintageYears"),
        natureOfBusiness: formData.get("natureOfBusiness"),
        annualTurnover: formData.get("annualTurnover"),

        gstNumber: formData.get("gstNumber"),
        businessPan: formData.get("businessPan"),

        loanAmountRequired: formData.get("loanAmountRequired"),
        purposeOfLoan: formData.get("purposeOfLoan"),
        preferredLoanTenureMonths: formData.get("preferredLoanTenureMonths"),

        role: "borrower-business",
      });
    }

    /* =====================================================
       ================= PERSONAL =================
    ===================================================== */
    else if (loanType === "personal") {
      newApplication = new PersonalLoanModel({
        applicationRef,

        firstname: firstName,
        middleName,
        lastname: lastName,
        mobileNumber,
        alternateMobile,
        personalEmail,

        panNumber,
        aadhaarNumber,

        currentResidentialAddress: formData.get("currentResidentialAddress"),
        currentResidentialPincode: formData.get("currentResidentialPincode"),
        currentOfficeAddress: formData.get("currentOfficeAddress"),
        currentOfficePincode: formData.get("currentOfficePincode"),
        residentialStatus: formData.get("residentialStatus"),
        businessPremisesStatus: formData.get("businessPremisesStatus"),
        yearsAtCurrentResidentialAddress: formData.get("yearsAtCurrentResidentialAddress"),
        yearsAtCurrentBusinessAddress: formData.get("yearsAtCurrentBusinessAddress"),

        requiredLoanAmount: formData.get("requiredLoanAmount"),

        aadhaarFront: await upload(formData.get("aadhaarFront")),
        aadhaarBack: await upload(formData.get("aadhaarBack")),
        panCardFront: await upload(formData.get("panCardFront")),
        residentialElectricityBillUrl: await upload(formData.get("residentialBill")),
        shopElectricityBillUrl: await upload(formData.get("shopBill")),

        loan_type: "personal",
        application_status: "pending",
        role: "borrower-personal",
      });
    }

    else {
      return NextResponse.json(
        { success: false, message: "Invalid loan type" },
        { status: 400 }
      );
    }

    const saved = await newApplication.save();

    // Email notifications (non-blocking)
    try {
      const companyName = process.env.COMPANY_NAME || "Infinity Loan Services";
      const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_FROM || process.env.EMAIL_USER;
      const supportPhone = process.env.SUPPORT_PHONE || "+91-9579880841";
      const website = process.env.COMPANY_WEBSITE || "www.infinityloanservices.com";

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 465),
        secure: String(process.env.EMAIL_SECURE || "true").toLowerCase() === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;
      const from = fromAddress ? `${companyName} <${fromAddress}>` : undefined;
      const applicantTo = String(personalEmail || "").trim();
      const extraAdminRecipients = String(process.env.ADMIN_EXTRA_EMAILS || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const adminRecipients = Array.from(
        new Set(
          [
            process.env.SUPPORT_EMAIL,
            process.env.ADMIN_USER,
            ...extraAdminRecipients,
            "infinitybusinesssolutions38@gmail.com",
          ].filter(Boolean)
        )
      );

      const adminSubject = `New loan application - ${applicationRef}`;
      const savedObject = typeof saved?.toObject === "function" ? saved.toObject() : saved;
      const adminText =
        `New loan application received.\n\n` +
        `Reference: ${applicationRef}\n` +
        `Name: ${firstName || ""} ${middleName || ""} ${lastName || ""}\n` +
        `Email: ${personalEmail || ""}\n` +
        `Mobile: ${mobileNumber || ""}\n` +
        `Loan Type: ${loanType || ""}\n\n` +
        `Full Details:\n` +
        `${JSON.stringify(savedObject, null, 2)}`;

      const escapeHtml = (v) =>
        String(v ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");

      const formatCurrencyINR = (value) => {
        const raw = String(value ?? "").replace(/[,\s]/g, "");
        const num = Number(raw);
        if (!raw) return "";
        if (Number.isFinite(num)) {
          try {
            return num.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
          } catch {
            return `₹${raw}`;
          }
        }
        return raw;
      };

      const adminFullName =
        String(savedObject?.firstName || savedObject?.firstname || firstName || "").trim() +
        (savedObject?.middleName || middleName ? ` ${String(savedObject?.middleName || middleName).trim()}` : "") +
        (savedObject?.lastName || savedObject?.lastname || lastName ? ` ${String(savedObject?.lastName || savedObject?.lastname || lastName).trim()}` : "");

      const docLinks = [
        { label: "Applicant Photo", url: savedObject?.applicantPhotoUrl },
        { label: "PAN Card", url: savedObject?.panPhotoUrl || savedObject?.panCardFront },
        { label: "Aadhaar Card", url: savedObject?.aadhaarPhotoUrl || savedObject?.aadhaarFront },
        { label: "Aadhaar Card (Back)", url: savedObject?.aadhaarBackPhotoUrl || savedObject?.aadhaarBack },
        { label: "Residence Proof", url: savedObject?.residencePhotoUrl || savedObject?.residentialElectricityBillUrl },
        { label: "Office ID", url: savedObject?.officeIdPhotoUrl },
        { label: "Salary Slips", url: savedObject?.salarySlipsUrl },
        { label: "Bank Statement", url: savedObject?.bankStatementUrl },
        { label: "Loan Sanction Letter", url: savedObject?.loanSanctionLetterUrl },
        { label: "Shop/Office Electricity Bill", url: savedObject?.shopElectricityBillUrl },
      ]
        .filter((d) => typeof d.url === "string" && d.url)
        .map((d) => ({ ...d, url: String(d.url) }));

      const applicationDateStr = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loan Application Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
    .container { max-width: 800px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #007bff; margin: 0 0 10px 0; font-size: 28px; }
    .reference { color: #666; font-size: 14px; }
    .section { margin-bottom: 30px; }
    .section-title { background-color: #f8f9fa; padding: 12px; border-left: 4px solid #007bff; font-weight: bold; color: #333; margin-bottom: 15px; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .detail-item { margin-bottom: 12px; }
    .detail-label { font-weight: bold; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-value { color: #333; font-size: 14px; margin-top: 4px; word-break: break-word; }
    .documents-list { background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px; }
    .documents-list ul { margin: 0; padding-left: 20px; }
    .documents-list li { margin-bottom: 8px; font-size: 14px; }
    .documents-list a { color: #007bff; text-decoration: none; }
    .documents-list a:hover { text-decoration: underline; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 13px; color: #666; }
    .status-badge { display: inline-block; background-color: #fff3cd; color: #856404; padding: 8px 12px; border-radius: 4px; font-weight: bold; margin-bottom: 20px; }
    .highlight { background-color: #fff8dc; padding: 15px; border-radius: 4px; margin-bottom: 20px; border-left: 4px solid #ffc107; }
    @media (max-width: 600px) { .details-grid { grid-template-columns: 1fr; } .container { padding: 20px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Loan Application Received</h1>
      <p class="reference">Reference ID: <strong>${escapeHtml(applicationRef)}</strong></p>
    </div>

    <div class="status-badge">Status: PENDING REVIEW</div>

    <div class="section">
      <div class="section-title">Personal Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Full Name</div><div class="detail-value">${escapeHtml(adminFullName.trim() || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Date of Birth</div><div class="detail-value">${escapeHtml(savedObject?.dob || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Gender</div><div class="detail-value">${escapeHtml(savedObject?.gender || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Marital Status</div><div class="detail-value">${escapeHtml(savedObject?.maritalStatus || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">PAN Number</div><div class="detail-value">${escapeHtml(savedObject?.panNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Aadhaar Number</div><div class="detail-value">${escapeHtml(savedObject?.aadhaarNumber || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Contact Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Primary Email</div><div class="detail-value">${escapeHtml(savedObject?.personalEmail || personalEmail || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Official Email</div><div class="detail-value">${escapeHtml(savedObject?.officialEmail || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Mobile Number</div><div class="detail-value">${escapeHtml(savedObject?.mobileNumber || mobileNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">WhatsApp Number</div><div class="detail-value">${escapeHtml(savedObject?.whatsappNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Alternate Mobile</div><div class="detail-value">${escapeHtml(savedObject?.alternateMobile || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Residential Address</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Address</div><div class="detail-value">${escapeHtml(savedObject?.currentResidentialAddress || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Pincode</div><div class="detail-value">${escapeHtml(savedObject?.currentResidentialPincode || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">City</div><div class="detail-value">${escapeHtml(savedObject?.city || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">State</div><div class="detail-value">${escapeHtml(savedObject?.state || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Residence Type</div><div class="detail-value">${escapeHtml(savedObject?.residenceType || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Employment Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Company Name</div><div class="detail-value">${escapeHtml(savedObject?.companyName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Organization Type</div><div class="detail-value">${escapeHtml(savedObject?.organizationType || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Industry</div><div class="detail-value">${escapeHtml(savedObject?.industry || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Designation</div><div class="detail-value">${escapeHtml(savedObject?.designation || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Employment Type</div><div class="detail-value">${escapeHtml(savedObject?.employmentType || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Date of Joining</div><div class="detail-value">${escapeHtml(savedObject?.dateOfJoining || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Office Location</div><div class="detail-value">${escapeHtml(savedObject?.officeLocation || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Office Pincode</div><div class="detail-value">${escapeHtml(savedObject?.officePincode || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Financial Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Monthly Net Salary</div><div class="detail-value">${escapeHtml(formatCurrencyINR(savedObject?.monthlyNetSalary) || savedObject?.monthlyNetSalary || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Salary Credit Mode</div><div class="detail-value">${escapeHtml(savedObject?.salaryCreditMode || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Salary Account Bank</div><div class="detail-value">${escapeHtml(savedObject?.salaryAccountBankName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Existing Loans</div><div class="detail-value">${escapeHtml(savedObject?.numberOfExistingLoans ? String(savedObject.numberOfExistingLoans) : "None")}</div></div>
        <div class="detail-item"><div class="detail-label">CIBIL Score</div><div class="detail-value">${escapeHtml(savedObject?.cibilScore || "Not Available")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Loan Details</div>
      <div class="highlight">
        <div class="detail-item"><div class="detail-label">Loan Type</div><div class="detail-value"><strong>${escapeHtml(String(savedObject?.loan_type || loanType || "").toUpperCase() || "-")}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Required Loan Amount</div><div class="detail-value"><strong>${escapeHtml(formatCurrencyINR(savedObject?.requiredLoanAmount || savedObject?.loanAmountRequired) || (savedObject?.requiredLoanAmount || savedObject?.loanAmountRequired || "-"))}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Preferred Tenure</div><div class="detail-value"><strong>${escapeHtml(savedObject?.preferredTenure || savedObject?.preferredLoanTenureMonths || "-")}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Loan Purpose</div><div class="detail-value">${escapeHtml(savedObject?.purpose || savedObject?.purposeOfLoan || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Co-Applicant Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Co-Applicant Name</div><div class="detail-value">${escapeHtml(savedObject?.coApplicantName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Relation</div><div class="detail-value">${escapeHtml(savedObject?.coApplicantRelation || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Employment Type</div><div class="detail-value">${escapeHtml(savedObject?.coApplicantEmploymentType || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Uploaded Documents</div>
      <div class="documents-list">
        <ul>
          ${docLinks.length ? docLinks.map((d) => `<li><strong>${escapeHtml(d.label)}:</strong> <a href="${escapeHtml(d.url)}" target="_blank">View Document</a></li>`).join("") : "<li>No uploaded documents found.</li>"}
        </ul>
      </div>
    </div>

    <div class="footer">
      <p><strong>${escapeHtml(companyName)}</strong></p>
      <p>Email: ${escapeHtml(supportEmail || fromAddress || "")}</p>
      <p>Application Date: ${escapeHtml(applicationDateStr)}</p>
      <p>Application Status: PENDING REVIEW</p>
      <p style="margin-top: 20px; color: #999;">This is an automated email. Please do not reply. For inquiries, contact our support team.</p>
    </div>
  </div>
</body>
</html>`;

      // Applicant confirmation email (HTML template)
      try {
        const applicationDate = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const loanAmount =
          savedObject?.requiredLoanAmount ||
          savedObject?.loanAmountRequired ||
          formData.get("requiredLoanAmount") ||
          formData.get("loanAmountRequired") ||
          "";

        const applicantEmailResult = await sendLoanApplicationConfirmationEmail(applicantTo, {
          customerName: String(firstName || "").trim() || "Customer",
          applicationNumber: applicationRef,
          applicationDate,
          loanType: String(loanType || "").trim(),
          loanAmount: String(loanAmount || "").trim(),
        });

        if (!applicantEmailResult?.success) {
          console.error("apply-now applicant email template failed:", applicantEmailResult?.error);
        }
      } catch (e) {
        console.error("apply-now applicant email template error:", e?.message || e);
      }

      if (from && adminRecipients.length > 0) {
        try {
          const richAdmin = "infinitybusinesssolutions38@gmail.com";
          const otherAdmins = adminRecipients.filter((e) => e !== richAdmin);

          // Rich HTML email to dedicated recipient
          if (richAdmin) {
            await transporter.sendMail({
              from,
              to: richAdmin,
              subject: adminSubject,
              html: adminHtml,
              replyTo: supportEmail || fromAddress,
            });
          }

          // Plain text to remaining admin recipients
          if (otherAdmins.length > 0) {
          await transporter.sendMail({
            from,
            to: otherAdmins,
            subject: adminSubject,
            text: adminText,
            replyTo: supportEmail || fromAddress,
          });
          }
        } catch (e) {
          console.error("apply-now admin email failed:", e?.message || e);
        }
      }
    } catch (emailErr) {
      console.error("apply-now email failed:", emailErr?.message || emailErr);
      // Don't fail the API response if email fails
    }

    return NextResponse.json({
      success: true,
      data: saved,
      message: "Application submitted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}






// import { NextResponse } from "next/server";
// import connectDB from "../lib/db";
// import PersonalLoanModel from "../models/personal-loan-schema";
// import BusinessLoanModel from "../models/business-loan-schema";
// import SalariedLoanModel from "../models/salaried-loan-schema";
// import nodemailer from "nodemailer";
// import cloudinary from "cloudinary";
// import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";

// // ✅ Cloudinary Config
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//     try {
//         const formData = await req.formData();

//         // Extract common text fields
//         const firstName = formData.get("firstName");
//         const middleName = formData.get("middleName") || "";
//         const lastName = formData.get("lastName");
//         const mobileNumber = formData.get("mobileNumber");
//         const alternateMobile = formData.get("alternateMobile") || "";
//         const personalEmail = formData.get("personalEmail");
//         const aadhaarNumber = formData.get("aadhaarNumber");
//         const panNumber = formData.get("panNumber");
//         const voterIdNumber = formData.get("voterIdNumber") || "";
//         const drivingLicense = formData.get("drivingLicense") || "";
//         const passportNumber = formData.get("passportNumber") || "";
//         const requiredLoanAmount = formData.get("requiredLoanAmount");
//         const loanType = formData.get("loanType") || "personal";

//         // Check if this is a salaried application
//         const isSalariedApp = loanType.toLowerCase().includes("salaried");

//         // Extract salaried-specific fields if applicable
//         let salariedData = {};
//         if (isSalariedApp) {
//             salariedData = {
//                 dob: formData.get("dob") || "",
//                 gender: formData.get("gender") || "",
//                 maritalStatus: formData.get("maritalStatus") || "",
//                 whatsappNumber: formData.get("whatsappNumber") || "",
//                 state: formData.get("state") || "",
//                 city: formData.get("city") || "",
//                 permanentAddress: formData.get("permanentAddress") || "",
//                 currentResidentialAddress: formData.get("currentResidentialAddress") || "",
//                 currentResidentialPincode: formData.get("currentResidentialPincode") || "",
//                 residenceType: formData.get("residenceType") || "",
//                 stayingSinceYears: formData.get("stayingSinceYears") || "",
//                 companyName: formData.get("companyName") || "",
//                 organizationType: formData.get("organizationType") || "",
//                 industry: formData.get("industry") || "",
//                 designation: formData.get("designation") || "",
//                 employmentType: formData.get("employmentType") || "",
//                 dateOfJoining: formData.get("dateOfJoining") || "",
//                 totalExperienceYears: formData.get("totalExperienceYears") || "",
//                 officeLocation: formData.get("officeLocation") || "",
//                 officePincode: formData.get("officePincode") || "",
//                 officialEmail: formData.get("officialEmail") || "",
//                 monthlyNetSalary: formData.get("monthlyNetSalary") || "",
//                 salaryCreditMode: formData.get("salaryCreditMode") || "",
//                 salaryAccountBankName: formData.get("salaryAccountBankName") || "",
//                 numberOfExistingLoans: formData.get("numberOfExistingLoans") || "0",
//                 existingLoansData: JSON.parse(formData.get("existingLoansData") || "[]"),
//                 hasCibil: formData.get("hasCibil") || "",
//                 cibilScore: formData.get("cibilScore") || "",
//                 preferredTenure: formData.get("preferredTenure") || "",
//                 purpose: formData.get("purpose") || "",
//                 coApplicantName: formData.get("coApplicantName") || "",
//                 coApplicantRelation: formData.get("coApplicantRelation") || "",
//                 coApplicantEmploymentType: formData.get("coApplicantEmploymentType") || "",
//             };
//         } else {
//             // Extract business/personal loan fields
//             salariedData = {
//                 businessEmail: formData.get("businessEmail") || "",
//                 currentOfficeAddress: formData.get("currentOfficeAddress") || "",
//                 currentOfficePincode: formData.get("currentOfficePincode") || "",
//                 currentResidentialAddress: formData.get("currentResidentialAddress") || "",
//                 currentResidentialPincode: formData.get("currentResidentialPincode") || "",
//                 residentialStatus: formData.get("residentialStatus") || "",
//                 businessPremisesStatus: formData.get("businessPremisesStatus") || "",
//                 yearsAtCurrentResidentialAddress: formData.get("yearsAtCurrentResidentialAddress") || "",
//                 yearsAtCurrentBusinessAddress: formData.get("yearsAtCurrentBusinessAddress") || "",
//             };
//         }

//         if (!personalEmail || !mobileNumber) {
//             return NextResponse.json(
//                 { success: false, message: "Personal email and mobile are required" },
//                 { status: 400 }
//             );
//         }

//         // Validate personalEmail format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(personalEmail)) {
//             return NextResponse.json(
//                 { success: false, message: "Invalid personal email format" },
//                 { status: 400 }
//             );
//         }

//         // ✅ Upload helper for Cloudinary
//         async function uploadToCloudinary(file) {
//             if (!file || typeof file === "string") return null;
//             const bytes = await file.arrayBuffer();
//             const buffer = Buffer.from(bytes);

//             return new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.v2.uploader.upload_stream(
//                     { folder: "infinity_loan_applications", resource_type: "auto" },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result.secure_url);
//                     }
//                 );
//                 uploadStream.end(buffer);
//             });
//         }

//         // ✅ Upload files based on application type
//         let uploadedFiles = {};
        
//         if (isSalariedApp) {
//             // Salaried-specific documents
//             uploadedFiles.panPhotoUrl = await uploadToCloudinary(formData.get("panPhoto"));
//             uploadedFiles.aadhaarPhotoUrl = await uploadToCloudinary(formData.get("aadhaarPhoto"));
//             uploadedFiles.aadhaarBackPhotoUrl = await uploadToCloudinary(formData.get("aadhaarBackPhoto"));
//             uploadedFiles.applicantPhotoUrl = await uploadToCloudinary(formData.get("applicantPhoto"));
//             uploadedFiles.residencePhotoUrl = await uploadToCloudinary(formData.get("residencePhoto"));
//             uploadedFiles.officeIdPhotoUrl = await uploadToCloudinary(formData.get("officeIdPhoto"));
//             uploadedFiles.salarySlipsUrl = await uploadToCloudinary(formData.get("salarySlips"));
//             uploadedFiles.bankStatementUrl = await uploadToCloudinary(formData.get("bankStatement"));
//             uploadedFiles.cibilReportUrl = await uploadToCloudinary(formData.get("cibilReport"));
//             uploadedFiles.lastElectricityBillUrl = await uploadToCloudinary(formData.get("lastElectricityBill"));
//             uploadedFiles.permElectricityBillUrl = await uploadToCloudinary(formData.get("permElectricityBill"));
//             uploadedFiles.rentAgreementUrl = await uploadToCloudinary(formData.get("rentAgreement"));
//             uploadedFiles.companyAllotmentLetterUrl = await uploadToCloudinary(formData.get("companyAllotmentLetter"));

//             // Validate required salaried documents
//             if (!uploadedFiles.panPhotoUrl || !uploadedFiles.aadhaarPhotoUrl || !uploadedFiles.aadhaarBackPhotoUrl || !uploadedFiles.applicantPhotoUrl) {
//                 return NextResponse.json(
//                     { success: false, message: "Required documents missing: PAN, Aadhaar (front & back), and Applicant photo are mandatory" },
//                     { status: 400 }
//                 );
//             }
//         } else {
//             // Business/Personal loan documents
//             uploadedFiles.aadhaarFrontUrl = await uploadToCloudinary(formData.get("aadhaarFront"));
//             uploadedFiles.aadhaarBackUrl = await uploadToCloudinary(formData.get("aadhaarBack"));
//             uploadedFiles.panCardFrontUrl = await uploadToCloudinary(formData.get("panCardFront"));
//             uploadedFiles.residentialBillUrl = await uploadToCloudinary(formData.get("residentialBill"));
//             uploadedFiles.shopBillUrl = await uploadToCloudinary(formData.get("shopBill"));

//             // Validate required business/personal documents
//             if (!uploadedFiles.aadhaarFrontUrl || !uploadedFiles.aadhaarBackUrl || !uploadedFiles.panCardFrontUrl || !uploadedFiles.residentialBillUrl || !uploadedFiles.shopBillUrl) {
//                 return NextResponse.json(
//                     { success: false, message: "Required documents missing or upload failed" },
//                     { status: 400 }
//                 );
//             }
//         }

//         // ✅ Connect to MongoDB
//         await connectDB();

//         // ✅ Clean up old indexes if they exist (migration from old schema)
//         try {
//             const personalCollection = PersonalLoanModel.collection;
//             const businessCollection = BusinessLoanModel.collection;
            
//             // Drop old email_1 index if it exists
//             try {
//                 await personalCollection.dropIndex("email_1");
//             } catch (err) {
//                 // Index doesn't exist, which is fine
//             }
//             try {
//                 await businessCollection.dropIndex("email_1");
//             } catch (err) {
//                 // Index doesn't exist, which is fine
//             }
//         } catch (indexError) {
//             console.warn("Index cleanup warning (non-fatal):", indexError.message);
//         }

//         // ✅ Check for existing email to prevent duplicate submissions
//         const existingPersonal = await PersonalLoanModel.findOne({ personalEmail });
//         const existingBusiness = await BusinessLoanModel.findOne({ personalEmail });
//         const existingSalaried = await SalariedLoanModel.findOne({ personalEmail });
//         if (existingPersonal || existingBusiness || existingSalaried) {
//             return NextResponse.json(
//                 { success: false, message: "An application with this email already exists" },
//                 { status: 409 }
//             );
//         }

//         // ✅ Generate unique sequential application reference
//         const totalPersonal = await PersonalLoanModel.countDocuments({});
//         const totalBusiness = await BusinessLoanModel.countDocuments({});
//         const totalSalaried = await SalariedLoanModel.countDocuments({});
//         const totalApplications = totalPersonal + totalBusiness + totalSalaried;
//         const nextNumber = totalApplications + 1;
//         const applicationRef = `aplic_${String(nextNumber).padStart(5, "0")}`;

//         // ✅ Save to appropriate model
//         let newApplication = null;

//         if (isSalariedApp) {
//             // Save as salaried loan
//             newApplication = new SalariedLoanModel({
//                 applicationRef,
//                 firstName,
//                 middleName: middleName || "",
//                 lastName,
//                 dob: salariedData.dob,
//                 gender: salariedData.gender,
//                 maritalStatus: salariedData.maritalStatus,
//                 mobileNumber,
//                 whatsappNumber: salariedData.whatsappNumber,
//                 alternateMobile: alternateMobile || "",
//                 personalEmail,
//                 panNumber,
//                 aadhaarNumber,
//                 voterIdNumber: voterIdNumber || "",
//                 drivingLicense: drivingLicense || "",
//                 passportNumber: passportNumber || "",
//                 currentResidentialAddress: salariedData.currentResidentialAddress,
//                 currentResidentialPincode: salariedData.currentResidentialPincode,
//                 state: salariedData.state,
//                 city: salariedData.city,
//                 residenceType: salariedData.residenceType,
//                 stayingSinceYears: salariedData.stayingSinceYears,
//                 permanentAddress: salariedData.permanentAddress,
//                 companyName: salariedData.companyName,
//                 organizationType: salariedData.organizationType,
//                 industry: salariedData.industry,
//                 designation: salariedData.designation,
//                 employmentType: salariedData.employmentType,
//                 dateOfJoining: salariedData.dateOfJoining,
//                 totalExperienceYears: salariedData.totalExperienceYears,
//                 officeLocation: salariedData.officeLocation,
//                 officePincode: salariedData.officePincode,
//                 officialEmail: salariedData.officialEmail,
//                 monthlyNetSalary: salariedData.monthlyNetSalary,
//                 salaryCreditMode: salariedData.salaryCreditMode,
//                 salaryAccountBankName: salariedData.salaryAccountBankName,
//                 numberOfExistingLoans: salariedData.numberOfExistingLoans,
//                 existingLoansData: salariedData.existingLoansData,
//                 hasCibil: salariedData.hasCibil,
//                 cibilScore: salariedData.cibilScore,
//                 requiredLoanAmount,
//                 preferredTenure: salariedData.preferredTenure,
//                 purpose: salariedData.purpose,
//                 coApplicantName: salariedData.coApplicantName,
//                 coApplicantRelation: salariedData.coApplicantRelation,
//                 coApplicantEmploymentType: salariedData.coApplicantEmploymentType,
//                 // Document URLs
//                 panPhotoUrl: uploadedFiles.panPhotoUrl,
//                 aadhaarPhotoUrl: uploadedFiles.aadhaarPhotoUrl,
//                 aadhaarBackPhotoUrl: uploadedFiles.aadhaarBackPhotoUrl,
//                 applicantPhotoUrl: uploadedFiles.applicantPhotoUrl,
//                 residencePhotoUrl: uploadedFiles.residencePhotoUrl,
//                 officeIdPhotoUrl: uploadedFiles.officeIdPhotoUrl,
//                 salarySlipsUrl: uploadedFiles.salarySlipsUrl,
//                 bankStatementUrl: uploadedFiles.bankStatementUrl,
//                 cibilReportUrl: uploadedFiles.cibilReportUrl,
//                 lastElectricityBillUrl: uploadedFiles.lastElectricityBillUrl,
//                 permElectricityBillUrl: uploadedFiles.permElectricityBillUrl,
//                 rentAgreementUrl: uploadedFiles.rentAgreementUrl,
//                 companyAllotmentLetterUrl: uploadedFiles.companyAllotmentLetterUrl,
//                 loan_type: "salaried",
//                 application_status: "pending",
//                 role: "borrower-salaried",
//             });
//         } else if (loanType.includes("business")) {
//             newApplication = new BusinessLoanModel({
//                 applicationRef,
//                 firstname: firstName,
//                 lastname: lastName,
//                 mobileNumber,
//                 alternateMobile: alternateMobile || "",
//                 personalEmail,
//                 businessEmail: salariedData.businessEmail || "",
//                 panNumber,
//                 aadhaarNumber,
//                 voterIdNumber: voterIdNumber || "",
//                 drivingLicense: drivingLicense || "",
//                 passportNumber: passportNumber || "",
//                 currentResidentialAddress: salariedData.currentResidentialAddress,
//                 currentResidentialPincode: salariedData.currentResidentialPincode,
//                 currentOfficeAddress: salariedData.currentOfficeAddress,
//                 currentOfficePincode: salariedData.currentOfficePincode,
//                 residentialStatus: salariedData.residentialStatus,
//                 businessPremisesStatus: salariedData.businessPremisesStatus,
//                 yearsAtCurrentResidentialAddress: Number(salariedData.yearsAtCurrentResidentialAddress) || 0,
//                 yearsAtCurrentBusinessAddress: Number(salariedData.yearsAtCurrentBusinessAddress) || 0,
//                 requiredLoanAmount,
//                 aadhaarFront: uploadedFiles.aadhaarFrontUrl,
//                 aadhaarBack: uploadedFiles.aadhaarBackUrl,
//                 panCardFront: uploadedFiles.panCardFrontUrl,
//                 residentialElectricityBillUrl: uploadedFiles.residentialBillUrl,
//                 shopElectricityBillUrl: uploadedFiles.shopBillUrl,
//                 loan_type: loanType,
//                 application_status: "pending",
//                 role: "borrower-business",
//             });
//         } else {
//             newApplication = new PersonalLoanModel({
//                 applicationRef,
//                 firstname: firstName,
//                 middleName: middleName,
//                 lastname: lastName,
//                 mobileNumber,
//                 alternateMobile: alternateMobile || "",
//                 personalEmail,
//                 businessEmail: salariedData.businessEmail || "",
//                 panNumber,
//                 aadhaarNumber,
//                 voterIdNumber: voterIdNumber || "",
//                 drivingLicense: drivingLicense || "",
//                 passportNumber: passportNumber || "",
//                 currentResidentialAddress: salariedData.currentResidentialAddress,
//                 currentResidentialPincode: salariedData.currentResidentialPincode,
//                 currentOfficeAddress: salariedData.currentOfficeAddress,
//                 currentOfficePincode: salariedData.currentOfficePincode,
//                 residentialStatus: salariedData.residentialStatus,
//                 businessPremisesStatus: salariedData.businessPremisesStatus,
//                 yearsAtCurrentResidentialAddress: Number(salariedData.yearsAtCurrentResidentialAddress) || 0,
//                 yearsAtCurrentBusinessAddress: Number(salariedData.yearsAtCurrentBusinessAddress) || 0,
//                 requiredLoanAmount,
//                 aadhaarFront: uploadedFiles.aadhaarFrontUrl,
//                 aadhaarBack: uploadedFiles.aadhaarBackUrl,
//                 panCardFront: uploadedFiles.panCardFrontUrl,
//                 residentialElectricityBillUrl: uploadedFiles.residentialBillUrl,
//                 shopElectricityBillUrl: uploadedFiles.shopBillUrl,
//                 loan_type: loanType,
//                 application_status: "pending",
//                 role: "borrower-personal",
//             });
//         }

//         await newApplication.save();

//         // ✅ Send confirmation email
//         try {
//             const companyName = process.env.COMPANY_NAME || "Infinity Loan Services";
//             const supportPhone = process.env.SUPPORT_PHONE || "+91-9579880841";
//             const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_FROM || "business@infinityloanservices.com";
//             const website = process.env.COMPANY_WEBSITE || "www.infinityloanservices.com";

//             const transporter = nodemailer.createTransport({
//                 host: process.env.EMAIL_HOST,
//                 port: Number(process.env.EMAIL_PORT || 465),
//                 secure: String(process.env.EMAIL_SECURE || "true").toLowerCase() === "true",
//                 auth: {
//                     user: process.env.EMAIL_USER,
//                     pass: process.env.EMAIL_PASS,
//                 },
//             });

//             // Format application date
//             const applicationDate = new Date().toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//             });

//             // Send confirmation email to customer using the detailed template
//             const customerEmailResult = await sendLoanApplicationConfirmationEmail(
//                 personalEmail,
//                 {
//                     customerName: firstName,
//                     applicationNumber: applicationRef,
//                     applicationDate: applicationDate,
//                     loanType: loanType,
//                     loanAmount: requiredLoanAmount,
//                 }
//             );

//             // Also send to business email if provided
//             if (businessEmail && customerEmailResult.success) {
//                 await sendLoanApplicationConfirmationEmail(businessEmail, {
//                     customerName: firstName,
//                     applicationNumber: applicationRef,
//                     applicationDate: applicationDate,
//                     loanType: loanType,
//                     loanAmount: requiredLoanAmount,
//                 });
//             }

//             // Send notification to admin (HTML with links)
//             const adminSubject = `New Loan Application Received – Reference No: ${applicationRef}`;

//             const adminHtml = `
//                 <h2>New Loan Application Received</h2>
//                 <p><strong>Application Reference:</strong> ${applicationRef}</p>
//                 <p><strong>Applicant:</strong> ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}</p>
//                 <p><strong>Email:</strong> ${personalEmail} <br/><strong>Mobile:</strong> ${mobileNumber}</p>
//                 <p><strong>Loan Type:</strong> ${loanType} <br/><strong>Application Status:</strong> Pending Review<br/><strong>Loan Amount:</strong> ₹${requiredLoanAmount}</p>

//                 <h3>Address Details</h3>
//                 <p><strong>Residential:</strong> ${currentResidentialAddress}, ${currentResidentialPincode}<br/>
//                 <strong>Office/Shop:</strong> ${currentOfficeAddress}, ${currentOfficePincode}</p>

//                 <h3>Document Links</h3>
//                 <ul>
//                   <li><a href="${aadhaarFrontUrl}">Aadhaar Front</a></li>
//                   <li><a href="${aadhaarBackUrl}">Aadhaar Back</a></li>
//                   <li><a href="${panCardFrontUrl}">PAN Card Front</a></li>
//                   <li><a href="${residentialBillUrl}">Residential Electricity Bill</a></li>
//                   <li><a href="${shopBillUrl}">Shop/Office Electricity Bill</a></li>
//                 </ul>

//                 <h3>Document Details</h3>
//                 <p><strong>Aadhaar:</strong> ${aadhaarNumber}<br/><strong>PAN:</strong> ${panNumber}</p>

//                 <p><strong>Submitted At:</strong> ${new Date().toUTCString()}</p>
//                 <p>Please review the application in the admin dashboard.</p>
//             `;

//             const adminRecipients = Array.from(
//                 new Set(
//                     [
//                         process.env.SUPPORT_EMAIL,
//                         process.env.DIRECTOR_EMAIL,
//                         process.env.ADMIN_USER,
//                     ].filter(Boolean)
//                 )
//             );

//             await transporter.sendMail({
//                 from: process.env.EMAIL_FROM,
//                 to: adminRecipients,
//                 subject: adminSubject,
//                 text: `New application ${applicationRef} received.`,
//                 html: adminHtml,
//             });
//         } catch (emailError) {
//             console.error("Email sending failed:", emailError);
//             // Don't fail the response if email fails
//         }

//         return NextResponse.json(
//             {
//                 success: true,
//                 message: "Application submitted successfully!",
//                 applicationRef,
//                 email: personalEmail,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error("Apply-now error:", error);
//         return NextResponse.json(
//             { success: false, message: error.message || "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
