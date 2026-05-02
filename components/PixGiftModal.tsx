"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { WEDDING_PIX_BR_CODE, WEDDING_PIX_QR_SRC } from "@/lib/pix";

type PixGiftModalProps = {
  open: boolean;
  onClose: () => void;
  giftTitle: string;
  giftAmountLabel: string;
  inviteTheme?: boolean;
};

export default function PixGiftModal({
  open,
  onClose,
  giftTitle,
  giftAmountLabel,
  inviteTheme = false
}: PixGiftModalProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "ok" | "err">("idle");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(WEDDING_PIX_BR_CODE);
      setCopyStatus("ok");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("err");
      window.setTimeout(() => setCopyStatus("idle"), 3000);
    }
  }, []);

  useEffect(() => {
    if (open) setCopyStatus("idle");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const modalClass = inviteTheme ? "pix-modal pix-modal--invite" : "pix-modal";

  return (
    <div
      className="pix-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={modalClass} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button
          ref={closeBtnRef}
          type="button"
          className="pix-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 id={titleId} className="pix-modal-title">
          Presente via PIX
        </h2>
        <p className="pix-modal-gift">
          <strong>{giftTitle}</strong>
          <span className="pix-modal-amount">{giftAmountLabel}</span>
        </p>
        <p className="pix-modal-hint">
          No celular, use o código abaixo no app do banco (PIX copia e cola). O QR Code é mais prático quando alguém
          paga a partir de <em>outro</em> aparelho.
        </p>
        <div className="pix-modal-qr">
          <Image src={WEDDING_PIX_QR_SRC} alt="QR Code PIX" width={280} height={280} className="pix-modal-qr-img" />
        </div>
        <label className="pix-modal-label" htmlFor="pix-br-code">
          Código PIX (copia e cola)
        </label>
        <textarea
          id="pix-br-code"
          className="pix-modal-code"
          readOnly
          rows={4}
          value={WEDDING_PIX_BR_CODE}
          onFocus={(e) => e.target.select()}
        />
        <div className="pix-modal-actions">
          <button type="button" className="btn btn--pix-copy" onClick={handleCopy}>
            Copiar código PIX
          </button>
          <button type="button" className={`btn ${inviteTheme ? "btn--invite-outline" : "btn--outline"}`} onClick={onClose}>
            Fechar
          </button>
        </div>
        {copyStatus === "ok" ? <p className="pix-modal-feedback pix-modal-feedback--ok">Copiado para a área de transferência.</p> : null}
        {copyStatus === "err" ? (
          <p className="pix-modal-feedback pix-modal-feedback--err">Não foi possível copiar automaticamente. Selecione o código acima e copie manualmente.</p>
        ) : null}
      </div>
    </div>
  );
}
