import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        mobile: { type: String, required: true },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["New", "Contacted", "Closed"],
            default: "New",
        },
    },
    { timestamps: true }
);

const ContactModel =
    mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default ContactModel;
