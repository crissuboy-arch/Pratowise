export type Tipo = "cafe" | "almoco" | "jantar";

export type Ingrediente = {
  n: string; // nome
  q: number; // quantidade
  u: string; // unidade
  cat: "Frescos" | "Talho e peixe" | "Mercearia" | "Laticínios e ovos" | "Congelados";
};

export type Refeicao = {
  id: string;
  tipo: Tipo;
  nome: string;
  tempo: number; // minutos
  hc: number; // hidratos de carbono aprox. por dose (g)
  etiqueta: "Boa escolha" | "Moderar";
  passos: string;
  ing: Ingrediente[];
};

export const TIPOS: { id: Tipo; nome: string }[] = [
  { id: "cafe", nome: "Pequeno-almoço" },
  { id: "almoco", nome: "Almoço" },
  { id: "jantar", nome: "Jantar" },
];

export const DIAS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export const REFEICOES: Refeicao[] = [
  // Pequeno-almoço
  {
    id: "c1",
    tipo: "cafe",
    nome: "Omelete de espinafres com queijo fresco",
    tempo: 10,
    hc: 6,
    etiqueta: "Boa escolha",
    passos:
      "Bata os ovos, junte os espinafres e o queijo fresco e cozinhe numa frigideira antiaderente. Acompanhe com uma fatia de pão integral.",
    ing: [
      { n: "Ovos", q: 2, u: "un", cat: "Laticínios e ovos" },
      { n: "Espinafres", q: 50, u: "g", cat: "Frescos" },
      { n: "Queijo fresco", q: 40, u: "g", cat: "Laticínios e ovos" },
      { n: "Pão integral", q: 1, u: "fatia", cat: "Mercearia" },
    ],
  },
  {
    id: "c2",
    tipo: "cafe",
    nome: "Iogurte grego com aveia e frutos vermelhos",
    tempo: 5,
    hc: 22,
    etiqueta: "Boa escolha",
    passos:
      "Num copo ou taça, misture o iogurte grego natural sem açúcar com a aveia e os frutos vermelhos. Polvilhe com nozes.",
    ing: [
      { n: "Iogurte grego natural", q: 170, u: "g", cat: "Laticínios e ovos" },
      { n: "Flocos de aveia", q: 30, u: "g", cat: "Mercearia" },
      { n: "Frutos vermelhos", q: 80, u: "g", cat: "Frescos" },
      { n: "Nozes", q: 15, u: "g", cat: "Mercearia" },
    ],
  },
  {
    id: "c3",
    tipo: "cafe",
    nome: "Papas de aveia com canela e maçã",
    tempo: 10,
    hc: 32,
    etiqueta: "Moderar",
    passos:
      "Cozinhe a aveia em leite ou bebida vegetal sem açúcar, junte canela e maçã às cubinhos. Sem adoçar.",
    ing: [
      { n: "Flocos de aveia", q: 40, u: "g", cat: "Mercearia" },
      { n: "Leite meio-gordo", q: 200, u: "ml", cat: "Laticínios e ovos" },
      { n: "Maçã", q: 1, u: "un", cat: "Frescos" },
      { n: "Canela", q: 1, u: "colher chá", cat: "Mercearia" },
    ],
  },
  {
    id: "c4",
    tipo: "cafe",
    nome: "Tosta integral com abacate e ovo",
    tempo: 10,
    hc: 18,
    etiqueta: "Boa escolha",
    passos:
      "Torre o pão, esmague o abacate com limão e sal, cubra com um ovo cozido ou escalfado.",
    ing: [
      { n: "Pão integral", q: 2, u: "fatia", cat: "Mercearia" },
      { n: "Abacate", q: 0.5, u: "un", cat: "Frescos" },
      { n: "Ovos", q: 1, u: "un", cat: "Laticínios e ovos" },
      { n: "Limão", q: 0.25, u: "un", cat: "Frescos" },
    ],
  },
  // Almoço
  {
    id: "a1",
    tipo: "almoco",
    nome: "Salmão grelhado com grão e legumes",
    tempo: 25,
    hc: 28,
    etiqueta: "Boa escolha",
    passos:
      "Grelhe o salmão 4 minutos de cada lado. Salteie o grão-de-bico com courgete e cenoura. Termine com azeite e limão.",
    ing: [
      { n: "Salmão (posta)", q: 150, u: "g", cat: "Talho e peixe" },
      { n: "Grão-de-bico cozido", q: 100, u: "g", cat: "Mercearia" },
      { n: "Courgete", q: 1, u: "un", cat: "Frescos" },
      { n: "Cenoura", q: 1, u: "un", cat: "Frescos" },
      { n: "Azeite", q: 1, u: "colher sopa", cat: "Mercearia" },
    ],
  },
  {
    id: "a2",
    tipo: "almoco",
    nome: "Frango assado com feijão-verde e batata-doce",
    tempo: 35,
    hc: 30,
    etiqueta: "Boa escolha",
    passos:
      "Tempere o peito de frango com alho e paprika e leve ao forno. Cozinhe o feijão-verde a vapor e asse a batata-doce em cubos.",
    ing: [
      { n: "Peito de frango", q: 150, u: "g", cat: "Talho e peixe" },
      { n: "Feijão-verde", q: 150, u: "g", cat: "Frescos" },
      { n: "Batata-doce", q: 120, u: "g", cat: "Frescos" },
      { n: "Alho", q: 1, u: "dente", cat: "Frescos" },
    ],
  },
  {
    id: "a3",
    tipo: "almoco",
    nome: "Salada de atum com feijão e ovo",
    tempo: 10,
    hc: 20,
    etiqueta: "Boa escolha",
    passos:
      "Misture alface, tomate, feijão preto escorrido, atum ao natural e meio ovo cozido. Tempere com azeite e vinagre.",
    ing: [
      { n: "Alface", q: 80, u: "g", cat: "Frescos" },
      { n: "Tomate", q: 1, u: "un", cat: "Frescos" },
      { n: "Feijão preto cozido", q: 80, u: "g", cat: "Mercearia" },
      { n: "Atum ao natural (lata)", q: 1, u: "un", cat: "Mercearia" },
      { n: "Ovos", q: 1, u: "un", cat: "Laticínios e ovos" },
    ],
  },
  {
    id: "a4",
    tipo: "almoco",
    nome: "Arroz integral com peru e brócolos",
    tempo: 30,
    hc: 42,
    etiqueta: "Moderar",
    passos:
      "Cozinhe o arroz integral. Salteie o peru em tiras com alho e junte os brócolos cozidos.",
    ing: [
      { n: "Arroz integral", q: 60, u: "g", cat: "Mercearia" },
      { n: "Peru em tiras", q: 130, u: "g", cat: "Talho e peixe" },
      { n: "Brócolos", q: 150, u: "g", cat: "Frescos" },
      { n: "Alho", q: 1, u: "dente", cat: "Frescos" },
    ],
  },
  {
    id: "a5",
    tipo: "almoco",
    nome: "Peixe-espada ao forno com legumes",
    tempo: 30,
    hc: 14,
    etiqueta: "Boa escolha",
    passos:
      "Disponha o peixe sobre cebola e pimento em rodelas, regue com azeite e leve ao forno 20 minutos.",
    ing: [
      { n: "Pescada (filete)", q: 160, u: "g", cat: "Talho e peixe" },
      { n: "Cebola", q: 0.5, u: "un", cat: "Frescos" },
      { n: "Pimento", q: 1, u: "un", cat: "Frescos" },
      { n: "Azeite", q: 1, u: "colher sopa", cat: "Mercearia" },
    ],
  },
  // Jantar
  {
    id: "j1",
    tipo: "jantar",
    nome: "Sopa de legumes com um ovo cozido",
    tempo: 30,
    hc: 18,
    etiqueta: "Boa escolha",
    passos:
      "Cozinhe cenoura, courgete, couve e alho-francês em água, triture ou deixe em pedaços. Sirva com um ovo cozido.",
    ing: [
      { n: "Cenoura", q: 1, u: "un", cat: "Frescos" },
      { n: "Courgete", q: 1, u: "un", cat: "Frescos" },
      { n: "Couve", q: 100, u: "g", cat: "Frescos" },
      { n: "Alho-francês", q: 1, u: "un", cat: "Frescos" },
      { n: "Ovos", q: 1, u: "un", cat: "Laticínios e ovos" },
    ],
  },
  {
    id: "j2",
    tipo: "jantar",
    nome: "Strogonoff leve de frango com salada",
    tempo: 25,
    hc: 16,
    etiqueta: "Boa escolha",
    passos:
      "Salteie o frango em tiras com cogumelos e cebola. Junte um pouco de iogurte natural no fim. Sirva com salada verde.",
    ing: [
      { n: "Peito de frango", q: 140, u: "g", cat: "Talho e peixe" },
      { n: "Cogumelos", q: 100, u: "g", cat: "Frescos" },
      { n: "Cebola", q: 0.5, u: "un", cat: "Frescos" },
      { n: "Iogurte grego natural", q: 60, u: "g", cat: "Laticínios e ovos" },
      { n: "Alface", q: 60, u: "g", cat: "Frescos" },
    ],
  },
  {
    id: "j3",
    tipo: "jantar",
    nome: "Tortilha de legumes com salada",
    tempo: 20,
    hc: 10,
    etiqueta: "Boa escolha",
    passos:
      "Salteie cebola e pimento, junte 3 ovos batidos e deixe firmar. Sirva com salada de tomate.",
    ing: [
      { n: "Ovos", q: 3, u: "un", cat: "Laticínios e ovos" },
      { n: "Cebola", q: 0.5, u: "un", cat: "Frescos" },
      { n: "Pimento", q: 0.5, u: "un", cat: "Frescos" },
      { n: "Tomate", q: 1, u: "un", cat: "Frescos" },
    ],
  },
  {
    id: "j4",
    tipo: "jantar",
    nome: "Bacalhau com grão e espinafres",
    tempo: 30,
    hc: 24,
    etiqueta: "Boa escolha",
    passos:
      "Coza o bacalhau dessalgado e lascado, salteie com alho, grão-de-bico e espinafres. Finalize com azeite.",
    ing: [
      { n: "Bacalhau dessalgado", q: 150, u: "g", cat: "Talho e peixe" },
      { n: "Grão-de-bico cozido", q: 100, u: "g", cat: "Mercearia" },
      { n: "Espinafres", q: 100, u: "g", cat: "Frescos" },
      { n: "Alho", q: 1, u: "dente", cat: "Frescos" },
    ],
  },
  {
    id: "j5",
    tipo: "jantar",
    nome: "Massa integral com legumes e atum",
    tempo: 20,
    hc: 48,
    etiqueta: "Moderar",
    passos:
      "Cozinhe pouca massa integral. Misture com courgete salteada, tomate e atum ao natural.",
    ing: [
      { n: "Massa integral", q: 60, u: "g", cat: "Mercearia" },
      { n: "Courgete", q: 1, u: "un", cat: "Frescos" },
      { n: "Tomate", q: 1, u: "un", cat: "Frescos" },
      { n: "Atum ao natural (lata)", q: 1, u: "un", cat: "Mercearia" },
    ],
  },
];

