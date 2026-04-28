import Link from "next/link";
import Image from "next/image";
import { accommodations, units } from "@/lib/domain";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Hebergements",
  description: "Decouvrez nos 4 bungalows et 4 chambres au coeur de la nature.",
  alternates: { canonical: "/hebergements" },
};

export default function AccommodationsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Card className="section-enter p-6 sm:p-8">
        <SectionHeader
          eyebrow="Hebergements"
          title="Nos unites de sejour"
          description="4 bungalows ecologiques et 4 chambres classiques, adaptes aux sejours couple, famille ou petit groupe."
        />
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="warning">8 unites</Badge>
          <Badge>Toilettes seches & normales</Badge>
          <Badge tone="info">700 - 1200 DH / nuit</Badge>
        </div>
      </Card>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((item) => {
          const unit = units.find((u) => u.id === item.unitId);
          return (
            <Card key={item.slug} className="section-enter flex h-full flex-col overflow-hidden p-0">
              <div className="relative aspect-[16/10] w-full bg-[var(--color-surface-muted)]">
                <Image
                  src={item.images[0] ?? "/images/piscine-bungalows-oulad-chmicha.jpg"}
                  alt={`Photo : ${item.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {unit?.nightlyRateDh ?? 0} DH / nuit
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-soft)]">{item.shortDescription}</p>
              <ul className="mt-3 list-disc pl-4 text-sm text-[var(--color-ink-soft)]">
                {item.amenities.slice(0, 3).map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
              <Link
                href={`/hebergements/${item.slug}`}
                className="mt-auto inline-flex pt-5 text-sm font-semibold text-[var(--color-accent)]"
              >
                Voir details
              </Link>
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
