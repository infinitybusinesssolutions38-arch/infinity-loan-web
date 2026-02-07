import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../lib/db";
import AdminModel from "../../models/admin-schema";
import { ADMIN_COOKIE_NAME, signAdminToken } from "../lib/auth";

export async function POST(req) {
  await connectDB();

  const body = await req.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ success: false, message: "Missing JWT_SECRET" }, { status: 500 });
  }

  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Admin not found. Seed an admin via POST /api/admin/seed" },
      { status: 401 }
    );
  }

  if (!admin.isActive) {
    return NextResponse.json({ success: false, message: "Admin disabled" }, { status: 403 });
  }

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return NextResponse.json({ success: false, message: "Wrong password" }, { status: 401 });
  }

  const token = signAdminToken(admin);
  const res = NextResponse.json({
    success: true,
    message: "Login successful",
    admin: {
      id: String(admin._id),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });

  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res;
}
