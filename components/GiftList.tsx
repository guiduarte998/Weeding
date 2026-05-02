"use client";

import Image from "next/image";
import { useState } from "react";
import PixGiftModal from "@/components/PixGiftModal";

type Gift = {
  id: number;
  title: string;
  amount_cents: number;
  imageSrc: string;
};

/** Preços em centavos de BRL (ex.: R$ 350,00 → 35000). */
const starterGifts: Gift[] = [
  {
    id: 1,
    title: "Bravinho & rapidinho tunado",
    amount_cents: 4000000,
    imageSrc: "/fiat500.jpg"
  },
  {
    id: 2,
    title: "Marmita no Laço Aclimação",
    amount_cents: 3000,
    imageSrc: "/laco.png"
  },
  {
    id: 3,
    title: "GTA 6 pro noivo",
    amount_cents: 35000,
    imageSrc: "/GTA6.png"
  },
  {
    id: 4,
    title: "Sylvanians Families para noiva",
    amount_cents: 35000,
    imageSrc: "/families.jpg"
  },
  {
    id: 5,
    title: "Makita pro noivo",
    amount_cents: 9900,
    imageSrc: "/makita.jpg"
  },
  {
    id: 6,
    title: "Decor para a casa nova",
    amount_cents: 30000,
    imageSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Jacuzzi para a cobertura",
    amount_cents: 1000000,
    imageSrc: "/jacuzzi.jpg"
  },
  {
    id: 8,
    title: "Retiro legendários pro noivo",
    amount_cents: 10000000,
    imageSrc: "/legendarios.png"
  },
  {
    id: 9,
    title: "Spa Day para noiva",
    amount_cents: 50000,
    imageSrc: "/budha.jpg"
  },
  {
    id: 10,
    title: "Luminária nova para noiva",
    amount_cents: 10000,
    imageSrc: "/luminaria.png"
  },
  {
    id: 11,
    title: "Controladora de DJ pro noivo",
    amount_cents: 1000000,
    imageSrc: "/cdj.png"
  },
  {
    id: 12,
    title: "Ingresso da Formula 1 pro noivo",
    amount_cents: 200000,
    imageSrc: "/f1.png"
  },
  {
    id: 13,
    title: "Ingresso VIP do Harry Styles",
    amount_cents: 200000,
    imageSrc: "/aperture.jpg"
  },
  {
    id: 14,
    title: "Aula de ski para os noivos",
    amount_cents: 70000,
    imageSrc: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: 15,
    title: "Jantar romântico em Santorini",
    amount_cents: 50000,
    imageSrc: "/santorini1.jpg"
  },
  {
    id: 16,
    title: "Lembrancinhas da lua de mel",
    amount_cents: 1000,
    imageSrc: "/santorini2.jpg"
  },
  {
    id: 17,
    title: "Petiscos pro Sirius",
    amount_cents: 5000,
    imageSrc: "/petiscos.png"
  },
  {
    id: 18,
    title: "Reverter tudo para o Sirius",
    amount_cents: 100,
    imageSrc: "/si.jpeg"
  }
];

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

type GiftListProps = {
  inviteTheme?: boolean;
};

export default function GiftList({ inviteTheme = false }: GiftListProps) {
  const [pixGift, setPixGift] = useState<Gift | null>(null);

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
                <p className="gift-price">{formatBRL(gift.amount_cents)}</p>
                <button
                  className={`btn btn--block ${inviteTheme ? "btn--invite-primary" : "btn--outline"}`}
                  type="button"
                  onClick={() => setPixGift(gift)}
                >
                  Presentear
                </button>
              </div>
            </article>
          ))}
        </div>
        <PixGiftModal
          open={pixGift !== null}
          onClose={() => setPixGift(null)}
          giftTitle={pixGift?.title ?? ""}
          giftAmountLabel={pixGift ? formatBRL(pixGift.amount_cents) : ""}
          inviteTheme={inviteTheme}
        />
      </div>
    </section>
  );
}
