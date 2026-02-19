import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-schema";


export async function POST(req) {
    try {
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

        const user = await UserModel.findOne({ email: normalizedEmail });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Account not found. Please register first." },
                { status: 404 }
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
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const role = user.role || "unknown";

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 24 hours
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
        return NextResponse.json({ success: false, message: "Server error" });
    }
}
