import { NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signAdminSessionToken,
  timingSafeUtf8Equal,
} from "@/lib/admin-auth";

type LoginBody = {
  email?: string;
  password?: string;
};

const MIN_RESPONSE_MS = 320;

export async function POST(request: Request) {
  const started = Date.now();
  const finish = async (res: NextResponse) => {
    await new Promise((r) => setTimeout(r, Math.max(0, MIN_RESPONSE_MS - (Date.now() - started))));
    return res;
  };

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = (process.env.ADMIN_PASSWORD ?? "").trim();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "";

  if (!adminEmail || !adminPassword || sessionSecret.length < 16) {
    return finish(
      NextResponse.json(
        {
          error:
            "Admin credentials non configurees. Definir ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_SESSION_SECRET (>=16 chars) dans .env.local.",
        },
        { status: 500 },
      ),
    );
  }

  const [okEmail, okPassword] = await Promise.all([
    timingSafeUtf8Equal(email ?? "", adminEmail),
    timingSafeUtf8Equal(password, adminPassword),
  ]);

  if (!okEmail || !okPassword) {
    return finish(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  let token: string;
  try {
    token = await signAdminSessionToken();
  } catch {
    return finish(NextResponse.json({ error: "Auth indisponible." }, { status: 500 }));
  }

  const response = NextResponse.json({ ok: true });
  const isProd = process.env.NODE_ENV === "production";
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return finish(response);
}
