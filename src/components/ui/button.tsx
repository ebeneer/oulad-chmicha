import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "outlineOnDark";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  /** Sur cartes claires, formulaires. */
  primary:
    "rounded-2xl border-0 bg-gradient-to-b from-[#3f9551] to-[#327845] text-white shadow-[0_4px_18px_-6px_rgba(15,66,41,0.55)] transition hover:from-[#458f58] hover:to-[#2b6a3a] hover:shadow-[0_8px_24px_-8px_rgba(15,66,41,0.45)] active:scale-[0.99]",
  /** Secondaire creme, discret. */
  secondary:
    "rounded-2xl border-0 bg-[#fbf6ea] text-[#0f4229] shadow-sm transition hover:bg-white hover:shadow active:scale-[0.99]",
  ghost:
    "rounded-2xl border-0 bg-transparent text-[var(--color-ink)] transition hover:bg-[var(--color-surface-muted)]",
  /** CTA clair sur fond fonce (header, heros sombres, footer). Couleur texte explicite (pas inherit du parent). */
  onDark:
    "rounded-full border-0 bg-gradient-to-b from-[#f8f2e6] to-[#ebe4d4] text-[#051208] text-sm font-semibold shadow-[0_2px_18px_-4px_rgba(0,0,0,0.55)] transition hover:from-white hover:to-[#f5efe3] hover:text-[#051208] hover:shadow-md active:scale-[0.99]",
  /** Verre leger, sans contour. */
  outlineOnDark:
    "rounded-full border-0 bg-white/12 text-white text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.99]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 min-h-10 px-4 text-sm",
  md: "h-12 min-h-12 px-6 text-[0.9375rem] leading-tight",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex select-none items-center justify-center gap-2 text-center font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fd49a]/45 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
