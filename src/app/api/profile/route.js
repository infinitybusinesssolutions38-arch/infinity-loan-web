import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "../lib/db";
import UserModel from "../models/user-schema";
import SalariedLoanModel from "../models/salaried-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";

export async function GET(req) {
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

        const salariedLoans = await SalariedLoanModel.find(
            { personalEmail: userEmail },
            {
                applicationRef: 1,
                serviceCategoryKey: 1,
                serviceCategoryTitle: 1,
                requiredLoanAmount: 1,
                status: 1,
                createdAt: 1,
                additionalDocuments: 1,
                paymentReceipts: 1,
            }
        )
            .sort({ createdAt: -1 })
            .lean();

        const businessLoans = await BusinessLoanModel.find(
            { personalEmail: userEmail },
            {
                applicationRef: 1,
                serviceCategoryKey: 1,
                serviceCategoryTitle: 1,
                requiredLoanAmount: 1,
                status: 1,
                createdAt: 1,
                additionalDocuments: 1,
                paymentReceipts: 1,
            }
        )
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            user: {
                id: String(user._id),
                fullName: user.fullName || "",
                email: user.email || "",
                mobile: user.mobile || "",
                role: user.role || "",
                createdAt: user.createdAt || null,
            },
            loans: {
                salaried: salariedLoans || [],
                business: businessLoans || [],
            },
        });
    } catch (err) {
        console.error("Profile API error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
