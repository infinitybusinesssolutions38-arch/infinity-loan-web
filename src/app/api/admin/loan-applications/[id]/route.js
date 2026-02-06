import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import PersonalLoanModel from "../../../models/personal-loan-schema";
import BusinessLoanModel from "../../../models/business-loan-schema";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

async function findApplicationById(id) {
  const personal = await PersonalLoanModel.findById(id).lean();
  if (personal) return { item: personal, type: "personal" };

  const business = await BusinessLoanModel.findById(id).lean();
  if (business) return { item: business, type: "business" };

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

  return NextResponse.json({ success: true, data: { ...item, _type: type } });
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

  const previousStatus = item?.status;

  const update = {};
  if (status !== undefined) update.status = status;
  if (adminRemarks !== undefined) update.adminRemarks = adminRemarks;
  update.reviewedAt = new Date();

  const Model = type === "personal" ? PersonalLoanModel : BusinessLoanModel;

  const updated = await Model.findByIdAndUpdate(id, update, { new: true }).lean();

  if (status === "Approved" && previousStatus !== "Approved") {
    try {
      const host = process.env.EMAIL_HOST;
      const port = Number(process.env.EMAIL_PORT || 0);
      const user = process.env.EMAIL_USER;
      const pass = process.env.EMAIL_PASS;
      const secure = String(process.env.EMAIL_SECURE || "").toLowerCase() === "true";
      const from = process.env.EMAIL_FROM || user;
      const to = updated?.email || item?.email;

      if (!host || !port || !user || !pass || !from) {
        console.error("Approval email not sent: missing EMAIL_* env", {
          hasHost: !!host,
          hasPort: !!port,
          hasUser: !!user,
          hasPass: !!pass,
          hasFrom: !!from,
          secure,
        });
      } else if (!to) {
        console.error("Approval email not sent: missing applicant email", { id, type });
      } else {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
        });

        await transporter.verify();

        const info = await transporter.sendMail({
          from,
          to,
          subject: "Loan Approved",
          text: "Your loan is approved successfully.",
        });

        console.log("Approval email sent", { id, to, messageId: info?.messageId });
      }
    } catch (e) {
      console.error("Approval email send failed", e);
    }
  }

  return NextResponse.json({ success: true, data: { ...updated, _type: type } });
}
