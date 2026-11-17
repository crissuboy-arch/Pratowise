"use client";

import { useState } from "react";

type Estado = "parado" | "a-enviar" | "ok" | "erro";

const OBJETIVOS = [
  "Diabetes tipo 2",
  "Pré-diabetes",
  "Perder peso",
  "Comer melhor",
];

export default function WaitlistForm({ id = "lista" }: { id?: string }) {
  const [estado, setEstado] = useState<Estado>("parado");
  const [mensagem, setMensagem] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    setEstado("a-enviar");
    setMensagem("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(dados.get("email") ?? ""),
          objetivo: String(dados.get("objetivo") ?? ""),
          consentimento: dados.get("consentimento") === "on",
        }),
      });
      const json = (await res.json()) as { ok?: boolean; mensagem?: string };
      if (res.ok && json.ok) {
        setEstado("ok");
        setMensagem(
          json.mensagem ?? "Pronto! Avisamos assim que o Pratowise abrir.",
        );
      } else {
        setEstado("erro");
        setMensagem(json.mensagem ?? "Não foi possível guardar. Tente de novo.");
      }
    } catch {
      setEstado("erro");
      setMensagem("Sem ligação. Tente de novo daqui a pouco.");
    }
  }

  if (estado === "ok") {
    return (
      <div
        role="status"
        className="rounded-2xl bg-teal-soft p-5 text-base font-semibold text-teal"
      >
        {mensagem}
      </div>
    );
  }

  return (
    <form onSubmit={enviar} id={id} className="grid gap-4" noValidate={false}>
      <div className="grid gap-2">
        <label htmlFor={`${id}-email`} className="text-sm font-bold">
          O seu e-mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="nome@exemplo.pt"
          className="h-12 rounded-xl border border-line bg-white px-4 text-base"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-objetivo`} className="text-sm font-bold">
          O que o traz aqui? <span className="font-medium text-muted">(opcional)</span>
        </label>
        <select
          id={`${id}-objetivo`}
          name="objetivo"
          defaultValue=""
          className="h-12 rounded-xl border border-line bg-white px-3 text-base"
        >
          <option value="">Prefiro não dizer</option>
          {OBJETIVOS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="consentimento"
          required
          className="mt-1 h-5 w-5 accent-plum"
        />
        <span>
          Aceito receber um aviso por e-mail quando o Pratowise abrir. Pode
          cancelar a qualquer momento. Veja a{" "}
          <a href="/privacidade" className="font-bold text-plum underline">
            política de privacidade
          </a>
          .
        </span>
      </label>
      <button
        type="submit"
        disabled={estado === "a-enviar"}
        className="h-12 rounded-xl bg-plum px-6 text-base font-extrabold text-white disabled:opacity-60"
      >
        {estado === "a-enviar" ? "A enviar…" : "Quero ser dos primeiros"}
      </button>
      {estado === "erro" && (
        <p role="alert" className="text-sm font-semibold text-[#a3173a]">
          {mensagem}
        </p>
      )}
    </form>
  );
}
