import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import CreditCardModel from "../models/credit-card-schema";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";
import { createGmailTransporter } from "../lib/apply-now-email";

// =============================
// Cloudinary Config
// =============================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =============================
// Generate 6 Digit Reference
// =============================
const generateApplicationRef = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// =============================
// POST API
// =============================
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

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
            { folder: "loan_applications/credit-card", resource_type: "auto" },
            (err, result) => {
              if (err) return resolve(null);
              resolve(result.secure_url);
            }
          )
          .end(buffer);
      });
    }

    const applicationRef = generateApplicationRef();

    // =============================
    // Create Document
    // =============================
    const newApplication = new CreditCardModel({
      applicationRef,

      // Personal Info
      firstname: formData.get("firstname"),
      middleName: formData.get("middleName"),
      lastname: formData.get("lastname"),
      mobileNumber: formData.get("mobileNumber"),
      alternateMobile: formData.get("alternateMobile"),
      whatsappNumber: formData.get("whatsappNumber"),
      personalEmail: formData.get("personalEmail"),
      officialEmail: formData.get("officialEmail"),

      // Identity
      aadhaarNumber: formData.get("aadhaarNumber"),
      panNumber: formData.get("panNumber"),
      voterIdNumber: formData.get("voterIdNumber"),
      drivingLicense: formData.get("drivingLicense"),
      passportNumber: formData.get("passportNumber"),

      // Address
      currentResidentialAddress: formData.get("currentResidentialAddress"),
      currentResidentialPincode: formData.get("currentResidentialPincode"),
      residentialState: formData.get("residentialState"),
      residentialCity: formData.get("residentialCity"),
      currentOfficeAddress: formData.get("currentOfficeAddress"),
      currentOfficePincode: formData.get("currentOfficePincode"),
      residentialStatus: formData.get("residentialStatus"),
      businessPremisesStatus: formData.get("businessPremisesStatus"),
      yearsAtCurrentResidentialAddress: formData.get("yearsAtCurrentResidentialAddress"),
      yearsAtCurrentBusinessAddress: formData.get("yearsAtCurrentBusinessAddress"),

      // Card Details
      bankName: formData.get("bankName"),
      limitAmount: formData.get("limitAmount"),
      cardType: formData.get("cardType"),

      jobBusiness: formData.get("jobBusiness"),

      // CIBIL
      cibilScoreKnown: formData.get("cibilScoreKnown"),
      cibilScore: formData.get("cibilScore"),
      cibilIssues: formData.get("cibilIssues"),

      consent: formData.get("consent") === "true",

      // Documents
      aadhaarFront: await upload(formData.get("aadhaarFront")),
      aadhaarBack: await upload(formData.get("aadhaarBack")),
      panFront: await upload(formData.get("panFront")),
      residentialBill: await upload(formData.get("residentialBill")),
      shopBill: await upload(formData.get("shopBill")),

      uploadRentAgreementOfficeShop: await upload(
        formData.get("uploadRentAgreementOfficeShop")
      ),

      loanTypeText: "credit-card",
      status: "pending",
    });

    const saved = await newApplication.save();

    const applicationDate = new Date().toLocaleDateString("en-IN");

    // =============================
    // Client Email (Simple)
    // =============================
    await sendLoanApplicationConfirmationEmail(
      formData.get("personalEmail"),
      {
        customerName: formData.get("firstname"),
        applicationNumber: applicationRef,
        applicationDate,
        loanType: "Credit Card",
        loanAmount: formData.get("limitAmount"),
      }
    );

    // =============================
    // Admin + Director Email via Gmail SMTP
    // =============================
    const gmailTransporter = createGmailTransporter();
    const internalRecipients = [process.env.ADMIN_EMAIL, process.env.DIRECTOR_EMAIL]
      .filter(Boolean)
      .join(",");

    if (internalRecipients) {
      await gmailTransporter.sendMail({
        from: process.env.EMAIL_HOST_USER || process.env.EMAIL_SMTP_USER,
        to: internalRecipients,
        subject: `New Credit Card Application - ${applicationRef}`,
        html: `
        <h2>New Credit Card Application</h2>
        <p><strong>Application Ref:</strong> ${applicationRef}</p>

        <h3>Applicant Details</h3>
        <p>Name: ${formData.get("firstname")} ${formData.get("lastname")}</p>
        <p>Email: ${formData.get("personalEmail")}</p>
        <p>Mobile: ${formData.get("mobileNumber")}</p>

        <h3>Card Details</h3>
        <p>Bank Name: ${formData.get("bankName")}</p>
        <p>Card Type: ${formData.get("cardType")}</p>
        <p>Limit: ${formData.get("limitAmount")}</p>

        <h3>Documents</h3>
        <p>Aadhaar Front: ${saved.aadhaarFront || "Not Uploaded"}</p>
        <p>Aadhaar Back: ${saved.aadhaarBack || "Not Uploaded"}</p>
        <p>PAN: ${saved.panFront || "Not Uploaded"}</p>
        <p>Residential Bill: ${saved.residentialBill || "Not Uploaded"}</p>
        <p>Shop Bill: ${saved.shopBill || "Not Uploaded"}</p>
      `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Credit Card Application Submitted Successfully",
      applicationRef,
      data: saved,
    });

  } catch (error) {
    console.error("Credit Card Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
