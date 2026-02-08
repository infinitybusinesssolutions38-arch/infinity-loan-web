import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import SalariedLoanModel from "../models/salaried-loan-schema";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";

// ✅ Cloudinary Config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Extract common text fields
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName") || "";
        const lastName = formData.get("lastName");
        const mobileNumber = formData.get("mobileNumber");
        const alternateMobile = formData.get("alternateMobile") || "";
        const personalEmail = formData.get("personalEmail");
        const aadhaarNumber = formData.get("aadhaarNumber");
        const panNumber = formData.get("panNumber");
        const voterIdNumber = formData.get("voterIdNumber") || "";
        const drivingLicense = formData.get("drivingLicense") || "";
        const passportNumber = formData.get("passportNumber") || "";
        const requiredLoanAmount = formData.get("requiredLoanAmount");
        const loanType = formData.get("loanType") || "personal";

        // Check if this is a salaried application
        const isSalariedApp = loanType.toLowerCase().includes("salaried");

        // Extract salaried-specific fields if applicable
        let salariedData = {};
        if (isSalariedApp) {
            salariedData = {
                dob: formData.get("dob") || "",
                gender: formData.get("gender") || "",
                maritalStatus: formData.get("maritalStatus") || "",
                whatsappNumber: formData.get("whatsappNumber") || "",
                state: formData.get("state") || "",
                city: formData.get("city") || "",
                permanentAddress: formData.get("permanentAddress") || "",
                currentResidentialAddress: formData.get("currentResidentialAddress") || "",
                currentResidentialPincode: formData.get("currentResidentialPincode") || "",
                residenceType: formData.get("residenceType") || "",
                stayingSinceYears: formData.get("stayingSinceYears") || "",
                companyName: formData.get("companyName") || "",
                organizationType: formData.get("organizationType") || "",
                industry: formData.get("industry") || "",
                designation: formData.get("designation") || "",
                employmentType: formData.get("employmentType") || "",
                dateOfJoining: formData.get("dateOfJoining") || "",
                totalExperienceYears: formData.get("totalExperienceYears") || "",
                officeLocation: formData.get("officeLocation") || "",
                officePincode: formData.get("officePincode") || "",
                officialEmail: formData.get("officialEmail") || "",
                monthlyNetSalary: formData.get("monthlyNetSalary") || "",
                salaryCreditMode: formData.get("salaryCreditMode") || "",
                salaryAccountBankName: formData.get("salaryAccountBankName") || "",
                numberOfExistingLoans: formData.get("numberOfExistingLoans") || "0",
                existingLoansData: JSON.parse(formData.get("existingLoansData") || "[]"),
                hasCibil: formData.get("hasCibil") || "",
                cibilScore: formData.get("cibilScore") || "",
                preferredTenure: formData.get("preferredTenure") || "",
                purpose: formData.get("purpose") || "",
                coApplicantName: formData.get("coApplicantName") || "",
                coApplicantRelation: formData.get("coApplicantRelation") || "",
                coApplicantEmploymentType: formData.get("coApplicantEmploymentType") || "",
            };
        } else {
            // Extract business/personal loan fields
            salariedData = {
                businessEmail: formData.get("businessEmail") || "",
                currentOfficeAddress: formData.get("currentOfficeAddress") || "",
                currentOfficePincode: formData.get("currentOfficePincode") || "",
                currentResidentialAddress: formData.get("currentResidentialAddress") || "",
                currentResidentialPincode: formData.get("currentResidentialPincode") || "",
                residentialStatus: formData.get("residentialStatus") || "",
                businessPremisesStatus: formData.get("businessPremisesStatus") || "",
                yearsAtCurrentResidentialAddress: formData.get("yearsAtCurrentResidentialAddress") || "",
                yearsAtCurrentBusinessAddress: formData.get("yearsAtCurrentBusinessAddress") || "",
            };
        }

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

        // ✅ Upload files based on application type
        let uploadedFiles = {};
        
        if (isSalariedApp) {
            // Salaried-specific documents
            uploadedFiles.panPhotoUrl = await uploadToCloudinary(formData.get("panPhoto"));
            uploadedFiles.aadhaarPhotoUrl = await uploadToCloudinary(formData.get("aadhaarPhoto"));
            uploadedFiles.aadhaarBackPhotoUrl = await uploadToCloudinary(formData.get("aadhaarBackPhoto"));
            uploadedFiles.applicantPhotoUrl = await uploadToCloudinary(formData.get("applicantPhoto"));
            uploadedFiles.residencePhotoUrl = await uploadToCloudinary(formData.get("residencePhoto"));
            uploadedFiles.officeIdPhotoUrl = await uploadToCloudinary(formData.get("officeIdPhoto"));
            uploadedFiles.salarySlipsUrl = await uploadToCloudinary(formData.get("salarySlips"));
            uploadedFiles.bankStatementUrl = await uploadToCloudinary(formData.get("bankStatement"));
            uploadedFiles.cibilReportUrl = await uploadToCloudinary(formData.get("cibilReport"));
            uploadedFiles.lastElectricityBillUrl = await uploadToCloudinary(formData.get("lastElectricityBill"));
            uploadedFiles.permElectricityBillUrl = await uploadToCloudinary(formData.get("permElectricityBill"));
            uploadedFiles.rentAgreementUrl = await uploadToCloudinary(formData.get("rentAgreement"));
            uploadedFiles.companyAllotmentLetterUrl = await uploadToCloudinary(formData.get("companyAllotmentLetter"));

            // Validate required salaried documents
            if (!uploadedFiles.panPhotoUrl || !uploadedFiles.aadhaarPhotoUrl || !uploadedFiles.aadhaarBackPhotoUrl || !uploadedFiles.applicantPhotoUrl) {
                return NextResponse.json(
                    { success: false, message: "Required documents missing: PAN, Aadhaar (front & back), and Applicant photo are mandatory" },
                    { status: 400 }
                );
            }
        } else {
            // Business/Personal loan documents
            uploadedFiles.aadhaarFrontUrl = await uploadToCloudinary(formData.get("aadhaarFront"));
            uploadedFiles.aadhaarBackUrl = await uploadToCloudinary(formData.get("aadhaarBack"));
            uploadedFiles.panCardFrontUrl = await uploadToCloudinary(formData.get("panCardFront"));
            uploadedFiles.residentialBillUrl = await uploadToCloudinary(formData.get("residentialBill"));
            uploadedFiles.shopBillUrl = await uploadToCloudinary(formData.get("shopBill"));

            // Validate required business/personal documents
            if (!uploadedFiles.aadhaarFrontUrl || !uploadedFiles.aadhaarBackUrl || !uploadedFiles.panCardFrontUrl || !uploadedFiles.residentialBillUrl || !uploadedFiles.shopBillUrl) {
                return NextResponse.json(
                    { success: false, message: "Required documents missing or upload failed" },
                    { status: 400 }
                );
            }
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
        const existingSalaried = await SalariedLoanModel.findOne({ personalEmail });
        if (existingPersonal || existingBusiness || existingSalaried) {
            return NextResponse.json(
                { success: false, message: "An application with this email already exists" },
                { status: 409 }
            );
        }

        // ✅ Generate unique sequential application reference
        const totalPersonal = await PersonalLoanModel.countDocuments({});
        const totalBusiness = await BusinessLoanModel.countDocuments({});
        const totalSalaried = await SalariedLoanModel.countDocuments({});
        const totalApplications = totalPersonal + totalBusiness + totalSalaried;
        const nextNumber = totalApplications + 1;
        const applicationRef = `aplic_${String(nextNumber).padStart(5, "0")}`;

        // ✅ Save to appropriate model
        let newApplication = null;

        if (isSalariedApp) {
            // Save as salaried loan
            newApplication = new SalariedLoanModel({
                applicationRef,
                firstName,
                middleName: middleName || "",
                lastName,
                dob: salariedData.dob,
                gender: salariedData.gender,
                maritalStatus: salariedData.maritalStatus,
                mobileNumber,
                whatsappNumber: salariedData.whatsappNumber,
                alternateMobile: alternateMobile || "",
                personalEmail,
                panNumber,
                aadhaarNumber,
                voterIdNumber: voterIdNumber || "",
                drivingLicense: drivingLicense || "",
                passportNumber: passportNumber || "",
                currentResidentialAddress: salariedData.currentResidentialAddress,
                currentResidentialPincode: salariedData.currentResidentialPincode,
                state: salariedData.state,
                city: salariedData.city,
                residenceType: salariedData.residenceType,
                stayingSinceYears: salariedData.stayingSinceYears,
                permanentAddress: salariedData.permanentAddress,
                companyName: salariedData.companyName,
                organizationType: salariedData.organizationType,
                industry: salariedData.industry,
                designation: salariedData.designation,
                employmentType: salariedData.employmentType,
                dateOfJoining: salariedData.dateOfJoining,
                totalExperienceYears: salariedData.totalExperienceYears,
                officeLocation: salariedData.officeLocation,
                officePincode: salariedData.officePincode,
                officialEmail: salariedData.officialEmail,
                monthlyNetSalary: salariedData.monthlyNetSalary,
                salaryCreditMode: salariedData.salaryCreditMode,
                salaryAccountBankName: salariedData.salaryAccountBankName,
                numberOfExistingLoans: salariedData.numberOfExistingLoans,
                existingLoansData: salariedData.existingLoansData,
                hasCibil: salariedData.hasCibil,
                cibilScore: salariedData.cibilScore,
                requiredLoanAmount,
                preferredTenure: salariedData.preferredTenure,
                purpose: salariedData.purpose,
                coApplicantName: salariedData.coApplicantName,
                coApplicantRelation: salariedData.coApplicantRelation,
                coApplicantEmploymentType: salariedData.coApplicantEmploymentType,
                // Document URLs
                panPhotoUrl: uploadedFiles.panPhotoUrl,
                aadhaarPhotoUrl: uploadedFiles.aadhaarPhotoUrl,
                aadhaarBackPhotoUrl: uploadedFiles.aadhaarBackPhotoUrl,
                applicantPhotoUrl: uploadedFiles.applicantPhotoUrl,
                residencePhotoUrl: uploadedFiles.residencePhotoUrl,
                officeIdPhotoUrl: uploadedFiles.officeIdPhotoUrl,
                salarySlipsUrl: uploadedFiles.salarySlipsUrl,
                bankStatementUrl: uploadedFiles.bankStatementUrl,
                cibilReportUrl: uploadedFiles.cibilReportUrl,
                lastElectricityBillUrl: uploadedFiles.lastElectricityBillUrl,
                permElectricityBillUrl: uploadedFiles.permElectricityBillUrl,
                rentAgreementUrl: uploadedFiles.rentAgreementUrl,
                companyAllotmentLetterUrl: uploadedFiles.companyAllotmentLetterUrl,
                loan_type: "salaried",
                application_status: "pending",
                role: "borrower-salaried",
            });
        } else if (loanType.includes("business")) {
            newApplication = new BusinessLoanModel({
                applicationRef,
                firstname: firstName,
                lastname: lastName,
                mobileNumber,
                alternateMobile: alternateMobile || "",
                personalEmail,
                businessEmail: salariedData.businessEmail || "",
                panNumber,
                aadhaarNumber,
                voterIdNumber: voterIdNumber || "",
                drivingLicense: drivingLicense || "",
                passportNumber: passportNumber || "",
                currentResidentialAddress: salariedData.currentResidentialAddress,
                currentResidentialPincode: salariedData.currentResidentialPincode,
                currentOfficeAddress: salariedData.currentOfficeAddress,
                currentOfficePincode: salariedData.currentOfficePincode,
                residentialStatus: salariedData.residentialStatus,
                businessPremisesStatus: salariedData.businessPremisesStatus,
                yearsAtCurrentResidentialAddress: Number(salariedData.yearsAtCurrentResidentialAddress) || 0,
                yearsAtCurrentBusinessAddress: Number(salariedData.yearsAtCurrentBusinessAddress) || 0,
                requiredLoanAmount,
                aadhaarFront: uploadedFiles.aadhaarFrontUrl,
                aadhaarBack: uploadedFiles.aadhaarBackUrl,
                panCardFront: uploadedFiles.panCardFrontUrl,
                residentialElectricityBillUrl: uploadedFiles.residentialBillUrl,
                shopElectricityBillUrl: uploadedFiles.shopBillUrl,
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
                businessEmail: salariedData.businessEmail || "",
                panNumber,
                aadhaarNumber,
                voterIdNumber: voterIdNumber || "",
                drivingLicense: drivingLicense || "",
                passportNumber: passportNumber || "",
                currentResidentialAddress: salariedData.currentResidentialAddress,
                currentResidentialPincode: salariedData.currentResidentialPincode,
                currentOfficeAddress: salariedData.currentOfficeAddress,
                currentOfficePincode: salariedData.currentOfficePincode,
                residentialStatus: salariedData.residentialStatus,
                businessPremisesStatus: salariedData.businessPremisesStatus,
                yearsAtCurrentResidentialAddress: Number(salariedData.yearsAtCurrentResidentialAddress) || 0,
                yearsAtCurrentBusinessAddress: Number(salariedData.yearsAtCurrentBusinessAddress) || 0,
                requiredLoanAmount,
                aadhaarFront: uploadedFiles.aadhaarFrontUrl,
                aadhaarBack: uploadedFiles.aadhaarBackUrl,
                panCardFront: uploadedFiles.panCardFrontUrl,
                residentialElectricityBillUrl: uploadedFiles.residentialBillUrl,
                shopElectricityBillUrl: uploadedFiles.shopBillUrl,
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

            // Format application date
            const applicationDate = new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            // Send confirmation email to customer using the detailed template
            const customerEmailResult = await sendLoanApplicationConfirmationEmail(
                personalEmail,
                {
                    customerName: firstName,
                    applicationNumber: applicationRef,
                    applicationDate: applicationDate,
                    loanType: loanType,
                    loanAmount: requiredLoanAmount,
                }
            );

            // Also send to business email if provided
            if (businessEmail && customerEmailResult.success) {
                await sendLoanApplicationConfirmationEmail(businessEmail, {
                    customerName: firstName,
                    applicationNumber: applicationRef,
                    applicationDate: applicationDate,
                    loanType: loanType,
                    loanAmount: requiredLoanAmount,
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
