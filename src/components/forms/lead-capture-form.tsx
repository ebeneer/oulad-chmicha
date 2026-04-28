"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input, Textarea } from "@/components/ui/field";

type LeadCaptureFormProps = {
  source?: string;
  primaryCtaLabel: string;
};

export function LeadCaptureForm({ source = "landing-lead-gen", primaryCtaLabel }: LeadCaptureFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      checkIn: String(formData.get("checkIn") ?? ""),
      checkOut: String(formData.get("checkOut") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      source,
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setErrorMessage(data.error ?? "Envoi impossible. Reessayez ou contactez-nous via WhatsApp.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Reseau indisponible. Reessayez ou contactez-nous via WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="grid gap-2 p-5 sm:p-7">
        <p className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
          Merci ! Votre demande est bien recue. Nous revenons vers vous rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
      <div className="space-y-2">
        <FieldLabel htmlFor="lead-name">Nom complet</FieldLabel>
        <Input id="lead-name" name="name" placeholder="Votre nom" required />
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="lead-contact">WhatsApp ou email</FieldLabel>
        <Input id="lead-contact" name="contact" placeholder="+212... / email" required />
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="lead-checkin">Date arrivee</FieldLabel>
        <Input id="lead-checkin" name="checkIn" type="date" required />
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="lead-checkout">Date depart</FieldLabel>
        <Input id="lead-checkout" name="checkOut" type="date" required />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <FieldLabel htmlFor="lead-notes">Contexte (optionnel)</FieldLabel>
        <Textarea
          id="lead-notes"
          name="notes"
          rows={4}
          placeholder="Nombre de personnes, preferences logement, activites souhaitees..."
        />
      </div>
      {status === "error" && errorMessage ? (
        <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">{errorMessage}</p>
      ) : null}
      <Button type="submit" className="sm:col-span-2" disabled={status === "loading"}>
        {status === "loading" ? "Envoi..." : primaryCtaLabel}
      </Button>
    </form>
  );
}
