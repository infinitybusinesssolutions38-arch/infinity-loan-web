import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import GoogleFormModel from "../../../models/google-form-schema";
import { isValidGoogleFormUrl, normalizeGoogleFormUrl } from "../../../lib/google-form-url";
import { isServiceHubGoogleFormCategory } from "../../../lib/service-hub-categories";

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

function categoryFilter(categoryKey) {
  return { $or: [{ categoryKey }, { category: categoryKey }] };
}

export async function PUT(req, { params }) {
  try {
    const auth = requireAdmin(req);
    if (!auth.ok) return auth.res;

    const resolvedParams = await params;
    const categoryKey = String(resolvedParams?.categoryKey || "").trim().toLowerCase();
    if (!categoryKey) {
      return NextResponse.json({ success: false, message: "Category key is required" }, { status: 400 });
    }
    if (!isServiceHubGoogleFormCategory(categoryKey)) {
      return NextResponse.json({ success: false, message: "Invalid service hub category" }, { status: 400 });
    }

    await connectDB();
    const body = await req.json().catch(() => ({}));

    const patch = { categoryKey };
    if (typeof body?.categoryName === "string") patch.categoryName = body.categoryName.trim();
    if (typeof body?.formUrl === "string") {
      const formUrlRaw = body.formUrl.trim();
      const formUrl = normalizeGoogleFormUrl(formUrlRaw);
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
      patch.formUrl = formUrl;
    }
    if (typeof body?.isActive === "boolean") patch.isActive = body.isActive;

    if (Object.keys(patch).length <= 1) {
      return NextResponse.json({ success: false, message: "No valid fields to update" }, { status: 400 });
    }

    const updated = await GoogleFormModel.findOneAndUpdate(categoryFilter(categoryKey), { $set: patch }, { new: true }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, message: "Form category not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Google form updated successfully",
      item: normalizeGoogleFormItem(updated),
    });
  } catch (err) {
    console.error("Admin google-forms PUT error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = requireAdmin(req);
    if (!auth.ok) return auth.res;

    const resolvedParams = await params;
    const categoryKey = String(resolvedParams?.categoryKey || "").trim().toLowerCase();
    if (!categoryKey) {
      return NextResponse.json({ success: false, message: "Category key is required" }, { status: 400 });
    }
    if (!isServiceHubGoogleFormCategory(categoryKey)) {
      return NextResponse.json({ success: false, message: "Invalid service hub category" }, { status: 400 });
    }

    await connectDB();
    const deleted = await GoogleFormModel.findOneAndDelete(categoryFilter(categoryKey)).lean();
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Form category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Google form deleted successfully" });
  } catch (err) {
    console.error("Admin google-forms DELETE error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
