import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/admin-auth";
import { parseICal } from "@/lib/ical-parser";

async function fetchCalendar(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to fetch iCal (${response.status})`);
  return parseICal(await response.text());
}

export async function GET(request: Request) {
  if (!hasAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const airbnbUrl = process.env.AIRBNB_ICAL_URL;
  const bookingUrl = process.env.BOOKING_ICAL_URL;

  if (!airbnbUrl && !bookingUrl) {
    return NextResponse.json(
      { error: "Configure AIRBNB_ICAL_URL et/ou BOOKING_ICAL_URL" },
      { status: 400 },
    );
  }

  try {
    const [airbnbResult, bookingResult] = await Promise.allSettled([
      airbnbUrl ? fetchCalendar(airbnbUrl) : Promise.resolve([]),
      bookingUrl ? fetchCalendar(bookingUrl) : Promise.resolve([]),
    ]);

    const airbnb = airbnbResult.status === "fulfilled" ? airbnbResult.value : [];
    const booking = bookingResult.status === "fulfilled" ? bookingResult.value : [];

    return NextResponse.json({
      syncedAt: new Date().toISOString(),
      sources: {
        airbnb: airbnb.length,
        booking: booking.length,
      },
      warnings: {
        airbnb:
          airbnbResult.status === "rejected" ? "Impossible de synchroniser Airbnb actuellement." : null,
        booking:
          bookingResult.status === "rejected" ? "Impossible de synchroniser Booking actuellement." : null,
      },
      events: [...airbnb, ...booking].sort((a, b) => a.start.localeCompare(b.start)),
    });
  } catch {
    return NextResponse.json({ error: "Echec de synchronisation iCal" }, { status: 502 });
  }
}
