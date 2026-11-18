import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter variável auto-hospedada (pacote @fontsource-variable/inter, licença OFL).
// O build não depende de download de fonte remota.
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap"
});

const title = "Sinal Digital | Tecnologia, infraestrutura e conectividade para empresas";
const description =
  "Equipamentos, infraestrutura, conectividade e serviços para empresas, instituições e projetos corporativos, com atendimento consultivo desde 2011.";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title,
  description,
  applicationName: "Sinal Digital",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Sinal Digital",
    title,
    description,
    url: "/"
  }
};

export const viewport: Viewport = {
  themeColor: "#031B3A"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
