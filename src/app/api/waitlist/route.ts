import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const OBJETIVOS = new Set([
  "",
  "Diabetes tipo 2",
  "Pré-diabetes",
  "Perder peso",
  "Comer melhor",
]);

export async function POST(req: Request) {
  let corpo: { email?: unknown; objetivo?: unknown; consentimento?: unknown };
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, mensagem: "Pedido inválido." },
      { status: 400 },
    );
  }

  const email = String(corpo.email ?? "").trim().toLowerCase();
  const objetivo = String(corpo.objetivo ?? "");

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, mensagem: "Escreva um e-mail válido." },
      { status: 400 },
    );
  }
  if (corpo.consentimento !== true) {
    return NextResponse.json(
      { ok: false, mensagem: "É preciso aceitar para o podermos avisar." },
      { status: 400 },
    );
  }
  if (!OBJETIVOS.has(objetivo)) {
    return NextResponse.json(
      { ok: false, mensagem: "Pedido inválido." },
      { status: 400 },
    );
  }

  const url = process.env.SUPABASE_URL;
  const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !chave) {
    return NextResponse.json(
      { ok: false, mensagem: "A lista de espera ainda não está ligada." },
      { status: 503 },
    );
  }

  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: chave,
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ email, objetivo: objetivo || null }),
  });

  // 201 = guardado; 409 = já estava na lista (também é sucesso para a pessoa).
  if (res.ok || res.status === 409) {
    return NextResponse.json({
      ok: true,
      mensagem: "Pronto! Avisamos assim que o Pratowise abrir.",
    });
  }

  return NextResponse.json(
    { ok: false, mensagem: "Não foi possível guardar. Tente de novo." },
    { status: 502 },
  );
}
