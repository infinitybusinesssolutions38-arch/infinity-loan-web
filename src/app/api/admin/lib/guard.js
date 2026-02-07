import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "./auth";

export function requireAdmin(req) {
  const token = req?.cookies?.get
    ? req.cookies.get(ADMIN_COOKIE_NAME)?.value
    : cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return {
      ok: false,
      res: NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 }),
    };
  }

  try {
    const admin = verifyAdminToken(token);
    return { ok: true, admin };
  } catch {
    return {
      ok: false,
      res: NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 }),
    };
  }
}
