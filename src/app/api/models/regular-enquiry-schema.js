import mongoose from "mongoose";

const RegularEnquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        company: { type: String },
        message: { type: String },
        agreedToContact: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ["New", "Contacted", "Closed"],
            default: "New",
        },
    },
    { timestamps: true }
);

const RegularEnquiryModel =
    mongoose.models.RegularEnquiry || mongoose.model("RegularEnquiry", RegularEnquirySchema);

export default RegularEnquiryModel;
