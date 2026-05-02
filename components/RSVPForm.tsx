"use client";

import { FormEvent, useState } from "react";

export default function RSVPForm() {
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

  return (
    <section id="confirmacao" className="site-section site-section--band site-section--rsvp" aria-labelledby="rsvp-heading">
      <div className="site-inner site-inner--narrow">
        <p className="eyebrow">Confirme sua presença</p>
        <h2 id="rsvp-heading" className="section-title section-title--center">
          RSVP
        </h2>
        <p className="lede lede--center">
          Adoraríamos contar com você nesse dia. Preencha o formulário abaixo para nos avisar se poderá comparecer.
        </p>
        <form className="form-dark" onSubmit={handleSubmit}>
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
          <button className="btn btn--primary btn--block" type="submit">
            Enviar confirmação
          </button>
        </form>
        {status ? <p className="form-status form-status--center">{status}</p> : null}
      </div>
    </section>
  );
}
