import { NextResponse } from "next/server";
import ApplyPrivateModel from "../models/privateApplySchema";
import connectDB from "../lib/db";


export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // directly save using schema
    const application = await ApplyPrivateModel.create(body);

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

