import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PartnerRegisterModel from "../models/partner-register-schema";
import {
  sendPartnerConfirmationEmail,
  sendPartnerNotificationToAdmin,
} from "../lib/partner-email";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, mobileNumber, email, city, experience, preferredCategory } = body;

    // Validation
    if (!fullName || !mobileNumber || !email || !city) {
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
        { status: 409 }
      );
    }

    // Create new partner registration
    const newPartner = new PartnerRegisterModel({
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.toLowerCase().trim(),
      city: city.trim(),
      experience: experience?.trim() || "Not provided",
      preferredCategory: preferredCategory?.trim() || "Not specified",
      status: "New",
    });

    // Save to database
    const savedPartner = await newPartner.save();

    // Send confirmation email to partner
    const partnerEmailResult = await sendPartnerConfirmationEmail(
      savedPartner.email,
      savedPartner.fullName,
      {
        fullName: savedPartner.fullName,
        email: savedPartner.email,
        mobileNumber: savedPartner.mobileNumber,
        city: savedPartner.city,
        experience: savedPartner.experience,
        preferredCategory: savedPartner.preferredCategory,
        createdAt: savedPartner.createdAt,
      }
    );

    // Send notification email to admin
    const adminEmailResult = await sendPartnerNotificationToAdmin({
      fullName: savedPartner.fullName,
      email: savedPartner.email,
      mobileNumber: savedPartner.mobileNumber,
      city: savedPartner.city,
      experience: savedPartner.experience,
      preferredCategory: savedPartner.preferredCategory,
      createdAt: savedPartner.createdAt,
    });

    // Log email results (don't fail the registration if emails fail)
    if (!partnerEmailResult.success) {
      console.warn("Failed to send partner confirmation email:", partnerEmailResult.error);
    }
    if (!adminEmailResult.success) {
      console.warn("Failed to send admin notification email:", adminEmailResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for registering! Our team will contact you shortly.",
        partnerId: savedPartner._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Partner registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your registration. Please try again later.",
      },
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
