import mongoose from "mongoose";

const BorrowerBusinessSchema = new mongoose.Schema(
{
    applicationRef: { type: String, required: true, unique: true },

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
    personalEmail: { type: String, required: true, unique: true, sparse: true },
    businessEmail: { type: String, required: false },

    gender: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    dob: { type: String, required: false },

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
    coApplicantPanPhotoUrl: { type: String, required: false },
    coApplicantAadhaarPhotoUrl: { type: String, required: false },
    coApplicantAadhaarBackPhotoUrl: { type: String, required: false },

    // Address proof (text)
    latestHomeElectricityBill: { type: String, required: false },
    latestOfficeShopElectricityBill: { type: String, required: false },
    latestHomeElectricityBillUrl: { type: String, required: false },
    latestOfficeShopElectricityBillUrl: { type: String, required: false },

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
    quotationAmount: { type: String, required: false },

    // CIBIL
    hasCibil: { type: String, required: false },
    cibilScore: { type: String, required: false },

    numberOfExistingLoans: { type: String, required: false },
    numberOfOtherDocuments: { type: String, required: false },

    otherSupportedDocumentsUrls: { type: [String], required: false, default: [] },

    // Documents
    applicantPhotoUrl: { type: String, required: false },
    panPhotoUrl: { type: String, required: false },
    aadhaarPhotoUrl: { type: String, required: false },
    aadhaarBackPhotoUrl: { type: String, required: false },
    gstCertificateUrl: { type: String, required: false },
    bankStatementUrl: { type: String, required: false },
    itrFileUrl: { type: String, required: false },

    assessmentYear2324Url: { type: String, required: false },
    assessmentYear2425Url: { type: String, required: false },
    assessmentYear2526Url: { type: String, required: false },
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

