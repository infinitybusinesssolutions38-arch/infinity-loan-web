import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "../../lib/db";
import { requireAuthUser } from "../../lib/user-auth";
import { findUserLoanByRef, getModelByCategory } from "../../lib/loan-applications";

export const runtime = "nodejs";
export const maxDuration = 60;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1MB
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg"]);

async function uploadToCloudinary(file) {
    if (!file) return null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream(
                { folder: "loan_additional_documents", resource_type: "auto" },
                (err, result) => {
                    if (err) return resolve(null);
                    resolve(result?.secure_url || null);
                }
            )
            .end(buffer);
    });
}

export async function POST(req) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        await connectDB();

        const formData = await req.formData();
        const applicationRef = String(formData.get("applicationRef") || "").trim();
        const loanType = String(formData.get("loanType") || "").trim();

        if (!applicationRef) {
            return NextResponse.json({ success: false, message: "applicationRef is required" }, { status: 400 });
        }

        const names = formData.getAll("documentName").map((v) => String(v || "").trim());
        const files = formData.getAll("documentFile");

        if (!names.length || !files.length) {
            return NextResponse.json(
                { success: false, message: "Document name and file are required" },
                { status: 400 }
            );
        }

        if (names.length !== files.length) {
            return NextResponse.json(
                { success: false, message: "Document name/file count mismatch" },
                { status: 400 }
            );
        }

        const inferredType = applicationRef.toUpperCase().startsWith("SAL_")
            ? "salaried"
            : applicationRef.toUpperCase().startsWith("BUS_")
                ? "business"
                : "";

        const targetType = (loanType || inferredType || "").toLowerCase();
        if (targetType !== "salaried" && targetType !== "business") {
            return NextResponse.json(
                { success: false, message: "Invalid loan type" },
                { status: 400 }
            );
        }

        const found = await findUserLoanByRef(user, applicationRef);
        if (!found || found.categoryKey !== targetType) {
            return NextResponse.json(
                { success: false, message: "Loan application not found" },
                { status: 404 }
            );
        }

        const Model = getModelByCategory(targetType);
        const loan = found.record;

        const uploadedDocs = [];

        for (let i = 0; i < names.length; i++) {
            const documentName = names[i];
            const file = files[i];

            if (!documentName) {
                return NextResponse.json(
                    { success: false, message: `Document name is required for item ${i + 1}` },
                    { status: 400 }
                );
            }

            if (!file || typeof file === "string" || typeof file?.arrayBuffer !== "function") {
                return NextResponse.json(
                    { success: false, message: `Invalid file for item ${i + 1}` },
                    { status: 400 }
                );
            }

            const mimeType = String(file.type || "");
            const size = Number(file.size || 0);

            if (!ALLOWED_MIME_TYPES.has(mimeType)) {
                return NextResponse.json(
                    { success: false, message: `Only PDF or JPEG allowed (item ${i + 1})` },
                    { status: 400 }
                );
            }

            if (size > MAX_FILE_SIZE_BYTES) {
                return NextResponse.json(
                    { success: false, message: `Max file size is 1 MB (item ${i + 1})` },
                    { status: 400 }
                );
            }

            const documentUrl = await uploadToCloudinary(file);
            if (!documentUrl) {
                return NextResponse.json(
                    { success: false, message: `Failed to upload document (item ${i + 1})` },
                    { status: 500 }
                );
            }

            uploadedDocs.push({ documentName, documentUrl, uploadedAt: new Date() });
        }

        await Model.updateOne(
            { _id: loan._id },
            { $push: { additionalDocuments: { $each: uploadedDocs } } },
            { strict: false }
        );

        const updated = await Model.findById(loan._id).lean();

        return NextResponse.json({
            success: true,
            message: "Documents uploaded",
            loanId: String(loan._id),
            applicationRef: loan.applicationRef,
            additionalDocumentsCount: Array.isArray(updated?.additionalDocuments)
                ? updated.additionalDocuments.length
                : 0,
            documents: uploadedDocs,
        });
    } catch (err) {
        console.error("Additional documents upload error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
