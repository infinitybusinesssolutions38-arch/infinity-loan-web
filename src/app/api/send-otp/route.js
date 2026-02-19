import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateAndStoreOTP } from "../lib/otp-service";
import connectDB from "../lib/db";

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Generate and store OTP
    const otp = await generateAndStoreOTP(email);
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
        <div style="margin:0;padding:0;background:#f6f7fb">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:24px 12px">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse:separate;width:100%;max-width:600px;background:#ffffff;border:1px solid #e8ebf3;border-radius:16px;overflow:hidden">
                  <tr>
                    <td style="padding:18px 20px;background:linear-gradient(135deg,#0b1220,#111827)">
                      <div style="font-family:Arial,sans-serif;font-size:14px;color:#ffffff;letter-spacing:0.6px;font-weight:700;text-transform:uppercase">Infinity Loans & Business Solutions</div>
                      <div style="font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px">Email verification for registration</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:22px 20px 10px 20px">
                      <div style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#111827">Verify your email</div>
                      <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Use the OTP below to complete your registration. This OTP is valid for <strong>5 minutes</strong>.</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 20px">
                      <div style="background:#fff7ed;border:1px solid rgba(249,116,21,0.35);border-radius:14px;padding:16px;text-align:center">
                        <div style="font-family:Arial,sans-serif;font-size:12px;color:#9a3412;text-transform:uppercase;letter-spacing:0.8px;font-weight:700">Your OTP</div>
                        <div style="font-family:Arial,sans-serif;font-size:34px;line-height:1.2;color:#111827;font-weight:800;letter-spacing:6px;margin-top:10px">${otp}</div>
                        <div style="font-family:Arial,sans-serif;font-size:12px;color:#6b7280;margin-top:10px">Do not share this code with anyone.</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:8px 20px 22px 20px">
                      <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280">If you did not request this OTP, you can safely ignore this email.</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #eef2ff">
                      <div style="font-family:Arial,sans-serif;font-size:11px;color:#9ca3af">This is an automated message. Please do not reply.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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

    const isProd = String(process.env.NODE_ENV || "").toLowerCase() === "production";

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to your email",
        email: email,
        ...(isProd ? {} : { otp }),
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
