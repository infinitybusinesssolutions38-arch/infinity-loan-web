import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import ContactModel from "../models/contact-schema";
import nodemailer from "nodemailer";
import { notifyDirectorOnFormSubmit } from "../lib/director-notification-email";

export async function POST(req) {
    try {
        const body = await req.json();

        // Validate required fields
        const { firstname, lastname, email, subject, mobile, message } = body;

        if (!firstname || !lastname || !email || !subject || !mobile || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate mobile format
        if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
            return NextResponse.json(
                { success: false, message: "Invalid mobile number format" },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Create and save contact record
        const newContact = new ContactModel({
            firstname,
            lastname,
            email,
            subject,
            mobile,
            message,
            status: "New",
        });

        await newContact.save();
        console.log(`[Contact Service] Contact saved: ${email}`);

        // Send email to customer
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT || "465"),
                secure: process.env.EMAIL_SECURE === "true",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const companyName = process.env.COMPANY_NAME || "Infinity Loans & Business Solutions";
            const supportEmail = process.env.SUPPORT_EMAIL || "business@infinityloanservices.com";
            const supportPhone = process.env.SUPPORT_PHONE || "+91 90283 46300";
            const website = process.env.COMPANY_WEBSITE || "www.infinityloanservices.com";

            // Email to customer
            const customerSubject = "We Received Your Message";
            const customerHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #00AEEF;">Thank You for Reaching Out!</h2>
                    <p>Dear ${firstname},</p>
                    <p>Thank you for contacting <strong>${companyName}</strong>. We have received your message and appreciate you taking the time to reach out to us.</p>
                    
                    <h3>Your Message Details:</h3>
                    <ul style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00AEEF;">
                        <li><strong>Subject:</strong> ${subject}</li>
                        <li><strong>Name:</strong> ${firstname} ${lastname}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${mobile}</li>
                    </ul>

                    <p>Our team will review your inquiry and get back to you within <strong>24 hours</strong> with a response.</p>

                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    
                    <h3>Contact Information:</h3>
                    <p>
                        <strong>Email:</strong> ${supportEmail}<br/>
                        <strong>Phone:</strong> ${supportPhone}<br/>
                        <strong>Website:</strong> ${website}
                    </p>

                    <p>Warm regards,<br/><strong>${companyName}</strong></p>
                    <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply to this email.</p>
                </div>
            `;

            await transporter.sendMail({
                from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
                to: email,
                subject: customerSubject,
                html: customerHtml,
            });

            console.log(`[Contact Service] Customer email sent to ${email}`);

            await notifyDirectorOnFormSubmit({
                serviceName: "Contact / Loan Enquiry Form",
                referenceId: newContact._id?.toString?.() || "",
                submittedAt: newContact.createdAt,
                fields: [
                    { label: "Name", value: `${firstname} ${lastname}` },
                    { label: "Email", value: email },
                    { label: "Phone", value: mobile },
                    { label: "Subject", value: subject },
                ],
                message,
                actionNote: "Review in Admin → Loan Enquiries and respond to the customer.",
            });
        } catch (emailError) {
            console.error("[Contact Service] Email sending failed:", emailError.message);
            // Don't fail the response if email fails - contact is already saved
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your message has been sent successfully. We'll get back to you soon!",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("[Contact Service] Error:", error);
        return NextResponse.json(
            { success: false, message: "An error occurred while processing your request" },
            { status: 500 }
        );
    }
}


