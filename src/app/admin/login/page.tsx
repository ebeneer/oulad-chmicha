"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError("Identifiants invalides.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-5 py-8">
      <form onSubmit={onSubmit} className="w-full rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Connexion admin</h1>
        <p className="mt-2 text-sm text-stone-600">
          Authentification back-office (compatible Supabase ensuite).
        </p>
        <input
          className="mt-4 w-full rounded-lg border border-stone-300 p-2 text-sm"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="mt-3 w-full rounded-lg border border-stone-300 p-2 text-sm"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        <button
          className="mt-4 w-full rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
