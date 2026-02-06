import mongoose from "mongoose";

const BorrowerBusinessSchema = new mongoose.Schema({
    applicationRef: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    alternateMobile: { type: String, required: false },
    personalEmail: { type: String, required: true, unique: true },
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
    aadhaarFront: { type: String, required: false },
    aadhaarBack: { type: String, required: false },
    panCardFront: { type: String, required: false },
    residentialElectricityBillUrl: { type: String, required: false },
    shopElectricityBillUrl: { type: String, required: false },
    
    // User Role
    role: {
        type: String,
        default: "borrower-business",
        enum: ["borrower-business"],
    },
}, { timestamps: true });

const BusinessLoanModel = mongoose.models.BorrowerBusinessLoan ||
    mongoose.model("BorrowerBusinessLoan", BorrowerBusinessSchema);

export default BusinessLoanModel;
