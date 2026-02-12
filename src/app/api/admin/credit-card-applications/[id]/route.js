import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import CreditCardModel from "../../../models/credit-card-schema";

export async function GET(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    console.log("Fetching credit card application with ID:", params.id);
    
    const application = await CreditCardModel.findById(params.id);
    console.log("Found application:", application);
    
    if (!application) {
      console.log("Application not found for ID:", params.id);
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error fetching credit card application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  await connectDB();

  try {
    const body = await req.json();
    const { status, adminRemarks } = body;

    const application = await CreditCardModel.findByIdAndUpdate(
      params.id,
      { 
        status: status || "Pending",
        adminRemarks: adminRemarks || "",
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error updating credit card application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application" },
      { status: 500 }
    );
  }
}
