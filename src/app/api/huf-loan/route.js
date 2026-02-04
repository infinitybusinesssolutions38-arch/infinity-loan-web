import { NextResponse } from "next/server";
import HUFLoanModel from "../models/huf-loan-schema";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { amount, firmName, panTan, cin, incorporationDate, directorFirstName, directorLastName,
            title, userFirstName, userLastName, email, password, mobile, regAddress1, regAddress2, state, city, pin,
            commAddress, agree, agree2,
        } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const hubData = new HUFLoanModel({
            amount, firmName, panTan, cin, incorporationDate, directorFirstName, directorLastName,
            title, userFirstName, userLastName, email, password: hashedPassword, mobile, regAddress1, regAddress2, state, city, pin,
            commAddress, agree, agree2,
            role: "lender-huf"
        });
        await hubData.save();
        return NextResponse.json({ success: true, data: hubData });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server error..." });
    }
}

