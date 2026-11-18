import { ClipboardCheck, FileText, LifeBuoy, Radar } from "lucide-react";
import { ScrollReveal } from "@/components/sinal-digital/scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Diagnóstico da necessidade",
    text: "Entendemos o ambiente, o objetivo do projeto, volume de equipamentos, prazo e restrições técnicas.",
    icon: Radar
  },
  {
    number: "02",
    title: "Validação técnica",
    text: "Avaliamos compatibilidade, infraestrutura, conectividade, instalação, suporte e requisitos de operação.",
    icon: ClipboardCheck
  },
  {
    number: "03",
    title: "Proposta comercial",
    text: "Estruturamos a melhor condição com faturamento direto pelo fabricante/distribuidor, garantia e prazo de entrega.",
    icon: FileText
  },
  {
    number: "04",
    title: "Implantação e suporte",
    text: "Apoiamos a instalação, configuração, manutenção e acompanhamento do uso da solução.",
    icon: LifeBuoy
  }
];

export function ValidationSteps() {
  return (
    <section id="processo" className="relative scroll-mt-28 overflow-hidden bg-[#e7f0f7] py-10 sm:py-12">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cyan-100/75 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-700">
            Validações e próximos passos
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#052D5F] sm:text-3xl">
            Validações para avançar com segurança
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Antes da compra, ajudamos sua empresa a entender necessidade, infraestrutura,
            melhor solução e condições comerciais.
          </p>
        </ScrollReveal>

        <div className="relative mt-7 grid gap-3 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-sky-300 via-cyan-400 to-sky-300 lg:block" aria-hidden="true" />
          {steps.map(({ number, title, text, icon: Icon }, index) => (
            <ScrollReveal key={number} delay={index * 90}>
              <article className="relative rounded-2xl border border-white/85 bg-white/88 p-4 shadow-xl shadow-sky-950/8 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-950/12">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#063A78] to-[#0B6ACB] text-xs font-black text-white shadow-lg shadow-sky-950/20">
                    {number}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-sky-100 bg-sky-50 text-cyan-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-black text-[#052D5F]">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
