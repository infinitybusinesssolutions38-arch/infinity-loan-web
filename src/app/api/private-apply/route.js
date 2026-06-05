import { NextResponse } from "next/server";
import ApplyPrivateModel from "../models/privateApplySchema";
import connectDB from "../lib/db";
import { notifyDirectorOnFormSubmit } from "../lib/director-notification-email";


export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // directly save using schema
    const application = await ApplyPrivateModel.create(body);

    await notifyDirectorOnFormSubmit({
      serviceName: "Private Loan Application",
      referenceId: application._id?.toString?.() || "",
      submittedAt: application.createdAt,
      fields: [
        { label: "Applicant Name", value: `${body.firstName || ""} ${body.lastName || ""}`.trim() },
        { label: "Primary Mobile", value: body.primaryMobileNumber },
        { label: "Alternate Mobile", value: body.alternateMobileNumber || "-" },
        { label: "WhatsApp", value: body.whatsappNumber || "-" },
        { label: "Loan Type", value: body.loanType },
        { label: "Required Amount", value: body.requiredLoanAmount },
        { label: "Home Address", value: body.homeAddress },
        { label: "Home Pincode", value: body.homeAddressPincode },
        { label: "Office Address", value: body.officeAddress },
        { label: "Office Pincode", value: body.officeAddressPincode },
      ],
      actionNote: "Follow up with the applicant for private loan processing.",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

