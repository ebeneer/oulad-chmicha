import { NextResponse } from "next/server";

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

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Admin credentials non configurees dans .env.local" },
      { status: 500 },
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("oc_admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
