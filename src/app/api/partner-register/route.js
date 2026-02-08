import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory storage (for production, use a database)
// In production, replace this with proper database storage
const partnerRequests = [];

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

    // Create partner request object
    const partnerRequest = {
      id: Date.now().toString(),
      fullName,
      mobileNumber,
      email,
      city,
      experience: experience || "Not provided",
      preferredCategory: preferredCategory || "Not specified",
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    // Store in memory (TODO: Replace with database storage)
    partnerRequests.push(partnerRequest);

    // Optional: Send confirmation email to the partner
    // TODO: Implement email sending with proper SMTP configuration
    // Example:
    // await sendPartnerConfirmationEmail(email, fullName);

    // Optional: Send notification to admin
    // TODO: Implement email sending to admin
    // await notifyAdminOfNewPartner(partnerRequest);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for registering! Our team will contact you shortly.",
        partnerId: partnerRequest.id,
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

    return NextResponse.json(
      {
        success: true,
        count: partnerRequests.length,
        data: partnerRequests,
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
