import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import GoogleFormModel from "../../models/google-form-schema";
import { isValidGoogleFormUrl, normalizeGoogleFormUrl } from "../../lib/google-form-url";
import {
  getServiceHubCategoryLabel,
  isServiceHubGoogleFormCategory,
  SERVICE_HUB_GOOGLE_FORM_CATEGORIES,
} from "../../lib/service-hub-categories";

async function dropLegacyGoogleFormIndex() {
  try {
    await mongoose.connection.db.collection("googleforms").dropIndex("category_1");
  } catch {
    // Legacy index may not exist.
  }
}

function normalizeGoogleFormItem(item) {
  if (!item) return item;
  const categoryKey = String(item.categoryKey || item.category || "")
    .trim()
    .toLowerCase();
  const rawUrl = item.formUrl || item.url || "";
  const formUrl = normalizeGoogleFormUrl(rawUrl) || rawUrl;
  return {
    ...item,
    categoryKey,
    categoryName: item.categoryName || item.category || categoryKey,
    formUrl,
  };
}

export async function GET(req) {
  try {
    const auth = requireAdmin(req);
    if (!auth.ok) return auth.res;

    await connectDB();
    const items = await GoogleFormModel.find({})
      .sort({ createdAt: -1 })
      .select("categoryKey category categoryName formUrl url isActive createdAt updatedAt")
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
    console.error("Admin google-forms GET error:", err);
    const message =
      err?.name === "MongoNetworkError" || err?.name === "MongoPoolClearedError"
        ? "Database connection failed. Check your network and MongoDB Atlas access, then retry."
        : err?.message || "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = requireAdmin(req);
    if (!auth.ok) return auth.res;

    await connectDB();
    await dropLegacyGoogleFormIndex();
    const body = await req.json().catch(() => ({}));

    const categoryKey = String(body?.categoryKey || "").trim().toLowerCase();
    const categoryName = String(body?.categoryName || "").trim();
    const formUrlRaw = String(body?.formUrl || "").trim();
    const formUrl = normalizeGoogleFormUrl(formUrlRaw);

    if (!isServiceHubGoogleFormCategory(categoryKey)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid category. Use one of: " +
            SERVICE_HUB_GOOGLE_FORM_CATEGORIES.map((c) => c.key).join(", "),
        },
        { status: 400 }
      );
    }

    const resolvedName = categoryName || getServiceHubCategoryLabel(categoryKey);

    if (!categoryKey || !resolvedName || !formUrlRaw) {
      return NextResponse.json(
        { success: false, message: "categoryKey, categoryName and formUrl are required" },
        { status: 400 }
      );
    }

    if (!formUrl || !isValidGoogleFormUrl(formUrlRaw)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Paste a valid Google Form link (use “Send” → link ending in /viewform, not /edit).",
        },
        { status: 400 }
      );
    }

    const existing = await GoogleFormModel.findOne({
      $or: [{ categoryKey }, { category: categoryKey }],
    }).lean();

    if (existing) {
      return NextResponse.json(
        { success: false, message: "This category already has a configured form. Use Edit." },
        { status: 409 }
      );
    }

    const created = await GoogleFormModel.create({
      categoryKey,
      categoryName: resolvedName,
      formUrl,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Google form added successfully",
      item: normalizeGoogleFormItem(created.toObject ? created.toObject() : created),
    });
  } catch (err) {
    console.error("Admin google-forms POST error:", err);

    if (err?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "This category already has a configured form. Use Edit.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
