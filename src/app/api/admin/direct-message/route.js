import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import nodemailer from "nodemailer";
import { requireAdmin } from "../lib/guard";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  try {
    const body = await req.json();
    const email = String(body.email || "").trim();
    const description = String(body.description || "").trim();

    if (!email || !description) {
      return NextResponse.json(
        { success: false, message: "Email and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    await connectDB();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const fromAddress = process.env.EMAIL_FROM || "business@infinityloanservices.com";
    const subject = "Loan Application Message from Infinity Loan Services";
    const safeDescription = description.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject,
      text: description,
      html: `<div style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:15px;color:#111827;line-height:1.7;">${safeDescription}</div>`,
    });

    return NextResponse.json({ success: true, message: "Message delivered successfully." });
  } catch (error) {
    console.error("[Admin Direct Message] Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to deliver the message. Please try again later." },
      { status: 500 }
    );
  }
}
