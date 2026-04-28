"use client";

import { useEffect, useMemo, useState } from "react";
import { reservations, units } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

type ICalSyncResponse = {
  syncedAt: string;
  sources: { airbnb: number; booking: number };
  warnings?: { airbnb?: string | null; booking?: string | null };
  events: Array<{ uid: string; start: string; end: string; summary: string }>;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD (exclusive checkout)
  source: "local" | "ical";
};

function isICalSyncResponse(data: unknown): data is ICalSyncResponse {
  if (!data || typeof data !== "object") return false;
  const candidate = data as Partial<ICalSyncResponse>;
  return Boolean(
    candidate.syncedAt &&
      candidate.sources &&
      typeof candidate.sources.airbnb === "number" &&
      typeof candidate.sources.booking === "number" &&
      Array.isArray(candidate.events),
  );
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildMonthGrid(anchor: Date): Date[] {
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  // Lundi = 0, Dimanche = 6 (semaine FR)
  const offset = (firstOfMonth.getDay() + 6) % 7;
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - offset);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

function dayIsInRange(day: string, startInclusive: string, endExclusive: string) {
  return day >= startInclusive && day < endExclusive;
}

export default function AdminCalendarPage() {
  const [icalData, setIcalData] = useState<ICalSyncResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [anchor, setAnchor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    let cancelled = false;
    async function loadIcal() {
      try {
        const response = await fetch("/api/ical-sync", { cache: "no-store" });
        const data = (await response.json()) as ICalSyncResponse | { error?: string };
        if (cancelled) return;
        if (!response.ok) {
          const errorMessage = "error" in data && data.error ? data.error : "Synchronisation iCal indisponible.";
          setSyncError(errorMessage);
          return;
        }
        if (!isICalSyncResponse(data)) {
          setSyncError("Reponse iCal invalide.");
          return;
        }
        setIcalData(data);
      } catch {
        if (!cancelled) setSyncError("Synchronisation iCal indisponible.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadIcal();
    return () => {
      cancelled = true;
    };
  }, []);

  const events = useMemo<CalendarEvent[]>(() => {
    const local = reservations.map((reservation) => ({
      id: reservation.id,
      title:
        reservation.channel === "direct"
          ? `Direct - ${reservation.guestName}`
          : `${reservation.channel.toUpperCase()} - ${reservation.guestName}`,
      start: reservation.checkIn,
      end: reservation.checkOut,
      source: "local" as const,
    }));
    const external = (icalData?.events ?? []).map((event) => ({
      id: event.uid,
      title: event.summary || "Reservation iCal",
      start: event.start,
      end: event.end,
      source: "ical" as const,
    }));
    return [...local, ...external];
  }, [icalData]);

  const grid = useMemo(() => buildMonthGrid(anchor), [anchor]);
  const monthLabel = anchor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const todayIso = toIsoDate(new Date());

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const cell of grid) {
      const iso = toIsoDate(cell);
      map.set(
        iso,
        events.filter((event) => dayIsInRange(iso, event.start, event.end)),
      );
    }
    return map;
  }, [events, grid]);

  function shiftMonth(delta: number) {
    setAnchor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  return (
    <main className="space-y-6">
      <Card className="section-enter p-6 sm:p-7">
        <SectionHeader
          eyebrow="Planning"
          title="Calendrier unifie"
          description="Fusion des reservations Airbnb, Booking et direct avec un statut clair."
        />
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold"
            aria-label="Mois precedent"
          >
            ← Mois precedent
          </button>
          <span className="font-semibold capitalize">{monthLabel}</span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold"
            aria-label="Mois suivant"
          >
            Mois suivant →
          </button>
          {loading ? <Badge tone="info">Synchronisation iCal en cours...</Badge> : null}
          {syncError ? <Badge tone="warning">{syncError}</Badge> : null}
          {!syncError && icalData ? (
            <Badge tone="neutral">
              iCal Airbnb {icalData.sources.airbnb} - Booking {icalData.sources.booking} - maj{" "}
              {new Date(icalData.syncedAt).toLocaleString("fr-FR")}
            </Badge>
          ) : null}
        </div>
      </Card>

      <Card as="section" className="section-enter grid grid-cols-7 gap-2 p-4">
        {days.map((day) => (
          <p key={day} className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
            {day}
          </p>
        ))}
        {grid.map((cell) => {
          const iso = toIsoDate(cell);
          const inMonth = cell.getMonth() === anchor.getMonth();
          const dayEvents = eventsByDay.get(iso) ?? [];
          const isToday = iso === todayIso;
          return (
            <div
              key={iso}
              className={`min-h-20 rounded-lg border p-2 text-xs ${
                inMonth
                  ? "border-[var(--color-border)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)]/50 bg-[var(--color-surface-muted)] text-[var(--color-ink-soft)]/80"
              } ${isToday ? "ring-2 ring-[var(--color-accent)]" : ""}`}
            >
              <p className="font-semibold">{cell.getDate()}</p>
              <ul className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <li
                    key={`${event.id}-${iso}`}
                    className={`truncate rounded px-1 py-0.5 ${
                      event.source === "local"
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-amber-100 text-amber-900"
                    }`}
                    title={event.title}
                  >
                    {event.title}
                  </li>
                ))}
                {dayEvents.length > 2 ? (
                  <li className="text-[var(--color-ink-soft)]">+{dayEvents.length - 2}</li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </Card>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
          Evenements du mois
        </h2>
        {events
          .filter((event) => {
            const start = new Date(event.start);
            const end = new Date(event.end);
            const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
            const monthEnd = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
            return start < monthEnd && end > monthStart;
          })
          .sort((a, b) => a.start.localeCompare(b.start))
          .map((event) => {
            const reservation = reservations.find((item) => item.id === event.id);
            const unit = reservation ? units.find((item) => item.id === reservation.unitId) : null;
            return (
              <Card key={`${event.id}-${event.start}`} className="section-enter p-4">
                <p className="font-semibold text-[var(--color-ink)]">
                  {event.start} {"->"} {event.end}
                </p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {event.title}
                  {unit ? ` - ${unit.name}` : ""}
                </p>
              </Card>
            );
          })}
      </section>
    </main>
  );
}
