import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidade — Pratowise",
  robots: { index: false },
};

export default function Privacidade() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 leading-relaxed">
      <p
        role="note"
        className="mb-8 rounded-2xl bg-amber-soft p-4 text-sm font-bold text-amber-ink"
      >
        Rascunho — complete os campos entre [parênteses rectos] e peça a uma
        pessoa qualificada para rever este texto antes de publicar o site.
      </p>
      <h1 className="text-4xl font-extrabold">Política de privacidade</h1>

      <h2 className="mt-8 text-2xl font-extrabold">Quem somos</h2>
      <p className="mt-2 text-muted">
        O responsável pelo tratamento dos dados é [NOME OU EMPRESA], com
        contacto em [E-MAIL DE CONTACTO].
      </p>

      <h2 className="mt-8 text-2xl font-extrabold">Que dados recolhemos</h2>
      <p className="mt-2 text-muted">
        Na lista de espera recolhemos o seu e-mail e, se escolher, o objetivo
        que indicar (por exemplo, &ldquo;Comer melhor&rdquo;). Não recolhemos
        mais nada neste formulário.
      </p>

      <h2 className="mt-8 text-2xl font-extrabold">Para que usamos</h2>
      <p className="mt-2 text-muted">
        Apenas para lhe enviar um aviso quando o Pratowise abrir. A base legal
        é o seu consentimento, que pode retirar a qualquer momento.
      </p>

      <h2 className="mt-8 text-2xl font-extrabold">Durante quanto tempo</h2>
      <p className="mt-2 text-muted">
        Até pedir a remoção ou até [PRAZO], o que acontecer primeiro.
      </p>

      <h2 className="mt-8 text-2xl font-extrabold">Quem trata os dados por nós</h2>
      <p className="mt-2 text-muted">
        Os dados ficam guardados num serviço de base de dados (Supabase) e o
        site é alojado na Vercel. [Confirme a região dos servidores.]
      </p>

      <h2 className="mt-8 text-2xl font-extrabold">Os seus direitos</h2>
      <p className="mt-2 text-muted">
        Pode pedir acesso, correção ou apagamento dos seus dados, e retirar o
        consentimento, escrevendo para [E-MAIL DE CONTACTO]. Pode também
        apresentar reclamação à CNPD (Comissão Nacional de Proteção de Dados).
      </p>

      <p className="mt-10">
        <a href="/" className="font-bold text-plum underline">
          Voltar ao início
        </a>
      </p>
    </main>
  );
}
