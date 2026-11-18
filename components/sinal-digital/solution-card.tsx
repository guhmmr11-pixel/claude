"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import type { Solution } from "@/data/solutions";
import { SolutionIllustration } from "@/components/sinal-digital/solution-illustration";

type SolutionCardProps = {
  solution: Solution;
  onOpen: (solution: Solution) => void;
};

export function SolutionCard({ solution, onOpen }: SolutionCardProps) {
  const Icon = solution.icon;
  const whatsappUrl = `https://wa.me/5511999015519?text=${encodeURIComponent(
    `Olá, gostaria de saber mais sobre soluções de ${solution.name} da Sinal Digital.`
  )}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-sky-950/8 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl hover:shadow-sky-950/12">
      <div className="p-4 pb-0">
        <SolutionIllustration solutionId={solution.id} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm font-black tracking-[0.18em] text-[#0B6ACB]">
            {solution.number}
          </span>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-[#063A78] shadow-sm transition group-hover:bg-[#063A78] group-hover:text-white">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <h3 className="mt-4 text-xl font-black leading-tight text-[#052D5F]">{solution.name}</h3>
        <p className="mt-2 text-sm font-bold leading-5 text-[#0B6ACB]">{solution.subheadline}</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">{solution.shortDescription}</p>

        <ul className="mt-4 grid gap-2">
          {solution.includes.slice(0, 5).map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#075E54] px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/12 transition hover:bg-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Consultar solução
          </a>
          <button
            type="button"
            onClick={() => onOpen(solution)}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#0B6ACB]/20 bg-sky-50 px-4 py-3 text-sm font-black text-[#052D5F] transition hover:border-cyan-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            Saiba mais
          </button>
        </div>
      </div>
    </article>
  );
}
