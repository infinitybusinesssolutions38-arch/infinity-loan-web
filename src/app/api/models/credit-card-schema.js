import mongoose from "mongoose";

const CreditCardSchema = new mongoose.Schema(
    {
        applicationRef: { type: String, required: true, unique: true },

        // Personal Information
        firstname: { type: String, required: true },
        middleName: { type: String, required: false },
        lastname: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        alternateMobile: { type: String, required: false },
        personalEmail: { type: String, required: true },
        officialEmail: { type: String, required: false },

        // Identity Information
        aadhaarNumber: { type: String, required: true },
        panNumber: { type: String, required: true },
        voterIdNumber: { type: String, required: false },
        drivingLicense: { type: String, required: false },
        passportNumber: { type: String, required: false },

        // Address Information
        currentResidentialAddress: { type: String, required: true },
        currentResidentialPincode: { type: String, required: true },
        residentialState: { type: String, required: false },
        residentialCity: { type: String, required: false },
        currentOfficeAddress: { type: String, required: false },
        currentOfficePincode: { type: String, required: false },
        residentialStatus: { type: String, default: "Owned" },
        businessPremisesStatus: { type: String, default: "Owned" },
        yearsAtCurrentResidentialAddress: { type: String, default: "1" },
        yearsAtCurrentBusinessAddress: { type: String, default: "1" },

        // Credit Card Specific Fields
        bankName: { type: String, required: false },
        limitAmount: { type: String, required: false },
        cardType: { type: String, required: false },

        // Additional Fields
        loanTypeText: { type: String, default: "credit-card" },
        cibilScoreKnown: { type: String, required: false },
        cibilScore: { type: String, required: false },
        consent: { type: Boolean, default: false },

        // Document uploads
        aadhaarFront: { type: String, required: false },
        aadhaarBack: { type: String, required: false },
        panFront: { type: String, required: false },
        residentialBill: { type: String, required: false },
        shopBill: { type: String, required: false },

        // Metadata
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        status: { type: String, default: "pending" }
    },
    { timestamps: true }
);

export default mongoose.models.CreditCard || mongoose.model("CreditCard", CreditCardSchema);
