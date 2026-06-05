import { NextResponse } from "next/server";
import UserModel from "../models/user-schema";
import SalariedLoanModel from "../models/salaried-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import { requireAuthUser } from "../lib/user-auth";
import { fetchAllUserLoans, buildUserLoanFilter } from "../lib/loan-applications";

export async function GET(req) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const loans = await fetchAllUserLoans(user, { summaryOnly: true });
        const filter = buildUserLoanFilter(user);

        const salariedLoans = await SalariedLoanModel.find(filter, {
            applicationRef: 1,
            serviceCategoryKey: 1,
            serviceCategoryTitle: 1,
            requiredLoanAmount: 1,
            application_status: 1,
            status: 1,
            documentStatus: 1,
            createdAt: 1,
            additionalDocuments: 1,
            paymentReceipts: 1,
        })
            .sort({ createdAt: -1 })
            .lean();

        const businessLoans = await BusinessLoanModel.find(filter, {
            applicationRef: 1,
            serviceCategoryKey: 1,
            serviceCategoryTitle: 1,
            requiredLoanAmount: 1,
            status: 1,
            documentStatus: 1,
            createdAt: 1,
            additionalDocuments: 1,
            paymentReceipts: 1,
        })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                profileImageUrl: user.profileImageUrl,
                createdAt: user.createdAt,
            },
            loans: {
                salaried: salariedLoans || [],
                business: businessLoans || [],
            },
            allLoans: loans,
        });
    } catch (err) {
        console.error("Profile API error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { user, error } = await requireAuthUser(req);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: error.status });
        }

        const body = await req.json().catch(() => ({}));
        const fullName = String(body.fullName || "").trim();
        const mobile = String(body.mobile || "").trim();
        const profileImageUrl = body.profileImageUrl != null ? String(body.profileImageUrl).trim() : undefined;

        if (!fullName) {
            return NextResponse.json({ success: false, message: "Full name is required" }, { status: 400 });
        }

        const update = { fullName };
        if (mobile) update.mobile = mobile;
        if (profileImageUrl !== undefined) update.profileImageUrl = profileImageUrl;

        if (mobile) {
            const existing = await UserModel.findOne({
                mobile,
                _id: { $ne: user.id },
            }).lean();
            if (existing) {
                return NextResponse.json(
                    { success: false, message: "Mobile number already in use" },
                    { status: 409 }
                );
            }
        }

        const updated = await UserModel.findByIdAndUpdate(user.id, update, {
            new: true,
            runValidators: true,
        }).lean();

        if (!updated) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Profile updated",
            user: {
                id: String(updated._id),
                fullName: updated.fullName || "",
                email: updated.email || "",
                mobile: updated.mobile || "",
                role: updated.role || "",
                profileImageUrl: updated.profileImageUrl || "",
                createdAt: updated.createdAt || null,
            },
        });
    } catch (err) {
        console.error("Profile update API error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
