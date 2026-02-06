import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";

// ✅ Cloudinary Config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Extract text fields
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName") || "";
        const lastName = formData.get("lastName");
        const mobileNumber = formData.get("mobileNumber");
        const alternateMobile = formData.get("alternateMobile") || "";
        const businessEmail = formData.get("businessEmail") || "";
        const personalEmail = formData.get("personalEmail");
        const currentResidentialAddress = formData.get("currentResidentialAddress");
        const currentResidentialPincode = formData.get("currentResidentialPincode");
        const currentOfficeAddress = formData.get("currentOfficeAddress");
        const currentOfficePincode = formData.get("currentOfficePincode");
        const requiredLoanAmount = formData.get("requiredLoanAmount");
        const residentialStatus = formData.get("residentialStatus");
        const businessPremisesStatus = formData.get("businessPremisesStatus");
        const yearsAtCurrentResidentialAddress = formData.get("yearsAtCurrentResidentialAddress");
        const yearsAtCurrentBusinessAddress = formData.get("yearsAtCurrentBusinessAddress");
        const aadhaarNumber = formData.get("aadhaarNumber");
        const panNumber = formData.get("panNumber");
        const voterIdNumber = formData.get("voterIdNumber") || "";
        const drivingLicense = formData.get("drivingLicense") || "";
        const passportNumber = formData.get("passportNumber") || "";
        const loanType = formData.get("loanType") || "personal";

        if (!personalEmail || !mobileNumber) {
            return NextResponse.json(
                { success: false, message: "Email and mobile are required" },
                { status: 400 }
            );
        }

        // ✅ Upload helper for Cloudinary
        async function uploadToCloudinary(file) {
            if (!file || typeof file === "string") return null;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    { folder: "infinity_loan_applications" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                uploadStream.end(buffer);
            });
        }

        // ✅ Extract and upload files
        const aadhaarFrontFile = formData.get("aadhaarFront");
        const aadhaarBackFile = formData.get("aadhaarBack");
        const panCardFrontFile = formData.get("panCardFront");
        const residentialBillFile = formData.get("residentialBill");
        const shopBillFile = formData.get("shopBill");

        const aadhaarFrontUrl = await uploadToCloudinary(aadhaarFrontFile);
        const aadhaarBackUrl = await uploadToCloudinary(aadhaarBackFile);
        const panCardFrontUrl = await uploadToCloudinary(panCardFrontFile);
        const residentialBillUrl = await uploadToCloudinary(residentialBillFile);
        const shopBillUrl = await uploadToCloudinary(shopBillFile);

        // ✅ Connect to MongoDB
        await connectDB();

        // ✅ Generate unique sequential application reference
        const totalApplications = await PersonalLoanModel.countDocuments({}) + await BusinessLoanModel.countDocuments({});
        const nextNumber = totalApplications + 1;
        const applicationRef = `aplic_${String(nextNumber).padStart(5, "0")}`;

        // ✅ Save to appropriate model
        let newApplication = null;

        if (loanType.includes("business")) {
            newApplication = new BusinessLoanModel({
                applicationRef,
                firstname: firstName,
                lastname: lastName,
                mobileNumber,
                alternateMobile: alternateMobile || "",
                personalEmail,
                businessEmail: businessEmail || "",
                panNumber,
                aadhaarNumber,
                voterIdNumber: voterIdNumber || "",
                drivingLicense: drivingLicense || "",
                passportNumber: passportNumber || "",
                currentResidentialAddress,
                currentResidentialPincode,
                currentOfficeAddress,
                currentOfficePincode,
                residentialStatus,
                businessPremisesStatus,
                yearsAtCurrentResidentialAddress: Number(yearsAtCurrentResidentialAddress) || 0,
                yearsAtCurrentBusinessAddress: Number(yearsAtCurrentBusinessAddress) || 0,
                requiredLoanAmount,
                aadhaarFront: aadhaarFrontUrl,
                aadhaarBack: aadhaarBackUrl,
                panCardFront: panCardFrontUrl,
                residentialElectricityBillUrl: residentialBillUrl,
                shopElectricityBillUrl: shopBillUrl,
                role: "borrower-business",
            });
        } else {
            newApplication = new PersonalLoanModel({
                applicationRef,
                firstname: firstName,
                middleName: middleName,
                lastname: lastName,
                mobileNumber,
                alternateMobile: alternateMobile || "",
                personalEmail,
                businessEmail: businessEmail || "",
                panNumber,
                aadhaarNumber,
                voterIdNumber: voterIdNumber || "",
                drivingLicense: drivingLicense || "",
                passportNumber: passportNumber || "",
                currentResidentialAddress,
                currentResidentialPincode,
                currentOfficeAddress,
                currentOfficePincode,
                residentialStatus,
                businessPremisesStatus,
                yearsAtCurrentResidentialAddress: Number(yearsAtCurrentResidentialAddress) || 0,
                yearsAtCurrentBusinessAddress: Number(yearsAtCurrentBusinessAddress) || 0,
                requiredLoanAmount,
                aadhaarFront: aadhaarFrontUrl,
                aadhaarBack: aadhaarBackUrl,
                panCardFront: panCardFrontUrl,
                residentialElectricityBillUrl: residentialBillUrl,
                shopElectricityBillUrl: shopBillUrl,
                role: "borrower-personal",
            });
        }

        await newApplication.save();

        // ✅ Send confirmation email
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

            const subject = `Loan Application Under Review – Reference No: ${applicationRef}`;
            const text =
                `Dear ${firstName || "Customer"},\n\n` +
                `Thank you for choosing ${companyName} for your loan requirements. We acknowledge the receipt of your loan application.\n\n` +
                `Application Reference Number: ${applicationRef}\n` +
                `Loan Amount Requested: ₹${requiredLoanAmount}\n\n` +
                `We would like to inform you that your loan application is currently under review, and our verification team is in the process of validating the documents submitted by you.\n\n` +
                `What happens next:\n` +
                `1. Document verification and preliminary assessment\n` +
                `2. Estimated processing time: within 48 working hours\n` +
                `3. Our loan expert will contact you in case any additional information is required\n\n` +
                `Please be assured that we are making every effort to ensure a smooth and timely processing of your application.\n\n` +
                `Thank you for your patience and cooperation. We look forward to assisting you throughout your loan journey.\n\n` +
                `Warm regards,\n` +
                `${companyName}\n` +
                `Customer Support: ${supportPhone}\n` +
                `Email: ${supportEmail}\n` +
                `Website: ${website}\n\n` +
                `Disclaimer: Loan approval is subject to the policies and credit norms of the respective bank/NBFC.`;

            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: personalEmail,
                subject,
                text,
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Don't fail the response if email fails
        }

        return NextResponse.json(
            {
                success: true,
                message: "Application submitted successfully!",
                applicationRef,
                email: personalEmail,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Apply-now error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
