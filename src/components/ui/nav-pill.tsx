"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type NavPillProps = {
  href: string;
  label: string;
};

export function NavPill({ href, label }: NavPillProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
        isActive
          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
          : "border-[var(--color-border)] bg-white text-[var(--color-ink-soft)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]",
      )}
    >
      {label}
    </Link>
  );
}
