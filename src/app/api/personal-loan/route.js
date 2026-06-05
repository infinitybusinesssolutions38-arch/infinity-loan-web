import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PersonalLoanModel from "../models/personal-loan-schema";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";
import { notifyDirectorInternalMail } from "../lib/director-notification-email";
import { attachUserIdToPayload } from "../lib/user-auth";
import { assertEmailNotUsedForLoanApplication, isDuplicatePersonalEmailError } from "../lib/email-cross-loan-guard";

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

    const emailGuard = await assertEmailNotUsedForLoanApplication(
      formData.get("personalEmail"),
      "personal"
    );
    if (!emailGuard.ok) {
      return NextResponse.json(
        { success: false, message: emailGuard.message, code: emailGuard.code },
        { status: emailGuard.status }
      );
    }

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
            { folder: "loan_applications/personal", resource_type: "auto" },
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
    const total = await PersonalLoanModel.countDocuments();
    const applicationRef = `PER_${String(total + 1).padStart(4, "0")}`;

    // =============================
    // Create Document
    // =============================
    const newApplication = new PersonalLoanModel(
      attachUserIdToPayload(
        {
      applicationRef,

      // Personal Details
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      dob: formData.get("dob"),
      gender: formData.get("gender"),
      maritalStatus: formData.get("maritalStatus"),

      // Contact
      mobileNumber: formData.get("mobileNumber"),
      whatsappNumber: formData.get("whatsappNumber"),
      alternateMobile: formData.get("alternateMobile"),
      personalEmail: formData.get("personalEmail"),
      officialEmail: formData.get("officialEmail"),

      // Identification
      panNumber: formData.get("panNumber"),
      aadhaarNumber: formData.get("aadhaarNumber"),
      voterIdNumber: formData.get("voterIdNumber"),
      drivingLicense: formData.get("drivingLicense"),
      passportNumber: formData.get("passportNumber"),

      // Address
      currentResidentialAddress: formData.get("currentResidentialAddress"),
      currentResidentialPincode: formData.get("currentResidentialPincode"),
      state: formData.get("state"),
      city: formData.get("city"),
      residenceType: formData.get("residenceType"),
      permanentAddress: formData.get("permanentAddress"),

      // Employment
      employmentType: formData.get("employmentType"),
      companyName: formData.get("companyName"),
      monthlyIncome: formData.get("monthlyIncome"),

      // Loan Details
      requiredLoanAmount: formData.get("requiredLoanAmount"),
      preferredTenure: formData.get("preferredTenure"),
      purpose: formData.get("purpose"),

      // Documents
      applicantPhotoUrl: await upload(formData.get("applicantPhoto")),
      panPhotoUrl: await upload(formData.get("panPhoto")),
      aadhaarPhotoUrl: await upload(formData.get("aadhaarPhoto")),
      aadhaarBackPhotoUrl: await upload(formData.get("aadhaarBackPhoto")),
      bankStatementUrl: await upload(formData.get("bankStatement")),

      loan_type: "personal",
      application_status: "pending",
        },
        req
      )
    );

    const saved = await newApplication.save();

    const applicationDate = new Date().toLocaleDateString("en-IN");

    // =============================
    // Client Email
    // =============================
    await sendLoanApplicationConfirmationEmail(
      formData.get("personalEmail"),
      {
        customerName: formData.get("firstName"),
        applicationNumber: applicationRef,
        applicationDate,
        loanType: "Personal Loan",
        loanAmount: formData.get("requiredLoanAmount"),
      }
    );

    // =============================
    // Admin + Director notification
    // =============================
    await notifyDirectorInternalMail({
      subject: `New Personal Loan Application - ${applicationRef}`,
      replyTo: formData.get("personalEmail"),
      html: `
        <h2>New Personal Loan Application</h2>
        <p><strong>Application Ref:</strong> ${applicationRef}</p>

        <h3>Applicant Details</h3>
        <p>Name: ${formData.get("firstName")} ${formData.get("lastName")}</p>
        <p>Email: ${formData.get("personalEmail")}</p>
        <p>Mobile: ${formData.get("mobileNumber")}</p>

        <h3>Loan Details</h3>
        <p>Amount: ${formData.get("requiredLoanAmount")}</p>
        <p>Tenure: ${formData.get("preferredTenure")}</p>
        <p>Purpose: ${formData.get("purpose")}</p>

        <h3>Documents</h3>
        <p>Applicant Photo: ${saved.applicantPhotoUrl || "Not Uploaded"}</p>
        <p>PAN: ${saved.panPhotoUrl || "Not Uploaded"}</p>
        <p>Aadhaar Front: ${saved.aadhaarPhotoUrl || "Not Uploaded"}</p>
        <p>Aadhaar Back: ${saved.aadhaarBackPhotoUrl || "Not Uploaded"}</p>
        <p>Bank Statement: ${saved.bankStatementUrl || "Not Uploaded"}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Personal Loan Application Submitted Successfully",
      applicationRef,
      data: saved,
    });

  } catch (error) {
    console.error("Personal Loan Error:", error);
    if (isDuplicatePersonalEmailError(error)) {
      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_EMAIL",
          message:
            "An application with this email already exists. Check Applied Loans or use a different email to submit again.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
