import Link from "next/link";
import { NavPill } from "@/components/ui/nav-pill";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/calendar", label: "Calendrier" },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/billing", label: "Facturation" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/operations", label: "Operations" },
  { href: "/admin/meals", label: "Repas" },
  { href: "/admin/tasks", label: "Planning" },
  { href: "/admin/templates", label: "Templates" },
  { href: "/admin/ai-assistant", label: "Assistant IA" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Back-office Oulad Chmicha
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                Pilotage quotidien: reservations, operations, facturation, IA.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/"
                className="inline-flex h-10 items-center rounded-full border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]"
              >
                Voir le site public
              </Link>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1">
            {links.map((link) => (
              <NavPill key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6">{children}</div>
    </div>
  );
}
