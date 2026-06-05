import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import CreditCardModel from "../models/credit-card-schema";
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
// Generate 6 Digit Reference
// =============================
const generateRandomApplicationRef = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CC_${ts}_${rnd}`;
};

const toSafeUpperToken = (value, maxLen) => {
  const raw = typeof value === "string" ? value : String(value || "");
  const cleaned = raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!cleaned) return "";
  return typeof maxLen === "number" ? cleaned.slice(0, maxLen) : cleaned;
};

const generatePreferredApplicationRef = (nameRaw, panRaw) => {
  const name4 = toSafeUpperToken(nameRaw, 4);
  const pan = toSafeUpperToken(panRaw);
  if (!name4 || !pan) return null;
  return `CC_${name4}_${pan}`;
};

// =============================
// POST API
// =============================
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const emailGuard = await assertEmailNotUsedForLoanApplication(
      formData.get("personalEmail"),
      "credit_card"
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
      if (!file || typeof file === "string") return null;
      if (typeof file.arrayBuffer !== "function") return null;

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

    const preferredRef = generatePreferredApplicationRef(
      `${formData.get("firstname") || ""} ${formData.get("lastname") || ""}`,
      formData.get("panNumber")
    );

    // =============================
    // Create Document
    // =============================
    const applicationBase = {

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
      documentStatus: "uploaded",
      documentsConfirmedAt: new Date(),
    };

    let saved;
    let applicationRef;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (attempt === 0 && preferredRef) {
        applicationRef = preferredRef;
      } else {
        applicationRef = generateRandomApplicationRef();
      }

      try {
        const newApplication = new CreditCardModel(
          attachUserIdToPayload(
            {
          applicationRef,
          ...applicationBase,
            },
            req
          )
        );
        saved = await newApplication.save();
        break;
      } catch (err) {
        const code = err?.code;
        const dupField = err?.keyPattern ? Object.keys(err.keyPattern)[0] : "";
        const isRefDup = code === 11000 && dupField === "applicationRef";
        if (isRefDup) continue;
        throw err;
      }
    }

    if (!saved) {
      throw new Error("Failed to generate unique applicationRef");
    }

    const applicationDate = new Date().toLocaleDateString("en-IN");

    // Customer confirmation email — must not block successful submission.
    try {
      const confirmationResult = await sendLoanApplicationConfirmationEmail(
        formData.get("personalEmail"),
        {
          customerName: formData.get("firstname"),
          applicationNumber: applicationRef,
          applicationDate,
          loanType: "credit-card",
          originalLoanType: "credit-card",
          loanAmount: formData.get("limitAmount"),
          bankName: formData.get("bankName"),
          limitAmount: formData.get("limitAmount"),
          cardType: formData.get("cardType"),
          cibilIssues: formData.get("cibilIssues"),
        }
      );

      if (!confirmationResult?.success) {
        console.warn("Credit card customer confirmation email failed", {
          applicationRef,
          error: confirmationResult?.error,
        });
      }
    } catch (emailErr) {
      console.warn("Credit card customer confirmation email error", {
        applicationRef,
        error: emailErr?.message || emailErr,
      });
    }

    // Admin notification email — must not block successful submission.
    try {
      await notifyDirectorInternalMail({
        subject: `New Credit Card Application - ${applicationRef}`,
        replyTo: formData.get("personalEmail"),
        html: `
        <h2>New Credit Card Application</h2>
        <p><strong>Application Ref:</strong> ${applicationRef}</p>

        <h3>Applicant Details</h3>
        <p>Name: ${formData.get("firstname")} ${formData.get("lastname")}</p>
        <p>Email: ${formData.get("personalEmail")}</p>
        <p>Official Email: ${formData.get("officialEmail") || "-"}</p>
        <p>Mobile: ${formData.get("mobileNumber")}</p>
        <p>WhatsApp: ${formData.get("whatsappNumber") || "-"}</p>

        <h3>KYC</h3>
        <p>PAN Number: ${formData.get("panNumber") || "-"}</p>
        <p>Aadhaar Number: ${formData.get("aadhaarNumber") || "-"}</p>
        <p>Voter ID: ${formData.get("voterIdNumber") || "-"}</p>
        <p>Driving License: ${formData.get("drivingLicense") || "-"}</p>
        <p>Passport Number: ${formData.get("passportNumber") || "-"}</p>

        <h3>Address</h3>
        <p>Current Residential Address: ${formData.get("currentResidentialAddress") || "-"}</p>
        <p>Current Residential Pincode: ${formData.get("currentResidentialPincode") || "-"}</p>
        <p>Current Office/Shop Address: ${formData.get("currentOfficeAddress") || "-"}</p>
        <p>Current Office/Shop Pincode: ${formData.get("currentOfficePincode") || "-"}</p>
        <p>Residential Status: ${formData.get("residentialStatus") || "-"}</p>
        <p>Years at Current Residential Address: ${formData.get("yearsAtCurrentResidentialAddress") || "-"}</p>

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
        <p>Rent Agreement (Office/Shop): ${saved.uploadRentAgreementOfficeShop || "Not Uploaded"}</p>
      `,
      });
    } catch (emailErr) {
      console.warn("Credit card admin notification email error", {
        applicationRef,
        error: emailErr?.message || emailErr,
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
      {
        success: false,
        message:
          error?.message ||
          "Unable to submit credit card application. Please try again.",
      },
      { status: 500 }
    );
  }
}
