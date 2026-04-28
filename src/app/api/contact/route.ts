import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  contact?: string;
  email?: string;
  message?: string;
  notes?: string;
  checkIn?: string;
  checkOut?: string;
  source?: string;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return bad("Payload JSON invalide.");
  }

  const name = body.name?.trim();
  const contactInfo = (body.contact ?? body.email ?? "").trim();
  const message = (body.message ?? body.notes ?? "").trim();

  if (!name || !contactInfo) return bad("Nom et email/WhatsApp requis.");
  if (name.length > 200 || contactInfo.length > 200 || message.length > 4000) {
    return bad("Champs trop longs.");
  }

  const payload = {
    name,
    contact: contactInfo,
    message,
    checkIn: body.checkIn?.trim() || null,
    checkOut: body.checkOut?.trim() || null,
    source: body.source?.trim() || "site",
    receivedAt: new Date().toISOString(),
  };

  // 1) Resend (optionnel) : si RESEND_API_KEY + CONTACT_TO_EMAIL configures, on relaie par email.
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (resendKey && toEmail && fromEmail) {
    try {
      const subject = `Nouveau lead - ${payload.name} (${payload.source})`;
      const text = [
        `Nom: ${payload.name}`,
        `Contact: ${payload.contact}`,
        payload.checkIn ? `Arrivee: ${payload.checkIn}` : null,
        payload.checkOut ? `Depart: ${payload.checkOut}` : null,
        "",
        payload.message || "(pas de message)",
        "",
        `Recu le: ${payload.receivedAt}`,
      ]
        .filter(Boolean)
        .join("\n");
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: fromEmail, to: [toEmail], subject, text }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));
      if (!r.ok) {
        // Fallback log silencieux : on ne casse pas la reponse client.
        console.error("Resend send failed", r.status, await r.text().catch(() => ""));
      }
    } catch (error) {
      console.error("Resend send error", error);
    }
  } else {
    // Pas d'integration mail : log applicatif, recuperable via Vercel logs.
    console.info("[contact] new lead", payload);
  }

  return NextResponse.json({ ok: true });
}
