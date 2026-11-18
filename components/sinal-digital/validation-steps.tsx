import { ArrowRight } from "lucide-react";
import { QuoteButton } from "@/components/sinal-digital/quote/quote-button";
import { SectionHeading } from "@/components/sinal-digital/section-heading";

const steps = [
  {
    number: "01",
    title: "Diagnóstico da necessidade",
    text: "Entendemos o ambiente, o objetivo do projeto, volume de equipamentos, prazo e restrições técnicas."
  },
  {
    number: "02",
    title: "Validação técnica",
    text: "Avaliamos compatibilidade, infraestrutura, conectividade, instalação, suporte e requisitos de operação."
  },
  {
    number: "03",
    title: "Proposta comercial",
    text: "Estruturamos a melhor condição com faturamento direto pelo fabricante/distribuidor, garantia e prazo de entrega."
  },
  {
    number: "04",
    title: "Implantação e suporte",
    text: "Apoiamos a instalação, configuração, manutenção e acompanhamento do uso da solução."
  }
];

export function ValidationSteps() {
  return (
    <section id="processo" aria-labelledby="processo-title" className="relative bg-space-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="processo-title" eyebrow="Como funciona" title="Da cotação à implantação, com validação em cada etapa.">
          Antes da compra, ajudamos sua empresa a entender necessidade, infraestrutura, melhor solução e condições
          comerciais.
        </SectionHeading>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Linha de progresso: preenche conforme a seção entra na tela. */}
          <span className="absolute bottom-6 left-6 top-6 w-px bg-white/10 lg:hidden" aria-hidden="true">
            <span className="fill-y-on-view block h-full w-full bg-gradient-to-b from-signal-cyan to-signal-blue" />
          </span>
          <span className="absolute left-6 right-6 top-6 hidden h-px bg-white/10 lg:block" aria-hidden="true">
            <span className="fill-x-on-view block h-full w-full bg-gradient-to-r from-signal-cyan to-signal-blue" />
          </span>

          {steps.map(({ number, title, text }) => (
            <li key={number} className="reveal relative grid grid-cols-[3rem_1fr] gap-5 lg:block">
              <span className="relative grid h-12 w-12 place-items-center rounded-full border border-signal-sky/40 bg-space-900 font-display text-sm font-semibold text-signal-ice shadow-[0_0_24px_-4px_rgba(34,211,238,0.55)]">
                <span className="sr-only">Etapa </span>
                {number}
              </span>
              <div className="lg:mt-6">
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal mt-14 flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-signal-blue/20 via-space-800 to-space-800 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="font-display text-xl font-semibold text-white sm:text-2xl">
            Comece pela cotação: escolha o que precisa e envie em poucos passos.
          </p>
          <QuoteButton className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-signal-cyan to-signal-sky px-6 text-sm font-semibold text-space-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ice">
            Solicitar cotação
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
