import { NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signAdminSessionToken,
} from "@/lib/admin-auth";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "";

  if (!adminEmail || !adminPassword || sessionSecret.length < 16) {
    return NextResponse.json(
      {
        error:
          "Admin credentials non configurees. Definir ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_SESSION_SECRET (>=16 chars) dans .env.local.",
      },
      { status: 500 },
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminSessionToken();
  } catch {
    return NextResponse.json({ error: "Auth indisponible." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}
