import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        mobile: { type: String, unique: true, sparse: true, trim: true },
        password: { type: String, required: true },
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
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
