import Image from "next/image";
import { activities } from "@/lib/domain";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata = {
  title: "Activites",
  description: "Decouvrez les experiences disponibles pendant votre sejour.",
};

export default function ActivitiesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <Card className="section-enter overflow-hidden p-0 sm:p-0">
        <div className="relative aspect-[21/9] min-h-[10rem] w-full sm:aspect-[24/9]">
          <Image
            src="/images/eco-ferme-oulad-chmicha.jpg"
            alt="Vue de la ferme et des espaces naturels pour les activites au domaine"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/55 to-transparent" />
        </div>
        <div className="p-6 sm:p-8 sm:pt-6">
          <SectionHeader
            eyebrow="Experiences"
            title="Activites"
            description="Programmez des moments authentiques en harmonie avec la nature et le rythme du domaine."
          />
        </div>
      </Card>

      <section className="mt-6 grid gap-3">
        {activities.map((activity) => (
          <Card key={activity} className="section-enter p-4">
            <h2 className="font-[var(--font-display)] text-2xl">{activity}</h2>
          </Card>
        ))}
      </section>
    </main>
  );
}
