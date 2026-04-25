"use client";

import { useEffect, useMemo, useState } from "react";
import { reservations, units } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

type ICalSyncResponse = {
  syncedAt: string;
  sources: {
    airbnb: number;
    booking: number;
  };
  warnings?: {
    airbnb?: string | null;
    booking?: string | null;
  };
  events: Array<{
    uid: string;
    start: string;
    end: string;
    summary: string;
  }>;
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

export default function AdminCalendarPage() {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const [icalData, setIcalData] = useState<ICalSyncResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIcal() {
      try {
        const response = await fetch("/api/ical-sync", { cache: "no-store" });
        const data = (await response.json()) as ICalSyncResponse | { error?: string };
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
        setSyncError("Synchronisation iCal indisponible.");
      } finally {
        setLoading(false);
      }
    }

    loadIcal();
  }, []);

  const mergedEvents = useMemo(() => {
    const localEvents = reservations.map((reservation) => ({
      id: reservation.id,
      title: reservation.channel === "direct" ? "Reservation directe" : `Reservation ${reservation.channel}`,
      start: reservation.checkIn,
      end: reservation.checkOut,
      source: "local" as const,
    }));

    const externalEvents = (icalData?.events ?? []).map((event) => ({
      id: event.uid,
      title: event.summary || "Reservation iCal",
      start: event.start,
      end: event.end,
      source: "ical" as const,
    }));

    return [...localEvents, ...externalEvents].sort((a, b) => a.start.localeCompare(b.start));
  }, [icalData]);

  return (
    <main className="space-y-6">
      <Card className="section-enter p-6 sm:p-7">
        <SectionHeader
          eyebrow="Planning"
          title="Calendrier unifie"
          description="Fusion des reservations Airbnb, Booking et direct avec un statut clair."
        />
        <div className="mt-5 flex flex-wrap gap-2">
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
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={index} className="min-h-16 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-xs">
            {index + 1 <= 30 ? index + 1 : ""}
          </div>
        ))}
      </Card>

      <section className="space-y-3">
        {mergedEvents.map((event) => {
          const reservation = reservations.find((item) => item.id === event.id);
          const unit = reservation ? units.find((item) => item.id === reservation.unitId) : null;
          return (
            <Card key={event.id} className="section-enter p-4">
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
