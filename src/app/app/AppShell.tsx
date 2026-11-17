"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DIAS,
  TIPOS,
  formatarQtd,
  listaDeCompras,
  opcoes,
  planoInicial,
  porId,
  type Plano,
  type Tipo,
} from "@/lib/meals";
import { procurarProduto, type Nivel, type Produto } from "@/lib/produto";

type Aba = "hoje" | "plano" | "lista" | "scanner";

const CHAVE_PLANO = "pratowise.plano.v1";
const CHAVE_LISTA = "pratowise.lista.v1";

const ESTILO_NIVEL: Record<
  Nivel,
  { texto: string; fundo: string; cor: string }
> = {
  boa: { texto: "Boa escolha", fundo: "bg-teal-soft", cor: "text-teal" },
  moderar: { texto: "Moderar", fundo: "bg-amber-soft", cor: "text-amber-ink" },
  evitar: {
    texto: "Melhor evitar",
    fundo: "bg-[#fde0dc]",
    cor: "text-[#8a1f11]",
  },
  desconhecido: {
    texto: "Sem dados",
    fundo: "bg-lilac",
    cor: "text-muted",
  },
};

function diaDeHoje(): string {
  const i = (new Date().getDay() + 6) % 7; // segunda = 0
  return DIAS[i];
}

