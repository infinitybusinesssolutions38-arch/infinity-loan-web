import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import RegularEnquiryModel from "../../models/regular-enquiry-schema";

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
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    filter.status = status;
  }

  const [items, total] = await Promise.all([
    RegularEnquiryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    RegularEnquiryModel.countDocuments(filter),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      items: items.map((item) => ({
        ...item,
        _id: item._id?.toString?.() || String(item._id || ""),
        status:
          item.status === "Contacted" || item.status === "Closed" ? item.status : "New",
      })),
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    },
  });
}
