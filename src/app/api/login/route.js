import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PersonalLoanModel from "../models/personal-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import { validateOTP, clearOTP } from "../lib/otp-service";


export async function POST(req) {
    try {
        await connectDB();
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ success: false, message: "Email and OTP are required" });
        }

        // Validate OTP
        if (!validateOTP(email, otp)) {
            return NextResponse.json({ success: false, message: "Invalid or expired OTP" });
        }

        // Search user across loan collections
        const user =
            (await PersonalLoanModel.findOne({ email: email.toLowerCase() })) ||
            (await BusinessLoanModel.findOne({ email: email.toLowerCase() }));

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        // Identify role type
        const role = user.role || "unknown";

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Clear OTP after successful verification
        clearOTP(email);

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
