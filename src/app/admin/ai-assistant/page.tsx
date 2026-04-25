"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldLabel, Textarea } from "@/components/ui/field";
import { SectionHeader } from "@/components/ui/section-header";

type MessageResponse = {
  reply: string;
  error?: string;
};

type DiagnosticResponse = {
  diagnostic: string;
  disclaimer: string;
  error?: string;
};

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState(
    "Ecris un message check-in clair en francais pour un client qui arrive ce soir.",
  );
  const [reply, setReply] = useState("");
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function generateMessage() {
    setLoadingText(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/ai/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await response.json()) as MessageResponse;
      if (!response.ok) {
        setErrorMessage(data.error ?? "Generation indisponible.");
        return;
      }
      setReply(data.reply);
    } catch {
      setErrorMessage("Generation indisponible.");
    } finally {
      setLoadingText(false);
    }
  }

  async function runDiagnostic() {
    if (!file) return;
    setLoadingImage(true);
    setErrorMessage("");
    try {
      const payload = new FormData();
      payload.append("file", file);
      payload.append(
        "prompt",
        "Analyse cette photo pour identifier des especes/plantes/champignons ou problemes de construction/eau/energie solaire. Donne des actions concretes.",
      );
      const response = await fetch("/api/ai/diagnostic", {
        method: "POST",
        body: payload,
      });
      const data = (await response.json()) as DiagnosticResponse;
      if (!response.ok) {
        setErrorMessage(data.error ?? "Diagnostic indisponible.");
        return;
      }
      setDiagnostic(`${data.diagnostic}\n\n${data.disclaimer}`);
    } catch {
      setErrorMessage("Diagnostic indisponible.");
    } finally {
      setLoadingImage(false);
    }
  }

  return (
    <main className="space-y-6">
      <Card className="section-enter p-6 sm:p-7">
        <SectionHeader
          eyebrow="Assistant IA"
          title="Messages clients & diagnostic photo"
          description="Automatisez les reponses frequentes et obtenez une aide terrain structurée."
        />
      </Card>
      {errorMessage ? (
        <p className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">{errorMessage}</p>
      ) : null}

      <Card as="section" className="section-enter p-6">
        <h2 className="font-[var(--font-display)] text-3xl">Messages automatiques</h2>
        <div className="mt-4 space-y-2">
          <FieldLabel htmlFor="ai-message-prompt">Prompt client</FieldLabel>
          <Textarea
          id="ai-message-prompt"
          rows={5}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        </div>
        <Button
          type="button"
          onClick={generateMessage}
          disabled={loadingText}
          className="mt-4"
        >
          {loadingText ? "Generation..." : "Generer une reponse"}
        </Button>
        {reply ? (
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-sm whitespace-pre-wrap">
            {reply}
          </pre>
        ) : null}
      </Card>

      <Card as="section" className="section-enter p-6">
        <h2 className="font-[var(--font-display)] text-3xl">Diagnostic photo IA</h2>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Exemples: plante/champignon, fissure, solution isolation, optimisation eau/solaire.
        </p>
        <input
          className="mt-3 block w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm"
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          onClick={runDiagnostic}
          disabled={!file || loadingImage}
          className="mt-4"
        >
          {loadingImage ? "Analyse..." : "Analyser la photo"}
        </Button>
        {diagnostic ? (
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-sm whitespace-pre-wrap">{diagnostic}</pre>
        ) : null}
      </Card>
    </main>
  );
}
