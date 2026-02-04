import { NextResponse } from "next/server";
import OrganizationLoanModel from "../models/organization-loan-schema";
import connectDB from "../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { amount, firmName, panTan, cin,
            incorporationDate, title,
            directorFirstName, directorLastName,
            userFirstName, userLastName,
            email, password, mobile, regAddress1,
            regAddress2, state, city, pin,
            commAddress, agree, agree2, } = body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const organizationData = new OrganizationLoanModel({
            amount, firmName, panTan, cin,
            incorporationDate, title,
            directorFirstName, directorLastName,
            userFirstName, userLastName,
            email, password: hashedPassword, mobile, regAddress1,
            regAddress2, state, city, pin,
            commAddress, agree, agree2, role: "lender-organization"
        });
        await organizationData.save();
        return NextResponse.json({ success: true, data: organizationData });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Internal Server error..." });
    }
}
