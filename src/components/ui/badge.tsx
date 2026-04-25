import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "success" | "warning" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  neutral: "bg-[var(--color-surface-muted)] text-[var(--color-ink-soft)]",
  success: "bg-emerald-100 text-emerald-900",
  warning: "bg-amber-100 text-amber-900",
  info: "bg-sky-100 text-sky-900",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
