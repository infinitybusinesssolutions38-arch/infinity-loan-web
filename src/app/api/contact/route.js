import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Log contact message (contact submissions stored via email notifications)
        console.log("Contact message received:", { name, email, phone, message });

        // Send email notification (optional)
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT || 465),
                secure: String(process.env.EMAIL_SECURE || "true").toLowerCase() === "true",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_FROM || email,
                to: process.env.SUPPORT_EMAIL || process.env.EMAIL_FROM,
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`,
            });
        } catch (emailError) {
            console.error("Email notification failed:", emailError);
        }

        return NextResponse.json(
            { success: true, message: "Thank you for contacting us. We will get back to you soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