export type Plano = Record<string, Record<Tipo, string>>; // dia -> tipo -> id

export function porId(id: string): Refeicao | undefined {
  return REFEICOES.find((r) => r.id === id);
}

export function opcoes(tipo: Tipo): Refeicao[] {
  return REFEICOES.filter((r) => r.tipo === tipo);
}

export function planoInicial(): Plano {
  const plano: Plano = {};
  DIAS.forEach((dia, i) => {
    plano[dia] = { cafe: "", almoco: "", jantar: "" };
    for (const t of TIPOS) {
      const o = opcoes(t.id);
      plano[dia][t.id] = o[i % o.length].id;
    }
  });
  return plano;
}

export type ItemLista = {
  chave: string;
  n: string;
  q: number;
  u: string;
  cat: Ingrediente["cat"];
};

export function listaDeCompras(plano: Plano): ItemLista[] {
  const mapa = new Map<string, ItemLista>();
  for (const dia of DIAS) {
    for (const t of TIPOS) {
      const r = porId(plano[dia]?.[t.id]);
      if (!r) continue;
      for (const ing of r.ing) {
        const chave = `${ing.n}|${ing.u}`;
        const atual = mapa.get(chave);
        if (atual) atual.q += ing.q;
        else mapa.set(chave, { chave, ...ing });
      }
    }
  }
  return [...mapa.values()].sort((a, b) => a.n.localeCompare(b.n, "pt"));
}

export function formatarQtd(q: number, u: string): string {
  const v = Number.isInteger(q) ? String(q) : q.toFixed(1).replace(".", ",");
  return `${v} ${u}`;
}
