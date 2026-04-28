import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/admin-auth";
import { reservations } from "@/lib/domain";
import { supabaseIsConfigured, supabaseRest } from "@/lib/supabase";

type SupabaseReservation = {
  id: string;
  channel: "airbnb" | "booking" | "direct";
  unit_id: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  status: "confirmed" | "pending" | "checked_in" | "checked_out";
};

export async function GET(request: Request) {
  if (!(await hasAdminSessionFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (supabaseIsConfigured()) {
    try {
      const items = await supabaseRest<SupabaseReservation[]>(
        "reservations?select=id,channel,unit_id,check_in,check_out,guests_count,status&order=check_in.asc",
      );
      return NextResponse.json({
        items: items.map((item) => ({
          id: item.id,
          channel: item.channel,
          unitId: item.unit_id,
          checkIn: item.check_in,
          checkOut: item.check_out,
          guestsCount: item.guests_count,
          status: item.status,
        })),
        total: items.length,
        source: "supabase",
      });
    } catch {
      // Fallback below keeps the back-office operational until Supabase auth/RLS is wired.
    }
  }

  return NextResponse.json({
    items: reservations.map((item) => ({
      id: item.id,
      channel: item.channel,
      unitId: item.unitId,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      guestsCount: item.guestsCount,
      status: item.status,
    })),
    total: reservations.length,
    source: "local",
  });
}
