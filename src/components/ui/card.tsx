import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
};

export function Card({ as = "article", className, ...props }: CardProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        "rounded-[var(--radius-card)] border-0 bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)]",
        className,
      )}
      {...props}
    />
  );
}
