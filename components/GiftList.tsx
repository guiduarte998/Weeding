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
    <section id="presentes" className="site-section site-section--band site-section--gifts" aria-labelledby="gifts-heading">
      <div className="site-inner site-inner--wide">
        <p className="eyebrow eyebrow--center">Lista de presentes</p>
        <h2 id="gifts-heading" className="section-title section-title--center">
          Presentes
        </h2>
        <p className="lede lede--center">
          Sua presença já é o maior presente. Se quiser nos mimar com algo a mais, deixamos algumas sugestões abaixo.
        </p>
        <div className="gifts-grid">
          {starterGifts.map((gift) => (
            <article key={gift.id} className="gift-card">
              <h3 className="gift-title">{gift.title}</h3>
              <p className="gift-desc">{gift.description}</p>
              <p className="gift-price">R$ {(gift.amount_cents / 100).toFixed(2).replace(".", ",")}</p>
              <button className="btn btn--outline btn--block" type="button" onClick={() => startCheckout(gift.id)}>
                Presentear
              </button>
            </article>
          ))}
        </div>
        {message ? <p className="form-status form-status--center">{message}</p> : null}
      </div>
    </section>
  );
}
