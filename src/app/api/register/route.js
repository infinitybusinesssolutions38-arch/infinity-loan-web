import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../lib/db";
import PersonalLoanModel from "../models/personal-loan-schema";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const email = String(body?.email || "").trim().toLowerCase();
        const password = String(body?.password || "");
        const role = String(body?.role || "");
        const mobile = body?.mobile ? String(body.mobile).trim() : undefined;

        if (!email || !password || !role) {
            return NextResponse.json(
                { success: false, message: "Email, password and role are required" },
                { status: 400 }
            );
        }

        const allowedRoles = [
            "borrower-personal",
            "borrower-business",
            "lender-individual",
            "lender-organization",
            "lender-nri",
            "lender-huf",
        ];

        if (!allowedRoles.includes(role)) {
            return NextResponse.json(
                { success: false, message: "Invalid role" },
                { status: 400 }
            );
        }

        const existingByEmail = await PersonalLoanModel.findOne({ email });
        if (existingByEmail) {
            return NextResponse.json(
                { success: false, message: "Email already registered" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in PersonalLoanModel if borrower-personal, else in BusinessLoanModel
        let user;
        if (role === "borrower-personal") {
            user = await PersonalLoanModel.create({
                firstname: "Pending",
                lastname: "Information",
                email,
                mobile,
                password: hashedPassword,
                role,
                applicationRef: String(Math.floor(100000 + Math.random() * 900000)),
                pan: "Pending",
                aadhaarNumber: "Pending",
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Only borrower-personal registration supported via this endpoint" },
                { status: 400 }
            );
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const res = NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                token,
                role: user.role,
            },
            { status: 201 }
        );

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res;
    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
