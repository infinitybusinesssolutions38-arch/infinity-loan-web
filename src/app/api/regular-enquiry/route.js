import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import RegularEnquiryModel from "../models/regular-enquiry-schema";
import { notifyDirectorOnFormSubmit } from "../lib/director-notification-email";

export async function POST(req) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { name, phone, company, message, agreedToContact } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    const enquiry = await RegularEnquiryModel.create({
      name,
      phone,
      company: company || "",
      message: message || "",
      agreedToContact: agreedToContact || false,
    });

    await notifyDirectorOnFormSubmit({
      serviceName: "Regular Enquiry",
      referenceId: enquiry._id?.toString?.() || "",
      submittedAt: enquiry.createdAt,
      fields: [
        { label: "Name", value: name },
        { label: "Phone", value: phone },
        { label: "Company", value: company || "-" },
        { label: "Agreed to Contact", value: agreedToContact ? "Yes" : "No" },
      ],
      message: message || "",
      actionNote: "Review this enquiry in Admin → Regular Enquiries and contact the lead.",
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
