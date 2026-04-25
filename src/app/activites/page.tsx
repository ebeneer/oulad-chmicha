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
      <Card className="section-enter p-6 sm:p-8">
        <SectionHeader
          eyebrow="Experiences"
          title="Activites"
          description="Programmez des moments authentiques en harmonie avec la nature et le rythme du domaine."
        />
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
