import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <header className={cn("space-y-3", centered ? "text-center" : "", className)}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-[var(--font-display)] text-4xl font-black leading-[0.92] tracking-[-0.055em] text-[var(--color-ink)] sm:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className={cn("text-sm leading-7 text-[var(--color-ink-soft)] sm:text-base", centered ? "mx-auto max-w-3xl" : "max-w-2xl")}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
