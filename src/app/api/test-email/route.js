import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "../lib/welcome-email-service";

export async function POST(req) {
    try {
        const body = await req.json();
        const email = String(body?.email || "").trim();
        const name = String(body?.name || "Test User").trim();

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        console.log(`[Test Email] Starting test email send to ${email}`);
        
        const result = await sendWelcomeEmail(email, name);
        
        console.log(`[Test Email] Test email sent successfully:`, result);
        
        return NextResponse.json(
            {
                success: true,
                message: "Test email sent successfully",
                data: result
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[Test Email] Failed to send test email:", error);
        console.error("[Test Email] Error details:", {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode,
            stack: error.stack
        });
        
        return NextResponse.json(
            {
                success: false,
                message: "Failed to send test email",
                error: error.message,
                details: {
                    code: error.code,
                    response: error.response
                }
            },
            { status: 500 }
        );
    }
}
