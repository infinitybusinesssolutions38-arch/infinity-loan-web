import mongoose from "mongoose";

const LenderHUFScheme = new mongoose.Schema(
    {
        // Financial details
        amount: { type: Number, required: true },

        // HUF details
        firmName: { type: String, required: true }, // Name of the HUF
        panTan: { type: String, required: true },   // PAN of HUF
        cin: { type: String, required: true },      // PAN of Karta
        incorporationDate: { type: Date, required: true },

        // Karta (Director) details
        directorFirstName: { type: String, required: true },
        directorLastName: { type: String, required: true },
        title: { type: String, enum: ["Mr", "Ms"], required: true },

        // User details
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

        // Acknowledgements / Agreements
        agree: { type: Boolean, required: true },
        agree2: { type: Boolean, required: true },

        // Role for authorization
        role: {
            type: String,
            default: "lender-huf",
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

const HUFLoanModel = mongoose.models.LenderHUFLoan ||
    mongoose.model("LenderHUFLoan", LenderHUFScheme);

export default HUFLoanModel;
