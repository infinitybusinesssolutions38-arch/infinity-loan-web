import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import SalariedLoanModel from "../../models/salaried-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";

function getApplicantName(record) {
  if (record.firstName) {
    return [record.firstName, record.middleName, record.lastName].filter(Boolean).join(" ");
  }
  return [record.firstname, record.middleName, record.lastname].filter(Boolean).join(" ");
}

function getApplicantEmail(record) {
  return String(record.emailId || record.personalEmail || record.email || "").trim();
}

function flattenReceipts(loans, loanType) {
  const items = [];

  for (const loan of loans) {
    const receipts = Array.isArray(loan.paymentReceipts) ? loan.paymentReceipts : [];
    if (!receipts.length) continue;

    const loanId = String(loan._id || "");
    const applicationRef = String(loan.applicationRef || "");
    const applicantName = getApplicantName(loan);
    const applicantEmail = getApplicantEmail(loan);
    const loanLabel = loanType === "business" ? "Business Loan" : "Salaried Loan";
    const loanStatus = String(loan.status || loan.application_status || "pending");

    receipts.forEach((receipt, index) => {
      items.push({
        id: `${loanId}-${index}`,
        loanId,
        loanType,
        loanLabel,
        applicationRef,
        applicantName,
        applicantEmail,
        loanStatus,
        receiptName: String(receipt?.receiptName || "").trim(),
        receiptUrl: String(receipt?.receiptUrl || "").trim(),
        uploadedAt: receipt?.uploadedAt || null,
      });
    });
  }

  return items;
}

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = String(searchParams.get("search") || "").trim().toLowerCase();
  const loanTypeFilter = String(searchParams.get("loanType") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));

  const selectFields =
    "applicationRef firstName middleName lastName firstname lastname emailId personalEmail email status application_status paymentReceipts serviceCategoryTitle";

  const queries = [];
  if (loanTypeFilter !== "business") {
    queries.push(
      SalariedLoanModel.find({ "paymentReceipts.0": { $exists: true } })
        .select(selectFields)
        .sort({ updatedAt: -1 })
        .lean()
    );
  }
  if (loanTypeFilter !== "salaried") {
    queries.push(
      BusinessLoanModel.find({ "paymentReceipts.0": { $exists: true } })
        .select(selectFields)
        .sort({ updatedAt: -1 })
        .lean()
    );
  }

  const results = await Promise.all(queries);
  let items = [];

  if (loanTypeFilter !== "business") {
    items = items.concat(flattenReceipts(results[0] || [], "salaried"));
  }
  if (loanTypeFilter !== "salaried") {
    const businessIndex = loanTypeFilter === "business" ? 0 : 1;
    items = items.concat(flattenReceipts(results[businessIndex] || [], "business"));
  }

  if (search) {
    items = items.filter((item) => {
      const haystack = [
        item.receiptName,
        item.applicationRef,
        item.applicantName,
        item.applicantEmail,
        item.loanLabel,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }

  items.sort((a, b) => {
    const aTime = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
    const bTime = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
    return bTime - aTime;
  });

  const total = items.length;
  const skip = (page - 1) * limit;
  const paged = items.slice(skip, skip + limit);

  return NextResponse.json({
    success: true,
    data: {
      items: paged,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    },
  });
}
