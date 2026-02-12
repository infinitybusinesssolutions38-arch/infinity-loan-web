import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";

import UserModel from "../../models/user-schema";
import ContactModel from "../../models/contact-schema";
import PersonalLoanModel from "../../models/personal-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";
import CreditCardModel from "../../models/credit-card-schema";
import PartnerRegisterModel from "../../models/partner-register-schema";

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  const [users, enquiries, personalCount, businessCount, creditCardCount, partnerCount] = await Promise.all([
    UserModel.countDocuments(),
    ContactModel.countDocuments(),
    PersonalLoanModel.countDocuments(),
    BusinessLoanModel.countDocuments(),
    CreditCardModel.countDocuments(),
    PartnerRegisterModel.countDocuments(),
  ]);

  const loanApplications = personalCount + businessCount;
  const totalApplications = loanApplications + creditCardCount + partnerCount;

  // Get detailed status breakdown for loans
  const [personalAgg, businessAgg] = await Promise.all([
    PersonalLoanModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    BusinessLoanModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
  ]);

  // Get credit card status breakdown
  const creditCardAgg = await CreditCardModel.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const statusSummary = { Pending: 0, Approved: 0, Rejected: 0 };
  for (const row of personalAgg) {
    if (row._id in statusSummary) statusSummary[row._id] += row.count;
  }
  for (const row of businessAgg) {
    if (row._id in statusSummary) statusSummary[row._id] += row.count;
  }
  for (const row of creditCardAgg) {
    if (row._id in statusSummary) statusSummary[row._id] += row.count;
  }

  // Get application type breakdown
  const applicationTypeSummary = {
    personal: personalCount,
    business: businessCount,
    creditCard: creditCardCount,
    partner: partnerCount
  };

  // Get recent applications (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [recentPersonal, recentBusiness, recentCreditCards, recentPartners] = await Promise.all([
    PersonalLoanModel.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    BusinessLoanModel.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    CreditCardModel.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    PartnerRegisterModel.countDocuments({ createdAt: { $gte: sevenDaysAgo } })
  ]);

  const recentApplications = recentPersonal + recentBusiness + recentCreditCards + recentPartners;

  // Get monthly trends (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [monthlyPersonal, monthlyBusiness, monthlyCreditCards, monthlyPartners] = await Promise.all([
    PersonalLoanModel.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    BusinessLoanModel.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    CreditCardModel.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    PartnerRegisterModel.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  // Combine monthly data
  const monthlyTrends = {};
  [...monthlyPersonal, ...monthlyBusiness, ...monthlyCreditCards, ...monthlyPartners].forEach(item => {
    if (!monthlyTrends[item._id]) {
      monthlyTrends[item._id] = { personal: 0, business: 0, creditCard: 0, partner: 0, total: 0 };
    }
    monthlyTrends[item._id].total += item.count;
  });

  monthlyPersonal.forEach(item => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].personal = item.count;
    }
  });

  monthlyBusiness.forEach(item => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].business = item.count;
    }
  });

  monthlyCreditCards.forEach(item => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].creditCard = item.count;
    }
  });

  monthlyPartners.forEach(item => {
    if (monthlyTrends[item._id]) {
      monthlyTrends[item._id].partner = item.count;
    }
  });

  // Get top service categories
  const [topPersonalServices, topBusinessServices] = await Promise.all([
    PersonalLoanModel.aggregate([
      { $group: { _id: "$serviceCategoryTitle", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]),
    BusinessLoanModel.aggregate([
      { $group: { _id: "$serviceCategoryTitle", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
  ]);

  // Get top credit card types
  const topCreditCardTypes = await CreditCardModel.aggregate([
    { $group: { _id: "$cardType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  return NextResponse.json({
    success: true,
    data: {
      users,
      enquiries,
      loanApplications,
      creditCardApplications: creditCardCount,
      partnerApplications: partnerCount,
      totalApplications,
      statusSummary,
      applicationTypeSummary,
      recentApplications,
      monthlyTrends: Object.entries(monthlyTrends).map(([month, data]) => ({ month, ...data })),
      topServiceCategories: {
        personal: topPersonalServices,
        business: topBusinessServices,
        creditCards: topCreditCardTypes
      },
      approvalRate: totalApplications > 0 ? 
        Math.round((statusSummary.Approved / totalApplications) * 100) : 0
    },
  });
}
