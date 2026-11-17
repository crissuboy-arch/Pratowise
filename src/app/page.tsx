import WaitlistForm from "@/components/WaitlistForm";
import { Aveia, Omelete, Salmao, Sopa } from "@/components/Food";

const PASSOS = [
  {
    titulo: "Planeie a semana",
    texto:
      "Receba refeições para cada dia, com os hidratos à vista, e troque as que não lhe agradam.",
    tile: <Omelete size={72} className="rounded-2xl" />,
  },
  {
    titulo: "A lista faz-se sozinha",
    texto:
      "As compras saem do plano, organizadas por secções e sem repetir o que já tem em casa.",
    tile: <Salmao size={72} className="rounded-2xl" />,
  },
  {
    titulo: "Digitalize antes de comprar",
    texto:
      "Aponte a câmara ao código de barras e veja o açúcar, os hidratos e uma troca melhor.",
    tile: <Aveia size={72} className="rounded-2xl" />,
  },
];

const FAQ = [
  {
    p: "O Pratowise substitui o meu médico ou nutricionista?",
    r: "Não. Ajuda-o a escolher alimentos no dia a dia. Decisões sobre tratamento ou medicação são sempre com a sua equipa de saúde.",
  },
  {
    p: "Quando abre?",
    r: "Ainda não temos data. Quem entrar na lista de espera recebe um e-mail assim que abrirmos.",
  },
  {
    p: "Quanto vai custar?",
    r: "Ainda estamos a definir os planos. Quem estiver na lista de espera é o primeiro a saber, antes de abrir ao público.",
  },
  {
    p: "Que dados guardam de mim?",
    r: "Por agora, só o seu e-mail e, se quiser, o objetivo que escolher. Pode pedir para os apagar quando quiser.",
  },
];

export default function Home() {
  return (
    <>
      <a
        href="#lista"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Ir para a lista de espera
      </a>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 text-xl font-extrabold">
          <svg
            width="28"
            height="28"
            viewBox="0 0 26 26"
            fill="none"
            stroke="#4a1d73"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="13" cy="13" r="10" />
            <path d="M8.5 13.5l3 3 6-6.5" />
          </svg>
          Pratowise
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/app"
            className="rounded-full bg-plum px-4 py-2 text-sm font-bold text-white"
          >
            Experimentar o app
          </a>
          <a
            href="#lista"
            className="hidden rounded-full bg-lilac px-4 py-2 text-sm font-bold text-plum sm:inline-block"
          >
            Lista de espera
          </a>
        </div>
      </header>

      <main>
        <section className="bg-lilac">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-plum">
                Em breve · Portugal
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Saiba o que pode comer, sem complicar.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                O Pratowise planeia a sua semana, faz a lista de compras e diz
                se um produto cabe no seu prato. Pensado para quem tem diabetes
                tipo 2, pré-diabetes ou quer simplesmente comer melhor.
              </p>
              <div className="mt-8 flex items-center gap-3" aria-hidden="true">
                <Omelete size={64} className="rounded-2xl" />
                <Salmao size={64} className="rounded-2xl" />
                <Sopa size={64} className="rounded-2xl" />
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-extrabold">
                Entre na lista de espera
              </h2>
              <p className="mb-5 mt-1 text-sm text-muted">
                Avisamos por e-mail quando o Pratowise abrir.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-extrabold">Como funciona</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {PASSOS.map((p) => (
              <li key={p.titulo} className="rounded-3xl border border-line p-6">
                {p.tile}
                <h3 className="mt-4 text-xl font-extrabold">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-lilac-soft">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-3xl font-extrabold">
              Três etiquetas, sem letras pequenas
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              Cada produto recebe uma etiqueta simples. Percebe logo o que
              fazer, sem decorar tabelas.
            </p>
            <ul className="mt-8 flex flex-wrap gap-4">
              <li className="flex items-center gap-2 rounded-full bg-teal-soft px-5 py-3 font-bold text-teal">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M1.5 5.5l2.3 2.3L8.5 2.5" />
                </svg>
                Boa escolha
              </li>
              <li className="flex items-center gap-2 rounded-full bg-amber-soft px-5 py-3 font-bold text-amber-ink">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M2 5h6" />
                </svg>
                Moderar
              </li>
              <li className="flex items-center gap-2 rounded-full bg-[#ffd9e0] px-5 py-3 font-bold text-[#a3173a]">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" />
                </svg>
                Melhor evitar
              </li>
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-3xl font-extrabold">Perguntas frequentes</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.p} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-bold">
                  {f.p}
                </summary>
                <p className="mt-2 leading-relaxed text-muted">{f.r}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-plum text-white">
          <div className="mx-auto max-w-3xl px-6 py-14">
            <h2 className="text-3xl font-extrabold">
              Seja dos primeiros a experimentar
            </h2>
            <div className="mt-6 rounded-3xl bg-white p-6 text-ink md:p-8">
              <WaitlistForm id="lista-fim" />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm leading-relaxed text-muted">
        <p>
          O Pratowise ajuda a escolher alimentos e não é um dispositivo médico.
          Não substitui o seu médico ou nutricionista. Os valores nutricionais
          são estimativas e não devem ser usados para calcular doses de
          insulina nem para decidir sobre medicação.
        </p>
        <p className="mt-4">
          © {new Date().getFullYear()} Pratowise ·{" "}
          <a href="/privacidade" className="font-bold text-plum underline">
            Política de privacidade
          </a>
        </p>
      </footer>
    </>
  );
}
