import type { Metadata } from "next";
import { Benefits } from "@/components/sinal-digital/benefits";
import { Contact } from "@/components/sinal-digital/contact";
import { Footer } from "@/components/sinal-digital/footer";
import { Header } from "@/components/sinal-digital/header";
import { Hero } from "@/components/sinal-digital/hero";
import { QuoteProvider } from "@/components/sinal-digital/quote/quote-provider";
import { SolutionsSection } from "@/components/sinal-digital/solutions-section";
import { ValidationSteps } from "@/components/sinal-digital/validation-steps";
import { WhatsAppFloatingButton } from "@/components/sinal-digital/whatsapp-floating-button";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return (
    <div className="sd-site min-h-screen bg-space-950 text-slate-100">
      <QuoteProvider>
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-space-950 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">
          <Hero />
          <SolutionsSection />
          <Benefits />
          <ValidationSteps />
          <Contact />
        </main>
        <Footer />
        <aside aria-label="Atalho de contato">
          <WhatsAppFloatingButton />
        </aside>
      </QuoteProvider>
    </div>
  );
}
