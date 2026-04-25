import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warning";
  className?: string;
};

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-[var(--color-ink)]",
  success: "text-emerald-700",
  warning: "text-amber-700",
};

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">{label}</p>
      <p className={cn("mt-2 text-2xl font-semibold", toneClasses[tone])}>{value}</p>
      {hint ? <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{hint}</p> : null}
    </Card>
  );
}
