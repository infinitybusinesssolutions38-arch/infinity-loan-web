import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAuthUser } from "../../../lib/user-auth";
import {
    findUserLoanByRef,
    getModelByCategory,
    mapLoanDetail,
    getApplicationPermissions,
    sanitizeUserUpdatePayload,
    getEditableFieldGroups,
} from "../../../lib/loan-applications";

export const runtime = "nodejs";
export const maxDuration = 60;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg"]);

function isFormDataFile(value) {
    return value && typeof value === "object" && typeof value.arrayBuffer === "function";
}

function parseIncomingValue(value) {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;

    // Parse JSON payloads sent from the dynamic edit form
    if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
        try {
            return JSON.parse(trimmed);
        } catch {
            return value;
        }
    }

    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    return value;
}

function normalizeUpdatePayload(raw) {
    const out = {};
    for (const [key, value] of Object.entries(raw || {})) {
        out[key] = parseIncomingValue(value);
    }
    return out;
}

async function uploadToCloudinary(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                { folder: "loan_applications_edit", resource_type: "auto" },
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result?.secure_url || null);
                }
            )
            .end(buffer);
    });
}

export async function GET(req, { params }) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const applicationRef = String((await params)?.ref || "").trim();
        if (!applicationRef) {
            return NextResponse.json({ success: false, message: "Application reference required" }, { status: 400 });
        }

        const found = await findUserLoanByRef(user, applicationRef);
        if (!found) {
            return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
        }

        const { record, categoryKey, defaultLabel } = found;
        const loan = mapLoanDetail(record, categoryKey, defaultLabel);

        return NextResponse.json({
            success: true,
            loan,
            editableFields: getEditableFieldGroups(categoryKey),
        });
    } catch (err) {
        console.error("Applied loan detail API error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const applicationRef = String((await params)?.ref || "").trim();
        if (!applicationRef) {
            return NextResponse.json({ success: false, message: "Application reference required" }, { status: 400 });
        }

        const found = await findUserLoanByRef(user, applicationRef);
        if (!found) {
            return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
        }

        const permissions = getApplicationPermissions(found.record, found.categoryKey);
        if (!permissions.canEdit) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Application is locked and cannot be edited after approval or rejection",
                },
                { status: 403 }
            );
        }

        const contentType = req.headers.get("content-type") || "";
        let rawUpdate = {};

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            const temp = {};

            for (const [key, value] of formData.entries()) {
                if (isFormDataFile(value)) {
                    if (!value.size) continue;
                    const mimeType = String(value.type || "");
                    const size = Number(value.size || 0);
                    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
                        return NextResponse.json(
                            {
                                success: false,
                                message: `Only PDF/JPG files are allowed for ${key}`,
                            },
                            { status: 400 }
                        );
                    }
                    if (size > MAX_FILE_SIZE_BYTES) {
                        return NextResponse.json(
                            {
                                success: false,
                                message: `Max file size is 5 MB for ${key}`,
                            },
                            { status: 400 }
                        );
                    }

                    const url = await uploadToCloudinary(value);
                    if (!url) {
                        return NextResponse.json(
                            { success: false, message: `Failed to upload file for ${key}` },
                            { status: 500 }
                        );
                    }
                    temp[key] = url;
                } else {
                    temp[key] = String(value ?? "");
                }
            }
            rawUpdate = temp;
        } else {
            rawUpdate = await req.json().catch(() => ({}));
        }

        const update = normalizeUpdatePayload(sanitizeUserUpdatePayload(rawUpdate));
        if (!Object.keys(update).length) {
            return NextResponse.json({ success: false, message: "No valid fields to update" }, { status: 400 });
        }

        const Model = getModelByCategory(found.categoryKey);
        if (!Model) {
            return NextResponse.json({ success: false, message: "Invalid loan category" }, { status: 400 });
        }

        await Model.updateOne({ _id: found.record._id }, { $set: update }, { strict: false });

        const updated = await Model.findById(found.record._id).lean();
        const loan = mapLoanDetail(updated, found.categoryKey, found.defaultLabel);

        return NextResponse.json({
            success: true,
            message: "Application updated successfully",
            loan,
        });
    } catch (err) {
        console.error("Applied loan update API error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
