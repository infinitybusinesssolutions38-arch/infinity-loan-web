import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import PersonalLoanModel from "../../models/personal-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";
import SalariedLoanModel from "../../models/salaried-loan-schema";
import {
  buildStatusFilter,
  normalizeAdminListItem,
} from "../../lib/admin-application-status";

function buildSearchFilter(fields, search) {
  const filter = {};
  if (search) {
    filter.$or = fields.map((f) => ({ [f]: { $regex: search, $options: "i" } }));
  }
  return filter;
}

async function queryModel(Model, loanType, searchFields, { search, status, skip, limit }) {
  const filter = buildSearchFilter(searchFields, search);
  Object.assign(filter, buildStatusFilter(loanType, status));

  const [items, total] = await Promise.all([
    Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);

  return {
    items: items.map((i) => normalizeAdminListItem(i, loanType)),
    total,
  };
}

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = String(searchParams.get("search") || "").trim();
  const status = String(searchParams.get("status") || "").trim();
  const type = String(searchParams.get("type") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 10)));
  const skip = (page - 1) * limit;

  const common = { search, status, skip, limit };
  const nameFields = ["firstName", "lastName", "personalEmail", "mobileNumber", "applicationRef"];
  const personalNameFields = ["firstname", "lastname", "personalEmail", "mobileNumber", "applicationRef"];

  let items = [];
  let total = 0;

  if (type === "salaried") {
    const result = await queryModel(SalariedLoanModel, "salaried", nameFields, common);
    items = result.items;
    total = result.total;
  } else if (type === "business") {
    const result = await queryModel(BusinessLoanModel, "business", nameFields, common);
    items = result.items;
    total = result.total;
  } else if (type === "personal") {
    const result = await queryModel(PersonalLoanModel, "personal", personalNameFields, common);
    items = result.items;
    total = result.total;
  } else {
    const perTypeLimit = limit;
    const [salaried, business, personal] = await Promise.all([
      queryModel(SalariedLoanModel, "salaried", nameFields, {
        ...common,
        skip: 0,
        limit: perTypeLimit,
      }),
      queryModel(BusinessLoanModel, "business", nameFields, {
        ...common,
        skip: 0,
        limit: perTypeLimit,
      }),
      queryModel(PersonalLoanModel, "personal", personalNameFields, {
        ...common,
        skip: 0,
        limit: perTypeLimit,
      }),
    ]);

    items = [...salaried.items, ...business.items, ...personal.items]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, limit);
    total = salaried.total + business.total + personal.total;
  }

  return NextResponse.json({
    success: true,
    data: {
      items,
      total,
      page,
      limit,
      pages: Math.max(1, Math.ceil(total / limit)),
      type: type || "all",
    },
  });
}
