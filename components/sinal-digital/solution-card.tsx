import { MessageCircle } from "lucide-react";
import { SolutionVisual } from "@/components/sinal-digital/solution-visual";
import type { Solution } from "@/data/solutions";
import { whatsappLink, whatsappMessages } from "@/data/site";

type SolutionCardProps = {
  solution: Solution;
  onOpen: (solution: Solution, trigger: HTMLButtonElement) => void;
};

export function SolutionCard({ solution, onOpen }: SolutionCardProps) {
  const titleId = `solucao-${solution.id}-titulo`;

  return (
    <article
      id={`solucao-${solution.id}`}
      aria-labelledby={titleId}
      className="reveal group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-[0_1px_2px_rgba(3,27,58,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-18px_rgba(3,27,58,0.28)]"
    >
      <div className="relative">
        <SolutionVisual solution={solution} />
        <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2 py-1 text-xs font-bold tracking-[0.16em] text-brand-blue shadow-sm">
          {solution.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 id={titleId} className="text-xl font-bold leading-snug text-brand-navy">
          {solution.name}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-brand-blue">{solution.subheadline}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600">{solution.shortDescription}</p>

        <ul className="mt-5 grid gap-2 border-t border-brand-line pt-5">
          {solution.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a
            href={whatsappLink(whatsappMessages.solution(solution.name))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 grow basis-[12.5rem] items-center whitespace-nowrap justify-center gap-2 rounded-lg bg-whatsapp-dark px-4 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Consultar solução
            <span className="sr-only"> de {solution.name} pelo WhatsApp (abre em nova aba)</span>
          </a>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => onOpen(solution, event.currentTarget)}
            className="inline-flex h-11 grow basis-28 items-center whitespace-nowrap justify-center rounded-lg border border-brand-line bg-white px-4 text-sm font-semibold text-brand-deep transition-colors hover:border-brand-blue/40 hover:bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Saiba mais
            <span className="sr-only"> sobre {solution.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
