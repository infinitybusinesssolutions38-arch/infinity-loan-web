import mongoose from "mongoose";

export const PRIVATE_APPLY_LOAN_TYPES = ["Home", "Personal", "Mortgage"];

const privateApplySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    primaryMobileNumber: { type: String, required: true, trim: true },
    alternateMobileNumber: { type: String, trim: true },
    whatsappNumber: { type: String, trim: true },

    homeAddress: { type: String, required: true, trim: true },
    homeAddressPincode: { type: String, required: true, trim: true },

    officeAddress: { type: String, required: true, trim: true },
    officeAddressPincode: { type: String, required: true, trim: true },

    loanType: {
      type: String,
      enum: PRIVATE_APPLY_LOAN_TYPES,
      required: true,
      trim: true,
    },

    requiredLoanAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ApplyPrivateModel = mongoose.models.PrivateApply ||
  mongoose.model("PrivateApply", privateApplySchema);

export default ApplyPrivateModel;
