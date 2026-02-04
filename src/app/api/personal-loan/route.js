import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import connectDB from "../lib/db";
import PersonalLoanModel from "../models/personal-loan-schema";
import nodemailer from "nodemailer";

// ✅ Cloudinary Config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

export async function POST(req) {
    try {
        // ✅ Connect to MongoDB
        await connectDB();

        // ✅ Parse FormData
        const formData = await req.formData();

        // ✅ Extract text fields
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const pan = formData.get("pan");
        const email = formData.get("email");
        const password = formData.get("password");
        const mobile = formData.get("mobile");
        const gender = formData.get("gender");
        const dateOfBirth = formData.get("dateOfBirth");
        const pincode = formData.get("pincode");
        const city = formData.get("city");
        const state = formData.get("state");
        const addressProof = formData.get("addressProof");
        const education = formData.get("education");
        const family = formData.get("family");
        const employment = formData.get("employment");
        const loanAmount = formData.get("loanAmount");

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        // ✅ Extract files
        const panCardFile = formData.get("panCard");
        const adharCardFile = formData.get("adharCard");

        let applicationRef = null;
        for (let i = 0; i < 10; i++) {
            const candidate = String(Math.floor(100000 + Math.random() * 900000));
            // eslint-disable-next-line no-await-in-loop
            const exists = await PersonalLoanModel.exists({ applicationRef: candidate });
            if (!exists) {
                applicationRef = candidate;
                break;
            }
        }

        if (!applicationRef) {
            return NextResponse.json({ success: false, error: "Could not generate application reference" }, { status: 500 });
        }

        // ✅ Upload helper
        async function uploadToCloudinary(file) {
            if (!file || typeof file === "string") return null;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    { folder: "fortune_loans" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                uploadStream.end(buffer);
            });
        }

        // ✅ Upload files to Cloudinary
        const panCardUrl = await uploadToCloudinary(panCardFile);
        const adharCardUrl = await uploadToCloudinary(adharCardFile);

        // ✅ Hash password (optional)
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        // ✅ Create new borrower
        const newBorrower = new PersonalLoanModel({
            applicationRef,
            firstname,
            lastname,
            pan,
            email,
            ...(hashedPassword ? { password: hashedPassword } : {}),
            mobile,
            gender,
            dateOfBirth,
            pincode,
            city,
            state,
            addressProof,
            education,
            family,
            employment,
            loanAmount,
            panCard: panCardUrl,
            adharCard: adharCardUrl,
            role: "borrower-personal",
        });

        // ✅ Save to MongoDB
        await newBorrower.save();

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

        const subject = `Loan Application Under Review – Reference No: ${applicationRef}`;

        const text =
            `Dear ${firstname || "Customer"},\n\n` +
            `Thank you for choosing ${companyName} for your loan requirements. We acknowledge the receipt of your loan application.\n\n` +
            `We would like to inform you that your loan application is currently under review, and our verification team is in the process of validating the documents submitted by you.\n\n` +
            `What happens next:\n\n` +
            `Document verification and preliminary assessment\n` +
            `Estimated processing time: within 48 working hours\n` +
            `Our loan expert will contact you in case any additional information or clarification is required\n\n` +
            `Please be assured that we are making every effort to ensure a smooth and timely processing of your application.\n\n` +
            `Thank you for your patience and cooperation. We look forward to assisting you throughout your loan journey.\n\n` +
            `Warm regards,\n` +
            `${companyName}\n` +
            `Customer Support: ${supportPhone}\n` +
            `Email: ${supportEmail}\n\n` +
            `Website: ${website}\n\n` +
            `Disclaimer: Loan approval is subject to the policies and credit norms of the respective bank/NBFC.`;

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject,
            text,
        });

        return NextResponse.json(
            { success: true, message: "Borrower registered successfully!", applicationRef },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


