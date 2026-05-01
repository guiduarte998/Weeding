import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const attending = body.attending === "yes";

  if (!body.guest_name || !body.guest_email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("rsvps").insert({
    guest_name: body.guest_name,
    guest_email: body.guest_email,
    attending
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
