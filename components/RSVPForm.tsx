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
    <section className="section">
      <h2>Confirmação</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome completo
          <input required name="guest_name" />
        </label>
        <label>
          Email
          <input required type="email" name="guest_email" />
        </label>
        <label>
          Você vai comparecer?
          <select name="attending" defaultValue="yes">
            <option value="yes">Sim</option>
            <option value="no">Não</option>
          </select>
        </label>
        <button className="btn" type="submit">
          Enviar confirmação
        </button>
      </form>
      {status ? <p className="muted">{status}</p> : null}
    </section>
  );
}
