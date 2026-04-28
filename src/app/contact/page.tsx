import { siteConfig, whatsappUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata = {
  title: "Contact",
  description: "Contactez Oulad Chmicha pour reserver votre sejour.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    url: `${siteConfig.url}/contact`,
    email: siteConfig.contactEmail,
    telephone: `+${siteConfig.whatsappPhone}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-elevated)] sm:p-8">
        <SectionHeader
          eyebrow="Contact & directions"
          title="Parlons de votre sejour"
          description="Envoyez vos dates, nombre de voyageurs et preferences. Nous revenons rapidement avec une proposition claire."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={whatsappUrl("Bonjour, je souhaite reserver un sejour a Oulad Chmicha.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp prioritaire
            </a>
          </Button>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] px-5 text-sm font-semibold"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="section-enter p-6 sm:p-7">
          <h2 className="font-[var(--font-display)] text-3xl">Formulaire rapide</h2>
          <ContactForm />
        </Card>

        <Card className="section-enter p-6 sm:p-7">
          <h2 className="font-[var(--font-display)] text-3xl">Acces</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-ink-soft)]">
            Utilisez l&apos;itineraire Google Maps pour arriver directement au domaine.
            Nous pouvons aussi partager les indications via WhatsApp.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] px-5 text-sm font-semibold"
              href="https://maps.app.goo.gl/EGqRb2SeYNYEDXx7A"
              target="_blank"
              rel="noreferrer"
            >
              Ouvrir Google Maps
            </a>
            <Button asChild variant="secondary" className="w-full">
              <a
                href={whatsappUrl("Bonjour, pouvez-vous me partager les indications pour arriver a Oulad Chmicha ?")}
                target="_blank"
                rel="noreferrer"
              >
                Recevoir les indications WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
            Reponse rapide - Organisation simplifiee - Conversion directe
          </p>
        </Card>
      </section>

      <section className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)]">
        <p className="text-sm leading-6 text-[var(--color-ink-soft)]">
          Localisation Google Maps :
          {" "}
          <a
            className="font-semibold text-[var(--color-accent)] underline"
            href="https://maps.app.goo.gl/EGqRb2SeYNYEDXx7A"
            target="_blank"
            rel="noreferrer"
          >
            ouvrir la carte
          </a>
        </p>
      </section>
    </main>
  );
}
