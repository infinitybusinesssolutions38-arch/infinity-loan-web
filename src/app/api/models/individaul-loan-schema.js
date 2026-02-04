import mongoose from "mongoose";

const LenderIndividualSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobile: { type: String, required: true },
        agree: { type: Boolean, required: true },
        agree2: { type: Boolean, required: true },

        // Role helps you identify user type during authentication
        role: {
            type: String,
            default: "lender-individual",
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

const IndividaulLoanModel = mongoose.models.LenderIndividualLoan ||
    mongoose.model("LenderIndividualLoan", LenderIndividualSchema);

export default IndividaulLoanModel;
