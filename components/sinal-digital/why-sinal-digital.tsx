import { ArrowRight, BadgeDollarSign, Factory, Handshake, ShieldCheck, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/sinal-digital/scroll-reveal";

const reasons = [
  { text: "Faturamento direto pelo fabricante/distribuidor", icon: Factory },
  { text: "Menos intermediários", icon: ArrowRight },
  { text: "Mais agilidade na negociação", icon: Zap },
  { text: "Condições comerciais especiais", icon: BadgeDollarSign },
  { text: "Garantia do fabricante", icon: ShieldCheck },
  { text: "Atendimento personalizado", icon: Handshake }
];

export function WhySinalDigital() {
  return (
    <section className="relative overflow-hidden bg-[#020f24] py-10 text-white sm:py-12">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(125,211,252,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.14)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
      <div className="absolute -right-24 top-10 h-60 w-60 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <ScrollReveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-200">
            Por que escolher a Sinal Digital
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Um parceiro comercial para comprar melhor e implantar com confiança.
          </h2>
          <p className="mt-4 text-sm leading-6 text-sky-100/86">
            A Sinal Digital conecta sua empresa a soluções completas com negociação ágil,
            procedência e apoio consultivo desde a escolha até o acompanhamento técnico.
          </p>
          <div className="mt-5 rounded-2xl border border-cyan-200/14 bg-white/8 p-4 backdrop-blur">
            <p className="text-sm font-black text-cyan-100">Modelo comercial B2B</p>
            <p className="mt-2 text-sm leading-5 text-white/72">
              Uma jornada de compra mais clara para tecnologia, infraestrutura e serviços,
              com apoio técnico e foco em condição comercial.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {reasons.map(({ text, icon: Icon }, index) => (
            <ScrollReveal key={text} delay={index * 70}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/15 text-cyan-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-5">{text}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
