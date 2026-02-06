import mongoose from "mongoose";

const BorrowerPersonalSchema = new mongoose.Schema({
    applicationRef: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middleName: { type: String, required: false },
    lastname: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    alternateMobile: { type: String, required: false },
    personalEmail: { type: String, required: true, unique: true, sparse: true },
    businessEmail: { type: String, required: false },
    
    // Identity & Documents
    aadhaarNumber: { type: String, required: true },
    panNumber: { type: String, required: true },
    voterIdNumber: { type: String, required: false },
    drivingLicense: { type: String, required: false },
    passportNumber: { type: String, required: false },
    
    // Address Details
    currentResidentialAddress: { type: String, required: true },
    currentResidentialPincode: { type: String, required: true },
    currentOfficeAddress: { type: String, required: true },
    currentOfficePincode: { type: String, required: true },
    residentialStatus: { type: String, enum: ["Owned", "Rented"], required: true },
    businessPremisesStatus: { type: String, enum: ["Owned", "Rented"], required: true },
    yearsAtCurrentResidentialAddress: { type: Number, required: true },
    yearsAtCurrentBusinessAddress: { type: Number, required: true },
    
    // Loan Details
    requiredLoanAmount: { type: String, required: true },
    
    // File URLs (from Cloudinary)
    aadhaarFront: { type: String, required: true },
    aadhaarBack: { type: String, required: true },
    panCardFront: { type: String, required: true },
    residentialElectricityBillUrl: { type: String, required: true },
    shopElectricityBillUrl: { type: String, required: true },
    
    // Application metadata
    loan_type: { type: String, required: true },
    application_status: { type: String, required: true, enum: ["pending", "under_review", "approved", "rejected"], default: "pending" },
    
    // User Role
    role: {
        type: String,
        default: "borrower-personal",
        enum: ["borrower-personal"],
    },


}, { timestamps: true });

const PersonalLoanModel = mongoose.models.BorrowerPersonalLoan ||
    mongoose.model("BorrowerPersonalLoan", BorrowerPersonalSchema);

export default PersonalLoanModel;
