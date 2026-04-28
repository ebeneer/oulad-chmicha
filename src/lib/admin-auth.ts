import { redirect } from "next/navigation";

export const SESSION_COOKIE_NAME = "oc_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h

/**
 * Sessions admin signees: payload base64 + signature HMAC-SHA256.
 * Format: <payload>.<signature> ou payload = base64url(JSON({ exp, v }))
 *
 * NOTE: utilise WebCrypto pour rester compatible runtime Edge (middleware) ET Node.
 * Aucune dependance externe.
 */

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET_MISSING");
  }
  return secret;
}

function base64UrlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of arr) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    Math.ceil(input.length / 4) * 4,
    "=",
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signAdminSessionToken(ttlSeconds = SESSION_TTL_SECONDS): Promise<string> {
  const secret = getSecret();
  const payload = {
    v: 1 as const,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payloadEncoded = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadEncoded));
  return `${payloadEncoded}.${base64UrlEncode(sig)}`;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadEncoded, sigEncoded] = parts;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  let key: CryptoKey;
  try {
    key = await importHmacKey(secret);
  } catch {
    return false;
  }

  const expectedSig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadEncoded));
  const expectedBytes = new Uint8Array(expectedSig);
  let providedBytes: Uint8Array;
  try {
    providedBytes = base64UrlDecode(sigEncoded);
  } catch {
    return false;
  }
  if (!timingSafeEqual(expectedBytes, providedBytes)) return false;

  let payload: { exp?: number; v?: number };
  try {
    payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadEncoded)));
  } catch {
    return false;
  }
  if (payload.v !== 1 || typeof payload.exp !== "number") return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;
  return true;
}

function readCookieFromHeader(cookieHeader: string, name: string): string | null {
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${name}=`)) {
      return trimmed.slice(name.length + 1);
    }
  }
  return null;
}

export async function hasAdminSessionFromRequest(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = readCookieFromHeader(cookieHeader, SESSION_COOKIE_NAME);
  return verifyAdminSessionToken(token);
}

/**
 * Verifie qu'un appel cron Vercel est legitime.
 * Vercel Cron ajoute Authorization: Bearer <CRON_SECRET>.
 */
export function isAuthorizedCronRequest(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const header = request.headers.get("authorization") ?? "";
  return header === `Bearer ${expected}`;
}

export async function assertAdminSessionOrRedirect(nextPath?: string): Promise<void> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (await verifyAdminSessionToken(token)) return;

  const query = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
  redirect(`/admin/login${query}`);
}
