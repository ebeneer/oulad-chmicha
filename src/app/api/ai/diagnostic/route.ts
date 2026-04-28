import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/admin-auth";
import { generateTextWithOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  if (!(await hasAdminSessionFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const file = data.get("file");
    const prompt = (data.get("prompt") as string | null)?.trim();

    if (!(file instanceof File) || !prompt) {
      return NextResponse.json({ error: "Fichier ou prompt manquant." }, { status: 400 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 8 MB)." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Type de fichier non supporte. Utilisez une image." }, { status: 400 });
    }

    // MVP simple: nous utilisons d'abord les metadonnees et le contexte utilisateur.
    // La vraie lecture image vision sera branchee dans l'etape suivante.
    const diagnostic = await generateTextWithOpenAI([
      {
        role: "system",
        content:
          "Tu es un assistant expert terrain en agroecologie, construction naturelle, energie solaire et gestion de l'eau. Donne des recommandations pratiques et priorisees.",
      },
      {
        role: "user",
        content: `${prompt}\nNom fichier: ${file.name}\nType: ${file.type}\nTaille: ${file.size} octets`,
      },
    ]);

    return NextResponse.json({
      diagnostic,
      disclaimer:
        "Important: ce diagnostic IA est une aide a la decision. Verification humaine obligatoire avant toute action terrain.",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "OPENAI_API_KEY_MISSING") {
      return NextResponse.json(
        { error: "Service IA indisponible. Configuration API manquante." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Erreur IA diagnostic" },
      { status: 502 },
    );
  }
}
