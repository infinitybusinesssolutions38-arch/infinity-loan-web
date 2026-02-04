import { NextResponse } from "next/server";
import IndividaulLoanModel from "../models/individaul-loan-schema";
import bcrypt from "bcryptjs";
import connectDB from "../lib/db";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { firstname, lastname, email, password, mobile, agree, agree2 } = body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const individaulData = new IndividaulLoanModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            mobile,
            agree,
            agree2,
            role: "lender-individual",
        });

        await individaulData.save();
        return NextResponse.json({ success: true, data: individaulData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" });
    }
}

