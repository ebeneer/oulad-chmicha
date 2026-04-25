import { computeWeeklyStockNeeds, mealPlanWeek } from "@/lib/domain";

export default function MealsPage() {
  const totals = mealPlanWeek.reduce(
    (acc, day) => ({
      breakfast: acc.breakfast + day.breakfastCovers,
      lunch: acc.lunch + day.lunchCovers,
      dinner: acc.dinner + day.dinnerCovers,
    }),
    { breakfast: 0, lunch: 0, dinner: 0 },
  );
  const stockNeeds = computeWeeklyStockNeeds().filter((item) => item.missingQty > 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8">
      <h1 className="text-2xl font-bold">Planning repas & cuisine</h1>
      <p className="mt-2 text-stone-700">
        Pilotage des couverts par jour et consolidation des besoins cuisine.
      </p>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-stone-500">Petit-dej semaine</p>
          <p className="mt-1 text-xl font-semibold">{totals.breakfast}</p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-stone-500">Dejeuner semaine</p>
          <p className="mt-1 text-xl font-semibold">{totals.lunch}</p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-stone-500">Diner semaine</p>
          <p className="mt-1 text-xl font-semibold">{totals.dinner}</p>
        </article>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Planning cuisine journalier</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {mealPlanWeek.map((day) => (
            <article key={day.date} className="rounded-lg border border-stone-200 p-3 text-sm">
              <p className="font-medium">{day.date}</p>
              <p>Petit-dej: {day.breakfastCovers} couverts</p>
              <p>Dejeuner: {day.lunchCovers} couverts</p>
              <p>Diner: {day.dinnerCovers} couverts</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Consolidation ingredients</h2>
        <div className="mt-3 space-y-2">
          {stockNeeds.length === 0 ? (
            <p className="text-sm text-stone-600">Stock cuisine suffisant pour la semaine.</p>
          ) : (
            stockNeeds.map((item) => (
              <p key={item.itemId} className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                Ingredient manquant: {item.itemName} ({item.missingQty}
                {item.unit})
              </p>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
