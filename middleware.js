import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;
  console.log("🔹 Middleware triggered for:", url);

  const publicRoutes = [
    "/login",
    "/register",
    "/about",
    "/contact",
    "/api/login",
    "/api/register",
  ];

  // Redirect logged-in users away from login/register
  if (token && (url === "/login" || url === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow public routes
  if (
    url === "/" ||
    publicRoutes.some((path) => url === path || url.startsWith(`${path}/`))
  ) {
    return NextResponse.next();
  }

  // Block if not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role || "";

    // Role-based access
    if (url.startsWith("/dashboard/lender") && role.startsWith("borrower")) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (url.startsWith("/dashboard/borrower") && role.startsWith("lender")) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT Error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/register/borrower/:path*",
  ],
};
