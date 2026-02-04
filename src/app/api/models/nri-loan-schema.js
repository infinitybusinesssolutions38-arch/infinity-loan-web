import mongoose from "mongoose";

const LenderNRISchema = new mongoose.Schema(
    {
        // Basic personal details
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },

        // Contact details
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true },
        country: { type: String, required: true },

        // Authentication
        password: { type: String, required: true },
        otp: { type: String, required: false },

        // Terms agreement
        agree: { type: Boolean, required: true },

        // Role (for access control)
        role: {
            type: String,
            default: "lender-nri",
            enum: [
                "borrower-personal",
                "borrower-business",
                "lender-individual",
                "lender-organization",
                "lender-nri",
                "lender-huf",
            ],
        },
    },
    { timestamps: true }
);

const NRILoanModel = mongoose.models.LenderNRILoan ||
    mongoose.model("LenderNRILoan", LenderNRISchema);

export default NRILoanModel;
