import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "../../lib/db";
import UserModel from "../../models/user-schema";
import SalariedLoanModel from "../../models/salaried-loan-schema";
import BusinessLoanModel from "../../models/business-loan-schema";

export const runtime = "nodejs";
export const maxDuration = 60;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1MB
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg"]);

function escapeRegex(input) {
    return String(input || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function uploadToCloudinary(file) {
    if (!file) return null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream(
                { folder: "loan_payment_receipts", resource_type: "auto" },
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
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.id;
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const user = await UserModel.findById(userId).lean();
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const userEmail = String(user.email || "").trim().toLowerCase();

        const formData = await req.formData();
        const applicationRef = String(formData.get("applicationRef") || "").trim();
        const loanType = String(formData.get("loanType") || "").trim();

        if (!applicationRef) {
            return NextResponse.json({ success: false, message: "applicationRef is required" }, { status: 400 });
        }

        const names = formData.getAll("receiptName").map((v) => String(v || "").trim());
        const files = formData.getAll("receiptFile");

        if (!names.length || !files.length) {
            return NextResponse.json(
                { success: false, message: "Receipt name and file are required" },
                { status: 400 }
            );
        }

        if (names.length !== files.length) {
            return NextResponse.json(
                { success: false, message: "Receipt name/file count mismatch" },
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
            return NextResponse.json({ success: false, message: "Invalid loan type" }, { status: 400 });
        }

        const Model = targetType === "salaried" ? SalariedLoanModel : BusinessLoanModel;

        const applicationRefRegex = new RegExp(`^${escapeRegex(applicationRef)}$`, "i");
        const emailRegex = new RegExp(`^${escapeRegex(userEmail)}$`, "i");

        const loan = await Model.findOne({ applicationRef: applicationRefRegex, personalEmail: emailRegex }).lean();
        if (!loan?._id) {
            return NextResponse.json(
                { success: false, message: "Loan application not found" },
                { status: 404 }
            );
        }

        const uploadedReceipts = [];

        for (let i = 0; i < names.length; i++) {
            const receiptName = names[i];
            const file = files[i];

            if (!receiptName) {
                return NextResponse.json(
                    { success: false, message: `Receipt name is required for item ${i + 1}` },
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

            const receiptUrl = await uploadToCloudinary(file);
            if (!receiptUrl) {
                return NextResponse.json(
                    { success: false, message: `Failed to upload receipt (item ${i + 1})` },
                    { status: 500 }
                );
            }

            uploadedReceipts.push({ receiptName, receiptUrl, uploadedAt: new Date() });
        }

        await Model.updateOne(
            { _id: loan._id },
            { $push: { paymentReceipts: { $each: uploadedReceipts } } },
            { strict: false }
        );

        const updated = await Model.findById(loan._id).lean();

        return NextResponse.json({
            success: true,
            message: "Payment receipts uploaded",
            loanId: String(loan._id),
            applicationRef: String(updated?.applicationRef || applicationRef),
            paymentReceiptsCount: Array.isArray(updated?.paymentReceipts) ? updated.paymentReceipts.length : 0,
            receipts: uploadedReceipts,
        });
    } catch (err) {
        console.error("Payment receipts upload error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
