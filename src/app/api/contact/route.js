import { NextResponse } from "next/server";

export async function POST(req) {
    await req.json().catch(() => null);
    return NextResponse.json(
        {
            success: false,
            error: "contact_api_disabled",
        },
        { status: 410 }
    );
}

