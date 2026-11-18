import { BadgeDollarSign, Factory, Handshake, Route, ShieldCheck, Zap } from "lucide-react";
import { SectionHeading } from "@/components/sinal-digital/section-heading";

const reasons = [
  { text: "Faturamento direto pelo fabricante/distribuidor", icon: Factory },
  { text: "Menos intermediários", icon: Route },
  { text: "Mais agilidade na negociação", icon: Zap },
  { text: "Condições comerciais especiais", icon: BadgeDollarSign },
  { text: "Garantia do fabricante", icon: ShieldCheck },
  { text: "Atendimento personalizado", icon: Handshake }
];

export function WhySinalDigital() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-title"
      className="relative overflow-hidden bg-brand-night py-16 text-white sm:py-20"
    >
      <div
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(125,211,252,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.1)_1px,transparent_1px)] [background-size:40px_40px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
        <SectionHeading
          id="diferenciais-title"
          tone="dark"
          eyebrow="Por que escolher a Sinal Digital"
          title="Um parceiro comercial para comprar melhor e implantar com confiança."
        >
          Negociação ágil, procedência e apoio consultivo desde a escolha até o acompanhamento
          técnico.
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {reasons.map(({ text, icon: Icon }) => (
            <li key={text} className="reveal flex items-center gap-4 bg-brand-night p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-sky/15 text-brand-cyan">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[0.95rem] font-semibold leading-snug">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