export default function AppShell() {
  const [aba, setAba] = useState<Aba>("hoje");
  const [plano, setPlano] = useState<Plano | null>(null);
  const [marcados, setMarcados] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const p = localStorage.getItem(CHAVE_PLANO);
      setPlano(p ? (JSON.parse(p) as Plano) : planoInicial());
      const l = localStorage.getItem(CHAVE_LISTA);
      if (l) setMarcados(JSON.parse(l));
    } catch {
      setPlano(planoInicial());
    }
  }, []);

  useEffect(() => {
    if (!plano) return;
    try {
      localStorage.setItem(CHAVE_PLANO, JSON.stringify(plano));
    } catch {}
  }, [plano]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_LISTA, JSON.stringify(marcados));
    } catch {}
  }, [marcados]);

  const trocar = useCallback((dia: string, tipo: Tipo) => {
    setPlano((atual) => {
      if (!atual) return atual;
      const o = opcoes(tipo);
      const i = o.findIndex((r) => r.id === atual[dia][tipo]);
      const proximo = o[(i + 1) % o.length].id;
      return { ...atual, [dia]: { ...atual[dia], [tipo]: proximo } };
    });
  }, []);

  const novaSemana = useCallback(() => {
    setPlano(() => {
      const p = planoInicial();
      for (const dia of DIAS) {
        for (const t of TIPOS) {
          const o = opcoes(t.id);
          p[dia][t.id] = o[Math.floor(Math.random() * o.length)].id;
        }
      }
      return p;
    });
    setMarcados({});
  }, []);

  if (!plano) {
    return (
      <div className="grid min-h-screen place-items-center text-muted">
        A abrir o Pratowise…
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white">
      <header className="flex items-center justify-between bg-plum px-5 py-4 text-white">
        <span className="text-lg font-extrabold tracking-tight">Pratowise</span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          Versão de teste
        </span>
      </header>

      <main className="flex-1 px-5 pb-28 pt-5">
        {aba === "hoje" && (
          <Hoje plano={plano} irPara={setAba} trocar={trocar} />
        )}
        {aba === "plano" && (
          <PlanoSemana plano={plano} trocar={trocar} novaSemana={novaSemana} />
        )}
        {aba === "lista" && (
          <Lista plano={plano} marcados={marcados} setMarcados={setMarcados} />
        )}
        {aba === "scanner" && <Scanner />}
      </main>

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 mx-auto grid max-w-md grid-cols-4 border-t border-line bg-white"
      >
        {(
          [
            ["hoje", "Hoje"],
            ["plano", "Semana"],
            ["lista", "Compras"],
            ["scanner", "Scanner"],
          ] as [Aba, string][]
        ).map(([id, nome]) => (
          <button
            key={id}
            onClick={() => setAba(id)}
            aria-current={aba === id ? "page" : undefined}
            className={`py-4 text-sm font-bold ${
              aba === id ? "text-plum" : "text-muted"
            }`}
          >
            <span
              className={`mx-auto mb-1 block h-1 w-8 rounded-full ${
                aba === id ? "bg-apricot" : "bg-transparent"
              }`}
            />
            {nome}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Etiqueta({ nivel }: { nivel: Nivel }) {
  const e = ESTILO_NIVEL[nivel];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${e.fundo} ${e.cor}`}
    >
      {e.texto}
    </span>
  );
}

function CartaoRefeicao({
  rotulo,
  id,
  onTrocar,
}: {
  rotulo: string;
  id: string;
  onTrocar: () => void;
}) {
  const r = porId(id);
  const [aberto, setAberto] = useState(false);
  if (!r) return null;
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            {rotulo}
          </p>
          <h3 className="mt-1 text-base font-bold leading-snug">{r.nome}</h3>
          <p className="mt-1 text-sm text-muted">
            {r.tempo} min · cerca de {r.hc} g de hidratos
          </p>
        </div>
        <Etiqueta nivel={r.etiqueta === "Boa escolha" ? "boa" : "moderar"} />
      </div>
      {aberto && (
        <div className="mt-3 rounded-xl bg-lilac-soft p-3 text-sm leading-relaxed">
          <p className="font-bold">Ingredientes</p>
          <ul className="mt-1 list-disc pl-5">
            {r.ing.map((i) => (
              <li key={i.n}>
                {i.n} — {formatarQtd(i.q, i.u)}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Como fazer</p>
          <p>{r.passos}</p>
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setAberto((v) => !v)}
          className="rounded-full bg-plum px-4 py-2 text-sm font-bold text-white"
        >
          {aberto ? "Fechar" : "Ver receita"}
        </button>
        <button
          onClick={onTrocar}
          className="rounded-full border border-line px-4 py-2 text-sm font-bold text-plum"
        >
          Trocar
        </button>
      </div>
    </div>
  );
}

function Hoje({
  plano,
  irPara,
  trocar,
}: {
  plano: Plano;
  irPara: (a: Aba) => void;
  trocar: (dia: string, tipo: Tipo) => void;
}) {
  const dia = diaDeHoje();
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-muted">{dia}</p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          O seu prato de hoje
        </h1>
      </div>
      {TIPOS.map((t) => (
        <CartaoRefeicao
          key={t.id}
          rotulo={t.nome}
          id={plano[dia][t.id]}
          onTrocar={() => trocar(dia, t.id)}
        />
      ))}
      <button
        onClick={() => irPara("scanner")}
        className="w-full rounded-2xl bg-apricot px-5 py-4 text-base font-extrabold text-ink"
      >
        Ler um produto do supermercado
      </button>
    </div>
  );
}

function PlanoSemana({
  plano,
  trocar,
  novaSemana,
}: {
  plano: Plano;
  trocar: (dia: string, tipo: Tipo) => void;
  novaSemana: () => void;
}) {
  const [dia, setDia] = useState(diaDeHoje());
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">A sua semana</h1>
        <button
          onClick={novaSemana}
          className="rounded-full border border-line px-3 py-2 text-xs font-bold text-plum"
        >
          Gerar nova semana
        </button>
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {DIAS.map((d) => (
          <button
            key={d}
            onClick={() => setDia(d)}
            aria-pressed={dia === d}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
              dia === d ? "bg-plum text-white" : "bg-lilac text-plum"
            }`}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>
      <p className="text-sm font-semibold text-muted">{dia}</p>
      {TIPOS.map((t) => (
        <CartaoRefeicao
          key={`${dia}-${t.id}`}
          rotulo={t.nome}
          id={plano[dia][t.id]}
          onTrocar={() => trocar(dia, t.id)}
        />
      ))}
    </div>
  );
}

function Lista({
  plano,
  marcados,
  setMarcados,
}: {
  plano: Plano;
  marcados: Record<string, boolean>;
  setMarcados: (m: Record<string, boolean>) => void;
}) {
  const itens = useMemo(() => listaDeCompras(plano), [plano]);
  const categorias = useMemo(() => {
    const m = new Map<string, typeof itens>();
    for (const i of itens) {
      m.set(i.cat, [...(m.get(i.cat) ?? []), i]);
    }
    return [...m.entries()];
  }, [itens]);
  const feitos = itens.filter((i) => marcados[i.chave]).length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Lista de compras
        </h1>
        <p className="mt-1 text-sm text-muted">
          Feita sozinha a partir das refeições da semana. {feitos} de{" "}
          {itens.length} no carrinho.
        </p>
      </div>
      {categorias.map(([cat, lista]) => (
        <section key={cat}>
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-plum">
            {cat}
          </h2>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {lista.map((i) => (
              <li key={i.chave}>
                <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={!!marcados[i.chave]}
                    onChange={(e) =>
                      setMarcados({ ...marcados, [i.chave]: e.target.checked })
                    }
                    className="h-5 w-5 accent-[#4a1d73]"
                  />
                  <span
                    className={`flex-1 text-sm font-semibold ${
                      marcados[i.chave] ? "text-muted line-through" : ""
                    }`}
                  >
                    {i.n}
                  </span>
                  <span className="text-sm text-muted">
                    {formatarQtd(i.q, i.u)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

// Códigos de exemplo para testar sem produto na mão
const EXEMPLOS = [
  { codigo: "5449000000996", nome: "Refrigerante de cola" },
  { codigo: "3017620422003", nome: "Creme de avelã" },
  { codigo: "8410000822889", nome: "Outro produto" },
];

type BarcodeDetectorLike = {
  detect: (v: HTMLVideoElement) => Promise<{ rawValue: string }[]>;
};
declare global {
  interface Window {
    BarcodeDetector?: new (o?: { formats: string[] }) => BarcodeDetectorLike;
  }
}

function Scanner() {
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState<
    "parado" | "a-procurar" | "ok" | "nao-encontrado" | "erro"
  >("parado");
  const [produto, setProduto] = useState<Produto | null>(null);
  const [camara, setCamara] = useState(false);
  const [msgCamara, setMsgCamara] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const pesquisar = useCallback(async (c: string) => {
    setEstado("a-procurar");
    setProduto(null);
    try {
      const p = await procurarProduto(c);
      if (p) {
        setProduto(p);
        setEstado("ok");
      } else {
        setEstado("nao-encontrado");
      }
    } catch {
      setEstado("erro");
    }
  }, []);

  const parar = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamara(false);
  }, []);

  useEffect(() => parar, [parar]);

  async function abrirCamara() {
    setMsgCamara("");
    if (!window.BarcodeDetector) {
      setMsgCamara(
        "Este navegador não lê códigos de barras pela câmara. Escreva o número do código abaixo, ou abra no telemóvel com o Chrome.",
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setCamara(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
      const det = new window.BarcodeDetector({
        formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
      });
      const ciclo = async () => {
        if (!streamRef.current || !videoRef.current) return;
        try {
          const r = await det.detect(videoRef.current);
          if (r.length > 0) {
            const v = r[0].rawValue;
            setCodigo(v);
            parar();
            void pesquisar(v);
            return;
          }
        } catch {}
        setTimeout(ciclo, 350);
      };
      setTimeout(ciclo, 600);
    } catch {
      setMsgCamara(
        "Não consegui abrir a câmara. Verifique a permissão do navegador ou escreva o código.",
      );
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Scanner</h1>
        <p className="mt-1 text-sm text-muted">
          Leia o código de barras de um produto e veja uma indicação simples.
        </p>
      </div>

      {camara ? (
        <div className="overflow-hidden rounded-2xl bg-ink">
          <video
            ref={videoRef}
            playsInline
            muted
            className="h-64 w-full object-cover"
          />
          <button
            onClick={parar}
            className="w-full py-3 text-sm font-bold text-white"
          >
            Fechar câmara
          </button>
        </div>
      ) : (
        <button
          onClick={abrirCamara}
          className="w-full rounded-2xl bg-plum px-5 py-4 text-base font-extrabold text-white"
        >
          Abrir câmara e ler código
        </button>
      )}
      {msgCamara && (
        <p className="rounded-xl bg-amber-soft p-3 text-sm text-amber-ink">
          {msgCamara}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void pesquisar(codigo);
        }}
        className="flex gap-2"
      >
        <label className="sr-only" htmlFor="codigo">
          Número do código de barras
        </label>
        <input
          id="codigo"
          inputMode="numeric"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ou escreva o código (ex.: 5449000000996)"
          className="min-w-0 flex-1 rounded-xl border border-line px-4 py-3 text-sm"
        />
        <button className="rounded-xl bg-apricot px-5 py-3 text-sm font-extrabold text-ink">
          Ver
        </button>
      </form>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          Experimente sem produto na mão
        </p>
        <div className="flex flex-wrap gap-2">
          {EXEMPLOS.map((e) => (
            <button
              key={e.codigo}
              onClick={() => {
                setCodigo(e.codigo);
                void pesquisar(e.codigo);
              }}
              className="rounded-full bg-lilac px-3 py-2 text-xs font-bold text-plum"
            >
              {e.nome}
            </button>
          ))}
        </div>
      </div>

      {estado === "a-procurar" && (
        <p className="text-sm text-muted">A procurar o produto…</p>
      )}
      {estado === "nao-encontrado" && (
        <p className="rounded-xl bg-lilac p-3 text-sm">
          Não encontrei este produto na base de dados. Tente outro código.
        </p>
      )}
      {estado === "erro" && (
        <p className="rounded-xl bg-lilac p-3 text-sm">
          Não consegui ligar à base de dados. Verifique a internet e tente de
          novo.
        </p>
      )}
      {estado === "ok" && produto && <ResultadoProduto p={produto} />}

      <p className="text-xs leading-relaxed text-muted">
        Indicação informativa com base nos valores por 100 g (Open Food Facts).
        Não substitui o conselho do seu médico ou nutricionista.
      </p>
    </div>
  );
}

function ResultadoProduto({ p }: { p: Produto }) {
  const e = ESTILO_NIVEL[p.nivel];
  const v = p.porcao100;
  const linhas: [string, number | undefined, string][] = [
    ["Energia", v.energia, "kcal"],
    ["Hidratos", v.hidratos, "g"],
    ["dos quais açúcares", v.acucares, "g"],
    ["Fibra", v.fibra, "g"],
    ["Gordura saturada", v.gordSat, "g"],
    ["Sal", v.sal, "g"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className={`${e.fundo} px-4 py-4`}>
        <p className={`text-xl font-extrabold ${e.cor}`}>{e.texto}</p>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          {p.imagem && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.imagem}
              alt=""
              className="h-16 w-16 rounded-lg object-contain"
            />
          )}
          <div>
            <p className="font-bold leading-snug">{p.nome}</p>
            {p.marca && <p className="text-sm text-muted">{p.marca}</p>}
          </div>
        </div>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {p.motivos.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <table className="w-full text-sm">
          <caption className="mb-1 text-left text-xs font-bold uppercase tracking-wide text-muted">
            Por 100 g
          </caption>
          <tbody>
            {linhas
              .filter(([, val]) => val !== undefined)
              .map(([nome, val, un]) => (
                <tr key={nome} className="border-t border-line">
                  <td className="py-1.5">{nome}</td>
                  <td className="py-1.5 text-right font-semibold">
                    {Number(val).toLocaleString("pt-PT", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    {un}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
