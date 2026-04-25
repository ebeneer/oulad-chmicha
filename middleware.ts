import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname.startsWith("/admin/login");
  const isProtectedApiRoute =
    pathname.startsWith("/api/ai/") ||
    pathname === "/api/ai-generate" ||
    pathname === "/api/ical-sync" ||
    pathname === "/api/reservations";

  if ((!isAdminRoute && !isProtectedApiRoute) || isAdminLoginRoute) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get("oc_admin_session")?.value === "authenticated";
  if (hasSession) {
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
