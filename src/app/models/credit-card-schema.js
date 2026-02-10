import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  applicationRef: { type: String, required: true, unique: true },
  
  // Personal Information
  firstname: { type: String, required: true },
  middleName: { type: String },
  lastname: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateMobile: { type: String },
  personalEmail: { type: String, required: true },
  officialEmail: { type: String },
  
  // Identity Information
  aadhaarNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  voterIdNumber: { type: String },
  drivingLicense: { type: String },
  passportNumber: { type: String },
  
  // Address Information
  currentResidentialAddress: { type: String, required: true },
  currentResidentialPincode: { type: String, required: true },
  residentialState: { type: String },
  residentialCity: { type: String },
  currentOfficeAddress: { type: String },
  currentOfficePincode: { type: String },
  residentialStatus: { type: String, default: "Owned" },
  businessPremisesStatus: { type: String, default: "Owned" },
  yearsAtCurrentResidentialAddress: { type: String, default: "1" },
  yearsAtCurrentBusinessAddress: { type: String, default: "1" },
  
  // Credit Card Specific Fields
  bankName: { type: String, required: true }, // Bank Name (Credit Card)
  limitAmount: { type: Number, required: true }, // Limit Amount (Credit Card)
  cardType: { type: String, required: true, enum: ["Domestic", "International"] }, // Card Type
  
  // Additional Fields
  loanTypeText: { type: String }, // Display text for loan type
  cibilScoreKnown: { type: String }, // CIBIL score known
  cibilScore: { type: String }, // CIBIL score value
  consent: { type: Boolean, required: true },
  
  // Document Uploads
  aadhaarFront: { type: String }, // URL from Cloudinary
  aadhaarBack: { type: String }, // URL from Cloudinary
  panCardFront: { type: String }, // URL from Cloudinary
  residentialElectricityBillUrl: { type: String }, // URL from Cloudinary
  shopElectricityBillUrl: { type: String }, // URL from Cloudinary
  
  // Metadata
  loan_type: { type: String, default: "credit-card" },
  application_status: { type: String, default: "pending" },
  role: { type: String, default: "borrower-credit-card" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const CreditCardModel = mongoose.models.CreditCard || mongoose.model('CreditCard', creditCardSchema);

export default CreditCardModel;
