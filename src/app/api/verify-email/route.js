import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import UserModel from "../models/user-schema";
import { sendWelcomeEmail } from "../lib/email-verification-service";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Invalid verification link" },
                { status: 400 }
            );
        }

        // Find user with this token
        const user = await UserModel.findOne({ emailVerificationToken: token });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid verification link" },
                { status: 400 }
            );
        }

        // Check if already verified
        if (user.emailVerified) {
            return NextResponse.json(
                { success: false, message: "Your email is already verified" },
                { status: 400 }
            );
        }

        // Check token expiry
        if (!user.emailVerificationTokenExpires || new Date(user.emailVerificationTokenExpires) < new Date()) {
            return NextResponse.json(
                { success: false, message: "Verification link has expired" },
                { status: 400 }
            );
        }

        // Mark email as verified and clear token
        user.emailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationTokenExpires = null;
        await user.save();

        // Send welcome email
        try {
            await sendWelcomeEmail(user.email, user.fullName || "User");
            console.log(`[Email Verification] Welcome email sent to ${user.email}`);
        } catch (emailError) {
            console.error(`[Email Verification] Failed to send welcome email to ${user.email}:`, emailError);
            // Don't fail verification if email fails, just log the error
        }

        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully. Your account is now active.",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Email verification error:", err);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
