import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { accommodations, activities, units } from "@/lib/domain";
import { absoluteUrl, siteConfig, whatsappUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import LandingStickyCta from "@/components/landing-sticky-cta";
import NatureOrnaments from "@/components/premium/nature-ornaments";
import { LodgeHeader } from "@/components/premium/lodge-header";
import { LeafMark } from "@/components/brand/leaf-mark";
import { GalleryArchCarousel } from "@/components/premium/gallery-arch-carousel";

/* Reference capture : design-reference/hero-ui-reference-2025-04-25.png (hero seul) */

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: siteConfig.url,
    type: "website",
  },
};

export default function Home() {
  const featuredAccommodations = accommodations.slice(0, 4);
  const primaryCtaLabel = "Reserver maintenant";
  const navItems = [
    { label: "A propos", href: "#about-story" },
    { label: "Hebergements", href: "#hebergement" },
    { label: "Experiences", href: "#experiences" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#lead-capture" },
  ];
  const guestSignals = [
    "Hospitalite chaleureuse",
    "Cuisine maison genereuse",
    "Calme et deconnexion",
    "Espaces propres et soignes",
  ];
  const faqItems = [
    {
      q: "Quel type de lieu est Oulad Chmicha ?",
      a: "Une retraite nature situee dans une ferme de permaculture de 20 hectares, entre ecologie, calme et confort.",
    },
    {
      q: "Quels hebergements proposez-vous ?",
      a: "Des bungalows et chambres avec architecture ecologique en briques d'argile et confort moderne.",
    },
    {
      q: "Comment reserver rapidement ?",
      a: "Via WhatsApp ou formulaire. Nous revenons rapidement avec une proposition adaptee a vos dates.",
    },
  ];
  const galleryImages = [
    {
      src: "/images/piscine-bungalows-oulad-chmicha.jpg",
      alt: "Piscine et bungalows en terre crue a Oulad Chmicha",
    },
    {
      src: "/images/eco-ferme-oulad-chmicha.jpg",
      alt: "Ferme de permaculture et paysages du domaine Oulad Chmicha",
    },
    {
      src: "/images/transat-piscine-oulad-chmicha.jpg",
      alt: "Espace detente avec transats pres de la piscine",
    },
    {
      src: "/images/piscine-collines-oulad-chmicha.jpg",
      alt: "Vue de la piscine avec les collines autour du domaine",
    },
    {
      src: "/images/architecture-ecologique-oulad-chmicha.jpg",
      alt: "Architecture ecologique en briques d'argile au domaine",
    },
    {
      src: "/images/cuisine-frites-oulad-chmicha.jpg",
      alt: "Cuisine maison servie aux voyageurs",
    },
    {
      src: "/images/cuisine-houmous-oulad-chmicha.jpg",
      alt: "Specialites locales et cuisine mediterraneenne",
    },
    {
      src: "/images/cuisine-kefta-oulad-chmicha.jpg",
      alt: "Plat traditionnel propose sur place",
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Oulad Chmicha",
    description: siteConfig.description,
    url: siteConfig.url,
    image: [
      absoluteUrl("/images/piscine-bungalows-oulad-chmicha.jpg"),
      absoluteUrl("/images/eco-ferme-oulad-chmicha.jpg"),
      absoluteUrl("/images/architecture-ecologique-oulad-chmicha.jpg"),
    ],
    priceRange: "700-1200 MAD",
    address: { "@type": "PostalAddress", addressCountry: "MA" },
    // aggregateRating volontairement absent: doit etre derive d'avis verifiables (Google, Booking)
    // pour ne pas declencher de penalite "Rich results manuel review" Google.
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#071b12] text-[var(--color-ink)]">
      <LandingStickyCta />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative min-h-[92vh] overflow-hidden">
          <Image
            src="/images/piscine-collines-oulad-chmicha.jpg"
            alt="Vue principale du domaine Oulad Chmicha"
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.16),transparent_24%),linear-gradient(90deg,rgba(7,27,18,0.9)_0%,rgba(7,27,18,0.7)_42%,rgba(7,27,18,0.18)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[var(--color-surface)]/30 to-[var(--color-surface)]" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[var(--color-surface)]/30 to-[var(--color-surface)]" aria-hidden />
          <NatureOrnaments />

          <LodgeHeader
            navItems={navItems}
            primaryCtaLabel={primaryCtaLabel}
            primaryCtaHref="#lead-capture"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-48 sm:px-8 sm:pt-56 lg:pt-64">
            <div className="max-w-4xl text-white">
              <h1 className="font-[var(--font-display)] text-5xl font-black leading-[0.86] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
                Retraite nature,
                <br aria-hidden /> silence, et
                <br aria-hidden /> confort brut.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
                Oulad-Chmicha est une ferme de permaculture de 20 hectares qui allie
                architecture marocaine traditionnelle, confort moderne et sejour
                ecologique au coeur de la nature.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild variant="onDark" size="md" className="px-7 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.65)]">
                  <a href="#lead-capture" className="group inline-flex items-center gap-3">
                    {primaryCtaLabel}
                    <span
                      className="grid h-7 w-7 place-items-center rounded-full bg-[#a86b3a] text-sm text-white transition group-hover:translate-x-0.5 group-hover:bg-[#c87f4f]"
                      aria-hidden
                    >
                      →
                    </span>
                  </a>
                </Button>
                <Button asChild variant="outlineOnDark" size="md" className="px-6">
                  <a href="#hebergement">Voir les hebergements</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about-story" className="bg-[var(--color-surface)] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionHeader
                eyebrow="A propos"
                title="Une ferme vivante, pas un hotel standard."
                description="Le luxe ici vient du calme, des materiaux naturels, de l'espace et de l'accueil humain."
              />
            </div>
            <div className="divide-y divide-[var(--color-ink)]/15">
              {[
                ["Permaculture", "20 hectares cultives dans une logique durable."],
                ["Architecture", "Briques d'argile, construction traditionnelle, confort moderne."],
                ["Eau", "Gestion durable avec recuperation et recyclage."],
              ].map(([title, text], index) => (
                <div key={title} className="grid gap-5 py-7 sm:grid-cols-[4rem_0.8fr_1fr] sm:items-start">
                  <span className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)] sm:pt-3">
                    0{index + 1}
                  </span>
                  <h3 className="font-[var(--font-display)] text-4xl font-black leading-none tracking-[-0.045em] text-[var(--color-ink)]">
                    {title}
                  </h3>
                  <p className="text-sm leading-7 text-[var(--color-ink-soft)] sm:pt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="hebergement" className="relative bg-[#f3eadb] px-5 py-16 sm:px-8 lg:py-24">
          <Image
            src="/images/piscine-bungalows-oulad-chmicha.jpg"
            alt=""
            width={1600}
            height={1000}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
          />
          <div className="relative mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Hebergements"
              title="Des refuges sobres, intimes, proches de la terre."
              description="Bungalows et chambres pour un sejour calme, authentique et confortable en pleine nature."
              titleClassName="text-[#0f4229]"
              eyebrowClassName="text-[#2b6f3e]"
              descriptionClassName="text-[#526156]"
            />
            <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
              {featuredAccommodations.map((item, index) => (
                <article
                  key={item.slug}
                  className={`lodge-card group ${index % 2 === 1 ? "md:pt-20" : ""}`}
                >
                  <div className="lodge-image">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <p className="lodge-meta">Refuge nature</p>
                      <h3 className="mt-4 font-[var(--font-display)] text-4xl font-semibold leading-none text-[#0f4229]">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-7 text-[#526156]">{item.shortDescription}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-[var(--font-display)] text-3xl font-semibold text-[#7a4e31]">
                        {units.find((unit) => unit.id === item.unitId)?.nightlyRateDh ?? 0} DH
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8b7559]">par nuit</p>
                    </div>
                  </div>
                  <Link
                    href={`/hebergements/${item.slug}`}
                    className="editorial-line inline-flex w-fit text-sm font-semibold text-[var(--color-accent)]"
                  >
                    Voir details
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiences" className="relative overflow-hidden bg-[#071b12] px-5 py-16 text-white sm:px-8 lg:py-24">
          <Image
            src="/images/transat-piscine-oulad-chmicha.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-14"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(90,184,95,0.22),transparent_30%),linear-gradient(180deg,rgba(7,27,18,0.92),rgba(7,27,18,0.98))]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#bde6b8]">Experiences</p>
              <h2 className="mt-4 font-[var(--font-display)] text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
                Le programme est simple: ralentir.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/74">
                Nature, repas, silence, jardin, piscine et architecture ecologique forment une experience de deconnexion.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {activities.map((activity) => (
                <div key={activity} className="editorial-line pt-5 text-white/90">
                  <p className="text-lg font-medium">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="avis" className="bg-[var(--color-surface)] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="hotel-card overflow-hidden">
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Avis Google
                </p>
                <p className="mt-5 font-[var(--font-display)] text-7xl font-black leading-none text-[var(--color-ink)]">
                  5.0
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">
                  Note actuellement visible, basee sur 23 avis publics.
                </p>
                <Button asChild className="mt-7">
                  <a
                    href="https://www.google.com/travel/search?g2lb=4965990,72471280,72560029,72573224,72647020,72686036,72803964,72882230,72958624,73059275,73064764,121608706&hl=fr-MA&gl=ma&ssta=1&q=Ferme+%C3%89cologique+Oulad+Chmicha&ts=CAEaKgooEiYyJDB4ZGE2ZWYwODYwYWVlMTdmOjB4Y2Y3MDcyNmM3ZjdjZDNkNQ&qs=CAEyFENnc0kxYWZ6LThmTm5MalBBUkFCOAI&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:1250"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir Google Travel
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12">
              {guestSignals.map((signal, index) => (
                <div
                  key={signal}
                  className="border-l-2 border-[var(--color-accent)] pl-5 sm:pl-6"
                >
                  <p className="text-[0.65rem] font-semibold tabular-nums tracking-[0.3em] text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 max-w-[22ch] font-[var(--font-display)] text-lg font-medium leading-[1.3] tracking-[-0.04em] text-[var(--color-ink)] sm:text-[1.35rem]">
                    {signal}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3eadb] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeader
              eyebrow="Galerie"
              title="Une immersion avant meme le premier message."
              description="Images, matieres et calme pour projeter le voyageur dans l'experience."
              titleClassName="text-[#0f4229]"
              eyebrowClassName="text-[#2b6f3e]"
              descriptionClassName="text-[#526156]"
            />
            <GalleryArchCarousel images={galleryImages} />
          </div>
        </section>

        <section id="lead-capture" className="relative overflow-hidden bg-[#071b12] px-5 py-16 text-white sm:px-8 lg:py-24">
          <Image
            src="/images/cuisine-kefta-oulad-chmicha.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-12"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b12] via-[#071b12]/95 to-[#071b12]/78" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#bde6b8]">Reservation</p>
              <h2 className="mt-4 font-[var(--font-display)] text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
                Demandez votre offre en 60 secondes.
              </h2>
              <p className="mt-5 text-white/74">Partagez vos dates et nous revenons rapidement avec une proposition adaptee.</p>
              <p className="mt-8 text-sm uppercase tracking-[0.22em] text-white/55">Contact direct</p>
              <p className="mt-2 font-[var(--font-display)] text-4xl font-black leading-none tracking-[-0.05em]">
                +212 6 61 05 04 29
              </p>
            </div>
            <div className="booking-panel">
              <LeadCaptureForm primaryCtaLabel={primaryCtaLabel} />
              <div className="border-t border-[#0f4229]/10 bg-[linear-gradient(180deg,#faf7f2_0%,transparent_100%)] px-5 pb-6 pt-6 sm:px-7 sm:pb-7">
                <p className="mb-3 text-center font-[var(--font-display)] text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#6b7d6e]">
                  Messagerie instantanee
                </p>
                <Button
                  asChild
                  variant="secondary"
                  size="md"
                  className="group w-full gap-3 ring-1 ring-[#0f4229]/10 shadow-none transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-[0_10px_30px_-16px_rgb(15_66_41/0.45)] hover:ring-[#0f4229]/18"
                >
                  <a
                    href={whatsappUrl("Bonjour, je souhaite une offre immediate pour un sejour a Oulad Chmicha.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="size-5 shrink-0 text-[#1e6b45] opacity-95 transition-transform group-hover:scale-105 motion-reduce:transition-none"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.12 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="font-[var(--font-display)] text-[0.9375rem] font-semibold tracking-[-0.02em] text-[#0f4229]">
                      Continuer sur WhatsApp
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3eadb] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#2b6f3e]">FAQ</p>
              <h2 className="mt-4 font-[var(--font-display)] text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#0f4229] sm:text-7xl">
                Avant de venir.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#526156]">
                Les reponses essentielles pour comprendre le lieu, reserver simplement et arriver sereinement.
              </p>
            </div>
            <div className="divide-y divide-[#0f4229]/15">
              {faqItems.map((item, index) => (
                <div key={item.q} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr]">
                  <span className="text-xs uppercase tracking-[0.26em] text-[#2b6f3e]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-[var(--font-display)] text-3xl font-black leading-none tracking-[-0.045em] text-[#0f4229]">
                      {item.q}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#526156]">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden bg-[#071b12] px-5 py-14 text-white sm:px-8 lg:py-20">
          <Image
            src="/images/piscine-bungalows-oulad-chmicha.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(90,184,95,0.2),transparent_26%),linear-gradient(180deg,rgba(7,27,18,0.92),rgba(7,27,18,1))]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
                  <LeafMark className="h-8 w-8 text-[#bde6b8]" />
                </span>
                <span className="font-[var(--font-display)] text-3xl font-black tracking-[-0.04em]">
                  Oulad Chmicha
                </span>
              </div>
              <h2 className="mt-8 max-w-3xl font-[var(--font-display)] text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
                Une parenthese nature, reservee en direct.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="md" variant="onDark" className="px-5">
                  <a
                    href={whatsappUrl("Bonjour, je souhaite reserver un sejour a Oulad Chmicha.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp direct
                  </a>
                </Button>
                <Button asChild size="md" variant="outlineOnDark" className="max-w-full min-w-0 px-4 text-sm">
                  <a href={`mailto:${siteConfig.contactEmail}`} className="break-words text-center sm:text-left">
                    {siteConfig.contactEmail}
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid gap-6 text-sm text-white/72 sm:grid-cols-2 lg:text-right">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#bde6b8]">Contact</p>
                <p className="mt-3 text-white">+212 6 61 05 04 29</p>
                <p>{siteConfig.contactEmail}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#bde6b8]">Reperes</p>
                <p className="mt-3">Ferme de permaculture</p>
                <p>20 hectares</p>
                <p>Note Google 5.0 / 5</p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-3 pt-6 text-xs text-white/50">
            <p>© Oulad Chmicha</p>
            <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Site officiel
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
