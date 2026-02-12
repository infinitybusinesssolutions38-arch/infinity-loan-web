import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema({
  // Applicant Basic Details
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dob: { type: String },
  gender: { type: String },
  
  // Contact Details
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  
  // Address Details
  residentialAddress: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  
  // Employment Details
  employmentType: { type: String },
  companyName: { type: String },
  monthlyIncome: { type: String },
  workExperience: { type: String },
  
  // Credit Card Details
  cardType: { type: String },
  creditLimitRequired: { type: String },
  purpose: { type: String },
  
  // Document URLs
  aadhaarPhotoUrl: { type: String },
  panPhotoUrl: { type: String },
  incomeProofUrl: { type: String },
  addressProofUrl: { type: String },
  
  // Application Status
  status: { type: String, default: "Pending" },
  adminRemarks: { type: String },
  applicationRef: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

creditCardSchema.index({ createdAt: -1 });
creditCardSchema.index({ status: 1 });
creditCardSchema.index({ email: 1 });

export default mongoose.models.CreditCard || mongoose.model("CreditCard", creditCardSchema);
