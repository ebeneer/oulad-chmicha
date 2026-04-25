const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function supabaseIsConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export async function supabaseRest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!supabaseIsConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: String(supabaseAnonKey),
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase REST error (${response.status})`);
  }

  return (await response.json()) as T;
}
