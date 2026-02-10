import mongoose from "mongoose";

const BorrowerPersonalSchema = new mongoose.Schema(
    {
        applicationRef: { type: String, required: true, unique: true },

        // Basic Details
        firstname: { type: String, required: true },
        middleName: { type: String, required: false },
        lastname: { type: String, required: true },

        // Contact
        mobileNumber: { type: String, required: true },
        whatsappNumber: { type: String, required: false },
        alternateMobile: { type: String, required: false },
        personalEmail: { type: String, required: true, unique: true, sparse: true },
        officialEmail: { type: String, required: false },
        businessEmail: { type: String, required: false },

        // Identity
        aadhaarNumber: { type: String, required: true },
        panNumber: { type: String, required: true },
        voterIdNumber: { type: String, required: false },
        drivingLicense: { type: String, required: false },
        passportNumber: { type: String, required: false },
        
        // Additional Personal Details
        gender: { type: String, required: false },
        maritalStatus: { type: String, required: false },
        dob: { type: String, required: false },

        // Address
        currentResidentialAddress: { type: String, required: true },
        currentResidentialPincode: { type: String, required: true },
        residentialState: { type: String, required: false },
        residentialCity: { type: String, required: false },
        currentOfficeAddress: { type: String, required: true },
        currentOfficePincode: { type: String, required: true },
        officeState: { type: String, required: false },
        officeCity: { type: String, required: false },

        // Property Status
        residentialStatus: {
            type: String,
            enum: ["Owned", "Rented"],
            required: true
        },
        businessPremisesStatus: {
            type: String,
            enum: ["Owned", "Rented"],
            required: true
        },

        // Stay Duration
        yearsAtCurrentResidentialAddress: { type: Number, required: true },
        yearsAtCurrentBusinessAddress: { type: Number, required: true },

        // Loan
        requiredLoanAmount: { type: String, required: true },

        // Documents
        aadhaarFront: { type: String, required: false },
        aadhaarBack: { type: String, required: false },
        panCardFront: { type: String, required: false },
        residentialElectricityBillUrl: { type: String, required: false },
        shopElectricityBillUrl: { type: String, required: false },
        
        // Additional Documents for Unified Form
        bankStatementFileUrl: { type: String, required: false },
        incomeTax2023_24FileUrl: { type: String, required: false },
        incomeTax2024_25FileUrl: { type: String, required: false },
        incomeTax2025_26FileUrl: { type: String, required: false },
        proformaInvoiceFileUrl: { type: String, required: false },
        cibilReportFileUrl: { type: String, required: false },
        businessCertificatesFiles: [{ type: String }],
        existingLoanStatementFiles: [{ type: String }],
        
        // Additional Unified Form Fields
        loanTypeText: { type: String, required: false },
        bankStatementType: [{ type: String }],
        existingLoansCount: { type: String, required: false },
        totalLoanAmount: { type: String, required: false },
        totalMonthlyEmi: { type: String, required: false },
        emiDelayPast3Months: { type: String, required: false },
        businessCertificates: [{ type: String }],
        isBuyingGoods: { type: String, required: false },
        cibilScoreKnown: { type: String, required: false },
        cibilScore: { type: String, required: false },
        cibilIssues: { type: String, required: false },
        consent: { type: String, required: false },

        // Meta
        loan_type: { type: String, required: true },

        application_status: {
            type: String,
            required: true,
            enum: ["pending", "under_review", "approved", "rejected"],
            default: "pending",
        },

        role: {
            type: String,
            default: "borrower-personal",
            enum: ["borrower-personal", "borrower-unified"],
        },
    },
    { timestamps: true }
);

const PersonalLoanModel =
    mongoose.models.BorrowerPersonalLoan ||
    mongoose.model("BorrowerPersonalLoan", BorrowerPersonalSchema);

export default PersonalLoanModel;




// import mongoose from "mongoose";

// const BorrowerPersonalSchema = new mongoose.Schema({
//     applicationRef: { type: String, required: true, unique: true },
//     firstname: { type: String, required: true },
//     middleName: { type: String, required: false },
//     lastname: { type: String, required: true },
//     mobileNumber: { type: String, required: true },
//     alternateMobile: { type: String, required: false },
//     personalEmail: { type: String, required: true, unique: true, sparse: true },
//     businessEmail: { type: String, required: false },
//     aadhaarNumber: { type: String, required: true },
//     panNumber: { type: String, required: true },
//     voterIdNumber: { type: String, required: false },
//     drivingLicense: { type: String, required: false },
//     passportNumber: { type: String, required: false },
//     currentResidentialAddress: { type: String, required: true },
//     currentResidentialPincode: { type: String, required: true },
//     currentOfficeAddress: { type: String, required: true },
//     currentOfficePincode: { type: String, required: true },
//     residentialStatus: { type: String, enum: ["Owned", "Rented"], required: true },
//     businessPremisesStatus: { type: String, enum: ["Owned", "Rented"], required: true },
//     yearsAtCurrentResidentialAddress: { type: Number, required: true },
//     yearsAtCurrentBusinessAddress: { type: Number, required: true },
//     requiredLoanAmount: { type: String, required: true },
//     aadhaarFront: { type: String, required: true },
//     aadhaarBack: { type: String, required: true },
//     panCardFront: { type: String, required: true },
//     residentialElectricityBillUrl: { type: String, required: true },
//     shopElectricityBillUrl: { type: String, required: true },
//     loan_type: { type: String, required: true },
//     application_status: {
//         type: String,
//         required: true,
//         enum: ["pending", "under_review", "approved", "rejected"],
//         default: "pending",
//     },
//     role: {
//         type: String,
//         default: "borrower-personal",
//         enum: ["borrower-personal"],
//     },


// }, { timestamps: true });

// const PersonalLoanModel = mongoose.models.BorrowerPersonalLoan ||
//     mongoose.model("BorrowerPersonalLoan", BorrowerPersonalSchema);

// export default PersonalLoanModel;
