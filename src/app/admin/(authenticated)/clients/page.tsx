import { clients, invoices, reservations } from "@/lib/domain";

function channelLabel(channel: string) {
  if (channel === "airbnb") return "Airbnb";
  if (channel === "booking") return "Booking.com";
  return "Direct";
}

export default function ClientsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8">
      <h1 className="text-2xl font-bold">Comptes clients</h1>
      <p className="mt-2 text-stone-700">
        Fiches clients centralisees pour personnaliser les messages et augmenter la fidelisation.
      </p>

      <section className="mt-6 grid gap-3">
        {clients.map((client) => (
          <article key={client.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{client.fullName}</h2>
                <p className="text-sm text-stone-700">
                  {client.email} - {client.phone}
                </p>
                <p className="text-sm text-stone-600">Langue: {client.language}</p>
                <p className="text-sm text-stone-600">
                  Canal principal: {channelLabel(client.sourceChannel)}
                </p>
              </div>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium">
                {client.staysCount} sejour(s)
              </span>
            </div>
            <p className="mt-3 rounded-lg bg-stone-50 p-3 text-sm text-stone-700">
              {client.notes}
            </p>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <p className="rounded-lg bg-lime-50 p-2 text-lime-900">
                Depense totale: {client.totalSpentDh} DH
              </p>
              <p className="rounded-lg bg-blue-50 p-2 text-blue-900">
                Dernier sejour: {client.lastStayDate}
              </p>
              <p className="rounded-lg bg-amber-50 p-2 text-amber-900">
                Regime: {client.dietaryPreferences ?? "Non renseigne"}
              </p>
            </div>
            <div className="mt-3 rounded-lg border border-stone-200 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Historique recent
              </p>
              <div className="mt-2 space-y-1 text-sm">
                {reservations
                  .filter((reservation) => reservation.guestName === client.fullName)
                  .map((reservation) => (
                    <p key={reservation.id} className="text-stone-700">
                      Reservation {reservation.id}: {reservation.checkIn} {"->"}{" "}
                      {reservation.checkOut} ({reservation.channel})
                    </p>
                  ))}
                {invoices
                  .filter((invoice) => invoice.clientName === client.fullName)
                  .map((invoice) => (
                    <p key={invoice.id} className="text-stone-700">
                      Facture {invoice.id}: {invoice.amountDh} DH ({invoice.status})
                    </p>
                  ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
