export type Nivel = "boa" | "moderar" | "evitar" | "desconhecido";

export type Produto = {
  codigo: string;
  nome: string;
  marca: string;
  imagem?: string;
  porcao100: {
    acucares?: number;
    hidratos?: number;
    fibra?: number;
    gordSat?: number;
    sal?: number;
    energia?: number;
  };
  nivel: Nivel;
  motivos: string[];
};

type Nutri = Record<string, number | string | undefined>;

function num(n: Nutri, k: string): number | undefined {
  const v = n[k];
  if (typeof v === "number") return v;
  if (typeof v === "string" && v !== "" && !Number.isNaN(Number(v)))
    return Number(v);
  return undefined;
}

export function classificar(p: Produto["porcao100"]): {
  nivel: Nivel;
  motivos: string[];
} {
  const { acucares, gordSat, sal, fibra } = p;
  if (
    acucares === undefined &&
    gordSat === undefined &&
    sal === undefined &&
    p.hidratos === undefined
  ) {
    return {
      nivel: "desconhecido",
      motivos: ["Este produto não tem informação nutricional suficiente."],
    };
  }
  let pontos = 0;
  const motivos: string[] = [];

  if (acucares !== undefined) {
    if (acucares > 12.5) {
      pontos += 2;
      motivos.push(`Muito açúcar: ${acucares} g por 100 g.`);
    } else if (acucares > 5) {
      pontos += 1;
      motivos.push(`Algum açúcar: ${acucares} g por 100 g.`);
    } else {
      motivos.push(`Pouco açúcar: ${acucares} g por 100 g.`);
    }
  }
  if (gordSat !== undefined) {
    if (gordSat > 5) {
      pontos += 2;
      motivos.push(`Muita gordura saturada: ${gordSat} g por 100 g.`);
    } else if (gordSat > 1.5) {
      pontos += 1;
      motivos.push(`Gordura saturada média: ${gordSat} g por 100 g.`);
    }
  }
  if (sal !== undefined) {
    if (sal > 1.5) {
      pontos += 2;
      motivos.push(`Muito sal: ${sal} g por 100 g.`);
    } else if (sal > 0.3) {
      pontos += 1;
      motivos.push(`Sal moderado: ${sal} g por 100 g.`);
    }
  }
  if (fibra !== undefined && fibra >= 3) {
    pontos -= 1;
    motivos.push(`Boa fonte de fibra: ${fibra} g por 100 g.`);
  }

  const nivel: Nivel = pontos >= 3 ? "evitar" : pontos >= 1 ? "moderar" : "boa";
  return { nivel, motivos };
}

export async function procurarProduto(codigo: string): Promise<Produto | null> {
  const limpo = codigo.replace(/\D/g, "");
  if (limpo.length < 8) return null;
  const url = `https://world.openfoodfacts.org/api/v2/product/${limpo}.json?fields=product_name,product_name_pt,brands,nutriments,image_front_small_url`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.status !== 1 || !data.product) return null;
  const pr = data.product;
  const n: Nutri = pr.nutriments ?? {};
  const porcao100 = {
    acucares: num(n, "sugars_100g"),
    hidratos: num(n, "carbohydrates_100g"),
    fibra: num(n, "fiber_100g"),
    gordSat: num(n, "saturated-fat_100g"),
    sal: num(n, "salt_100g"),
    energia: num(n, "energy-kcal_100g"),
  };
  const { nivel, motivos } = classificar(porcao100);
  return {
    codigo: limpo,
    nome: pr.product_name_pt || pr.product_name || "Produto sem nome",
    marca: (pr.brands || "").split(",")[0],
    imagem: pr.image_front_small_url,
    porcao100,
    nivel,
    motivos,
  };
}
