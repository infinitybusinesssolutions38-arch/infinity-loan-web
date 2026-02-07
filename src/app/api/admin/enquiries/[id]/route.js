import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import ContactModel from "../../../models/contact-schema";

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid enquiry id" }, { status: 400 });
  }

  await connectDB();

  const item = await ContactModel.findById(id).lean();
  if (!item) {
    return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid enquiry id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const status = body?.status;

  if (!["New", "Contacted", "Closed"].includes(status)) {
    return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
  }

  await connectDB();

  const item = await ContactModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
  if (!item) {
    return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function DELETE(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const id = resolvedParams?.id;
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
