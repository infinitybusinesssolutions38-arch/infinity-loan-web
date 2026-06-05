import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { requireAuthUser } from "../../lib/user-auth";
import { findUserLoanByRef } from "../../lib/loan-applications";
import { resolveGoogleFormForRecord } from "../../lib/google-form-resolver";

export async function GET(req) {
  try {
    const { user, error } = await requireAuthUser(req);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }

    const applicationRef = String(req.nextUrl.searchParams.get("applicationRef") || "").trim();
    if (!applicationRef) {
      return NextResponse.json({ success: false, message: "applicationRef is required" }, { status: 400 });
    }

    const found = await findUserLoanByRef(user, applicationRef);
    if (!found) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    await connectDB();
    const resolved = await resolveGoogleFormForRecord(found.record, found.categoryKey);

    if (!resolved?.formUrl) {
      return NextResponse.json({
        success: true,
        formUrl: null,
        mappingKey: null,
        mappingName: null,
        loanType: found.record.serviceCategoryTitle || found.defaultLabel,
      });
    }

    return NextResponse.json({
      success: true,
      formUrl: resolved.formUrl,
      mappingKey: resolved.mappingKey,
      mappingName: resolved.mappingName,
      loanType:
        found.record.serviceCategoryTitle ||
        found.record.loanTypeText ||
        found.defaultLabel,
    });
  } catch (err) {
    console.error("Profile google-form-link GET error:", err);
    return NextResponse.json({
      success: true,
      formUrl: null,
      mappingKey: null,
      mappingName: null,
      warning: "Could not load Google Form link. Use direct document upload or try again later.",
    });
  }
}
