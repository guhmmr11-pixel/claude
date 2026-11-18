import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sinal Digital | Tecnologia, conectividade e inovação",
  description:
    "Soluções completas em tecnologia, conectividade, infraestrutura e serviços para empresas, com faturamento direto pelo fabricante ou distribuidor."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
