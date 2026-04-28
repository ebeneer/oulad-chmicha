import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/admin-auth";
import { generateTextWithOpenAI } from "@/lib/openai";

type MessageBody = {
  prompt?: string;
};

export async function POST(request: Request) {
  if (!(await hasAdminSessionFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let body: MessageBody;
    try {
      body = (await request.json()) as MessageBody;
    } catch {
      return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
    }

    const prompt = body.prompt?.trim();

    if (!prompt || prompt.length < 8) {
      return NextResponse.json({ error: "Prompt manquant." }, { status: 400 });
    }

    if (prompt.length > 1_500) {
      return NextResponse.json({ error: "Prompt trop long (max 1500 caracteres)." }, { status: 400 });
    }

    const reply = await generateTextWithOpenAI([
      {
        role: "system",
        content:
          "Tu es assistant de relation client pour un eco-lodge au Maroc. Reponds de facon chaleureuse, claire, concise, pratique et orientee conversion.",
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
      { error: "Erreur IA message" },
      { status: 502 },
    );
  }
}
