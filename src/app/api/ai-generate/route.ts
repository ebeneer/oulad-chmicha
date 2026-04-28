import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/admin-auth";
import { generateTextWithOpenAI } from "@/lib/openai";

type Body = {
  context?: string;
  guestName?: string;
  language?: string;
  messageType?: "directions" | "check_in" | "check_out" | "faq" | "custom";
};

export async function POST(request: Request) {
  if (!(await hasAdminSessionFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
    }

    const messageType = body.messageType ?? "custom";
    const guestName = body.guestName ?? "client";
    const language = body.language ?? "fr";
    const context = body.context ?? "";
    if (context.length > 1_500) {
      return NextResponse.json({ error: "Contexte trop long (max 1500 caracteres)." }, { status: 400 });
    }

    const prompt = `Type: ${messageType}
Langue: ${language}
Client: ${guestName}
Contexte: ${context}

Genere un message utile, chaleureux, concret et court pour Oulad Chmicha.`;

    const reply = await generateTextWithOpenAI([
      {
        role: "system",
        content:
          "Tu aides un eco-lodge marocain a repondre vite et clairement aux clients sur WhatsApp, Airbnb et Booking.",
      },
      { role: "user", content: prompt },
    ]);

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Error && error.message === "OPENAI_API_KEY_MISSING") {
      return NextResponse.json(
        { error: "Service IA indisponible. Configuration API manquante." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Erreur generation IA" },
      { status: 502 },
    );
  }
}
