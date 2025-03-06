import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Check if auth token exists

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow access if authenticated
}

// 👇 This tells Next.js to apply this middleware to all `/admin/*` routes
export const config = {
  matcher: ["/admin/:path*"],
};
