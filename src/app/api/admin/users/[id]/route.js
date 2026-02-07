import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import UserModel from "../../../models/user-schema";

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const id = params?.id;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid user id" }, { status: 400 });
  }

  await connectDB();

  const user = await UserModel.findById(id).lean();
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const id = params?.id;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid user id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const isDisabled = body?.isDisabled;

  if (typeof isDisabled !== "boolean") {
    return NextResponse.json({ success: false, message: "isDisabled must be boolean" }, { status: 400 });
  }

  await connectDB();

  const user = await UserModel.findByIdAndUpdate(id, { isDisabled }, { new: true }).lean();
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}
