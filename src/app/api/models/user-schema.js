import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: false, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        mobile: { type: String, unique: true, sparse: true, trim: true },
        password: { type: String, required: true },
        isDisabled: { type: Boolean, default: false },
        role: {
            type: String,
            required: true,
            enum: [
                "borrower-personal",
                "borrower-business",
                "lender-individual",
                "lender-organization",
                "lender-nri",
                "lender-huf",
            ],
        },
        emailVerified: { type: Boolean, default: false },
        emailVerificationToken: { type: String },
        emailVerificationTokenExpires: { type: Date },
        welcomeEmailSent: { type: Boolean, default: false },
        profileImageUrl: { type: String, required: false, trim: true },
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
