import {
  computeReservationDemandHorizon,
  computeWeeklyStockNeeds,
  mealPlanWeek,
  operationsTasks,
  stockItems,
} from "@/lib/domain";

export default function OperationsPage() {
  const lowStock = stockItems.filter((item) => item.currentQty < item.minQty);
  const stockNeeds = computeWeeklyStockNeeds();
  const reservationDemand = computeReservationDemandHorizon(7);
  const urgentPurchases = stockNeeds.filter((item) => item.missingQty > 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8">
      <h1 className="text-2xl font-bold">Operations: stock, repas, planning</h1>
      <p className="mt-2 text-stone-700">
        Ecran central pour anticiper les besoins terrain et eviter les ruptures.
      </p>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Alertes stock</h2>
        <div className="mt-3 space-y-2">
          {lowStock.map((item) => (
            <p key={item.id} className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              {item.name}: {item.currentQty}
              {item.unit} (min {item.minQty}
              {item.unit})
            </p>
          ))}
          {lowStock.length === 0 ? (
            <p className="text-sm text-stone-600">Aucune alerte stock aujourd&apos;hui.</p>
          ) : null}
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Besoins stock selon reservations (7 jours)</h2>
        <p className="mt-2 text-sm text-stone-700">
          {reservationDemand.upcomingGuests} guests prevus - projection repas:{" "}
          {reservationDemand.estimatedBreakfasts} petits-dejeuners,{" "}
          {reservationDemand.estimatedLunches} dejeuners,{" "}
          {reservationDemand.estimatedDinners} diners.
        </p>
        <div className="mt-3 space-y-2">
          {stockNeeds.map((need) => (
            <article key={need.itemId} className="rounded-lg border border-stone-200 p-3 text-sm">
              <p className="font-medium">{need.itemName}</p>
              <p className="text-stone-700">
                Requis: {need.requiredQty}
                {need.unit} - Stock: {need.currentQty}
                {need.unit}
              </p>
              <p className={need.missingQty > 0 ? "text-amber-700" : "text-lime-700"}>
                Manquant: {need.missingQty}
                {need.unit}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Liste courses urgente</h2>
        <div className="mt-3 space-y-2">
          {urgentPurchases.length === 0 ? (
            <p className="text-sm text-stone-600">Aucune course urgente.</p>
          ) : (
            urgentPurchases.map((item) => (
              <p key={item.itemId} className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                Acheter {item.missingQty}
                {item.unit} de {item.itemName}
              </p>
            ))
          )}
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Couverts repas (semaine)</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {mealPlanWeek.map((day) => (
            <article key={day.date} className="rounded-lg bg-stone-50 p-3 text-sm">
              <p className="font-medium">{day.date}</p>
              <p>Petit-dej: {day.breakfastCovers}</p>
              <p>Dejeuner: {day.lunchCovers}</p>
              <p>Diner: {day.dinnerCovers}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Planning terrain</h2>
        <div className="mt-3 space-y-2">
          {operationsTasks.map((task) => (
            <article key={task.id} className="rounded-lg border border-stone-200 p-3 text-sm">
              <p className="font-medium">{task.label}</p>
              <p className="text-stone-700">
                {task.date} - {task.assignee}
              </p>
              <p className="text-stone-600">Statut: {task.status}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
