import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PartnerRegisterModel from "../models/partner-register-schema";
import {
  sendPartnerConfirmationEmail,
  sendPartnerNotificationToAdminEmails,
} from "../lib/partner-email";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload file to Cloudinary
const uploadFile = async (file) => {
  if (!file || file.size === 0) return "";

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "partner-documents",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const fullName = formData.get("fullName");
    const mobileNumber = formData.get("mobileNumber");
    const altMobileNumber = formData.get("altMobileNumber");
    const whatsappNumber = formData.get("whatsappNumber");
    const email = formData.get("email");
    const state = formData.get("state");
    const city = formData.get("city");
    const pincode = formData.get("pincode");
    const preferredLoan = formData.get("preferredLoan");
    const experience = formData.get("experience");
    const preferredCategory = formData.get("preferredCategory");

    // Extract files
    const aadhaarFront = formData.get("aadhaarFront");
    const aadhaarBack = formData.get("aadhaarBack");
    const panFront = formData.get("panFront");
    const bankPassbook = formData.get("bankPassbook");
    const passportPhoto = formData.get("passportPhoto");

    // Validation
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

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    // Validate alt mobile number if provided
    if (altMobileNumber && !/^\d{10}$/.test(altMobileNumber)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit alternate mobile number" },
        { status: 400 }
      );
    }

    // Validate whatsapp number if provided
    if (whatsappNumber && !/^\d{10}$/.test(whatsappNumber)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit WhatsApp number" },
        { status: 400 }
      );
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 6-digit pincode" },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if partner already exists
    const existingPartner = await PartnerRegisterModel.findOne({
      $or: [{ email: email.toLowerCase() }, { mobileNumber }],
    });

    if (existingPartner) {
      return NextResponse.json(
        { success: false, message: "Partner with this email or mobile number already registered" },
        { status: 400 }
      );
    }

    // Upload files to Cloudinary
    let aadhaarFrontUrl = "";
    let aadhaarBackUrl = "";
    let panFrontUrl = "";
    let bankPassbookUrl = "";
    let passportPhotoUrl = "";

    try {
      if (aadhaarFront && aadhaarFront.size > 0) {
        aadhaarFrontUrl = await uploadFile(aadhaarFront);
      }
      if (aadhaarBack && aadhaarBack.size > 0) {
        aadhaarBackUrl = await uploadFile(aadhaarBack);
      }
      if (panFront && panFront.size > 0) {
        panFrontUrl = await uploadFile(panFront);
      }
      if (bankPassbook && bankPassbook.size > 0) {
        bankPassbookUrl = await uploadFile(bankPassbook);
      }
      if (passportPhoto && passportPhoto.size > 0) {
        passportPhotoUrl = await uploadFile(passportPhoto);
      }
    } catch (uploadError) {
      console.error("File upload error:", uploadError);
      return NextResponse.json(
        { success: false, message: "Error uploading documents. Please try again." },
        { status: 500 }
      );
    }

    // Create new partner registration
    const newPartner = new PartnerRegisterModel({
      fullName,
      mobileNumber,
      altMobileNumber,
      whatsappNumber,
      email: email.toLowerCase(),
      state,
      city,
      pincode,
      preferredLoan,
      experience: experience || "Not provided",
      preferredCategory: preferredCategory || "Not specified",
      aadhaarFrontUrl,
      aadhaarBackUrl,
      panFrontUrl,
      bankPassbookUrl,
      passportPhotoUrl,
    });

    // Save to database
    const savedPartner = await newPartner.save();

    // Send emails (non-blocking)
    try {
      await sendPartnerConfirmationEmail(savedPartner);
      await sendPartnerNotificationToAdminEmails(savedPartner);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the response if emails fail
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

// Optional: GET endpoint to retrieve partner requests (for admin dashboard)
export async function GET(req) {
  try {
    // Add authentication check here in production
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
