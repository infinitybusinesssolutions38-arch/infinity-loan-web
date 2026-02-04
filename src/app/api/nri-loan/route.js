import { NextResponse } from "next/server";
import NRILoanModel from "../models/nri-loan-schema";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { firstname, lastname, email, mobile, country, password, agree } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const nriData = new NRILoanModel({
            firstname,
            lastname,
            email,
            mobile,
            country,
            password: hashedPassword,
            agree,
            role: "lender-nri"
        });
        await nriData.save();
        return NextResponse.json({ success: true, data: nriData });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server error..." });
    }
}
