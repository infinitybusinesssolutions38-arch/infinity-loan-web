import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PartnerRegisterModel from "../models/partner-register-schema";
import {
  sendPartnerConfirmationEmail,
  sendPartnerNotificationToAdminEmails,
} from "../lib/partner-email";
import { notifyDirectorOnFormSubmit } from "../lib/director-notification-email";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";
export const maxDuration = 60;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function formText(formData, key) {
  const value = formData.get(key);
  if (value == null || typeof value === "object") return "";
  return String(value).trim();
}

/** Accept 10-digit mobile, or +91 / 0 prefixed Indian numbers. */
function normalizeIndianMobile(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}

function isUploadFile(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.arrayBuffer === "function" &&
    typeof value.size === "number" &&
    value.size > 0
  );
}

async function uploadFile(file) {
  if (!isUploadFile(file)) return "";

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "partner-documents",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result?.secure_url || "");
          }
        }
      )
      .end(buffer);
  });
}

async function uploadPartnerDocuments(formData) {
  const fields = [
    ["aadhaarFront", "aadhaarFrontUrl"],
    ["aadhaarBack", "aadhaarBackUrl"],
    ["panFront", "panFrontUrl"],
    ["bankPassbook", "bankPassbookUrl"],
    ["passportPhoto", "passportPhotoUrl"],
  ];

  const urls = {};
  for (const [inputName, urlField] of fields) {
    const file = formData.get(inputName);
    if (!isUploadFile(file)) continue;
    try {
      urls[urlField] = await uploadFile(file);
    } catch (err) {
      console.error(`Partner document upload failed (${inputName}):`, err?.message || err);
      urls[urlField] = "";
    }
  }
  return urls;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formText(formData, "fullName");
    const mobileNumber = normalizeIndianMobile(formText(formData, "mobileNumber"));
    const altMobileNumber = normalizeIndianMobile(formText(formData, "altMobileNumber"));
    const whatsappNumber = normalizeIndianMobile(formText(formData, "whatsappNumber"));
    const email = formText(formData, "email").toLowerCase();
    const state = formText(formData, "state");
    const city = formText(formData, "city");
    const pincode = formText(formData, "pincode").replace(/\D/g, "");
    const preferredLoan = formText(formData, "preferredLoan");
    const experience = formText(formData, "experience");
    const preferredCategory = formText(formData, "preferredCategory");

    if (
      !fullName ||
      !mobileNumber ||
      !email ||
      !state ||
      !city ||
      !pincode ||
      !preferredLoan
    ) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    if (altMobileNumber && !/^\d{10}$/.test(altMobileNumber)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit alternate mobile number" },
        { status: 400 }
      );
    }

    if (whatsappNumber && !/^\d{10}$/.test(whatsappNumber)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit WhatsApp number" },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 6-digit pincode" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingByEmail = await PartnerRegisterModel.findOne({ email }).lean();
    if (existingByEmail) {
      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_EMAIL",
          message:
            "This email is already registered as a partner. Use a different email or contact support if you need help.",
        },
        { status: 400 }
      );
    }

    const existingByMobile = await PartnerRegisterModel.findOne({ mobileNumber }).lean();
    if (existingByMobile) {
      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_MOBILE",
          message:
            "This mobile number is already registered as a partner. Use a different number or contact support if you need help.",
        },
        { status: 400 }
      );
    }

    const documentUrls = await uploadPartnerDocuments(formData);

    const savedPartner = await PartnerRegisterModel.create({
      fullName,
      mobileNumber,
      altMobileNumber: altMobileNumber || undefined,
      whatsappNumber: whatsappNumber || undefined,
      email,
      state,
      city,
      pincode,
      preferredLoan,
      experience: experience || "Not provided",
      preferredCategory: preferredCategory || "Not specified",
      aadhaarFrontUrl: documentUrls.aadhaarFrontUrl || "",
      aadhaarBackUrl: documentUrls.aadhaarBackUrl || "",
      panFrontUrl: documentUrls.panFrontUrl || "",
      bankPassbookUrl: documentUrls.bankPassbookUrl || "",
      passportPhotoUrl: documentUrls.passportPhotoUrl || "",
      status: "New",
    });

    try {
      await sendPartnerConfirmationEmail(savedPartner);
      await sendPartnerNotificationToAdminEmails(savedPartner);
      await notifyDirectorOnFormSubmit({
        serviceName: "Loan Partner Application",
        referenceId: String(savedPartner._id),
        submittedAt: savedPartner.createdAt,
        fields: [
          { label: "Full Name", value: savedPartner.fullName },
          { label: "Email", value: savedPartner.email },
          { label: "Mobile", value: savedPartner.mobileNumber },
          { label: "City", value: savedPartner.city },
          { label: "State", value: savedPartner.state },
          { label: "Preferred Loan", value: savedPartner.preferredLoan },
        ],
        actionNote:
          "Review this partner registration in Admin → Loan Partner Applications.",
      });
    } catch (emailError) {
      console.error("Partner registration email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Partner registration successful! Our team will contact you shortly.",
      data: {
        id: savedPartner._id,
        fullName: savedPartner.fullName,
        email: savedPartner.email,
        preferredCategory: savedPartner.preferredCategory,
        createdAt: savedPartner.createdAt,
      },
    });
  } catch (error) {
    console.error("Partner registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const partners = await PartnerRegisterModel.find()
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json(
      {
        success: true,
        count: partners.length,
        data: partners,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving partner requests:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
