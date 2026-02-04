import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import NRILoanModel from "../models/nri-loan-schema";
import OrganizationLoanModel from "../models/organization-loan-schema";
import IndividaulLoanModel from "../models/individaul-loan-schema";
import HUFLoanModel from "../models/huf-loan-schema";
import UserModel from "../models/user-schema";


export async function POST(req) {
    try {
        await connectDB();
        const { identifier, password } = await req.json(); // identifier = email or mobile

        // Search user across all collections (User collection first)
        const user =
            (await UserModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            })) ||
            (await IndividaulLoanModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            })) ||
            (await OrganizationLoanModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            })) ||
            (await NRILoanModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            })) ||
            (await HUFLoanModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            })) ||
            (await PersonalLoanModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            })) ||
            (await BusinessLoanModel.findOne({
                $or: [{ email: identifier }, { mobile: identifier }],
            }));

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        if (!user.password) {
            return NextResponse.json({ success: false, message: "Invalid password" });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ success: false, message: "Invalid password" });
        }

        // Identify role type
        const role = user.role || "unknown";

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set cookie
        const res = NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            role,
        });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res;
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ success: false, message: "Server error" });
    }
}
