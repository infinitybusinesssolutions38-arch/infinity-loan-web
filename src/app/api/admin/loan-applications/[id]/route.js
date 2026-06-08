import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import PersonalLoanModel from "../../../models/personal-loan-schema";
import BusinessLoanModel from "../../../models/business-loan-schema";
import SalariedLoanModel from "../../../models/salaried-loan-schema";
import {
  adminStatusToDbFields,
  normalizeAdminListItem,
  toAdminDisplayStatus,
} from "../../../lib/admin-application-status";
import { maybeSendStatusChangeEmail } from "../../../lib/loan-status-email";
import { mapLoanDetail } from "../../../lib/loan-applications";

const CATEGORY_LABELS = {
  salaried: "Salaried Loan",
  business: "Business Loan",
  personal: "Personal Loan",
};

export const runtime = "nodejs";

async function findApplicationById(id) {
  const salaried = await SalariedLoanModel.findById(id).lean();
  if (salaried) {
    return { item: salaried, type: "salaried" };
  }

  const business = await BusinessLoanModel.findById(id).lean();
  if (business) {
    return { item: business, type: "business" };
  }

  const personal = await PersonalLoanModel.findById(id).lean();
  if (personal) {
    return { item: personal, type: "personal" };
  }

  return { item: null, type: null };
}

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid application id" }, { status: 400 });
  }

  await connectDB();

  const { item, type } = await findApplicationById(id);

  if (!item) {
    return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
  }

  const normalized = normalizeAdminListItem(item, type);
  const res = NextResponse.json({
    success: true,
    data: normalized,
    detail: mapLoanDetail(item, type, CATEGORY_LABELS[type] || "Loan Application"),
  });
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return res;
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid application id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const status = body?.status;
  const adminRemarks = body?.adminRemarks;

  if (status !== undefined && !["Pending", "Approved", "Rejected"].includes(status)) {
    return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
  }

  if (adminRemarks !== undefined && typeof adminRemarks !== "string") {
    return NextResponse.json({ success: false, message: "adminRemarks must be string" }, { status: 400 });
  }

  await connectDB();

  const { item, type } = await findApplicationById(id);
  if (!item || !type) {
    return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
  }

  const previousStatus = toAdminDisplayStatus(item);

  const update = { reviewedAt: new Date() };
  if (status !== undefined) {
    const statusFields = adminStatusToDbFields(type, status);
    if (!statusFields) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }
    Object.assign(update, statusFields);
  }
  if (adminRemarks !== undefined) update.adminRemarks = adminRemarks;
  if (status === "Approved") update.documentStatus = "verified";

  const Model =
    type === "business"
      ? BusinessLoanModel
      : type === "salaried"
        ? SalariedLoanModel
        : PersonalLoanModel;

  const updated = await Model.findByIdAndUpdate(id, update, { new: true }).lean();

  if (status !== undefined) {
    await maybeSendStatusChangeEmail({
      previousStatus,
      newStatus: status,
      record: updated,
      loanType: type,
      adminRemarks,
    });
  }

  const normalized = normalizeAdminListItem(updated, type);
  const res = NextResponse.json({
    success: true,
    data: normalized,
    detail: mapLoanDetail(updated, type, CATEGORY_LABELS[type] || "Loan Application"),
  });
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return res;
}

export async function DELETE(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid application id" }, { status: 400 });
  }

  await connectDB();

  const { item, type } = await findApplicationById(id);
  if (!item || !type) {
    return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
  }

  const Model =
    type === "business"
      ? BusinessLoanModel
      : type === "salaried"
        ? SalariedLoanModel
        : PersonalLoanModel;

  await Model.findByIdAndDelete(id);

  return NextResponse.json({ success: true, message: "Application deleted successfully" });
}
