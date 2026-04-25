"use client";

import { useMemo, useState } from "react";
import { invoices, quotes } from "@/lib/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";

function formatMoney(amountDh: number) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(amountDh);
}

export default function BillingPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id ?? "");

  const selectedInvoice = useMemo(
    () => invoices.find((invoice) => invoice.id === selectedInvoiceId),
    [selectedInvoiceId],
  );

  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amountDh, 0);
  const totalPaid = invoices.reduce((sum, invoice) => sum + (invoice.paidAmountDh ?? 0), 0);
  const pendingCollection = totalInvoiced - totalPaid;

  const downloadInvoicePdf = () => {
    if (!selectedInvoice) return;
    const html = `<!doctype html><html><head><meta charset="utf-8" /><title>Facture ${selectedInvoice.id}</title></head><body><h1>Facture ${selectedInvoice.id}</h1><p>Client: ${selectedInvoice.clientName}</p><p>Montant: ${formatMoney(selectedInvoice.amountDh)}</p><p>Date: ${selectedInvoice.createdAt}</p><p>Echeance: ${selectedInvoice.dueAt ?? "-"}</p><p>Statut: ${selectedInvoice.status}</p><p>Paye: ${formatMoney(selectedInvoice.paidAmountDh ?? 0)}</p><hr /><p>Oulad Chmicha</p></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedInvoice.id}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="space-y-6">
      <Card className="section-enter p-6 sm:p-7">
        <SectionHeader
          eyebrow="Finance"
          title="Devis & facturation"
          description="Suivez les montants emises, encaisses et restants, puis convertissez rapidement un devis en facture."
        />
      </Card>

      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total facture" value={formatMoney(totalInvoiced)} />
        <StatCard label="Total encaisse" value={formatMoney(totalPaid)} tone="success" />
        <StatCard label="Reste a encaisser" value={formatMoney(pendingCollection)} tone="warning" />
      </section>

      <Card as="section" className="section-enter p-4">
        <h2 className="font-semibold">Creation rapide</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Button>Nouveau devis</Button>
          <Button variant="secondary">Nouvelle facture</Button>
          <Button type="button" onClick={downloadInvoicePdf} variant="secondary">
            Export PDF (impression)
          </Button>
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="section-enter p-4">
          <h2 className="font-semibold">Devis</h2>
          <div className="mt-3 space-y-2">
            {quotes.map((quote) => (
              <div key={quote.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm">
                <p className="font-medium">
                  {quote.id} - {quote.clientName}
                </p>
                <p className="text-[var(--color-ink-soft)]">
                  {formatMoney(quote.amountDh)} - valide jusqu&apos;au {quote.validUntil}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge tone="info">
                    {quote.status}
                  </Badge>
                  <button className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold">
                    Convertir en facture
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="section-enter p-4">
          <h2 className="font-semibold">Factures</h2>
          <div className="mt-3 space-y-2">
            {invoices.map((invoice) => (
              <button
                key={invoice.id}
                type="button"
                onClick={() => setSelectedInvoiceId(invoice.id)}
                className={`w-full rounded-xl border p-3 text-left text-sm ${
                  selectedInvoiceId === invoice.id
                    ? "border-[var(--color-accent)] bg-[var(--color-surface-muted)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <p className="font-medium">
                  {invoice.id} - {invoice.clientName}
                </p>
                <p className="text-[var(--color-ink-soft)]">
                  Montant: {formatMoney(invoice.amountDh)} - Paye:{" "}
                  {formatMoney(invoice.paidAmountDh ?? 0)}
                </p>
                <div className="mt-2">
                  <Badge tone={invoice.status === "paid" ? "success" : "warning"}>
                    {invoice.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
