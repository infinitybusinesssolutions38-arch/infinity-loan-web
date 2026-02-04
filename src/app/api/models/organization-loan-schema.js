import mongoose from "mongoose";

const LenderOrganizationSchema = new mongoose.Schema(
    {
        // Financial info
        amount: { type: Number, required: true },

        // Firm details
        firmName: { type: String, required: true },
        panTan: { type: String, required: true },
        cin: { type: String, required: true },
        incorporationDate: { type: Date, required: true },

        // Director details
        title: { type: String, enum: ["Mr", "Ms"], required: true },
        directorFirstName: { type: String, required: true },
        directorLastName: { type: String, required: true },

        // User (representative) details
        userFirstName: { type: String, required: true },
        userLastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobile: { type: String, required: true },

        // Registered address
        regAddress1: { type: String, required: true },
        regAddress2: { type: String },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pin: { type: String, required: true },

        // Communication address
        commAddress: { type: String, required: true },

        // Terms & conditions / risk acknowledgment
        agree: { type: Boolean, required: true },
        agree2: { type: Boolean, required: true },

        // Role (for authentication & access control)
        role: {
            type: String,
            default: "lender-organization",
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

const OrganizationLoanModel = mongoose.models.LenderOrganizationLoan ||
    mongoose.model("LenderOrganizationLoan", LenderOrganizationSchema);

export default OrganizationLoanModel;
