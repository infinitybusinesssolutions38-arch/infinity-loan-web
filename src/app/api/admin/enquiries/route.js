import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import ContactModel from "../../models/contact-schema";

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = String(searchParams.get("search") || "").trim();
  const status = String(searchParams.get("status") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  if (search) {
    filter.$or = [
      { firstname: { $regex: search, $options: "i" } },
      { lastname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    filter.status = status;
  }

  const [items, total] = await Promise.all([
    ContactModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ContactModel.countDocuments(filter),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
}
