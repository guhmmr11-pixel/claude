import { BadgeDollarSign, Factory, Headphones, MapPinned, ShieldCheck, Stamp } from "lucide-react";
import { SectionHeading } from "@/components/sinal-digital/section-heading";
import { site } from "@/data/site";

// Benefícios e diferenciais reunidos em uma lista curta (conteúdo já aprovado).
const benefits = [
  {
    title: "Faturamento direto pelo fabricante/distribuidor",
    description: "Menos intermediários e mais agilidade na negociação.",
    icon: Factory
  },
  {
    title: "Garantia do fabricante",
    description: "Equipamentos com garantia do fabricante e seleção técnica adequada.",
    icon: ShieldCheck
  },
  {
    title: "Procedência comprovada",
    description: "Fornecimento com origem clara e relacionamento comercial estruturado.",
    icon: Stamp
  },
  {
    title: "Condições comerciais especiais",
    description: "Negociação pensada para empresas, instituições e projetos corporativos.",
    icon: BadgeDollarSign
  },
  {
    title: "Atendimento personalizado",
    description: "Consultoria para entender necessidade, prazo, orçamento e operação.",
    icon: Headphones
  },
  {
    title: "Frete para todo o Brasil",
    description: "Entrega nacional para empresas, instituições e projetos corporativos.",
    icon: MapPinned
  }
];

export function Benefits() {
  const years = new Date().getFullYear() - site.since;

  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="relative overflow-hidden bg-space-950 py-20 sm:py-28">
      <div className="sd-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionHeading id="beneficios-title" eyebrow="Por que a Sinal Digital" title="Compra corporativa com segurança, agilidade e clareza." />
          <div className="reveal sd-glass mt-8 rounded-3xl p-6 sm:p-8">
            <p className="font-display text-6xl font-semibold leading-none sm:text-7xl">
              <span className="sd-text-gradient">{site.since}</span>
            </p>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Desde {site.since}, {years > 0 ? `são ${years} anos de ` : ""}atendimento consultivo para empresas,
              instituições e projetos corporativos.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 self-center sm:grid-cols-2">
          {benefits.map(({ title, description, icon: Icon }) => (
            <li key={title} className="reveal sd-glow-card sd-glass rounded-2xl p-5 transition duration-300 hover:-translate-y-0.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-signal-sky/25 bg-signal-sky/10 text-signal-cyan">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
