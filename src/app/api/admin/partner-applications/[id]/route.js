import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import PartnerRegisterModel from "../../../models/partner-register-schema";

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const resolvedParams = await params;
    console.log("Fetching partner application with ID:", resolvedParams.id);
    
    const application = await PartnerRegisterModel.findById(resolvedParams.id).select("-__v");

    if (!application) {
      console.log("Partner application not found");
      return NextResponse.json(
        {
          success: false,
          message: "Partner application not found",
        },
        { status: 404 }
      );
    }

    console.log("Partner application found:", application._id);

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error fetching partner application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partner application",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const resolvedParams = await params;
    const body = await req.json();
    console.log("Updating partner application:", resolvedParams.id, "with data:", body);

    const application = await PartnerRegisterModel.findByIdAndUpdate(
      resolvedParams.id,
      { 
        status: body.status,
        notes: body.notes,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!application) {
      console.log("Partner application not found for update");
      return NextResponse.json(
        {
          success: false,
          message: "Partner application not found",
        },
        { status: 404 }
      );
    }

    console.log("Partner application updated successfully");

    return NextResponse.json({
      success: true,
      data: application,
      message: "Partner application updated successfully",
    });
  } catch (error) {
    console.error("Error updating partner application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update partner application",
      },
      { status: 500 }
    );
  }
}
