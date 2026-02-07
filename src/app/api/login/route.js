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

        const normalizedEmail = String(email || "").trim().toLowerCase();
        const emailRegex = new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");

        if (!normalizedEmail || !otp) {
            return NextResponse.json({ success: false, message: "Email and OTP are required" });
        }

        // Validate OTP
        if (!validateOTP(normalizedEmail, otp)) {
            return NextResponse.json({ success: false, message: "Invalid or expired OTP" });
        }

        // Search user across all collections
        let user =
            (await UserModel.findOne({
                email: { $regex: emailRegex },
            })) ||
            (await IndividaulLoanModel.findOne({ email: { $regex: emailRegex } })) ||
            (await OrganizationLoanModel.findOne({ email: { $regex: emailRegex } })) ||
            (await NRILoanModel.findOne({ email: { $regex: emailRegex } })) ||
            (await HUFLoanModel.findOne({ email: { $regex: emailRegex } })) ||
            (await PersonalLoanModel.findOne({ email: { $regex: emailRegex } })) ||
            (await BusinessLoanModel.findOne({ email: { $regex: emailRegex } }));

        if (!user) {
            const allowAutoRegister =
                process.env.ALLOW_OTP_AUTO_REGISTER === "true" || process.env.NODE_ENV !== "production";

            if (!allowAutoRegister) {
                return NextResponse.json(
                    { success: false, message: "Account not found for this email. Please register first." },
                    { status: 404 }
                );
            }

            const defaultRole = String(process.env.DEFAULT_USER_ROLE || "borrower-personal").trim();
            const randomPassword = `otp-${Math.random().toString(36).slice(2)}-${Date.now()}`;
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = await UserModel.create({
                email: normalizedEmail,
                password: hashedPassword,
                role: defaultRole,
            });
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
        clearOTP(normalizedEmail);

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
