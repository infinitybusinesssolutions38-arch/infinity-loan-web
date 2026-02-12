import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAdmin } from "../lib/guard";
import PartnerRegisterModel from "../../models/partner-register-schema";

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    console.log("Fetching partner applications...");
    
    const applications = await PartnerRegisterModel.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    console.log(`Found ${applications.length} partner applications`);

    return NextResponse.json({
      success: true,
      data: applications,
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
