import {
  BadgeCheck,
  CircuitBoard,
  Cpu,
  Factory,
  Laptop,
  Monitor,
  Projector,
  Router,
  Smartphone,
  Tablet,
  Wifi,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SinalLogo } from "@/components/sinal-digital/sinal-logo";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative scroll-mt-28 overflow-hidden border-b border-cyan-300/20 bg-[radial-gradient(circle_at_76%_18%,rgba(14,165,233,0.28),transparent_30%),radial-gradient(circle_at_12%_16%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,#020f24_0%,#031B3A_46%,#062C55_100%)]"
    >
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(125,211,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.12)_1px,transparent_1px)] [background-size:38px_38px]" aria-hidden="true" />
      <div className="absolute -right-28 top-24 h-72 w-72 rounded-full bg-cyan-300/18 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-12">
        <div className="max-w-3xl animate-[hero-in_700ms_ease-out_both]">
          <div className="mb-4 w-fit">
            <SinalLogo />
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <HeroBadge icon={BadgeCheck} label="Desde 2011" />
            <HeroBadge icon={Factory} label="Fornecedor B2B" />
            <HeroBadge icon={Workflow} label="Faturamento direto" />
            <HeroBadge icon={BadgeCheck} label="Garantia do fabricante" />
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-[3.6rem]">
            Tecnologia, infraestrutura e conectividade para impulsionar a operação da sua empresa.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            A Sinal Digital conecta empresas a soluções completas em tecnologia,
            conectividade, equipamentos e serviços, com atendimento consultivo desde 2011.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-black text-[#031B3A] shadow-lg shadow-cyan-950/25 transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Consultar soluções
            </a>
            <a
              href="https://wa.me/5511999015519?text=Ol%C3%A1,%20gostaria%20de%20falar%20com%20um%20consultor%20da%20Sinal%20Digital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:border-cyan-200/50 hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Falar com um consultor
            </a>
          </div>
        </div>

        <div className="animate-[hero-in_800ms_ease-out_120ms_both]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-[float-soft_6s_ease-in-out_infinite]" aria-label="Equipamentos de tecnologia fornecidos pela Sinal Digital">
      <div className="absolute inset-5 rounded-full bg-cyan-300/45 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.6rem] border border-cyan-200/25 bg-[#061F3F]/78 p-4 shadow-2xl shadow-sky-950/35 backdrop-blur-xl sm:p-5">
        <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-[#052D5F] px-3 py-2 text-xs font-black text-cyan-100 shadow-lg">
          <CircuitBoard className="h-4 w-4" aria-hidden="true" />
          Stack corporativo
        </div>
        <div className="grid grid-cols-[0.8fr_1.2fr_0.8fr] items-end gap-2.5 sm:gap-3">
          <DeviceTile label="Tablet" className="h-24 sm:h-28" icon={Tablet} />
          <div className="space-y-3">
            <DeviceTile label="TV / Monitor" className="h-36 sm:h-40" icon={Monitor} prominent />
            <DeviceTile label="Notebook" className="h-20" icon={Laptop} />
          </div>
          <DeviceTile label="Celular" className="h-28 sm:h-32" icon={Smartphone} />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          <DeviceTile label="Projetor" className="h-20" icon={Projector} compact />
          <DeviceTile label="Desktop" className="h-20" icon={Cpu} compact />
          <DeviceTile label="Switch" className="h-20" icon={Router} compact />
          <DeviceTile label="Access point" className="h-20" icon={Wifi} compact />
        </div>
        <div className="mt-3 rounded-2xl border border-cyan-200/20 bg-gradient-to-r from-[#052D5F] to-[#0B6ACB] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-950/20">
          Tecnologia, infraestrutura e serviços em um só parceiro.
        </div>
      </div>
    </div>
  );
}

function HeroBadge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold text-cyan-100 shadow-sm shadow-sky-950/10 backdrop-blur">
      <Icon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
      {label}
    </span>
  );
}

type DeviceTileProps = {
  label: string;
  className: string;
  icon: LucideIcon;
  compact?: boolean;
  prominent?: boolean;
};

function DeviceTile({ label, className, icon: Icon, compact, prominent }: DeviceTileProps) {
  return (
    <div
      className={`${className} flex flex-col items-center justify-center rounded-2xl border border-cyan-100/15 bg-gradient-to-br from-white/95 to-cyan-50/86 p-2.5 text-center shadow-lg shadow-sky-950/18 transition hover:-translate-y-1 hover:shadow-xl`}
    >
      <Icon
        className={`${prominent ? "h-16 w-16" : compact ? "h-7 w-7" : "h-10 w-10"} text-[#0B6ACB]`}
        aria-hidden="true"
      />
      <span className={`${compact ? "mt-2 text-[0.68rem]" : "mt-3 text-xs"} font-bold text-slate-700`}>
        {label}
      </span>
    </div>
  );
}
