import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/_next") || // exclude Next.js internals
    request.nextUrl.pathname.startsWith("/api") || //  exclude all API routes
    request.nextUrl.pathname.startsWith("/static") // exclude static files
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("x-auth");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/music", request.url));
    }
  }

  return NextResponse.next();
}
