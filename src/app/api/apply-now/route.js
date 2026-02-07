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
                { success: false, message: "Personal email and mobile are required" },
                { status: 400 }
            );
        }

        // Validate personalEmail format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(personalEmail)) {
            return NextResponse.json(
                { success: false, message: "Invalid personal email format" },
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

        // Validate required uploaded documents server-side
        if (!aadhaarFrontUrl || !aadhaarBackUrl || !panCardFrontUrl || !residentialBillUrl || !shopBillUrl) {
            return NextResponse.json(
                { success: false, message: "Required documents missing or upload failed" },
                { status: 400 }
            );
        }

        // ✅ Connect to MongoDB
        await connectDB();

        // ✅ Clean up old indexes if they exist (migration from old schema)
        try {
            const personalCollection = PersonalLoanModel.collection;
            const businessCollection = BusinessLoanModel.collection;
            
            // Drop old email_1 index if it exists
            try {
                await personalCollection.dropIndex("email_1");
            } catch (err) {
                // Index doesn't exist, which is fine
            }
            try {
                await businessCollection.dropIndex("email_1");
            } catch (err) {
                // Index doesn't exist, which is fine
            }
        } catch (indexError) {
            console.warn("Index cleanup warning (non-fatal):", indexError.message);
        }

        // ✅ Check for existing email to prevent duplicate submissions
        const existingPersonal = await PersonalLoanModel.findOne({ personalEmail });
        const existingBusiness = await BusinessLoanModel.findOne({ personalEmail });
        if (existingPersonal || existingBusiness) {
            return NextResponse.json(
                { success: false, message: "An application with this email already exists" },
                { status: 409 }
            );
        }

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
                loan_type: loanType,
                application_status: "pending",
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
                loan_type: loanType,
                application_status: "pending",
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

            const customerHtml = `
                <p>Dear ${firstName || "Customer"},</p>
                <p>Thank you for choosing <strong>${companyName}</strong> for your loan requirements. We acknowledge receipt of your loan application.</p>
                <p><strong>Application Reference Number:</strong> ${applicationRef}<br/>
                <strong>Loan Type:</strong> ${loanType}<br/>
                <strong>Loan Amount Requested:</strong> ₹${requiredLoanAmount}<br/>
                <strong>Application Status:</strong> Pending Review</p>
                <p>Your application is under review and our verification team is validating the documents submitted by you.</p>
                <p><strong>Within 48 hours, we will contact you after reviewing your application.</strong></p>
                <h4>What happens next</h4>
                <ol>
                  <li>Document verification and preliminary assessment</li>
                  <li>Estimated processing time: within 48 working hours</li>
                  <li>Our loan expert will contact you if additional information is required</li>
                </ol>
                <p>Warm regards,<br/>${companyName}<br/>Customer Support: ${supportPhone}<br/>Email: ${supportEmail}<br/>Website: ${website}</p>
                <p style="font-size:12px;color:#888">Disclaimer: Loan approval is subject to the policies and credit norms of the respective bank/NBFC.</p>
            `;

            // Send to personal email (HTML)
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: personalEmail,
                subject,
                text: `Your application ${applicationRef} has been received.`,
                html: customerHtml,
            });

            // Send to business email if provided (HTML)
            if (businessEmail) {
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: businessEmail,
                    subject,
                    text: `Your application ${applicationRef} has been received.`,
                    html: customerHtml,
                });
            }

            // Send notification to admin (HTML with links)
            const adminSubject = `New Loan Application Received – Reference No: ${applicationRef}`;

            const adminHtml = `
                <h2>New Loan Application Received</h2>
                <p><strong>Application Reference:</strong> ${applicationRef}</p>
                <p><strong>Applicant:</strong> ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}</p>
                <p><strong>Email:</strong> ${personalEmail} <br/><strong>Mobile:</strong> ${mobileNumber}</p>
                <p><strong>Loan Type:</strong> ${loanType} <br/><strong>Application Status:</strong> Pending Review<br/><strong>Loan Amount:</strong> ₹${requiredLoanAmount}</p>

                <h3>Address Details</h3>
                <p><strong>Residential:</strong> ${currentResidentialAddress}, ${currentResidentialPincode}<br/>
                <strong>Office/Shop:</strong> ${currentOfficeAddress}, ${currentOfficePincode}</p>

                <h3>Document Links</h3>
                <ul>
                  <li><a href="${aadhaarFrontUrl}">Aadhaar Front</a></li>
                  <li><a href="${aadhaarBackUrl}">Aadhaar Back</a></li>
                  <li><a href="${panCardFrontUrl}">PAN Card Front</a></li>
                  <li><a href="${residentialBillUrl}">Residential Electricity Bill</a></li>
                  <li><a href="${shopBillUrl}">Shop/Office Electricity Bill</a></li>
                </ul>

                <h3>Document Details</h3>
                <p><strong>Aadhaar:</strong> ${aadhaarNumber}<br/><strong>PAN:</strong> ${panNumber}</p>

                <p><strong>Submitted At:</strong> ${new Date().toUTCString()}</p>
                <p>Please review the application in the admin dashboard.</p>
            `;

            const adminRecipients = Array.from(
                new Set(
                    [
                        process.env.SUPPORT_EMAIL,
                        process.env.DIRECTOR_EMAIL,
                        process.env.ADMIN_USER,
                    ].filter(Boolean)
                )
            );

            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: adminRecipients,
                subject: adminSubject,
                text: `New application ${applicationRef} received.`,
                html: adminHtml,
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
