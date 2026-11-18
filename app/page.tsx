import type { Metadata } from "next";
import { Benefits } from "@/components/sinal-digital/benefits";
import { Contact } from "@/components/sinal-digital/contact";
import { Footer } from "@/components/sinal-digital/footer";
import { Header } from "@/components/sinal-digital/header";
import { Hero } from "@/components/sinal-digital/hero";
import { SolutionsSection } from "@/components/sinal-digital/solutions-section";
import { ValidationSteps } from "@/components/sinal-digital/validation-steps";
import { WhatsAppFloatingButton } from "@/components/sinal-digital/whatsapp-floating-button";
import { WhySinalDigital } from "@/components/sinal-digital/why-sinal-digital";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-brand-navy shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="bg-brand-surface text-slate-900">
        <Hero />
        <SolutionsSection />
        <Benefits />
        <ValidationSteps />
        <WhySinalDigital />
        <Contact />
      </main>
      <Footer />
      <aside aria-label="Atalho de contato">
        <WhatsAppFloatingButton />
      </aside>
    </>
  );
}
