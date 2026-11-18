import { Headphones, MapPinned, ShieldCheck, Stamp } from "lucide-react";
import { ScrollReveal } from "@/components/sinal-digital/scroll-reveal";

const benefits = [
  {
    title: "Procedência comprovada",
    description: "Fornecimento com origem clara e relacionamento comercial estruturado.",
    icon: Stamp
  },
  {
    title: "Qualidade garantida",
    description: "Equipamentos com garantia do fabricante e seleção técnica adequada.",
    icon: ShieldCheck
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
  return (
    <section id="beneficios" className="scroll-mt-28 bg-[#edf4fa] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#0B6ACB]">
            Benefícios
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#052D5F] sm:text-3xl">
            Compra corporativa com segurança, agilidade e clareza.
          </h2>
        </ScrollReveal>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <ScrollReveal key={title} delay={index * 80}>
              <article className="group rounded-2xl border border-white/80 bg-white/86 p-4 shadow-xl shadow-sky-950/8 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl hover:shadow-sky-950/12">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#063A78] to-[#0B6ACB] text-white shadow-lg shadow-sky-950/15 transition group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
