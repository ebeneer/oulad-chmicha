import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

const modules = [
  {
    href: "/admin/reservations",
    title: "Reservations",
    description: "Vue unifiee Airbnb + Booking + direct avec unites 4+4.",
  },
  {
    href: "/admin/billing",
    title: "Devis & Factures",
    description: "Creer, envoyer et suivre les paiements client.",
  },
  {
    href: "/admin/clients",
    title: "Comptes clients",
    description: "Historique sejours, preferences et notes utiles.",
  },
  {
    href: "/admin/operations",
    title: "Operations",
    description: "Courses, stock, couverts repas et planning terrain.",
  },
  {
    href: "/admin/meals",
    title: "Repas",
    description: "Nombre de couverts par service et planning cuisine.",
  },
  {
    href: "/admin/tasks",
    title: "Planning equipes",
    description: "Suivi menage, check-in, maintenance et courses.",
  },
  {
    href: "/admin/ai-assistant",
    title: "Assistant IA",
    description: "Messages auto + diagnostic photo (terrain/construction/eau).",
  },
];

export default function AdminHomePage() {
  return (
    <main className="space-y-6">
      <Card className="section-enter p-6 sm:p-7">
        <SectionHeader
          eyebrow="Back-office Laurent"
          title="Pilotage quotidien du domaine"
          description="Interface mobile-first pour accelerer les decisions, reduire les oublis et fluidifier les operations."
        />
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="info">8 unites</Badge>
          <Badge tone="success">Operations centralisees</Badge>
          <Badge tone="warning">Assistants IA actifs</Badge>
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card
            key={module.href}
            className="section-enter p-0"
          >
            <Link href={module.href} className="block rounded-[var(--radius-card)] p-5">
              <h2 className="font-[var(--font-display)] text-2xl">{module.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-soft)]">{module.description}</p>
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}
