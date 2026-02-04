import { NextResponse } from "next/server";
import ContactModel from "../models/contact-schema";
import connectDB from "../lib/db";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const contactData = new ContactModel(body);
        await contactData.save();
        return NextResponse.json({ success: true, data: contactData });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "internal server error" });
    }
}

