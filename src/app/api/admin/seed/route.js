import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../lib/db";
import AdminModel from "../../models/admin-schema";

export async function POST() {
  await connectDB();

  const existing = await AdminModel.countDocuments();
  if (existing > 0) {
    return NextResponse.json({ success: false, message: "Admin already exists" }, { status: 409 });
  }

  const email = String(process.env.ADMIN_SEED_EMAIL || "").trim().toLowerCase();
  const password = String(process.env.ADMIN_SEED_PASSWORD || "");
  const name = String(process.env.ADMIN_SEED_NAME || "Admin").trim();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD" },
      { status: 400 }
    );
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ success: false, message: "Missing JWT_SECRET" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await AdminModel.create({
    name,
    email,
    password: hashedPassword,
    role: "superadmin",
    isActive: true,
  });

  return NextResponse.json(
    { success: true, message: "Admin seeded", adminId: String(admin._id) },
    { status: 201 }
  );
}
