import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../lib/db";
import UserModel from "../models/user-schema";
import { validateOTP, clearOTP } from "../lib/otp-service";
import { sendWelcomeEmail } from "../lib/welcome-email-service";

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

        console.log(`[Registration] OTP verification successful for ${email}. User created with ID: ${user._id}`);
        console.log(`[Registration] Starting welcome email trigger for ${email}`);

        // Send welcome email after successful OTP verification
        try {
            console.log(`[Registration] Calling sendWelcomeEmail for ${email}, name: ${fullName}`);
            const emailResult = await sendWelcomeEmail(email, fullName);
            console.log(`[Registration] sendWelcomeEmail returned:`, emailResult);
            
            // Mark welcome email as sent
            await UserModel.findByIdAndUpdate(user._id, { welcomeEmailSent: true });
            console.log(`[Registration] Welcome email sent successfully to ${email}. User updated with welcomeEmailSent: true`);
        } catch (emailError) {
            console.error(`[Registration] Failed to send welcome email to ${email}:`, emailError);
            console.error(`[Registration] Email error details:`, {
                message: emailError.message,
                stack: emailError.stack,
                code: emailError.code,
                response: emailError.response
            });
            // Don't fail registration if email fails, just log the error
            // Account should still be activated
        }

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
