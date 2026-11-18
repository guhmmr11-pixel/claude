import { Headphones, MapPinned, ShieldCheck, Stamp } from "lucide-react";
import { SectionHeading } from "@/components/sinal-digital/section-heading";

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
    <section id="beneficios" aria-labelledby="beneficios-title" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="beneficios-title"
          eyebrow="Benefícios"
          title="Compra corporativa com segurança, agilidade e clareza."
        />

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-brand-line bg-brand-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <li key={title} className="reveal bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-mist text-brand-blue">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
