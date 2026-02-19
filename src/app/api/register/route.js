import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../lib/db";
import UserModel from "../models/user-schema";
import { validateOTP, clearOTP } from "../lib/otp-service";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const fullName = String(body?.fullName || "").trim();
        const email = String(body?.email || "").trim().toLowerCase();
        const mobile = String(body?.mobile || "").trim();
        const password = String(body?.password || "");
        const otp = String(body?.otp || "").trim();

        if (!fullName || !email || !mobile || !password || !otp) {
            return NextResponse.json(
                { success: false, message: "Full name, email, mobile number, password and OTP are required" },
                { status: 400 }
            );
        }

        if (!(await validateOTP(email, otp))) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired OTP" },
                { status: 400 }
            );
        }

        const existing = await UserModel.findOne({ $or: [{ email }, { mobile }] });
        if (existing) {
            return NextResponse.json(
                { success: false, message: "Email or mobile number already registered" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const defaultRole = String(process.env.DEFAULT_USER_ROLE || "borrower-personal").trim();
        const user = await UserModel.create({
            fullName,
            email,
            mobile,
            password: hashedPassword,
            role: defaultRole,
        });

        await clearOTP(email);

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                userId: String(user._id),
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
