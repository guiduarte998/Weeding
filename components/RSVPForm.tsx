"use client";

import { FormEvent, useState } from "react";
import { cpfDigitsOnly, isCpfLengthValid } from "@/lib/cpf";

type RSVPFormProps = {
  inviteTheme?: boolean;
};

export default function RSVPForm({ inviteTheme = false }: RSVPFormProps) {
  const [status, setStatus] = useState<string>("");
  const [hasCompanion, setHasCompanion] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const guestCpf = cpfDigitsOnly(String(formData.get("guest_cpf") ?? ""));
    if (!isCpfLengthValid(guestCpf)) {
      setStatus("Verifique o CPF (11 dígitos).");
      return;
    }
    if (hasCompanion) {
      const cCpf = cpfDigitsOnly(String(formData.get("companion_cpf") ?? ""));
      const cName = String(formData.get("companion_name") ?? "").trim();
      if (!cName || !isCpfLengthValid(cCpf)) {
        setStatus("Preencha nome e CPF do acompanhante.");
        return;
      }
    }

    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("Confirmação salva com sucesso. Obrigado!");
      form.reset();
      setHasCompanion(false);
      return;
    }

    const err = await response.json().catch(() => ({}));
    setStatus(typeof err.error === "string" ? err.error : "Não foi possível salvar a confirmação. Tente novamente.");
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
            CPF
            <input
              required
              name="guest_cpf"
              inputMode="numeric"
              autoComplete="off"
              placeholder="000.000.000-00"
              maxLength={14}
              aria-describedby="cpf-hint"
            />
            <span id="cpf-hint" className="form-field-hint">
              11 dígitos; pode enviar com ou sem pontos e traço — guardamos só os números.
            </span>
          </label>
          <label>
            Você vai comparecer?
            <select name="attending" defaultValue="yes">
              <option value="yes">Sim, estarei lá</option>
              <option value="no">Infelizmente não poderei</option>
            </select>
          </label>
          <label>
            Terá acompanhante?
            <select
              name="has_companion"
              value={hasCompanion ? "yes" : "no"}
              onChange={(e) => setHasCompanion(e.target.value === "yes")}
            >
              <option value="no">Não</option>
              <option value="yes">Sim</option>
            </select>
          </label>
          {hasCompanion ? (
            <>
              <label>
                Nome do acompanhante
                <input required name="companion_name" autoComplete="name" />
              </label>
              <label>
                CPF do acompanhante
                <input
                  required
                  name="companion_cpf"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </label>
            </>
          ) : null}
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
