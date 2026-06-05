import mongoose from "mongoose";

const GoogleFormSchema = new mongoose.Schema(
  {
    categoryKey: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    categoryName: { type: String, required: true, trim: true },
    formUrl: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

GoogleFormSchema.index({ isActive: 1, updatedAt: -1 });

const GoogleFormModel =
  mongoose.models.GoogleForm || mongoose.model("GoogleForm", GoogleFormSchema);

export default GoogleFormModel;
