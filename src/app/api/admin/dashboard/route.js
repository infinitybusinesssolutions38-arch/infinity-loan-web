import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";

import UserModel from "../../models/user-schema";
import ContactModel from "../../models/contact-schema";
import PersonalLoanModel from "../../models/personal-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const [users, enquiries, personalCount, businessCount] = await Promise.all([
    UserModel.countDocuments(),
    ContactModel.countDocuments(),
    PersonalLoanModel.countDocuments(),
    BusinessLoanModel.countDocuments(),
  ]);

  const loanApplications = personalCount + businessCount;

  const [personalAgg, businessAgg] = await Promise.all([
    PersonalLoanModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    BusinessLoanModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
  ]);

  const statusSummary = { Pending: 0, Approved: 0, Rejected: 0 };
  for (const row of personalAgg) {
    if (row._id in statusSummary) statusSummary[row._id] += row.count;
  }
  for (const row of businessAgg) {
    if (row._id in statusSummary) statusSummary[row._id] += row.count;
  }

  return NextResponse.json({
    success: true,
    data: {
      users,
      enquiries,
      loanApplications,
      statusSummary,
    },
  });
}
