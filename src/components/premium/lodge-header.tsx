import { Button } from "@/components/ui/button";
import { LeafMark } from "@/components/brand/leaf-mark";

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
 * Barre fixe : fond vitré, ombre discrète. Desktop = 3 colonnes (logo, nav centree, CTA).
 * Mobile = logo + CTA, puis liens en scroll horizontal (aucun hamburger).
 */
export function LodgeHeader({
  navItems,
  primaryCtaLabel,
  primaryCtaHref,
}: LodgeHeaderProps) {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-0 bg-[#071b12]/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2.5 py-3 sm:gap-3 sm:py-3.5 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <a
              href="#"
              className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-white/20 to-white/[0.07] shadow-inner shadow-black/20 sm:h-10 sm:w-10">
                <LeafMark className="h-5 w-5 text-[#bde6b8] transition duration-200 group-hover:scale-105 sm:h-6 sm:w-6" />
              </span>
              <span className="truncate font-[var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                Oulad Chmicha
              </span>
            </a>
            <Button asChild size="sm" variant="onDark">
              <a href={primaryCtaHref}>{primaryCtaLabel}</a>
            </Button>
          </div>
          <nav
            className="nav-scroll -mx-1 flex min-w-0 overflow-x-auto px-1"
            aria-label="Navigation"
          >
            <NavList items={navItems} className="flex w-max min-w-0 items-center gap-0.5" />
          </nav>
        </div>

        <div className="hidden h-16 items-center py-0 lg:grid lg:grid-cols-[1fr_minmax(0,auto)_1fr] lg:gap-6">
          <div className="flex min-w-0 justify-start">
            <a
              href="#"
              className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-white/20 to-white/[0.07] shadow-inner shadow-black/20">
                <LeafMark className="h-6 w-6 text-[#bde6b8] transition duration-200 group-hover:scale-105" />
              </span>
              <span className="font-[var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-white">
                Oulad Chmicha
              </span>
            </a>
          </div>
          <nav className="flex min-w-0 justify-center" aria-label="Navigation">
            <NavList
              items={navItems}
              className="flex flex-wrap items-center justify-center gap-0.5 lg:gap-1"
            />
          </nav>
          <div className="flex justify-end">
            <Button asChild size="sm" variant="onDark">
              <a href={primaryCtaHref}>{primaryCtaLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
