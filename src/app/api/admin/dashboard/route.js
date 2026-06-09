import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import { buildOrphanExcludedLoanFilter } from "../../lib/loan-applications";

import UserModel from "../../models/user-schema";
import ContactModel from "../../models/contact-schema";
import SalariedLoanModel from "../../models/salaried-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";
import CreditCardModel from "../../models/credit-card-schema";
import PartnerRegisterModel from "../../models/partner-register-schema";

function mergeFilters(baseFilter, extraFilter = {}) {
  const keys = Object.keys(extraFilter);
  if (keys.length === 0) return baseFilter;
  return { $and: [baseFilter, extraFilter] };
}

function addToStatusSummary(statusSummary, rawStatus, count) {
  const normalized = String(rawStatus || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  if (normalized === "approved") {
    statusSummary.Approved += count;
    return;
  }
  if (normalized === "rejected") {
    statusSummary.Rejected += count;
    return;
  }
  statusSummary.Pending += count;
}

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const activeLoanFilter = await buildOrphanExcludedLoanFilter();

  const [
    users,
    enquiries,
    salariedCount,
    businessCount,
    creditCardCount,
    partnerCount,
  ] = await Promise.all([
    UserModel.countDocuments(),
    ContactModel.countDocuments(),
    SalariedLoanModel.countDocuments(activeLoanFilter),
    BusinessLoanModel.countDocuments(activeLoanFilter),
    CreditCardModel.countDocuments(activeLoanFilter),
    PartnerRegisterModel.countDocuments(),
  ]);

  const loanApplications = salariedCount + businessCount;
  const totalApplications = loanApplications + creditCardCount + partnerCount;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentLoanFilter = mergeFilters(activeLoanFilter, {
    createdAt: { $gte: sevenDaysAgo },
  });

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyLoanFilter = mergeFilters(activeLoanFilter, {
    createdAt: { $gte: sixMonthsAgo },
  });

  const [
    personalAgg,
    businessAgg,
    creditCardAgg,
    recentPersonal,
    recentBusiness,
    recentCreditCards,
    recentPartners,
    monthlyPersonal,
    monthlyBusiness,
    monthlyCreditCards,
    monthlyPartners,
    topPersonalServices,
    topBusinessServices,
    topCreditCardTypes,
  ] = await Promise.all([
    SalariedLoanModel.aggregate([
      { $match: activeLoanFilter },
      { $group: { _id: "$application_status", count: { $sum: 1 } } },
    ]),
    BusinessLoanModel.aggregate([
      { $match: activeLoanFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    CreditCardModel.aggregate([
      { $match: activeLoanFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    SalariedLoanModel.countDocuments(recentLoanFilter),
    BusinessLoanModel.countDocuments(recentLoanFilter),
    CreditCardModel.countDocuments(recentLoanFilter),
    PartnerRegisterModel.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    SalariedLoanModel.aggregate([
      { $match: monthlyLoanFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    BusinessLoanModel.aggregate([
      { $match: monthlyLoanFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    CreditCardModel.aggregate([
      { $match: monthlyLoanFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    PartnerRegisterModel.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    SalariedLoanModel.aggregate([
      { $match: activeLoanFilter },
      { $group: { _id: "$serviceCategoryTitle", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
    BusinessLoanModel.aggregate([
      { $match: activeLoanFilter },
      { $group: { _id: "$serviceCategoryTitle", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
    CreditCardModel.aggregate([
      { $match: activeLoanFilter },
      { $group: { _id: "$cardType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
  ]);

  const statusSummary = { Pending: 0, Approved: 0, Rejected: 0 };
  for (const row of personalAgg) {
    addToStatusSummary(statusSummary, row._id, row.count);
  }
  for (const row of businessAgg) {
    addToStatusSummary(statusSummary, row._id, row.count);
  }
  for (const row of creditCardAgg) {
    addToStatusSummary(statusSummary, row._id, row.count);
  }

  const applicationTypeSummary = {
    personal: salariedCount,
    business: businessCount,
    creditCard: creditCardCount,
    partner: partnerCount,
  };

  const recentApplications =
    recentPersonal + recentBusiness + recentCreditCards + recentPartners;

  const monthlyTrends = {};
  [...monthlyPersonal, ...monthlyBusiness, ...monthlyCreditCards, ...monthlyPartners].forEach(
    (item) => {
      if (!monthlyTrends[item._id]) {
        monthlyTrends[item._id] = {
          personal: 0,
          business: 0,
          creditCard: 0,
          partner: 0,
          total: 0,
        };
      }
      monthlyTrends[item._id].total += item.count;
    }
  );

  monthlyPersonal.forEach((item) => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].personal = item.count;
    }
  });

  monthlyBusiness.forEach((item) => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].business = item.count;
    }
  });

  monthlyCreditCards.forEach((item) => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].creditCard = item.count;
    }
  });

  monthlyPartners.forEach((item) => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].partner = item.count;
    }
  });

  return NextResponse.json({
    success: true,
    data: {
      users,
      enquiries,
      loanApplications,
      salaryLoanApplications: salariedCount,
      businessLoanApplications: businessCount,
      creditCardApplications: creditCardCount,
      partnerApplications: partnerCount,
      totalApplications,
      statusSummary,
      applicationTypeSummary,
      recentApplications,
      monthlyTrends: Object.entries(monthlyTrends).map(([month, data]) => ({
        month,
        ...data,
      })),
      topServiceCategories: {
        personal: topPersonalServices,
        business: topBusinessServices,
        creditCards: topCreditCardTypes,
      },
      approvalRate:
        totalApplications > 0
          ? Math.round((statusSummary.Approved / totalApplications) * 100)
          : 0,
    },
  });
}
