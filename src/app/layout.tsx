import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratowise.com"),
  title: "Pratowise — planeie a semana e escolha melhor o que come",
  description:
    "Plano de refeições da semana, lista de compras automática e um scanner que diz se um produto cabe no seu prato. Em breve em Portugal.",
  openGraph: {
    title: "Pratowise",
    description:
      "Planeie a semana, faça a lista de compras e veja se um produto cabe no seu prato.",
    url: "https://pratowise.com",
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4a1d73",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
