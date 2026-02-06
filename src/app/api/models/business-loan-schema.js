import mongoose from "mongoose";

const BorrowerBusinessSchema = new mongoose.Schema({
    applicationRef: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    panNumber: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },

    bankName: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    accountType: { type: String, required: true },
    branchName: { type: String },
    monthlyAvgBankBalance: { type: String },

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

    loanAmountRequired: { type: String, required: true },
    purposeOfLoan: { type: String, required: true },
    preferredLoanTenureMonths: { type: String, required: true },
    existingLoanDetails: { type: String },

    panCardUploadUrl: { type: String, required: false },
    aadhaarCardUploadUrl: { type: String, required: false },
    passportCopyUrl: { type: String, required: false },
    gstCertificateUrl: { type: String, required: false },
    otherBusinessLicenseDocumentsUrl: { type: String, required: false },
    bankStatementLast6MonthsUrl: { type: String, required: false },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    adminRemarks: { type: String, default: "" },
    reviewedAt: { type: Date },

    // password: { type: String, required: true },
    role: {
        type: String,
        default: "borrower-business",
        enum: [
            "borrower-personal",
            "borrower-business",
            "lender-individual",
            "lender-organization",
            "lender-nri",
            "lender-huf",
        ],
    },
}, { timestamps: true });

const BusinessLoanModel = mongoose.models.BorrowerBusinessLoan ||
    mongoose.model("BorrowerBusinessLoan", BorrowerBusinessSchema);

export default BusinessLoanModel;
