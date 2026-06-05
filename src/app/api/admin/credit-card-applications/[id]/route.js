import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import CreditCardModel from "../../../models/credit-card-schema";
import { toAdminDisplayStatus } from "../../../lib/admin-application-status";
import { maybeSendStatusChangeEmail } from "../../../lib/loan-status-email";

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    const application = await CreditCardModel.findById(id).lean();

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...application, status: toAdminDisplayStatus(application) },
    });
  } catch (error) {
    console.error("Error fetching credit card application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
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
    const id = resolvedParams?.id;
    const body = await req.json().catch(() => ({}));
    const { status, adminRemarks } = body;

    if (status !== undefined && !["Pending", "Approved", "Rejected"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const patch = { reviewedAt: new Date() };
    if (status !== undefined) patch.status = String(status).toLowerCase();
    if (adminRemarks !== undefined) patch.adminRemarks = adminRemarks;

    const existing = await CreditCardModel.findById(id).lean();
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const previousStatus = toAdminDisplayStatus(existing);

    const application = await CreditCardModel.findByIdAndUpdate(id, patch, { new: true }).lean();

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    if (status !== undefined) {
      await maybeSendStatusChangeEmail({
        previousStatus,
        newStatus: status,
        record: application,
        loanType: "credit-card",
        adminRemarks,
      });
    }

    return NextResponse.json({
      success: true,
      data: { ...application, status: toAdminDisplayStatus(application) },
    });
  } catch (error) {
    console.error("Error updating credit card application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application" },
      { status: 500 }
    );
  }
}
