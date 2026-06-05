import mongoose from "mongoose";

const BorrowerBusinessSchema = new mongoose.Schema(
{
    applicationRef: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

    serviceCategoryKey: { type: String, required: false },
    serviceCategoryTitle: { type: String, required: false },

    // Basic Details
    firstName: { type: String, required: true, alias: "firstname" },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true, alias: "lastname" },

    // Contact
    mobileNumber: { type: String, required: true },
    alternateMobile: { type: String, required: false },
    alternateMobileNumber: { type: String, required: false },
    whatsAppNumber: { type: String, required: false },
    personalEmail: { type: String, required: true, sparse: true },
    businessEmail: { type: String, required: false },

    gender: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    dob: { type: String, required: false },
    age: { type: String, required: false },

    voterId: { type: String, required: false },
    drivingLicense: { type: String, required: false },
    passportNo: { type: String, required: false },

    // Addresses
    currentResidentialAddress: { type: String, required: false },
    residentialState: { type: String, required: false },
    residentialCity: { type: String, required: false },
    currentResidentialPincode: { type: String, required: false },

    currentOfficeOrShopAddress: { type: String, required: false },
    officeOrShopState: { type: String, required: false },
    officeCity: { type: String, required: false },
    currentOfficePincode: { type: String, required: false },

    // Identity
    aadhaarNumber: { type: String, required: true },
    panNumber: { type: String, required: false },

    // Bank Details
    bankName: { type: String, required: false },
    accountHolderName: { type: String, required: false },
    accountNumber: { type: String, required: false },
    ifscCode: { type: String, required: false },
    accountTypes: { type: [String], required: false, default: [] },
    accountType: { type: String, required: false },
    bankAccounts: {
        type: [
            {
                accountType: { type: String },
                bankName: { type: String },
                oneYearBankStatementUrl: { type: String },
                statementPassword: { type: String },
            },
        ],
        required: false,
        default: [],
    },
    branchName: { type: String },
    monthlyAvgBankBalance: { type: String },

    // Business Details
    businessName: { type: String, required: false },
    businessType: { type: String, required: false },
    industryType: { type: String, required: false },
    businessAddress: { type: String, required: false },
    businessPincode: { type: String, required: false },
    yearsInBusiness: { type: String, required: false },
    businessVintageYears: { type: String, required: false },
    natureOfBusiness: { type: String, required: false },
    annualTurnover: { type: String, required: false },

    gstNumber: { type: String },
    businessPan: { type: String },
    otherBusinessLicenseNumber: { type: String },
    tradeLicense: { type: String },
    msmeUdyam: { type: String },
    shopActLicense: { type: String },

    // Loan Details
    requiredLoanAmount: { type: String, required: true },
    loanAmountRequired: { type: String, required: false },
    typeOfLoan: { type: String, required: false },
    cibilIssuesDetails: { type: String, required: false },
    purpose: { type: String, required: false },
    purposeOfLoan: { type: String, required: false },
    preferredTenure: { type: String, required: false },
    preferredLoanTenureMonths: { type: String, required: false },
    existingLoanDetails: { type: String },

    accountType: { type: String, required: false },

    // Co-Applicant
    coApplicantName: { type: String, required: false },
    relationshipWithApplicant: { type: String, required: false },
    coApplicantEmploymentType: { type: String, required: false },
    coApplicantMobileNumber: { type: String, required: false },
    coApplicantEmailId: { type: String, required: false },
    coApplicantAddress: { type: String, required: false },
    coApplicantState: { type: String, required: false },
    coApplicantCity: { type: String, required: false },
    coApplicantPincode: { type: String, required: false },
    // Registration
    businessRegistrationCertificates: { type: String, required: false },
    businessRegistrationCertificatesList: { type: [String], required: false, default: [] },
    registrationCertificates: {
        type: [
            {
                certificateType: { type: String },
                fileUrl: { type: String },
            },
        ],
        required: false,
        default: [],
    },

    // Buying goods
    isBuyingGoods: { type: String, required: false },
    goodsName: { type: String, required: false },
    quotationAmount: { type: String, required: false },

    // Medical history
    medicalHistory: { type: String, required: false },
    medicalHistoryDetails: { type: String, required: false },
    medicalDocumentUrl: { type: String, required: false },

    // Habbit
    habbit: { type: String, required: false },
    habbitDetails: { type: String, required: false },

    // Civil/Criminal case history
    caseHistory: { type: String, required: false },
    caseHistoryDetails: { type: String, required: false },

    // Applicant assets
    applicantAssetType: { type: String, required: false },
    applicantAssetMarketPrice: { type: String, required: false },
    applicantAssetOngoingLoan: { type: String, required: false },
    applicantAssets: {
        type: [
            {
                applicantAssetType: { type: String },
                applicantAssetMarketPrice: { type: String },
                applicantAssetOngoingLoan: { type: String },
            },
        ],
        required: false,
        default: [],
    },

    // CIBIL
    hasCibil: { type: String, required: false },
    cibilScore: { type: String, required: false },

    numberOfExistingLoans: { type: String, required: false },
    numberOfOtherDocuments: { type: String, required: false },

    otherSupportedDocumentsUrls: { type: [String], required: false, default: [] },
    otherSupportedDocumentsNames: { type: [String], required: false, default: [] },

    additionalDocuments: {
        type: [
            {
                documentName: { type: String, required: true },
                documentUrl: { type: String, required: true },
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        required: false,
        default: [],
    },

    paymentReceipts: {
        type: [
            {
                receiptName: { type: String, required: true },
                receiptUrl: { type: String, required: true },
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        required: false,
        default: [],
    },

    // References
    references: {
        type: [
            {
                fullName: { type: String },
                mobile: { type: String },
                relation: { type: String },
                email: { type: String },
                address: { type: String },
                state: { type: String },
                city: { type: String },
                pincode: { type: String },
            },
        ],
        required: false,
        default: [],
    },

    // Documents
    gstCertificateUrl: { type: String, required: false },
    bankStatementUrl: { type: String, required: false },
    itrFileUrl: { type: String, required: false },

    loanAccountStatementUrls: { type: [String], required: false, default: [] },

    yearlyGstReturnType: { type: String, required: false },
    yearlyGstReturnFileUrl: { type: String, required: false },
    yearlyGstReturns: {
        type: [
            {
                gstType: { type: String },
                fileUrl: { type: String },
            },
        ],
        required: false,
        default: [],
    },
    proformaInvoiceFileUrl: { type: String, required: false },
    cibilReportUrl: { type: String, required: false },
    oneYearBankStatementUrl: { type: String, required: false },

    panCardUploadUrl: { type: String, required: false },
    aadhaarCardUploadUrl: { type: String, required: false },
    passportCopyUrl: { type: String, required: false },
    otherBusinessLicenseDocumentsUrl: { type: String, required: false },
    bankStatementLast6MonthsUrl: { type: String, required: false },

    // Admin
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    adminRemarks: { type: String, default: "" },
    reviewedAt: { type: Date },

    documentStatus: {
        type: String,
        enum: ["pending", "uploaded", "verified"],
        default: "pending",
    },
    documentsConfirmedAt: { type: Date },

    // Role
    role: {
        type: String,
        default: "borrower-business",
        enum: ["borrower-business"],
    },
},
{ timestamps: true }
);

const BusinessLoanModel =
    mongoose.models.BorrowerBusinessLoan ||
    mongoose.model("BorrowerBusinessLoan", BorrowerBusinessSchema);

export default BusinessLoanModel;

