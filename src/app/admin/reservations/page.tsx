import { reservations, units } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

const unitTypeLabel = {
  bungalow_dry_toilet: "Bungalow - toilettes seches",
  room_standard_toilet: "Chambre - toilettes normales",
} as const;

export default function ReservationsPage() {
  const confirmedCount = reservations.filter((item) => item.status === "confirmed").length;
  const pendingCount = reservations.filter((item) => item.status === "pending").length;

  return (
    <main className="space-y-6">
      <Card className="section-enter p-6 sm:p-7">
        <SectionHeader
          eyebrow="Reservations"
          title="Unites & sejours"
          description="Vue operationnelle des 8 unites et des statuts de reservation."
        />
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="success">{confirmedCount} confirmees</Badge>
          <Badge tone="warning">{pendingCount} en attente</Badge>
          <Badge>{units.length} unites totales</Badge>
        </div>
      </Card>

      <section className="grid gap-3 sm:grid-cols-2">
        {units.map((unit) => (
          <Card key={unit.id} className="section-enter p-4">
            <h2 className="font-semibold text-[var(--color-ink)]">{unit.name}</h2>
            <p className="text-sm text-[var(--color-ink-soft)]">{unitTypeLabel[unit.type]}</p>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              Capacite: {unit.capacity} pers. - {unit.nightlyRateDh} DH/nuit
            </p>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        {reservations.map((reservation) => {
          const unit = units.find((item) => item.id === reservation.unitId);
          return (
            <Card key={reservation.id} className="section-enter p-4">
              <p className="font-semibold">{reservation.guestName}</p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {reservation.channel.toUpperCase()} - {unit?.name}
              </p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {reservation.checkIn} {"->"} {reservation.checkOut} ({reservation.guestsCount} pers.)
              </p>
              <div className="mt-2">
                <Badge tone={reservation.status === "confirmed" ? "success" : "warning"}>
                  {reservation.status}
                </Badge>
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
