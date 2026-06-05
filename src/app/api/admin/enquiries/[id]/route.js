import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import ContactModel from "../../../models/contact-schema";
import { maybeSendEnquiryStatusChangeEmail } from "../../../lib/enquiry-status-email";

const ALLOWED = ["New", "Contacted", "Closed"];

function normalizeEnquiryStatus(value) {
  const raw = String(value || "").trim();
  if (ALLOWED.includes(raw)) return raw;
  const lower = raw.toLowerCase();
  if (lower === "new") return "New";
  if (lower === "contacted") return "Contacted";
  if (lower === "closed") return "Closed";
  return null;
}

function serializeEnquiry(item) {
  if (!item) return item;
  return {
    ...item,
    _id: item._id?.toString?.() || String(item._id || ""),
    status: normalizeEnquiryStatus(item.status) || "New",
  };
}

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = String(resolvedParams?.id || "").trim();
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid enquiry id" }, { status: 400 });
  }

  await connectDB();

  const item = await ContactModel.findById(id).lean();
  if (!item) {
    return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: serializeEnquiry(item) });
}

export async function PATCH(req, { params }) {
  try {
    const auth = requireAdmin(req);
    if (!auth.ok) return auth.res;

    const resolvedParams = await params;
    const id = String(resolvedParams?.id || "").trim();
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid enquiry id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const status = normalizeEnquiryStatus(body?.status);

    if (!status) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    await connectDB();

    const existing = await ContactModel.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
    }

    const previousStatus = normalizeEnquiryStatus(existing.status) || "New";

    const item = await ContactModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    ).lean();

    if (!item) {
      return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
    }

    await maybeSendEnquiryStatusChangeEmail({
      previousStatus,
      newStatus: status,
      record: item,
      enquiryType: "loan",
    });

    return NextResponse.json({ success: true, data: serializeEnquiry(item) });
  } catch (err) {
    console.error("Admin enquiry PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to update enquiry" },
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
    return NextResponse.json({ success: false, message: "Invalid enquiry id" }, { status: 400 });
  }

  await connectDB();

  const deleted = await ContactModel.findByIdAndDelete(id).lean();
  if (!deleted) {
    return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Deleted" });
}
