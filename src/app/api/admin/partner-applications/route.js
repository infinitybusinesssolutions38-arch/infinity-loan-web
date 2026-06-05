import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import PartnerRegisterModel from "../../models/partner-register-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const applications = await PartnerRegisterModel.find()
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();

    return NextResponse.json({
      success: true,
      data: applications.map((item) => ({
        ...item,
        _id: item._id?.toString?.() || String(item._id || ""),
        status:
          item.status === "Contacted" ||
          item.status === "Approved" ||
          item.status === "Rejected" ||
          item.status === "Onboarded"
            ? item.status
            : "New",
      })),
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching partner applications:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partner applications",
      },
      { status: 500 }
    );
  }
}
