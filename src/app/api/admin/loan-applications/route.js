import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import PersonalLoanModel from "../../models/personal-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";

function normalizeItem(item, type) {
  return { ...item, _type: type };
}

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = String(searchParams.get("search") || "").trim();
  const status = String(searchParams.get("status") || "").trim();
  const type = String(searchParams.get("type") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 10)));
  const skip = (page - 1) * limit;

  const buildFilter = (fields) => {
    const filter = {};

    if (search) {
      filter.$or = fields.map((f) => ({ [f]: { $regex: search, $options: "i" } }));
    }

    if (status) {
      filter.status = status;
    }

    return filter;
  };

  const personalFilter = buildFilter(["firstname", "lastname", "email", "mobile", "applicationRef"]);
  const businessFilter = buildFilter(["fullName", "email", "mobile", "applicationRef"]);

  const includePersonal = !type || type === "personal";
  const includeBusiness = !type || type === "business";

  const [personalItems, personalTotal, businessItems, businessTotal] = await Promise.all([
    includePersonal
      ? PersonalLoanModel.find(personalFilter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
      : Promise.resolve([]),
    includePersonal ? PersonalLoanModel.countDocuments(personalFilter) : Promise.resolve(0),
    includeBusiness
      ? BusinessLoanModel.find(businessFilter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
      : Promise.resolve([]),
    includeBusiness ? BusinessLoanModel.countDocuments(businessFilter) : Promise.resolve(0),
  ]);

  const items = [
    ...personalItems.map((i) => normalizeItem(i, "personal")),
    ...businessItems.map((i) => normalizeItem(i, "business")),
  ].sort((a, b) => {
    const ad = new Date(a.createdAt || 0).getTime();
    const bd = new Date(b.createdAt || 0).getTime();
    return bd - ad;
  });

  const total = personalTotal + businessTotal;

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
