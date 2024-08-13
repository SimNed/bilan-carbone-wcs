// Redirection middleware

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/rides", "/add-ride", "/statistics"];

export function middleware(request: NextRequest) {
  const session = request.cookies.get("userSessionId");

  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
