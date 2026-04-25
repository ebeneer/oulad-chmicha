import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type FieldLabelProps = {
  htmlFor: string;
  children: string;
  className?: string;
};

export function FieldLabel({ htmlFor, children, className }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-soft)]", className)}
    >
      {children}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border-0 bg-[var(--color-surface)] px-4 text-sm text-[var(--color-ink)] outline-none transition focus:ring-2 focus:ring-[var(--color-accent)]/35 focus:ring-offset-0",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border-0 bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition focus:ring-2 focus:ring-[var(--color-accent)]/35 focus:ring-offset-0",
        className,
      )}
      {...props}
    />
  );
}
