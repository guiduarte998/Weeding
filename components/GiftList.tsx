"use client";

import Image from "next/image";
import { useState } from "react";

type Gift = {
  id: number;
  title: string;
  description: string;
  amount_cents: number;
  /** Imagem ilustrativa — troque por URLs/arquivos seus quando quiser. */
  imageSrc: string;
};

const starterGifts: Gift[] = [
  {
    id: 1,
    title: "Jantar para dois",
    description: "Ajude a celebrar nossa lua de mel.",
    amount_cents: 18000,
    imageSrc:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Noite de hotel",
    description: "Uma estadia especial para nós.",
    amount_cents: 35000,
    imageSrc:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Álbum de fotos",
    description: "Livro impresso de memórias.",
    amount_cents: 12000,
    imageSrc:
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd552?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Passagem de avião",
    description: "Um trecho para a lua de mel ou uma viagem especial.",
    amount_cents: 120000,
    imageSrc:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop"
  }
];

type GiftListProps = {
  inviteTheme?: boolean;
};

export default function GiftList({ inviteTheme = false }: GiftListProps) {
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

  const sectionClass = inviteTheme
    ? "page-invite-sub__gifts"
    : "site-section site-section--band site-section--gifts";

  return (
    <section
      id="presentes"
      className={sectionClass}
      {...(inviteTheme
        ? { "aria-label": "Lista de sugestões de presentes" }
        : { "aria-labelledby": "gifts-heading" })}
    >
      <div className={inviteTheme ? "page-invite-sub__form-wrap" : "site-inner site-inner--wide"}>
        {!inviteTheme ? (
          <>
            <p className="eyebrow eyebrow--center">Lista de presentes</p>
            <h2 id="gifts-heading" className="section-title section-title--center">
              Presentes
            </h2>
            <p className="lede lede--center">
              Sua presença já é o maior presente. Se quiser nos mimar com algo a mais, deixamos algumas sugestões
              abaixo.
            </p>
          </>
        ) : null}
        <div className={`gifts-grid ${inviteTheme ? "gifts-grid--invite" : ""}`}>
          {starterGifts.map((gift) => (
            <article key={gift.id} className={`gift-card ${inviteTheme ? "gift-card--invite" : ""}`}>
              <div className="gift-card-media">
                <Image
                  src={gift.imageSrc}
                  alt={gift.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="gift-card-img"
                />
              </div>
              <div className="gift-card-body">
                <h3 className="gift-title">{gift.title}</h3>
                <p className="gift-desc">{gift.description}</p>
                <p className="gift-price">R$ {(gift.amount_cents / 100).toFixed(2).replace(".", ",")}</p>
                <button
                  className={`btn btn--block ${inviteTheme ? "btn--invite-primary" : "btn--outline"}`}
                  type="button"
                  onClick={() => startCheckout(gift.id)}
                >
                  Presentear
                </button>
              </div>
            </article>
          ))}
        </div>
        {message ? (
          <p className={`form-status form-status--center ${inviteTheme ? "form-status--invite" : ""}`}>{message}</p>
        ) : null}
      </div>
    </section>
  );
}
