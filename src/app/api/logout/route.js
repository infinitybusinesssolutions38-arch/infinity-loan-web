import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Clear the cookie by setting it to empty and expiring it immediately
        const res = NextResponse.json({
            success: true,
            message: "Logged out successfully",
        });

        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // expire now
            path: "/",
        });

        return res;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ success: false, message: "Logout failed" });
    }
}

