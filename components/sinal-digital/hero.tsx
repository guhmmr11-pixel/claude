import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { QuoteButton } from "@/components/sinal-digital/quote/quote-button";
import { equipment } from "@/data/equipment";
import { site, whatsappLink, whatsappMessages } from "@/data/site";
import dataCenter from "@/public/images/hero/data-center.jpg";

const trustItems = [
  `Desde ${site.since}`,
  "Fornecedor B2B",
  "Faturamento direto pelo fabricante/distribuidor",
  "Garantia do fabricante"
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-space-950 pb-16 pt-28 text-white sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-32"
    >
      {/* Fundo: foto de data center com zoom lento, véu escuro, grade e anéis de sinal. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={dataCenter}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="anim-ken-burns object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#020611_8%,rgba(2,6,17,0.9)_40%,rgba(2,6,17,0.55)_75%,rgba(2,6,17,0.8)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-space-900" />
        <div className="sd-grid absolute inset-0 opacity-60" />
        <div className="absolute right-[18%] top-[46%] hidden lg:block">
          {[0, 2, 4].map((delay) => (
            <span
              key={delay}
              className="signal-ring h-[44rem] w-[44rem]"
              style={{ "--d": `${delay}s` } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
        <div className="max-w-2xl">
          <p
            className="anim-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur"
            style={{ "--d": "0ms" } as CSSProperties}
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-signal-cyan" aria-hidden="true" />
            Tecnologia B2B desde {site.since}
          </p>

          <h1
            id="hero-title"
            className="anim-rise mt-6 font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.2rem] xl:text-[3.5rem]"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            Tecnologia, <span className="sd-text-gradient">infraestrutura e conectividade</span> para
            impulsionar a operação da sua empresa.
          </h1>

          <p
            className="anim-rise mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
            style={{ "--d": "160ms" } as CSSProperties}
          >
            A Sinal Digital fornece equipamentos e serviços de tecnologia para empresas:{" "}
            <strong className="font-semibold text-white">
              computadores, áudio e vídeo, redes, climatização e segurança
            </strong>
            , com atendimento consultivo e faturamento direto pelo fabricante ou distribuidor.
          </p>

          <div
            className="anim-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "240ms" } as CSSProperties}
          >
            <QuoteButton className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal-cyan to-signal-sky px-6 text-sm font-semibold text-space-950 shadow-[0_0_32px_-6px_rgba(34,211,238,0.75)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ice">
              Solicitar cotação
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </QuoteButton>
            <a
              href={whatsappLink(whatsappMessages.consultant)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ice"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar com um consultor
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
          </div>

          <ul
            className="anim-rise mt-10 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-slate-300 sm:grid-cols-2"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            {trustItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <EquipmentMosaic />
      </div>
    </section>
  );
}

/** Fotos dos equipamentos mais procurados. Cada foto abre a cotação já com o item marcado. */
function EquipmentMosaic() {
  return (
    <div id="equipamentos" className="relative scroll-mt-24">
      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold text-white">Equipamentos mais procurados</h2>
        <p className="mt-1 text-sm text-slate-400">Clique na foto e solicite a cotação.</p>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {equipment.map((item, index) => (
          <li
            key={item.id}
            className="anim-rise"
            style={{ "--d": `${360 + index * 70}ms` } as CSSProperties}
          >
            <QuoteButton
              seed={{ solutionId: item.solutionId, items: item.items }}
              aria-label={`Solicitar cotação de ${item.label}`}
              className="sd-glow-card group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-space-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 46vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-space-950/95 via-space-950/30 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <span className="text-sm font-semibold leading-tight text-white">{item.label}</span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-signal-cyan/90 px-2 py-0.5 text-[0.7rem] font-bold text-space-950 transition group-hover:bg-signal-ice">
                  Cotar
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </span>
            </QuoteButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
