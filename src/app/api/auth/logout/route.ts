import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/admin-auth";

const emptyCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 0,
};

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", emptyCookie);
  if (process.env.NODE_ENV === "production") {
    response.cookies.set("oc_admin_session", "", emptyCookie);
  }
  return response;
}
