import { Benefits } from "@/components/sinal-digital/benefits";
import { Contact } from "@/components/sinal-digital/contact";
import { Footer } from "@/components/sinal-digital/footer";
import { Header } from "@/components/sinal-digital/header";
import { Hero } from "@/components/sinal-digital/hero";
import { SolutionsSection } from "@/components/sinal-digital/solutions-section";
import { ValidationSteps } from "@/components/sinal-digital/validation-steps";
import { WhatsAppFloatingButton } from "@/components/sinal-digital/whatsapp-floating-button";
import { WhySinalDigital } from "@/components/sinal-digital/why-sinal-digital";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <Hero />
      <SolutionsSection />
      <Benefits />
      <ValidationSteps />
      <WhySinalDigital />
      <Contact />
      <Footer />
      <WhatsAppFloatingButton />
    </main>
  );
}
