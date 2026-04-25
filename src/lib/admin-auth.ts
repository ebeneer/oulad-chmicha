import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "oc_admin_session";
const SESSION_COOKIE_VALUE = "authenticated";

export function hasAdminSessionFromRequest(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .some((cookie) => cookie === `${SESSION_COOKIE_NAME}=${SESSION_COOKIE_VALUE}`);
}

export async function assertAdminSessionOrRedirect(nextPath?: string) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.get(SESSION_COOKIE_NAME)?.value === SESSION_COOKIE_VALUE;
  if (hasSession) return;

  const query = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
  redirect(`/admin/login${query}`);
}
