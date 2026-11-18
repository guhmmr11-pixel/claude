import { ArrowUpRight, MessageCircle } from "lucide-react";
import { QuoteButton } from "@/components/sinal-digital/quote/quote-button";
import { SolutionVisual } from "@/components/sinal-digital/solution-visual";
import type { Solution } from "@/data/solutions";
import { whatsappLink, whatsappMessages } from "@/data/site";

type SolutionCardProps = {
  solution: Solution;
  onOpen: (solution: Solution, trigger: HTMLButtonElement) => void;
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky";

export function SolutionCard({ solution, onOpen }: SolutionCardProps) {
  const titleId = `solucao-${solution.id}-titulo`;

  return (
    <article
      id={`solucao-${solution.id}`}
      aria-labelledby={titleId}
      className="reveal sd-glow-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-space-850 transition duration-500 hover:-translate-y-1 hover:shadow-signal"
    >
      <div className="relative">
        <SolutionVisual solution={solution} />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-space-950/70 px-2.5 py-1 font-display text-xs font-semibold tracking-[0.16em] text-signal-ice backdrop-blur">
          {solution.number}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 id={titleId} className="font-display text-xl font-semibold leading-snug text-white sm:text-[1.35rem]">
            {solution.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-signal-cyan">{solution.subheadline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <p className="text-[0.95rem] leading-relaxed text-slate-300">{solution.shortDescription}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Itens de ${solution.name}`}>
          {solution.includes.map((item) => (
            <li key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
          <QuoteButton
            seed={{ solutionId: solution.id }}
            className={`col-span-2 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-signal-cyan to-signal-sky px-4 text-sm font-semibold text-space-950 transition hover:brightness-110 ${focusRing}`}
          >
            Solicitar cotação
            <span className="sr-only"> de {solution.name}</span>
          </QuoteButton>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => onOpen(solution, event.currentTarget)}
            className={`inline-flex h-11 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-signal-sky/60 hover:bg-white/5 ${focusRing}`}
          >
            Saiba mais
            <span className="sr-only"> sobre {solution.name}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href={whatsappLink(whatsappMessages.solution(solution.name))}
            target="_blank"
            rel="noreferrer"
            aria-label={`Consultar ${solution.name} pelo WhatsApp (abre em nova aba)`}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-whatsapp/40 text-whatsapp transition hover:bg-whatsapp hover:text-whatsapp-ink ${focusRing}`}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
