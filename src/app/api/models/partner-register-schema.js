import mongoose from "mongoose";

const PartnerRegisterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      default: "Not provided",
      trim: true,
    },
    preferredCategory: {
      type: String,
      default: "Not specified",
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Approved", "Rejected", "Onboarded"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create compound index for email and mobile
PartnerRegisterSchema.index({ email: 1, mobileNumber: 1 });

const PartnerRegisterModel =
  mongoose.models.PartnerRegister ||
  mongoose.model("PartnerRegister", PartnerRegisterSchema);

export default PartnerRegisterModel;
