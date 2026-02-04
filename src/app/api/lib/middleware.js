// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const url = req.nextUrl.pathname;

//   // Allow public routes
//   if (
//     url.startsWith("/login") ||
//     url.startsWith("/register") ||
//     url.startsWith("/api/login") ||
//     url.startsWith("/api/register")
//   ) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     // Restrict lender dashboard access
//     if (url.startsWith("/dashboard/lender") && decoded.role.startsWith("borrower")) {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

//     // Restrict borrower dashboard access
//     if (url.startsWith("/dashboard/borrower") && decoded.role.startsWith("lender")) {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

//     return NextResponse.next();
//   } catch (err) {
//     console.error("JWT Error:", err);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Protect dashboard routes
// };
