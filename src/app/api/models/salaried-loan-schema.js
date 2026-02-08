import mongoose from "mongoose";

const SalariedLoanSchema = new mongoose.Schema({
    applicationRef: { type: String, required: true, unique: true },
    
    // personal details
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], required: true },
    
    // contact details
    mobileNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: false },
    alternateMobile: { type: String, required: false },
    personalEmail: { type: String, required: true, unique: true, sparse: true },
    officialEmail: { type: String, required: false },
    
    // identification
    panNumber: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },
    voterIdNumber: { type: String, required: false },
    drivingLicense: { type: String, required: false },
    passportNumber: { type: String, required: false },
    
    // current residential address
    currentResidentialAddress: { type: String, required: true },
    currentResidentialPincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    residenceType: { type: String, enum: ["Owned", "Rented", "Company Provided"], required: true },
    stayingSinceYears: { type: Number, required: false },
    
    // permanent address
    permanentAddress: { type: String, required: false },
    
    // employment details
    companyName: { type: String, required: true },
    organizationType: { type: String, required: false },
    industry: { type: String, required: false },
    designation: { type: String, required: true },
    employmentType: { type: String, enum: ["Permanent", "Contract", "Temporary"], required: true },
    dateOfJoining: { type: String, required: true },
    totalExperienceYears: { type: Number, required: false },
    
    // office details
    officeLocation: { type: String, required: false },
    officePincode: { type: String, required: false },
    
    // salary details
    monthlyNetSalary: { type: String, required: true },
    salaryCreditMode: { type: String, enum: ["NEFT", "RTGS", "Cheque", "Cash"], required: true },
    salaryAccountBankName: { type: String, required: true },
    
    // existing loans
    numberOfExistingLoans: { type: Number, default: 0 },
    existingLoansData: [{
        totalLoanAmount: { type: String, required: false },
        totalMonthlyEmi: { type: String, required: false },
        loanType: { type: String, required: false },
        bankName: { type: String, required: false },
        emiDelayPast3Months: { type: String, required: false },
    }],
    
    // credit information
    hasCibil: { type: String, enum: ["Yes", "No"], required: false },
    cibilScore: { type: String, required: false },
    
    // loan request details
    requiredLoanAmount: { type: String, required: true },
    preferredTenure: { type: String, required: false },
    purpose: { type: String, required: false },
    
    // co-applicant details
    coApplicantName: { type: String, required: false },
    coApplicantRelation: { type: String, required: false },
    coApplicantEmploymentType: { type: String, required: false },
    
    // document urls (cloudinary)
    panPhotoUrl: { type: String, required: false },
    aadhaarPhotoUrl: { type: String, required: false },
    aadhaarBackPhotoUrl: { type: String, required: false },
    applicantPhotoUrl: { type: String, required: true },
    residencePhotoUrl: { type: String, required: false },
    officeIdPhotoUrl: { type: String, required: false },
    salarySlipsUrl: { type: String, required: false },
    bankStatementUrl: { type: String, required: false },
    cibilReportUrl: { type: String, required: false },
    lastElectricityBillUrl: { type: String, required: false },
    permElectricityBillUrl: { type: String, required: false },
    rentAgreementUrl: { type: String, required: false },
    companyAllotmentLetterUrl: { type: String, required: false },
    
    // loan type and status
    loan_type: { type: String, required: true, default: "salaried" },
    application_status: {
        type: String,
        required: true,
        enum: ["pending", "under_review", "approved", "rejected"],
        default: "pending",
    },
    role: {
        type: String,
        default: "borrower-salaried",
        enum: ["borrower-salaried"],
    },

}, { timestamps: true });

// Index for faster queries
SalariedLoanSchema.index({ personalEmail: 1, mobileNumber: 1 });
SalariedLoanSchema.index({ createdAt: -1 });

const SalariedLoanModel = mongoose.models.BorrowerSalariedLoan ||
    mongoose.model("BorrowerSalariedLoan", SalariedLoanSchema);

export default SalariedLoanModel;
