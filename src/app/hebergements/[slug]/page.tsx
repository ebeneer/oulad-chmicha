import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { accommodations, reservations, units } from "@/lib/domain";
import { siteConfig, whatsappUrl } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLabel, Input } from "@/components/ui/field";
import { SectionHeader } from "@/components/ui/section-header";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const accommodation = accommodations.find((item) => item.slug === slug);
  if (!accommodation) {
    return { title: "Hebergement introuvable" };
  }
  return {
    title: accommodation.title,
    description: accommodation.shortDescription,
    alternates: {
      canonical: `/hebergements/${accommodation.slug}`,
    },
  };
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const accommodation = accommodations.find((item) => item.slug === slug);
  if (!accommodation) notFound();

  const unit = units.find((item) => item.id === accommodation.unitId);
  const upcomingReservations = reservations.filter(
    (item) => item.unitId === accommodation.unitId,
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: accommodation.title,
    description: accommodation.shortDescription,
    url: `${siteConfig.url}/hebergements/${accommodation.slug}`,
    image: accommodation.images.map((image) => `${siteConfig.url}${image}`),
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: unit?.capacity ?? 1,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: unit?.nightlyRateDh ?? 0,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-elevated)] sm:p-8">
        <div className="absolute inset-0">
          <Image
            src={accommodation.images[0] ?? "/images/piscine-bungalows-oulad-chmicha.jpg"}
            alt={accommodation.title}
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)]/85 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <Badge tone="warning">
            {unit?.nightlyRateDh ?? 0} DH / nuit - {unit?.capacity ?? 0} pers.
          </Badge>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {accommodation.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-ink-soft)] sm:text-lg">
            {accommodation.longDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a
                href={whatsappUrl(`Bonjour, je souhaite reserver ${accommodation.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp reservation
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={`mailto:${siteConfig.contactEmail}`}>Contacter par email</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card className="section-enter p-6 sm:p-7">
          <SectionHeader
            eyebrow="Infos"
            title="Confort et equipements"
            description="Tous les details essentiels pour choisir rapidement le logement adapte."
          />
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--color-ink-soft)]">
            {accommodation.amenities.map((amenity) => (
              <li key={amenity} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2">
                {amenity}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="section-enter p-6 sm:p-7">
          <SectionHeader
            eyebrow="Disponibilites"
            title="Vue rapide des dates reservees"
            description="Verification instantanee pour pre-qualifier la demande avant confirmation."
          />
          <div className="mt-4 space-y-2">
            {upcomingReservations.length === 0 ? (
              <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3 text-sm text-[var(--color-ink-soft)]">
                Aucune reservation en cours.
              </p>
            ) : (
              upcomingReservations.map((reservation) => (
                <p key={reservation.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3 text-sm">
                  {reservation.checkIn} {"->"} {reservation.checkOut}
                </p>
              ))
            )}
          </div>
        </Card>
      </section>

      <Card className="section-enter mt-6 p-6 sm:p-7">
        <SectionHeader
          eyebrow="Demande de reservation"
          title="Confirmez votre sejour"
          description="Formulaire direct pour reserver ce logement en priorite."
        />
        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          action={`mailto:${siteConfig.contactEmail}`}
          method="post"
          encType="text/plain"
        >
          <div className="space-y-2">
            <FieldLabel htmlFor="booking-name">Nom complet</FieldLabel>
            <Input id="booking-name" name="name" placeholder="Nom complet" required />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="booking-email">Email</FieldLabel>
            <Input id="booking-email" name="email" placeholder="Email" type="email" required />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="booking-checkin">Date arrivee</FieldLabel>
            <Input id="booking-checkin" name="checkIn" type="date" required />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="booking-checkout">Date depart</FieldLabel>
            <Input id="booking-checkout" name="checkOut" type="date" required />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <FieldLabel htmlFor="booking-whatsapp">WhatsApp</FieldLabel>
            <Input id="booking-whatsapp" name="whatsapp" placeholder="+212..." required />
          </div>
          <input type="hidden" name="accommodation" value={accommodation.title} />
          <Button className="sm:col-span-2" type="submit">Envoyer la demande</Button>
        </form>
        <a
          className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] underline"
          href={whatsappUrl(`Bonjour, je souhaite reserver ${accommodation.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ou envoyer via WhatsApp
        </a>
      </Card>
    </main>
  );
}
