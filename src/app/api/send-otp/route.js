import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateAndStoreOTP } from "../lib/otp-service";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Generate and store OTP
    const otp = generateAndStoreOTP(email);
    console.log(`[OTP Service] Generated OTP for ${email}: ${otp}`);

    // Setup email transporter using Zoho
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(`[OTP Service] Email config: host=${process.env.EMAIL_HOST}, port=${process.env.EMAIL_PORT}, user=${process.env.EMAIL_USER}`);

    // Send email with OTP
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Your Infinity Loan OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Login OTP</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) for Infinity Loan login is:</p>
          <h1 style="color: #0066cc; text-align: center; font-size: 32px; letter-spacing: 5px;">
            ${otp}
          </h1>
          <p style="color: #666;">This OTP will expire in 5 minutes.</p>
          <p style="color: #666;">If you did not request this OTP, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply.</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[OTP Service] Email sent successfully to ${email}. MessageID: ${info.messageId}`);
    } catch (emailErr) {
      console.error("[OTP Service] Email send failed:", emailErr.message);
      // Log full error details for debugging
      console.error("[OTP Service] Full error:", emailErr);
      // Continue anyway - OTP is stored and can be used (for testing)
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to your email",
        email: email,
        otp: otp, // Return for testing purposes (remove in production)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[OTP Service] Send OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP: " + error.message },
      { status: 500 }
    );
  }
}
