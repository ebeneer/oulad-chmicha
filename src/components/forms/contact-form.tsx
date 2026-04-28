"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input, Textarea } from "@/components/ui/field";

export function ContactForm() {
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
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      source: "contact-page",
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
      <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
        Merci ! Votre demande est bien recue. Nous revenons vers vous rapidement.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <FieldLabel htmlFor="contact-name">Nom complet</FieldLabel>
        <Input id="contact-name" name="name" placeholder="Nom" required />
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="contact-email">Email</FieldLabel>
        <Input id="contact-email" name="email" placeholder="Email" type="email" required />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <FieldLabel htmlFor="contact-message">Votre demande</FieldLabel>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Dates souhaitees, nombre de personnes, type de logement, contraintes..."
          required
        />
      </div>
      {status === "error" && errorMessage ? (
        <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">{errorMessage}</p>
      ) : null}
      <Button className="sm:col-span-2" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Envoi..." : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
