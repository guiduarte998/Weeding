import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.giftId) {
    return NextResponse.json({ error: "giftId is required." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: `Gift #${body.giftId} selected. Connect Stripe or Mercado Pago next.`
  });
}
