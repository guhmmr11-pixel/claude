import Image from "next/image";
import {
  Check,
  Cpu,
  Laptop,
  MessageCircle,
  Monitor,
  Projector,
  Router,
  Smartphone,
  Tablet,
  Wifi
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site, whatsappLink, whatsappMessages } from "@/data/site";

const trustItems = [
  "Desde 2011",
  "Fornecedor B2B",
  "Faturamento direto pelo fabricante/distribuidor",
  "Garantia do fabricante"
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-navy text-white"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(53,189,242,0.22),transparent_38%),linear-gradient(135deg,#020F24_0%,#031B3A_50%,#052D5F_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(125,211,252,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.09)_1px,transparent_1px)] [background-size:40px_40px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-cyan">
            Tecnologia B2B
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[1.85rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.08] lg:text-[3.1rem]"
          >
            Tecnologia, infraestrutura e conectividade para impulsionar a operação da sua empresa.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            A Sinal Digital conecta empresas a soluções completas em tecnologia, conectividade,
            equipamentos e serviços, com atendimento consultivo desde {site.since}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#solucoes"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-sky px-6 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
            >
              Consultar soluções
            </a>
            <a
              href={whatsappLink(whatsappMessages.consultant)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 text-sm font-bold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar com um consultor
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
          </div>

          <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-white/10 pt-6 text-sm text-slate-200 sm:grid-cols-2">
            {trustItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">{site.heroImage ? <HeroPhoto /> : <EquipmentShowcase />}</div>
      </div>
    </section>
  );
}

function HeroPhoto() {
  const image = site.heroImage!;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-black/30"
    />
  );
}

/** Vitrine por ícones, usada enquanto não houver foto autorizada em `site.heroImage`. */
function EquipmentShowcase() {
  return (
    <figure className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/25">
      <div className="grid grid-cols-4 gap-3">
        <EquipmentTile icon={Monitor} label="TV / Monitor" className="col-span-2 row-span-2" large />
        <EquipmentTile icon={Laptop} label="Notebook" className="col-span-2" />
        <EquipmentTile icon={Tablet} label="Tablet" />
        <EquipmentTile icon={Smartphone} label="Celular" />
        <EquipmentTile icon={Projector} label="Projetor" />
        <EquipmentTile icon={Cpu} label="Desktop" />
        <EquipmentTile icon={Router} label="Switch" />
        <EquipmentTile icon={Wifi} label="Access point" />
      </div>
      <figcaption className="sr-only">
        Exemplos de equipamentos fornecidos pela Sinal Digital: TV e monitor, notebook, tablet,
        celular, projetor, desktop, switch e access point.
      </figcaption>
    </figure>
  );
}

function EquipmentTile({
  icon: Icon,
  label,
  className = "",
  large = false
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[6.5rem] flex-col items-center justify-center gap-2 rounded-2xl bg-white p-3 text-center ${className}`}
      aria-hidden="true"
    >
      <span
        className={`grid place-items-center rounded-full bg-brand-mist text-brand-blue ${
          large ? "h-24 w-24" : "h-11 w-11"
        }`}
      >
        <Icon className={large ? "h-12 w-12" : "h-5 w-5"} strokeWidth={1.75} />
      </span>
      <span className={`font-semibold text-slate-700 ${large ? "text-sm" : "text-xs"}`}>{label}</span>
    </div>
  );
}
