import type { Metadata } from "next";
import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "Pratowise — versão de teste",
  robots: { index: false },
};

export default function AppPage() {
  return <AppShell />;
}
