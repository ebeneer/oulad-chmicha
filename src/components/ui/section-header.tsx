import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Classes Tailwind pour le h2 (ex. couleur) */
  titleClassName?: string;
  /** Sur fond clair figé (ex. #f3eadb), utile quand le thème système est sombre */
  eyebrowClassName?: string;
  descriptionClassName?: string;
  centered?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  eyebrowClassName,
  descriptionClassName,
  centered = false,
}: SectionHeaderProps) {
  return (
    <header className={cn("space-y-3", centered ? "text-center" : "", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs uppercase tracking-[0.24em]",
            eyebrowClassName ?? "text-[var(--color-accent)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-[var(--font-display)] text-4xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl",
          titleClassName ?? "text-[var(--color-ink)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-sm leading-7 sm:text-base",
            centered ? "mx-auto max-w-3xl" : "max-w-2xl",
            descriptionClassName ?? "text-[var(--color-ink-soft)]",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
