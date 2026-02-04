import { NextResponse } from "next/server";
import BusinessLoanModel from "../models/business-loan-schema";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
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
        await connectDB();
        const formData = await req.formData();

        // ✅ Extract text fields
        const fullName = formData.get("fullName");
        const dateOfBirth = formData.get("dateOfBirth");
        const gender = formData.get("gender");
        const mobile = formData.get("mobile");
        const email = formData.get("email");
        const residentialAddress = formData.get("residentialAddress");
        const city = formData.get("city");
        const state = formData.get("state");
        const pincode = formData.get("pincode");
        const panNumber = formData.get("panNumber");
        const aadhaarNumber = formData.get("aadhaarNumber");

        const bankName = formData.get("bankName");
        const accountHolderName = formData.get("accountHolderName");
        const accountNumber = formData.get("accountNumber");
        const ifscCode = formData.get("ifscCode");
        const accountType = formData.get("accountType");
        const branchName = formData.get("branchName");
        const monthlyAvgBankBalance = formData.get("monthlyAvgBankBalance");

        const businessName = formData.get("businessName");
        const businessType = formData.get("businessType");
        const businessAddress = formData.get("businessAddress");
        const businessVintageYears = formData.get("businessVintageYears");
        const natureOfBusiness = formData.get("natureOfBusiness");
        const annualTurnover = formData.get("annualTurnover");
        const gstNumber = formData.get("gstNumber");
        const businessPan = formData.get("businessPan");
        const otherBusinessLicenseNumber = formData.get("otherBusinessLicenseNumber");
        const tradeLicense = formData.get("tradeLicense");
        const msmeUdyam = formData.get("msmeUdyam");
        const shopActLicense = formData.get("shopActLicense");

        const loanAmountRequired = formData.get("loanAmountRequired");
        const purposeOfLoan = formData.get("purposeOfLoan");
        const preferredLoanTenureMonths = formData.get("preferredLoanTenureMonths");
        const existingLoanDetails = formData.get("existingLoanDetails");

        // const passwordRaw = formData.get("password");
        // const password = typeof passwordRaw === "string" ? passwordRaw : undefined;

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        // if (!password) {
        //     return NextResponse.json(
        //         { success: false, error: "Password is required" },
        //         { status: 400 }
        //     );
        // }

        // ✅ Extract files
        const panCardFile = formData.get("panCardUpload");
        const aadhaarCardFile = formData.get("aadhaarCardUpload");
        const passportCopyFile = formData.get("passportCopy");
        const gstCertificateFile = formData.get("gstCertificate");
        const otherBusinessLicenseDocumentsFile = formData.get("otherBusinessLicenseDocuments");
        const bankStatementLast6MonthsFile = formData.get("bankStatementLast6Months");

        if (!panCardFile || !aadhaarCardFile) {
            return NextResponse.json({ success: false, error: "PAN Card and Aadhaar Card uploads are required" }, { status: 400 });
        }

        let applicationRef = null;
        for (let i = 0; i < 10; i++) {
            const candidate = String(Math.floor(100000 + Math.random() * 900000));
            // eslint-disable-next-line no-await-in-loop
            const exists = await BusinessLoanModel.exists({ applicationRef: candidate });
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
        const panCardUploadUrl = await uploadToCloudinary(panCardFile);
        const aadhaarCardUploadUrl = await uploadToCloudinary(aadhaarCardFile);
        const passportCopyUrl = await uploadToCloudinary(passportCopyFile);
        const gstCertificateUrl = await uploadToCloudinary(gstCertificateFile);
        const otherBusinessLicenseDocumentsUrl = await uploadToCloudinary(otherBusinessLicenseDocumentsFile);
        const bankStatementLast6MonthsUrl = await uploadToCloudinary(bankStatementLast6MonthsFile);

        // ✅ Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new borrower
        const newBorrower = new BusinessLoanModel({
            applicationRef,
            fullName,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            gender,
        
            mobile,
            email,

            residentialAddress,
            city,
            state,
            pincode,
            panNumber,
            aadhaarNumber,

            bankName,
            accountHolderName,
            accountNumber,
            ifscCode,
            accountType,
            branchName,
            monthlyAvgBankBalance,

            businessName,
            businessType,
            businessAddress,
            businessVintageYears,
            natureOfBusiness,
            annualTurnover,
            gstNumber,
            businessPan,
            otherBusinessLicenseNumber,
            tradeLicense,
            msmeUdyam,
            shopActLicense,

            loanAmountRequired,
            purposeOfLoan,
            preferredLoanTenureMonths,
            existingLoanDetails,

            panCardUploadUrl,
            aadhaarCardUploadUrl,
            passportCopyUrl,
            gstCertificateUrl,
            otherBusinessLicenseDocumentsUrl,
            bankStatementLast6MonthsUrl,

            // password: hashedPassword,
            role: "borrower-business",
        });

        await newBorrower.save();

        const companyName = process.env.COMPANY_NAME || "Infinity Loan Services";
        const supportPhone = process.env.SUPPORT_PHONE || "+91-XXXXXXXXXX";
        const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_FROM || "support@companyname.com";
        const website = process.env.COMPANY_WEBSITE || "www.companyname.com";

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
            `Dear ${fullName || "Customer"},\n\n` +
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

        return NextResponse.json({ success: true, data: newBorrower, applicationRef, message: "Borrower registered successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Business loan error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}