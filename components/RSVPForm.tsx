"use client";

import { FormEvent, useState } from "react";

type RSVPFormProps = {
  inviteTheme?: boolean;
};

export default function RSVPForm({ inviteTheme = false }: RSVPFormProps) {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("Confirmação salva com sucesso. Obrigado!");
      event.currentTarget.reset();
      return;
    }

    setStatus("Não foi possível salvar a confirmação. Tente novamente.");
  }

  const sectionClass = inviteTheme
    ? "page-invite-sub__rsvp"
    : "site-section site-section--band site-section--rsvp";

  return (
    <section
      id="confirmacao"
      className={sectionClass}
      {...(inviteTheme
        ? { "aria-label": "Formulário de confirmação de presença" }
        : { "aria-labelledby": "rsvp-heading" })}
    >
      <div className={inviteTheme ? "page-invite-sub__form-wrap" : "site-inner site-inner--narrow"}>
        {!inviteTheme ? (
          <>
            <p className="eyebrow">Confirme sua presença</p>
            <h2 id="rsvp-heading" className="section-title section-title--center">
              RSVP
            </h2>
            <p className="lede lede--center">
              Adoraríamos contar com você nesse dia. Preencha o formulário abaixo para nos avisar se poderá comparecer.
            </p>
          </>
        ) : null}
        <form className={inviteTheme ? "form-invite" : "form-dark"} onSubmit={handleSubmit}>
          <label>
            Nome completo
            <input required name="guest_name" autoComplete="name" />
          </label>
          <label>
            E-mail
            <input required type="email" name="guest_email" autoComplete="email" />
          </label>
          <label>
            Você vai comparecer?
            <select name="attending" defaultValue="yes">
              <option value="yes">Sim, estarei lá</option>
              <option value="no">Infelizmente não poderei</option>
            </select>
          </label>
          <button
            className={`btn btn--block ${inviteTheme ? "btn--invite-primary" : "btn--primary"}`}
            type="submit"
          >
            Enviar confirmação
          </button>
        </form>
        {status ? (
          <p className={`form-status form-status--center ${inviteTheme ? "form-status--invite" : ""}`}>{status}</p>
        ) : null}
      </div>
    </section>
  );
}
