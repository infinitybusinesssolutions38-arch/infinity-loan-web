import { NextResponse } from "next/server";
import { getAuthUser } from "../../lib/user-auth";

export async function GET(req) {
    try {
        const user = await getAuthUser(req);
        if (!user) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                profileImageUrl: user.profileImageUrl,
            },
        });
    } catch {
        return NextResponse.json({ user: null });
    }
}
