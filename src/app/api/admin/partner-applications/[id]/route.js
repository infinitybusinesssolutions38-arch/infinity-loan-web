import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import PartnerRegisterModel from "../../../models/partner-register-schema";
import { maybeSendStatusChangeEmail } from "../../../lib/loan-status-email";

const ALLOWED = ["New", "Contacted", "Approved", "Rejected", "Onboarded"];

function normalizePartnerStatus(value) {
  const raw = String(value || "").trim();
  if (ALLOWED.includes(raw)) return raw;
  const lower = raw.toLowerCase();
  if (lower === "new") return "New";
  if (lower === "contacted") return "Contacted";
  if (lower === "approved") return "Approved";
  if (lower === "rejected") return "Rejected";
  if (lower === "onboarded") return "Onboarded";
  return null;
}

function serializePartner(item) {
  if (!item) return item;
  return {
    ...item,
    _id: item._id?.toString?.() || String(item._id || ""),
    status: normalizePartnerStatus(item.status) || "New",
  };
}

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const resolvedParams = await params;
    const id = String(resolvedParams?.id || "").trim();
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid application id" }, { status: 400 });
    }

    const application = await PartnerRegisterModel.findById(id).select("-__v").lean();

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Partner application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serializePartner(application),
    });
  } catch (error) {
    console.error("Error fetching partner application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch partner application" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const resolvedParams = await params;
    const id = String(resolvedParams?.id || "").trim();
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid application id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const status = normalizePartnerStatus(body?.status);

    if (!status) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const update = { status };
    if (typeof body?.notes === "string") {
      update.notes = body.notes;
    }

    const existing = await PartnerRegisterModel.findById(id).lean();
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Partner application not found" },
        { status: 404 }
      );
    }

    const previousStatus = normalizePartnerStatus(existing.status) || "New";

    const application = await PartnerRegisterModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .lean();

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Partner application not found" },
        { status: 404 }
      );
    }

    await maybeSendStatusChangeEmail({
      previousStatus,
      newStatus: status,
      record: application,
      loanType: "partner",
      adminRemarks: typeof body?.notes === "string" ? body.notes : "",
    });

    return NextResponse.json({
      success: true,
      data: serializePartner(application),
      message: "Partner application updated successfully",
    });
  } catch (error) {
    console.error("Error updating partner application:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update partner application" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = String(resolvedParams?.id || "").trim();
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid application id" }, { status: 400 });
  }

  await connectDB();

  const deleted = await PartnerRegisterModel.findByIdAndDelete(id).lean();
  if (!deleted) {
    return NextResponse.json(
      { success: false, message: "Partner application not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, message: "Partner application deleted successfully" });
}
