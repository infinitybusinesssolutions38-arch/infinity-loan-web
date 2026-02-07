import mongoose from "mongoose";

const BorrowerPersonalSchema = new mongoose.Schema({
    applicationRef: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middleName: { type: String, required: false },
    lastname: { type: String, required: true },
    pan: { type: String, required: true },
    panCard: { type: String, required: false },
    adharCard: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    mobile: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: Date },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    addressProof: { type: String },
    education: { type: String },
    family: { type: String },
    employment: { type: String },
    loanAmount: { type: String },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    adminRemarks: { type: String, default: "" },
    reviewedAt: { type: Date },
    role: {
        type: String,
        default: "borrower-personal",
        enum: ["borrower-personal"],
    },


}, { timestamps: true });

const PersonalLoanModel = mongoose.models.BorrowerPersonalLoan ||
    mongoose.model("BorrowerPersonalLoan", BorrowerPersonalSchema);

export default PersonalLoanModel;
