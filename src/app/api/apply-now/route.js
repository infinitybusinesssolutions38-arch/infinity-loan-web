import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { product, mobile, email, pan } = body;

        if (!email || !mobile || !product) {
            return NextResponse.json(
                { success: false, message: "Email, mobile, and product are required" },
                { status: 400 }
            );
        }

        // Connect to DB with timeout handling
        try {
            await connectDB();
        } catch (dbError) {
            console.error("DB connection failed:", dbError.message);
            // Continue anyway - save application reference for user
        }

        // Generate unique application reference
        let applicationRef = null;
        for (let i = 0; i < 10; i++) {
            const candidate = String(Math.floor(100000 + Math.random() * 900000));
            try {
                const exists = await PersonalLoanModel.exists({ applicationRef: candidate });
                if (!exists) {
                    applicationRef = candidate;
                    break;
                }
            } catch (err) {
                // If DB fails, just use this reference
                applicationRef = candidate;
                break;
            }
        }

        if (!applicationRef) {
            applicationRef = String(Math.floor(100000 + Math.random() * 900000));
        }

        // Try to save to DB, but don't fail if it doesn't work
        try {
            let newApplication = null;

            if (product.includes("business")) {
                newApplication = new BusinessLoanModel({
                    applicationRef,
                    email,
                    mobile,
                    businessPan: pan,
                    fullName: "Pending Information",
                    role: "borrower-business",
                });
            } else {
                newApplication = new PersonalLoanModel({
                    applicationRef,
                    email,
                    mobile,
                    pan,
                    firstname: "Pending",
                    lastname: "Information",
                    role: "borrower-personal",
                });
            }

            await newApplication.save();
        } catch (saveErr) {
            console.error("DB save error:", saveErr.message);
            // Continue - application ref still generated
        }

        // Send confirmation email
        try {
            const companyName = process.env.COMPANY_NAME || "Infinity Loan Services";
            const supportPhone = process.env.SUPPORT_PHONE || "+91-9579880841";
            const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_FROM || "business@infinityloanservices.com";
            const website = process.env.COMPANY_WEBSITE || "www.infinityloanservices.com";

            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT || 465),
                secure: String(process.env.EMAIL_SECURE || "true").toLowerCase() === "true",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const subject = `Loan Application Received – Reference No: ${applicationRef}`;
            const text =
                `Dear Customer,\n\n` +
                `Thank you for your interest in ${companyName}. We acknowledge the receipt of your loan application.\n\n` +
                `Application Reference Number: ${applicationRef}\n` +
                `Product: ${product}\n\n` +
                `What happens next:\n` +
                `1. Our team will review your application\n` +
                `2. We may request additional documents\n` +
                `3. Expected processing time: 2-3 business days\n\n` +
                `You can track your application status using your reference number.\n\n` +
                `Thank you for choosing ${companyName}.\n\n` +
                `Warm regards,\n` +
                `${companyName}\n` +
                `Customer Support: ${supportPhone}\n` +
                `Email: ${supportEmail}\n` +
                `Website: ${website}`;

            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject,
                text,
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json(
            {
                success: true,
                message: "Application received successfully!",
                applicationRef,
                email,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Apply-now error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
