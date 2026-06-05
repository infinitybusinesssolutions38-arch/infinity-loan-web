import { NextResponse } from "next/server";
import { requireAuthUser } from "../../lib/user-auth";
import { fetchAllUserLoans } from "../../lib/loan-applications";

export async function GET(req) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const loans = await fetchAllUserLoans(user, { summaryOnly: true });

        return NextResponse.json({
            success: true,
            loans,
            count: loans.length,
        });
    } catch (err) {
        console.error("Applied loans API error:", err);
        const message =
            err?.name === "MongoNetworkError" || err?.name === "MongoPoolClearedError"
                ? "Database connection failed. Please check your internet connection and try again."
                : err?.message || "Server error";
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
