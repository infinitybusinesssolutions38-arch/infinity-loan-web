import mongoose from "mongoose";

const BorrowerBusinessSchema = new mongoose.Schema(
{
    applicationRef: { type: String, required: true, unique: true },

    // Basic Details
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    // Contact
    mobileNumber: { type: String, required: true },
    alternateMobile: { type: String, required: false },
    personalEmail: { type: String, required: true, unique: true, sparse: true },
    businessEmail: { type: String, required: false },

    // Identity
    aadhaarNumber: { type: String, required: true },

    // Bank Details
    bankName: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    accountType: { type: String, required: true },
    branchName: { type: String },
    monthlyAvgBankBalance: { type: String },

    // Business Details
    businessName: { type: String, required: true },
    businessType: { type: String },
    businessAddress: { type: String, required: true },
    businessVintageYears: { type: String, required: true },
    natureOfBusiness: { type: String, required: true },
    annualTurnover: { type: String, required: true },

    gstNumber: { type: String },
    businessPan: { type: String },
    otherBusinessLicenseNumber: { type: String },
    tradeLicense: { type: String },
    msmeUdyam: { type: String },
    shopActLicense: { type: String },

    // Loan Details
    loanAmountRequired: { type: String, required: true },
    purposeOfLoan: { type: String, required: true },
    preferredLoanTenureMonths: { type: String, required: true },
    existingLoanDetails: { type: String },

    // Documents
    panCardUploadUrl: { type: String, required: false },
    aadhaarCardUploadUrl: { type: String, required: false },
    passportCopyUrl: { type: String, required: false },
    gstCertificateUrl: { type: String, required: false },
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



// import mongoose from "mongoose";

// const BorrowerBusinessSchema = new mongoose.Schema({
//     applicationRef: { type: String, required: true, unique: true },
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     mobileNumber: { type: String, required: true },
//     alternateMobile: { type: String, required: false },
//     personalEmail: { type: String, required: true, unique: true, sparse: true },
//     businessEmail: { type: String, required: false },
    
//     // Identity & Documents
//     aadhaarNumber: { type: String, required: true },

//     bankName: { type: String, required: true },
//     accountHolderName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     ifscCode: { type: String, required: true },
//     accountType: { type: String, required: true },
//     branchName: { type: String },
//     monthlyAvgBankBalance: { type: String },

//     businessName: { type: String, required: true },
//     businessType: { type: String },
//     businessAddress: { type: String, required: true },
//     businessVintageYears: { type: String, required: true },
//     natureOfBusiness: { type: String, required: true },
//     annualTurnover: { type: String, required: true },
//     gstNumber: { type: String },
//     businessPan: { type: String },
//     otherBusinessLicenseNumber: { type: String },
//     tradeLicense: { type: String },
//     msmeUdyam: { type: String },
//     shopActLicense: { type: String },

//     loanAmountRequired: { type: String, required: true },
//     purposeOfLoan: { type: String, required: true },
//     preferredLoanTenureMonths: { type: String, required: true },
//     existingLoanDetails: { type: String },

//     panCardUploadUrl: { type: String, required: false },
//     aadhaarCardUploadUrl: { type: String, required: false },
//     passportCopyUrl: { type: String, required: false },
//     gstCertificateUrl: { type: String, required: false },
//     otherBusinessLicenseDocumentsUrl: { type: String, required: false },
//     bankStatementLast6MonthsUrl: { type: String, required: false },

//     status: {
//         type: String,
//         enum: ["Pending", "Approved", "Rejected"],
//         default: "Pending",
//     },
//     adminRemarks: { type: String, default: "" },
//     reviewedAt: { type: Date },

//     // password: { type: String, required: true },
//     role: {
//         type: String,
//         default: "borrower-business",
//         enum: ["borrower-business"],
//     },
// }, { timestamps: true });

// const BusinessLoanModel = mongoose.models.BorrowerBusinessLoan ||
//     mongoose.model("BorrowerBusinessLoan", BorrowerBusinessSchema);

// export default BusinessLoanModel;
