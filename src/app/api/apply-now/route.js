import { NextResponse } from "next/server";
import connectDB from "../lib/db";

import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import SalariedLoanModel from "../models/salaried-loan-schema";
import CreditCardModel from "../models/credit-card-schema";

import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import { sendLoanApplicationConfirmationEmail } from "../lib/loan-application-email";
import { createGmailTransporter } from "../lib/apply-now-email";
import { resolveDirectorRecipients, notifyDirectorInternalMail } from "../lib/director-notification-email";
import { attachUserIdToPayload } from "../lib/user-auth";
import {
  assertEmailNotUsedForLoanApplication,
  applyNowLoanTypeToGuardType,
} from "../lib/email-cross-loan-guard";
import { assertPanNotUsedInOtherLoanType } from "../lib/pan-cross-loan-guard";

// Handle unhandled promise rejections
if (typeof process !== 'undefined' && process.on) {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to get proper loan type name
const getLoanTypeName = (loanType) => {
  const loanTypeMap = {
    'salaried': 'Salaried Employee Loan',
    'business': 'Business Loan',
    'personal': 'Personal Loan',
    'home': 'Home Loan',
    'car': 'Car Loan',
    'education': 'Education Loan',
    'property': 'Property Loan',
    'professional': 'Professional Loan',
    'doctor': 'Doctor Loan',
    'ca': 'CA Loan',
    'architect': 'Architect Loan'
  };
  return loanTypeMap[loanType] || loanType.charAt(0).toUpperCase() + loanType.slice(1) + ' Loan';
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    await connectDB();

    /* =====================================================
       HELPER → CLOUDINARY
    ===================================================== */
    async function upload(file) {
      if (!file) return null;

      try {
        let buffer;
        
        // Try different methods to get file content
        if (file.arrayBuffer && typeof file.arrayBuffer === 'function') {
          // Method 1: Use arrayBuffer (preferred)
          const arrayBuffer = await file.arrayBuffer();
          buffer = Buffer.from(arrayBuffer);
        } else if (file.text && typeof file.text === 'function') {
          // Method 2: Use text method and convert to buffer (for text files)
          const text = await file.text();
          buffer = Buffer.from(text, 'utf-8');
        } else {
          // Method 3: Skip upload if file can't be processed
          console.warn('Unable to process file, skipping upload:', file.name);
          return null;
        }

        return new Promise((resolve) => {
          const timeout = setTimeout(() => {
            console.warn('Upload timeout for file:', file.name, '- skipping upload');
            resolve(null);
          }, 30000); // 30 second timeout

          cloudinary.uploader
            .upload_stream(
              { 
                folder: "loan_applications", 
                resource_type: "auto",
                chunk_size: 6000000,
                timeout: 30000
              }, 
              (err, result) => {
                clearTimeout(timeout);
                if (err) {
                  console.error('Cloudinary upload error:', err);
                  // Don't reject, just resolve to null to avoid breaking the whole submission
                  resolve(null);
                } else {
                  resolve(result.secure_url);
                }
              }
            )
            .end(buffer);
        });
      } catch (error) {
        console.error('File processing error:', error);
        // Return null to avoid breaking the whole submission
        return null;
      }
    }

    /* =====================================================
       COMMON FIELDS
    ===================================================== */
    const firstName = formData.get("firstName");
    const middleName = formData.get("middleName") || "";
    const lastName = formData.get("lastName");

    const mobileNumber = formData.get("mobileNumber");
    const alternateMobile = formData.get("alternateMobile") || "";

    const personalEmail = formData.get("personalEmail");
    const jobBusiness = formData.get("jobBusiness");

    const aadhaarNumber = formData.get("aadhaarNumber");
    const panNumber = formData.get("panNumber");

    const loanType = (formData.get("loanType") || "").trim().toLowerCase();

    // Generate unique sequential application reference
    const totalPersonal = await PersonalLoanModel.countDocuments({});
    const totalBusiness = await BusinessLoanModel.countDocuments({});
    const totalSalaried = await SalariedLoanModel.countDocuments({});
    const totalCreditCard = await CreditCardModel.countDocuments({});
    const totalApplications = totalPersonal + totalBusiness + totalSalaried + totalCreditCard;
    const nextNumber = totalApplications + 1;
    const applicationRef = `application_${String(nextNumber).padStart(4, "0")}`;

    /* =====================================================
       DEBUG LOGGING
    ===================================================== */
    console.log("=== APPLY-NOW REQUEST DEBUG ===");
    console.log("Loan Type:", loanType);
    console.log("Form Data Entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
    }
    console.log("Extracted PAN Number:", panNumber);
    console.log("Extracted Aadhaar Number:", aadhaarNumber);
    console.log("===============================");

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */
    if (!personalEmail || !mobileNumber) {
      return NextResponse.json(
        { success: false, message: "Email & mobile required" },
        { status: 400 }
      );
    }

    const guardType = applyNowLoanTypeToGuardType(loanType);
    if (guardType) {
      const emailGuard = await assertEmailNotUsedForLoanApplication(
        personalEmail,
        guardType
      );
      if (!emailGuard.ok) {
        return NextResponse.json(
          {
            success: false,
            message: emailGuard.message,
            code: emailGuard.code,
          },
          { status: emailGuard.status }
        );
      }
    }

    if (loanType === "salaried" || loanType === "business") {
      const panGuard = await assertPanNotUsedInOtherLoanType(
        panNumber,
        loanType
      );
      if (!panGuard.ok) {
        return NextResponse.json(
          { success: false, message: panGuard.message, code: panGuard.code },
          { status: panGuard.status }
        );
      }
    }

    // Credit card specific validation
    if (loanType === "credit-card") {
      if (!panNumber) {
        return NextResponse.json(
          { success: false, message: "PAN number is required for credit card applications" },
          { status: 400 }
        );
      }
      if (!aadhaarNumber) {
        return NextResponse.json(
          { success: false, message: "Aadhaar number is required for credit card applications" },
          { status: 400 }
        );
      }
    }

    let newApplication;

    /* =====================================================
       ================= SALARIED =================
    ===================================================== */
    if (loanType === "salaried") {
      // Handle existing loans data with sanction letters
      const existingLoansData = JSON.parse(formData.get("existingLoansData") || "[]");
      const updatedExistingLoansData = await Promise.all(
        existingLoansData.map(async (loan, index) => {
          const sanctionLetterFile = formData.get(`existingLoanSanctionLetter_${index}`);
          const loanSanctionLetterUrl = sanctionLetterFile ? await upload(sanctionLetterFile) : null;
          
          return {
            ...loan,
            loanSanctionLetterUrl,
          };
        })
      );

      newApplication = new SalariedLoanModel(attachUserIdToPayload({
        applicationRef,

        firstName,
        middleName,
        lastName,

        dob: formData.get("dob"),
        gender: formData.get("gender"),
        maritalStatus: formData.get("maritalStatus"),

        mobileNumber,
        whatsappNumber: formData.get("whatsappNumber"),
        alternateMobile,
        personalEmail,
        officialEmail: formData.get("officialEmail"),

        panNumber,
        aadhaarNumber,
        voterIdNumber: formData.get("voterIdNumber"),
        drivingLicense: formData.get("drivingLicense"),
        passportNumber: formData.get("passportNumber"),

        currentResidentialAddress: formData.get("currentResidentialAddress"),
        currentResidentialPincode: formData.get("currentResidentialPincode"),
        state: formData.get("state"),
        city: formData.get("city"),
        residenceType: formData.get("residenceType"),
        stayingSinceDate: formData.get("stayingSinceDate"),
        jobBusiness: formData.get("jobBusiness"),

        permanentAddress: formData.get("permanentAddress"),

        companyName: formData.get("companyName"),
        organizationType: formData.get("organizationType"),
        industry: formData.get("industry"),
        industryOther: formData.get("industryOther"),
        designation: formData.get("designation"),
        employmentType: formData.get("employmentType"),
        dateOfJoining: formData.get("dateOfJoining"),
        totalExperienceYears: formData.get("totalExperienceYears"),

        officeLocation: formData.get("officeLocation"),
        officePincode: formData.get("officePincode"),

        monthlyNetSalary: formData.get("monthlyNetSalary"),
        salaryCreditMode: formData.get("salaryCreditMode"),
        salaryAccountBankName: formData.get("salaryAccountBankName"),

        hasCibil: formData.get("hasCibil"),
        cibilScore: formData.get("cibilScore"),

        // Existing loans data
        numberOfExistingLoans: parseInt(formData.get("numberOfExistingLoans") || "0"),
        existingLoansData: updatedExistingLoansData,

        requiredLoanAmount: formData.get("requiredLoanAmount"),
        preferredTenure: formData.get("preferredTenure"),
        purpose: formData.get("purpose"),
        isBuyingGoods: formData.get("isBuyingGoods"),
        quotationAmount: formData.get("quotationAmount"),

        coApplicantName: formData.get("coApplicantName"),
        coApplicantRelation: formData.get("coApplicantRelation"),
        coApplicantEmploymentType: formData.get("coApplicantEmploymentType"),

        // uploads
        applicantPhotoUrl: await upload(formData.get("applicantPhoto")),
        panPhotoUrl: await upload(formData.get("panPhoto")),
        aadhaarPhotoUrl: await upload(formData.get("aadhaarPhoto")),
        aadhaarBackPhotoUrl: await upload(formData.get("aadhaarBackPhoto")),
        residencePhotoUrl: await upload(formData.get("residencePhoto")),
        officeIdPhotoUrl: await upload(formData.get("officeIdPhoto")),
        salarySlipsUrl: await upload(formData.get("salarySlips")),
        bankStatementUrl: await upload(formData.get("bankStatement")),
        quotationFileUrl: await upload(formData.get("quotationFile")),
        proformaInvoiceFileUrl: await upload(formData.get("proformaInvoiceFile")),

        loan_type: "salaried",
        application_status: "pending",
        role: "borrower-salaried",
      }, req));
    }

    /* =====================================================
       ================= BUSINESS =================
    ===================================================== */
    else if (loanType === "business") {
      newApplication = new BusinessLoanModel(attachUserIdToPayload({
        applicationRef,

        firstname: firstName,
        lastname: lastName,
        mobileNumber,
        alternateMobile,
        personalEmail,

        aadhaarNumber,

        bankName: formData.get("bankName"),
        accountHolderName: formData.get("accountHolderName"),
        accountNumber: formData.get("accountNumber"),
        ifscCode: formData.get("ifscCode"),
        accountType: formData.get("accountType"),
        branchName: formData.get("branchName"),
        monthlyAvgBankBalance: formData.get("monthlyAvgBankBalance"),

        businessName: formData.get("businessName"),
        businessType: formData.get("businessType"),
        businessAddress: formData.get("businessAddress"),
        businessVintageYears: formData.get("businessVintageYears"),
        natureOfBusiness: formData.get("natureOfBusiness"),
        annualTurnover: formData.get("annualTurnover"),

        gstNumber: formData.get("gstNumber"),
        businessPan: formData.get("businessPan"),

        loanAmountRequired: formData.get("loanAmountRequired"),
        purposeOfLoan: formData.get("purposeOfLoan"),
        preferredLoanTenureMonths: formData.get("preferredLoanTenureMonths"),

        role: "borrower-business",
      }, req));
    }

    /* =====================================================
       ================= PERSONAL =================
    ===================================================== */
    else if (loanType === "personal") {
      newApplication = new PersonalLoanModel(attachUserIdToPayload({
        applicationRef,

        firstname: firstName,
        middleName,
        lastname: lastName,
        mobileNumber,
        alternateMobile,
        personalEmail,

        panNumber,
        aadhaarNumber,

        currentResidentialAddress: formData.get("currentResidentialAddress"),
        currentResidentialPincode: formData.get("currentResidentialPincode"),
        currentOfficeAddress: formData.get("currentOfficeAddress"),
        currentOfficePincode: formData.get("currentOfficePincode"),
        residentialStatus: formData.get("residentialStatus"),
        businessPremisesStatus: formData.get("businessPremisesStatus"),
        yearsAtCurrentResidentialAddress: formData.get("yearsAtCurrentResidentialAddress"),
        yearsAtCurrentBusinessAddress: formData.get("yearsAtCurrentBusinessAddress"),

        requiredLoanAmount: formData.get("requiredLoanAmount"),

        aadhaarFront: await upload(formData.get("aadhaarFront")),
        aadhaarBack: await upload(formData.get("aadhaarBack")),
        panCardFront: await upload(formData.get("panCardFront")),
        residentialElectricityBillUrl: await upload(formData.get("residentialBill")),
        shopElectricityBillUrl: await upload(formData.get("shopBill")),

        loan_type: "personal",
        application_status: "pending",
        role: "borrower-personal",
      }, req));
    }

    // Handle multiple file uploads for unified form
    else if (loanType === "unified") {
      const businessCertificatesFiles = [];
      const existingLoanStatementFiles = [];
      
      // Collect business certificates files
      for (let [key, value] of formData.entries()) {
        if (key.startsWith('businessCertificatesFiles_') && value instanceof File) {
          businessCertificatesFiles.push(await upload(value));
        }
      }
      
      // Collect existing loan statement files
      for (let [key, value] of formData.entries()) {
        if (key.startsWith('existingLoanStatementFiles_') && value instanceof File) {
          existingLoanStatementFiles.push(await upload(value));
        }
      }

      newApplication = new PersonalLoanModel(attachUserIdToPayload({
        applicationRef,

        firstname: firstName,
        middleName,
        lastname: lastName,
        mobileNumber: formData.get("mobileNumber"),
        alternateMobile: formData.get("alternateMobile"),
        personalEmail: formData.get("personalEmail"),
        officialEmail: formData.get("officialEmail"),

        panNumber: formData.get("panCardType"),
        aadhaarNumber: formData.get("aadhaarCardType"),

        currentResidentialAddress: formData.get("currentResidentialAddress"),
        currentResidentialPincode: formData.get("residentialPincode"),
        currentOfficeAddress: formData.get("currentOfficeAddress"),
        currentOfficePincode: formData.get("officePincode"),
        residentialStatus: "Owned", // Default for unified form
        businessPremisesStatus: "Owned", // Default for unified form
        yearsAtCurrentResidentialAddress: "1", // Default
        yearsAtCurrentBusinessAddress: "1", // Default

        requiredLoanAmount: formData.get("requiredLoanAmount"),

        // Additional unified form fields
        gender: formData.get("gender"),
        maritalStatus: formData.get("maritalStatus"),
        dob: formData.get("dob"),
        voterIdNumber: formData.get("voterId"),
        drivingLicense: formData.get("drivingLicense"),
        passportNumber: formData.get("passport"),
        residentialState: formData.get("residentialState"),
        residentialCity: formData.get("residentialCity"),
        officeState: formData.get("officeState"),
        officeCity: formData.get("officeCity"),
        loanTypeText: formData.get("loanType"),
        bankStatementType: JSON.parse(formData.get("bankStatementType") || "[]"),
        existingLoansCount: formData.get("existingLoansCount"),
        totalLoanAmount: formData.get("totalLoanAmount"),
        totalMonthlyEmi: formData.get("totalMonthlyEmi"),
        emiDelayPast3Months: formData.get("emiDelayPast3Months"),
        businessCertificates: JSON.parse(formData.get("businessCertificates") || "[]"),
        isBuyingGoods: formData.get("isBuyingGoods"),
        cibilScoreKnown: formData.get("cibilScoreKnown"),
        cibilScore: formData.get("cibilScore"),
        consent: formData.get("consent"),
        
        // Coapplicant fields
        coApplicantName: formData.get("coApplicantName"),
        coApplicantRelation: formData.get("coApplicantRelation"),
        coApplicantEmploymentType: formData.get("coApplicantEmploymentType"),

        // Document uploads
        aadhaarFront: await upload(formData.get("aadhaarFront")),
        aadhaarBack: await upload(formData.get("aadhaarBack")),
        panCardFront: await upload(formData.get("panFront")),
        residentialElectricityBillUrl: await upload(formData.get("residentialBill")),
        shopElectricityBillUrl: await upload(formData.get("shopBill")),
        bankStatementFileUrl: await upload(formData.get("bankStatementFile")),
        incomeTax2023_24FileUrl: await upload(formData.get("incomeTax2023_24File")),
        incomeTax2024_25FileUrl: await upload(formData.get("incomeTax2024_25File")),
        incomeTax2025_26FileUrl: await upload(formData.get("incomeTax2025_26File")),
        proformaInvoiceFileUrl: await upload(formData.get("proformaInvoiceFile")),
        cibilReportFileUrl: await upload(formData.get("cibilReportFile")),
        businessCertificatesFiles,
        existingLoanStatementFiles,

        loan_type: "unified",
        application_status: "pending",
        role: "borrower-unified",
      }, req));
    }

    /* =====================================================
       ================= CREDIT CARD =================
       ===================================================== */
    else if (loanType === "credit-card") {
      newApplication = new CreditCardModel(attachUserIdToPayload({
        applicationRef,

        // Personal Information
        firstname: firstName,
        middleName,
        lastname: lastName,
        mobileNumber,
        alternateMobile,
        personalEmail,
        officialEmail: formData.get("officialEmail"),

        // Identity Information
        aadhaarNumber,
        panNumber,
        voterIdNumber: formData.get("voterId"),
        drivingLicense: formData.get("drivingLicense"),
        passportNumber: formData.get("passport"),

        // Address Information
        currentResidentialAddress: formData.get("currentResidentialAddress"),
        currentResidentialPincode: formData.get("currentResidentialPincode"),
        residentialState: formData.get("residentialState"),
        residentialCity: formData.get("residentialCity"),
        currentOfficeAddress: formData.get("currentOfficeAddress"),
        currentOfficePincode: formData.get("officePincode"),
        residentialStatus: "Owned", // Default for credit card
        businessPremisesStatus: "Owned", // Default for credit card
        yearsAtCurrentResidentialAddress: "1", // Default
        yearsAtCurrentBusinessAddress: "1", // Default

        // Credit Card Specific Fields
        bankName: formData.get("bankName"),
        limitAmount: formData.get("limitAmount"),
        cardType: formData.get("cardType"),

        // Additional fields
        loanTypeText: formData.get("loanType"),
        cibilScoreKnown: formData.get("cibilScoreKnown"),
        cibilScore: formData.get("cibilScore"),
        consent: formData.get("consent"),

        // Document uploads (collected in-form; no Google Form follow-up)
        aadhaarFront: await upload(formData.get("aadhaarFront")),
        aadhaarBack: await upload(formData.get("aadhaarBack")),
        panFront: await upload(formData.get("panFront")),
        residentialBill: await upload(formData.get("residentialBill")),
        shopBill: await upload(formData.get("shopBill")),

        loan_type: "credit-card",
        loanTypeText: "credit-card",
        application_status: "pending",
        documentStatus: "uploaded",
        documentsConfirmedAt: new Date(),
        role: "borrower-credit-card",
      }, req));
    }

    else {
      return NextResponse.json(
        { success: false, message: "Invalid loan type" },
        { status: 400 }
      );
    }

    const saved = await newApplication.save();

    // Calculate display values for all email templates
    const loanAmount =
      saved?.requiredLoanAmount ||
      saved?.loanAmountRequired ||
      formData.get("requiredLoanAmount") ||
      formData.get("loanAmountRequired") ||
      "";

    // Use loanTypeText for unified forms, otherwise use getLoanTypeName
    const displayLoanType = (loanType === "unified" && saved?.loanTypeText) 
      ? saved.loanTypeText 
      : getLoanTypeName(loanType);

    // Email notifications (non-blocking)
    try {
      const companyName = process.env.COMPANY_NAME || "Infinity Loans & Business Solutions";
      const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_FROM || process.env.EMAIL_USER;
      const supportPhone = process.env.SUPPORT_PHONE || "+91 90283 46300";
      const website = process.env.COMPANY_WEBSITE || "www.infinityloanservices.com";

      const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;
      const from = fromAddress ? `${companyName} <${fromAddress}>` : undefined;
      const applicantTo = String(personalEmail || "").trim();
      const extraAdminRecipients = String(process.env.ADMIN_EXTRA_EMAILS || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const normalizeEmailList = (...values) => {
        const raw = values
          .filter(Boolean)
          .flatMap((v) => String(v).split(","))
          .map((v) => v.trim())
          .map((v) => v.replace(/,+$/g, ""))
          .map((v) => v.trim())
          .filter(Boolean);
        return Array.from(new Set(raw));
      };

      const adminRecipients = normalizeEmailList(
        ...resolveDirectorRecipients(),
        process.env.SUPPORT_EMAIL,
        ...extraAdminRecipients
      );

      const adminSubject = `New loan application - ${applicationRef}`;
      const savedObject = typeof saved?.toObject === "function" ? saved.toObject() : saved;
      const adminText =
        `New loan application received.\n\n` +
        `Reference: ${applicationRef}\n` +
        `Name: ${firstName || ""} ${middleName || ""} ${lastName || ""}\n` +
        `Email: ${personalEmail || ""}\n` +
        `Mobile: ${mobileNumber || ""}\n` +
        `Loan Type: ${loanType || ""}\n\n` +
        `Full Details:\n` +
        `${JSON.stringify(savedObject, null, 2)}`;

      const escapeHtml = (v) =>
        String(v ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");

      const formatCurrencyINR = (value) => {
        const raw = String(value ?? "").replace(/[,\s]/g, "");
        const num = Number(raw);
        if (!raw) return "";
        if (Number.isFinite(num)) {
          try {
            return num.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
          } catch {
            return `₹${raw}`;
          }
        }
        return raw;
      };

      const adminFullName =
        String(saved?.firstName || saved?.firstname || firstName || "").trim() +
        (saved?.middleName || middleName ? ` ${String(saved?.middleName || middleName).trim()}` : "") +
        (saved?.lastName || saved?.lastname || lastName ? ` ${String(saved?.lastName || saved?.lastname || lastName).trim()}` : "");

      const docLinks = [
        { label: "Applicant Photo", url: saved?.applicantPhotoUrl },
        { label: "PAN Card", url: saved?.panPhotoUrl || saved?.panCardFront },
        { label: "Aadhaar Card", url: saved?.aadhaarPhotoUrl || saved?.aadhaarFront },
        { label: "Aadhaar Card (Back)", url: saved?.aadhaarBackPhotoUrl || saved?.aadhaarBack },
        { label: "Residence Proof", url: saved?.residencePhotoUrl || saved?.residentialElectricityBillUrl },
        { label: "Office ID", url: saved?.officeIdPhotoUrl },
        { label: "Salary Slips", url: saved?.salarySlipsUrl },
        { label: "Bank Statement", url: saved?.bankStatementUrl },
        { label: "Loan Sanction Letter", url: saved?.loanSanctionLetterUrl },
        { label: "Shop/Office Electricity Bill", url: saved?.shopElectricityBillUrl },
        // Credit Card specific documents
        { label: "Bank Statement File", url: saved?.bankStatementFileUrl },
        { label: "Income Tax 2023-24", url: saved?.incomeTax2023_24FileUrl },
        { label: "Income Tax 2024-25", url: saved?.incomeTax2024_25FileUrl },
        { label: "Income Tax 2025-26", url: saved?.incomeTax2025_26FileUrl },
        { label: "Proforma Invoice", url: saved?.proformaInvoiceFileUrl },
        { label: "CIBIL Report", url: saved?.cibilReportFileUrl },
        // Business certificates (multiple files)
        ...(saved?.businessCertificatesFiles || []).map((url, index) => ({
          label: `Business Certificate ${index + 1}`,
          url: url
        })),
        // Existing loan statements (multiple files)
        ...(saved?.existingLoanStatementFiles || []).map((url, index) => ({
          label: `Existing Loan Statement ${index + 1}`,
          url: url
        }))
      ]
        .filter((d) => typeof d.url === "string" && d.url)
        .map((d) => ({ ...d, url: String(d.url) }));

      const applicationDateStr = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loan Application Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
    .container { max-width: 800px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #007bff; margin: 0 0 10px 0; font-size: 28px; }
    .reference { color: #666; font-size: 14px; }
    .section { margin-bottom: 30px; }
    .section-title { background-color: #f8f9fa; padding: 12px; border-left: 4px solid #007bff; font-weight: bold; color: #333; margin-bottom: 15px; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .detail-item { margin-bottom: 12px; }
    .detail-label { font-weight: bold; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-value { color: #333; font-size: 14px; margin-top: 4px; word-break: break-word; }
    .documents-list { background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px; }
    .documents-list ul { margin: 0; padding-left: 20px; }
    .documents-list li { margin-bottom: 8px; font-size: 14px; }
    .documents-list a { color: #007bff; text-decoration: none; }
    .documents-list a:hover { text-decoration: underline; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 13px; color: #666; }
    .status-badge { display: inline-block; background-color: #fff3cd; color: #856404; padding: 8px 12px; border-radius: 4px; font-weight: bold; margin-bottom: 20px; }
    .highlight { background-color: #fff8dc; padding: 15px; border-radius: 4px; margin-bottom: 20px; border-left: 4px solid #ffc107; }
    @media (max-width: 600px) { .details-grid { grid-template-columns: 1fr; } .container { padding: 20px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Loan Application Received</h1>
      <p class="reference">Reference ID: <strong>${escapeHtml(applicationRef)}</strong></p>
    </div>

    <div class="status-badge">Status: PENDING REVIEW</div>

    <div class="section">
      <div class="section-title">Personal Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Full Name</div><div class="detail-value">${escapeHtml(adminFullName.trim() || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Date of Birth</div><div class="detail-value">${escapeHtml(saved?.dob || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Gender</div><div class="detail-value">${escapeHtml(saved?.gender || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Marital Status</div><div class="detail-value">${escapeHtml(saved?.maritalStatus || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">PAN Number</div><div class="detail-value">${escapeHtml(saved?.panNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Aadhaar Number</div><div class="detail-value">${escapeHtml(saved?.aadhaarNumber || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Contact Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Primary Email</div><div class="detail-value">${escapeHtml(saved?.personalEmail || personalEmail || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Official Email</div><div class="detail-value">${escapeHtml(saved?.officialEmail || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Mobile Number</div><div class="detail-value">${escapeHtml(saved?.mobileNumber || mobileNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">WhatsApp Number</div><div class="detail-value">${escapeHtml(saved?.whatsappNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Alternate Mobile</div><div class="detail-value">${escapeHtml(saved?.alternateMobile || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Residential Address</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Address</div><div class="detail-value">${escapeHtml(saved?.currentResidentialAddress || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Pincode</div><div class="detail-value">${escapeHtml(saved?.currentResidentialPincode || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">City</div><div class="detail-value">${escapeHtml(saved?.residentialCity || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">State</div><div class="detail-value">${escapeHtml(saved?.residentialState || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Residence Type</div><div class="detail-value">${escapeHtml(saved?.residentialStatus || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Employment Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Company Name</div><div class="detail-value">${escapeHtml(saved?.companyName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Organization Type</div><div class="detail-value">${escapeHtml(saved?.organizationType || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Industry</div><div class="detail-value">${escapeHtml(saved?.industry || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Designation</div><div class="detail-value">${escapeHtml(saved?.designation || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Employment Type</div><div class="detail-value">${escapeHtml(saved?.employmentType || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Date of Joining</div><div class="detail-value">${escapeHtml(saved?.dateOfJoining || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Office Location</div><div class="detail-value">${escapeHtml(saved?.officeLocation || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Office Pincode</div><div class="detail-value">${escapeHtml(saved?.officePincode || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Financial Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Monthly Net Salary</div><div class="detail-value">${escapeHtml(formatCurrencyINR(saved?.monthlyNetSalary) || saved?.monthlyNetSalary || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Salary Credit Mode</div><div class="detail-value">${escapeHtml(saved?.salaryCreditMode || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Salary Account Bank</div><div class="detail-value">${escapeHtml(saved?.salaryAccountBankName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Existing Loans</div><div class="detail-value">${escapeHtml(saved?.numberOfExistingLoans ? String(saved.numberOfExistingLoans) : "None")}</div></div>
        <div class="detail-item"><div class="detail-label">CIBIL Score</div><div class="detail-value">${escapeHtml(saved?.cibilScore || "Not Available")}</div></div>
        <div class="detail-item"><div class="detail-label">CIBIL Issues</div><div class="detail-value">${escapeHtml(saved?.cibilIssues || "None")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Loan Details</div>
      <div class="highlight">
        <div class="detail-item"><div class="detail-label">Loan Type</div><div class="detail-value"><strong>${escapeHtml((saved?.loan_type === "unified" && saved?.loanTypeText) ? saved.loanTypeText : String(saved?.loan_type || loanType || "").toUpperCase() || "-")}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Required Loan Amount</div><div class="detail-value"><strong>${escapeHtml(formatCurrencyINR(saved?.requiredLoanAmount || saved?.loanAmountRequired) || (saved?.requiredLoanAmount || saved?.loanAmountRequired || "-"))}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Preferred Tenure</div><div class="detail-value"><strong>${escapeHtml(saved?.preferredTenure || saved?.preferredLoanTenureMonths || "-")}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Loan Purpose</div><div class="detail-value">${escapeHtml(saved?.purpose || saved?.purposeOfLoan || "-")}</div></div>
      </div>
    </div>

    ${(saved?.loan_type === "credit-card" || loanType === "credit-card") ? `
    <div class="section">
      <div class="section-title">Credit Card Details</div>
      <div class="highlight">
        <div class="detail-item"><div class="detail-label">Bank Name (Credit Card)</div><div class="detail-value"><strong>${escapeHtml(saved?.bankName || "-")}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Limit Amount</div><div class="detail-value"><strong>${escapeHtml(formatCurrencyINR(saved?.limitAmount) || saved?.limitAmount || "-")}</strong></div></div>
        <div class="detail-item" style="margin-top: 15px;"><div class="detail-label">Card Type</div><div class="detail-value"><strong>${escapeHtml(saved?.cardType || "-")}</strong></div></div>
      </div>
    </div>
    ` : ""}

    ${(saved?.loan_type === "business" || loanType === "business") ? `
    <div class="section">
      <div class="section-title">Business Details</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Business Name</div><div class="detail-value">${escapeHtml(saved?.businessName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Business Type</div><div class="detail-value">${escapeHtml(saved?.businessType || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Business Address</div><div class="detail-value">${escapeHtml(saved?.businessAddress || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Business Vintage (Years)</div><div class="detail-value">${escapeHtml(saved?.businessVintageYears || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Nature of Business</div><div class="detail-value">${escapeHtml(saved?.natureOfBusiness || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Annual Turnover</div><div class="detail-value">${escapeHtml(formatCurrencyINR(saved?.annualTurnover) || saved?.annualTurnover || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">GST Number</div><div class="detail-value">${escapeHtml(saved?.gstNumber || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Business PAN</div><div class="detail-value">${escapeHtml(saved?.businessPan || "-")}</div></div>
      </div>
    </div>
    ` : ""}

    <div class="section">
      <div class="section-title">Co-Applicant Information</div>
      <div class="details-grid">
        <div class="detail-item"><div class="detail-label">Co-Applicant Name</div><div class="detail-value">${escapeHtml(saved?.coApplicantName || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Relation</div><div class="detail-value">${escapeHtml(saved?.coApplicantRelation || "-")}</div></div>
        <div class="detail-item"><div class="detail-label">Employment Type</div><div class="detail-value">${escapeHtml(saved?.coApplicantEmploymentType || "-")}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Uploaded Documents</div>
      <div class="documents-list">
        <ul>
          ${docLinks.length ? docLinks.map((d) => `<li><strong>${escapeHtml(d.label)}:</strong> <a href="${escapeHtml(d.url)}" target="_blank">View Document</a></li>`).join("") : "<li>No uploaded documents found.</li>"}
        </ul>
      </div>
    </div>

    <div class="footer">
      <p><strong>${escapeHtml(companyName)}</strong></p>
      <p>Email: ${escapeHtml(supportEmail || fromAddress || "")}</p>
      <p>Application Date: ${escapeHtml(applicationDateStr)}</p>
      <p>Application Status: PENDING REVIEW</p>
      <p style="margin-top: 20px; color: #999;">This is an automated email. Please do not reply. For inquiries, contact our support team.</p>
    </div>
  </div>
</body>
</html>`;

      // Applicant confirmation email (HTML template)
      try {
        const applicationDate = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const applicantEmailResult = await sendLoanApplicationConfirmationEmail(applicantTo, {
          customerName: String(firstName || "").trim() || "Customer",
          applicationNumber: applicationRef,
          applicationDate,
          loanType: displayLoanType,
          loanAmount: String(loanAmount || "").trim(),
        });

        if (!applicantEmailResult?.success) {
          console.error("apply-now applicant email template failed:", applicantEmailResult?.error);
        }
        
      } catch (e) {
        console.error("apply-now applicant email template error:", e?.message || e);
      }
      
      // Also send confirmation to official email if provided
      try {
        const officialEmail = String(formData.get("officialEmail") || "").trim();
        if (officialEmail) {
          const officialRes = await sendLoanApplicationConfirmationEmail(officialEmail, {
            customerName: String(firstName || "").trim() || "Customer",
            applicationNumber: applicationRef,
            applicationDate,
            loanType: displayLoanType,
            loanAmount: String(loanAmount || "").trim(),
          });
          if (!officialRes?.success) {
            console.error("apply-now official email failed:", officialRes?.error);
          }
        }
      } catch (e) {
        console.error("apply-now official email error:", e?.message || e);
      }

      // Send director/admin notifications
      try {
        const adminRecipients = resolveDirectorRecipients();

        if (adminRecipients.length > 0) {
          const adminHtmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #00AEEF 0%, #E06410 100%); padding: 30px; border-radius: 10px; color: white; margin-bottom: 30px;">
                <h1 style="margin: 0;">New Loan Application</h1>
                <p style="margin: 10px 0 0 0;">Action Required - Review & Process</p>
              </div>

              <div style="color: #333; line-height: 1.6;">
                <p>A new loan application has been submitted on the Infinity Loans platform. Please review the details below and take appropriate action.</p>

                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #00AEEF;">Application Details:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold; width: 30%;">Application ID:</td>
                      <td style="padding: 10px 0;">${applicationRef}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Applicant Name:</td>
                      <td style="padding: 10px 0;">${firstName} ${middleName} ${lastName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                      <td style="padding: 10px 0;"><a href="mailto:${personalEmail}">${personalEmail}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Mobile:</td>
                      <td style="padding: 10px 0;"><a href="tel:${mobileNumber}">${mobileNumber}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Loan Type:</td>
                      <td style="padding: 10px 0;">${displayLoanType}</td>
                    </tr>
                    ${jobBusiness ? `
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Employment Status:</td>
                      <td style="padding: 10px 0;">${jobBusiness}</td>
                    </tr>
                    ` : ''}
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Loan Amount:</td>
                      <td style="padding: 10px 0;">₹${loanAmount}</td>
                    </tr>
                    ${saved?.cibilScore ? `
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">CIBIL Score:</td>
                      <td style="padding: 10px 0;">${saved.cibilScore}</td>
                    </tr>
                    ` : ''}
                    ${saved?.cibilIssues ? `
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">CIBIL Issues:</td>
                      <td style="padding: 10px 0;">${saved.cibilIssues}</td>
                    </tr>
                    ` : ''}
                    ${saved?.coApplicantName ? `
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Co-Applicant Name:</td>
                      <td style="padding: 10px 0;">${saved.coApplicantName}</td>
                    </tr>
                    ` : ''}
                    ${saved?.coApplicantRelation ? `
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Co-Applicant Relation:</td>
                      <td style="padding: 10px 0;">${saved.coApplicantRelation}</td>
                    </tr>
                    ` : ''}
                    ${saved?.coApplicantEmploymentType ? `
                    <tr style="border-bottom: 1px solid #ddd;">
                      <td style="padding: 10px 0; font-weight: bold;">Co-Applicant Employment:</td>
                      <td style="padding: 10px 0;">${saved.coApplicantEmploymentType}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 10px 0; font-weight: bold;">Submitted:</td>
                      <td style="padding: 10px 0;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                </div>

                <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                  <strong>Next Steps:</strong>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Review application details</li>
                    <li>Verify uploaded documents</li>
                    <li>Conduct credit check if needed</li>
                    <li>Contact applicant for clarification</li>
                    <li>Approve/Reject application in dashboard</li>
                  </ul>
                </div>

                <p>Access the loan management dashboard to process this application.</p>

                <p>
                  Best regards,<br/>
                  <strong>Infinity Loans</strong>
                </p>
              </div>

              <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 12px;">
                <p>© ${new Date().getFullYear()} Infinity Loans & Business Solutions. All rights reserved.</p>
                <p>This is an automated email from your loan application system.</p>
              </div>
            </div>
          `;

          await notifyDirectorInternalMail({
            subject: `New Loan Application - ${applicationRef} - ${firstName} ${lastName}`,
            replyTo: personalEmail,
            html: adminHtmlContent,
            recipients: adminRecipients,
          });
        }
      } catch (gmailError) {
        console.error("Failed to send director admin notifications:", gmailError);
      }
    } catch (emailErr) {
      console.error("apply-now email failed:", emailErr?.message || emailErr);
      // Don't fail the API response if email fails
    }

    return NextResponse.json({
      success: true,
      data: saved,
      message: "Application submitted successfully",
    });
  } catch (err) {
    // Log full error server-side
    console.error("apply-now handler error:", err);

    const isDupEmail =
      err?.code === 11000 &&
      err?.keyPattern &&
      Object.keys(err.keyPattern)[0] === "personalEmail";
    if (isDupEmail) {
      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_EMAIL",
          message:
            "An application with this email already exists. Check Applied Loans or use a different email to submit again.",
        },
        { status: 409 }
      );
    }

    // In development, include stack for easier debugging. In production, only return message.
    const isProd = String(process.env.NODE_ENV || "").toLowerCase() === "production";
    const payload = isProd
      ? { success: false, message: err?.message || "Internal server error" }
      : { success: false, message: err?.message || "Internal server error", stack: err?.stack };

    return NextResponse.json(payload, { status: 500 });
  }
}

