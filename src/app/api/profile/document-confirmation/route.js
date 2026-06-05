import { NextResponse } from "next/server";
import { requireAuthUser } from "../../lib/user-auth";
import {
    findUserLoanByRef,
    getModelByCategory,
    getApplicationPermissions,
    formatDocumentStatusLabel,
} from "../../lib/loan-applications";

export async function POST(req) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const body = await req.json().catch(() => ({}));
        const applicationRef = String(body.applicationRef || "").trim();
        const loanCategory = String(body.loanCategory || "").trim();

        if (!applicationRef) {
            return NextResponse.json({ success: false, message: "applicationRef is required" }, { status: 400 });
        }

        const found = await findUserLoanByRef(user, applicationRef);
        if (!found) {
            return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
        }

        const permissions = getApplicationPermissions(found.record, found.categoryKey);
        if (permissions.isLocked) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document upload is not allowed after application approval or rejection",
                },
                { status: 403 }
            );
        }

        if (!permissions.canUploadDocuments) {
            return NextResponse.json(
                { success: false, message: "Documents have already been submitted for this application" },
                { status: 400 }
            );
        }

        const categoryKey = loanCategory || found.categoryKey;
        const Model = getModelByCategory(categoryKey);
        if (!Model) {
            return NextResponse.json({ success: false, message: "Invalid loan category" }, { status: 400 });
        }

        await Model.updateOne(
            { _id: found.record._id },
            {
                $set: {
                    documentStatus: "uploaded",
                    documentsConfirmedAt: new Date(),
                },
            },
            { strict: false }
        );

        return NextResponse.json({
            success: true,
            message: "Documents uploaded successfully and sent for verification.",
            applicationRef: found.record.applicationRef,
            documentStatus: "uploaded",
            documentStatusLabel: formatDocumentStatusLabel("uploaded"),
        });
    } catch (err) {
        console.error("Document confirmation API error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
