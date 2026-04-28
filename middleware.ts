import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  isAuthorizedCronRequest,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname.startsWith("/admin/login");
  const isCronRoute = pathname === "/api/ical-sync";
  const isProtectedApiRoute =
    pathname.startsWith("/api/ai/") ||
    pathname === "/api/ai-generate" ||
    isCronRoute ||
    pathname === "/api/reservations";

  if ((!isAdminRoute && !isProtectedApiRoute) || isAdminLoginRoute) {
    return NextResponse.next();
  }

  // Le cron Vercel est autorise via Authorization: Bearer $CRON_SECRET
  if (isCronRoute && isAuthorizedCronRequest(request)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (await verifyAdminSessionToken(token)) {
    return NextResponse.next();
  }

  if (isProtectedApiRoute) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/ai/:path*",
    "/api/ai-generate",
    "/api/ical-sync",
    "/api/reservations",
  ],
};
