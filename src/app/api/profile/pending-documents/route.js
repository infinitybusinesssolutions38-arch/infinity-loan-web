import { NextResponse } from "next/server";
import { requireAuthUser } from "../../lib/user-auth";
import { fetchAllUserLoans, getPendingDocumentsList } from "../../lib/loan-applications";

export async function GET(req) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const loans = await fetchAllUserLoans(user, { summaryOnly: true });
        const pending = loans
            .filter(
                (loan) =>
                    loan.loanCategory !== "credit_card" &&
                    loan.documentStatus === "pending" &&
                    loan.status !== "rejected"
            )
            .map((loan) => ({
                applicationRef: loan.applicationRef,
                loanType: loan.loanType,
                loanCategory: loan.loanCategory,
                missingDocuments: getPendingDocumentsList(loan.loanCategory),
            }));

        return NextResponse.json({
            success: true,
            hasPending: pending.length > 0,
            count: pending.length,
            applications: pending,
        });
    } catch (err) {
        console.error("Pending documents API error:", err);
        const message =
            err?.name === "MongoNetworkError" || err?.name === "MongoPoolClearedError"
                ? "Database connection failed. Please check your internet connection and try again."
                : err?.message || "Server error";
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
