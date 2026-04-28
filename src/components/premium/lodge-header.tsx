"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LeafMark } from "@/components/brand/leaf-mark";
import { cn } from "@/lib/cn";

const SCROLL_SOLID_AFTER = 48;

type NavItem = { label: string; href: string };

type LodgeHeaderProps = {
  navItems: NavItem[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

function NavList({
  items,
  className = "",
}: {
  items: NavItem[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label} className="shrink-0">
          <a href={item.href} className="lodge-nav-link block px-2.5 py-2 sm:px-3">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Au-dessus du hero : aucune bande, menu comme calque sur l’image.
 * Après léger défilement : barre fixed vitrée (sticky visuel).
 */
export function LodgeHeader({
  navItems,
  primaryCtaLabel,
  primaryCtaHref,
}: LodgeHeaderProps) {
  const [barSolid, setBarSolid] = useState(false);

  useEffect(() => {
    const update = () => setBarSolid(window.scrollY > SCROLL_SOLID_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out",
        barSolid
          ? "bg-[#071b12]/82 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          : "bg-transparent shadow-none backdrop-blur-none",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 py-3 sm:gap-4 sm:py-3.5 lg:hidden">
          <a
            href="#"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-white/20 to-white/[0.07] shadow-inner shadow-black/20 sm:h-10 sm:w-10">
              <LeafMark className="h-5 w-5 text-[#bde6b8] transition duration-200 group-hover:scale-105 sm:h-6 sm:w-6" />
            </span>
            <span className="max-w-[9rem] truncate font-[var(--font-display)] text-base font-semibold tracking-[-0.02em] text-white sm:max-w-none sm:text-lg md:text-xl">
              Oulad Chmicha
            </span>
          </a>
          <nav
            className="nav-scroll ml-5 min-w-0 flex-1 overflow-x-auto sm:ml-8"
            aria-label="Navigation"
          >
            <NavList items={navItems} className="flex min-h-[2.75rem] w-max min-w-0 items-center gap-0.5 sm:gap-1" />
          </nav>
        </div>

        <div className="hidden h-16 items-center justify-between gap-4 py-0 lg:flex">
          <div className="flex min-w-0 flex-1 items-center gap-6 xl:gap-10">
            <a
              href="#"
              className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-white/20 to-white/[0.07] shadow-inner shadow-black/20">
                <LeafMark className="h-6 w-6 text-[#bde6b8] transition duration-200 group-hover:scale-105" />
              </span>
              <span className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-white">
                Oulad Chmicha
              </span>
            </a>
            <nav
              className="nav-scroll ml-2 min-w-0 flex-1 overflow-x-auto lg:ml-5"
              aria-label="Navigation"
            >
              <NavList
                items={navItems}
                className="flex w-max min-w-0 flex-nowrap items-center gap-0.5 lg:gap-1"
              />
            </nav>
          </div>
          <div className="shrink-0">
            <Button asChild size="sm" variant="onDark">
              <a href={primaryCtaHref}>{primaryCtaLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
