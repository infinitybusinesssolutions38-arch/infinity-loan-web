import { NextResponse } from "next/server";
import { requireAdmin } from "../lib/guard";

export async function GET(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  return NextResponse.json({ success: true, admin: auth.admin });
}
