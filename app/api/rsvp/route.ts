import { NextResponse } from "next/server";
import { cpfDigitsOnly, isCpfLengthValid } from "@/lib/cpf";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const attending = body.attending === "yes";

  if (!body.guest_name?.trim() || !body.guest_email?.trim()) {
    return NextResponse.json({ error: "Nome e e-mail são obrigatórios." }, { status: 400 });
  }

  const guestCpf = cpfDigitsOnly(String(body.guest_cpf ?? ""));
  if (!isCpfLengthValid(guestCpf)) {
    return NextResponse.json({ error: "CPF inválido: use 11 dígitos (com ou sem pontuação)." }, { status: 400 });
  }

  const hasCompanion = body.has_companion === "yes";
  let companionName: string | null = null;
  let companionCpf: string | null = null;

  if (hasCompanion) {
    companionName = String(body.companion_name ?? "").trim();
    companionCpf = cpfDigitsOnly(String(body.companion_cpf ?? ""));
    if (!companionName) {
      return NextResponse.json({ error: "Informe o nome do acompanhante." }, { status: 400 });
    }
    if (!isCpfLengthValid(companionCpf)) {
      return NextResponse.json({ error: "CPF do acompanhante inválido: use 11 dígitos." }, { status: 400 });
    }
  }

  const { error } = await supabaseAdmin.from("rsvps").insert({
    guest_name: body.guest_name.trim(),
    guest_email: body.guest_email.trim(),
    guest_cpf: guestCpf,
    attending,
    has_companion: hasCompanion,
    companion_name: companionName,
    companion_cpf: companionCpf
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
