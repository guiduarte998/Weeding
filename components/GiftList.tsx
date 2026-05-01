"use client";

import { useState } from "react";

type Gift = {
  id: number;
  title: string;
  description: string;
  amount_cents: number;
};

const starterGifts: Gift[] = [
  { id: 1, title: "Jantar para dois", description: "Ajude a celebrar nossa lua de mel.", amount_cents: 18000 },
  { id: 2, title: "Noite de hotel", description: "Uma estadia especial para nós.", amount_cents: 35000 },
  { id: 3, title: "Álbum de fotos", description: "Livro impresso de memórias.", amount_cents: 12000 }
];

export default function GiftList() {
  const [message, setMessage] = useState("");

  async function startCheckout(giftId: number) {
    const response = await fetch("/api/gifts/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ giftId })
    });
    const data = await response.json();
    setMessage(data.message ?? "Pagamento iniciado.");
  }

  return (
    <section className="section">
      <h2>Presentes</h2>
      <p className="muted">Na v1, essa etapa usa um checkout de exemplo.</p>
      <div className="grid grid-2">
        {starterGifts.map((gift) => (
          <article key={gift.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: "1rem" }}>
            <h3>{gift.title}</h3>
            <p className="muted">{gift.description}</p>
            <p>
              <strong>${(gift.amount_cents / 100).toFixed(2)}</strong>
            </p>
            <button className="btn" type="button" onClick={() => startCheckout(gift.id)}>
              Presentear
            </button>
          </article>
        ))}
      </div>
      {message ? <p className="muted">{message}</p> : null}
    </section>
  );
}
