import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-schema";

function escapeRegex(input) {
    return String(input || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(req) {
    try {
        if (!process.env.JWT_SECRET) {
            return NextResponse.json(
                { success: false, message: "Server configuration error: JWT_SECRET is missing" },
                { status: 500 }
            );
        }

        await connectDB();
        const { email, password } = await req.json();

        const normalizedEmail = String(email || "").trim().toLowerCase();
        const rawPassword = String(password || "");

        if (!normalizedEmail || !rawPassword) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({
            email: new RegExp(`^${escapeRegex(normalizedEmail)}$`, "i"),
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "No account found for this email. Please register first or check you are using the correct email.",
                    code: "ACCOUNT_NOT_FOUND",
                },
                { status: 401 }
            );
        }

        if (user.isDisabled) {
            return NextResponse.json(
                { success: false, message: "Account is disabled" },
                { status: 403 }
            );
        }

        const isValid = await bcrypt.compare(rawPassword, user.password);
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password", code: "INVALID_CREDENTIALS" },
                { status: 401 }
            );
        }

        const role = user.role || "unknown";

        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Set cookie with 24h expiry
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
            maxAge: 60 * 60 * 24
        });


        return res;
    } catch (err) {
        console.error("Login error:", err);
        const message =
            err?.name === "MongoServerError" || err?.message?.includes("connect")
                ? "Database connection failed. Please check CONNECTIONSTRING in .env and restart the server."
                : "Server error. Please try again.";
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
