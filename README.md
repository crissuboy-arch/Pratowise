# Pratowise

Landing page com lista de espera (Next.js 15 + Tailwind 4), em português de Portugal.

## Correr localmente

```bash
npm install
npm run dev
```

## Lista de espera (Supabase)

1. Crie um projeto no Supabase e execute `supabase/waitlist.sql` no SQL Editor.
2. Copie `.env.example` para `.env.local` e preencha `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
3. Na Vercel, adicione as mesmas duas variáveis em *Settings → Environment Variables*.

Sem estas variáveis, o formulário responde que a lista ainda não está ligada.

## Antes de publicar

- Completar `src/app/privacidade/page.tsx` (campos entre parênteses rectos) e pedir revisão.
- Ligar o domínio `pratowise.com` na Vercel.
