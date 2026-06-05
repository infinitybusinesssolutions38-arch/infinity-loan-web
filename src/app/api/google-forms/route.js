import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import GoogleFormModel from "../models/google-form-schema";
import { normalizeGoogleFormUrl } from "../lib/google-form-url";
import { isServiceHubGoogleFormCategory } from "../lib/service-hub-categories";

function normalizeGoogleFormItem(item) {
  if (!item) return item;
  const categoryKey = String(item.categoryKey || item.category || "")
    .trim()
    .toLowerCase();
  const rawUrl = item.formUrl || item.url || "";
  const formUrl = normalizeGoogleFormUrl(rawUrl) || "";
  return {
    categoryKey,
    categoryName: item.categoryName || item.category || categoryKey,
    formUrl,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
  };
}

export async function GET() {
  try {
    await connectDB();

    const items = await GoogleFormModel.find({ isActive: true })
      .sort({ updatedAt: -1 })
      .select("categoryKey category categoryName formUrl url updatedAt createdAt isActive")
      .lean();

    return NextResponse.json({
      success: true,
      items: items
        .map(normalizeGoogleFormItem)
        .filter(
          (item) =>
            item.categoryKey &&
            item.formUrl &&
            isServiceHubGoogleFormCategory(item.categoryKey)
        ),
    });
  } catch (err) {
    console.error("Public google-forms GET error:", err);
    const message =
      err?.name === "MongoNetworkError" || err?.name === "MongoPoolClearedError"
        ? "Database connection failed"
        : err?.message || "Server error";
    return NextResponse.json({ success: false, message, items: [] }, { status: 500 });
  }
}
