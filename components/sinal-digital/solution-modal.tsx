"use client";

import { useEffect, useRef } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { CheckCircle2, Mail, MessageCircle, X } from "lucide-react";
import { useQuote } from "@/components/sinal-digital/quote/quote-provider";
import { SolutionVisual } from "@/components/sinal-digital/solution-visual";
import type { Solution } from "@/data/solutions";
import { mailtoLink, whatsappLink, whatsappMessages } from "@/data/site";

type SolutionModalProps = {
  solution: Solution | null;
  /** Elemento que abriu o modal. Recebe o foco de volta ao fechar. */
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky";

/**
 * Detalhes de uma família de soluções em um <dialog> nativo.
 * O navegador cuida da camada modal (fundo inerte) e do Escape.
 * O componente completa o ciclo de Tab, o clique fora e a devolução do foco.
 */
export function SolutionModal({ solution, returnFocusTo, onClose }: SolutionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerDownOnBackdrop = useRef(false);
  const { openQuote } = useQuote();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (solution && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!solution && dialog.open) {
      dialog.close();
    }
  }, [solution]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      // O evento "close" é assíncrono: se o modal já foi reaberto, ignora o evento antigo.
      if (dialog.open) return;
      onClose();
      if (returnFocusTo?.isConnected) returnFocusTo.focus();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose, returnFocusTo]);

  const close = () => dialogRef.current?.close();

  const requestQuote = (solutionId: string) => {
    const trigger = returnFocusTo;
    close();
    requestAnimationFrame(() => openQuote({ solutionId, returnFocusTo: trigger }));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;

    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => element.offsetParent !== null
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // Fecha só quando o clique começa e termina no fundo (evita fechar ao arrastar seleção de texto).
  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pointerDownOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (pointerDownOnBackdrop.current && event.target === event.currentTarget) close();
    pointerDownOnBackdrop.current = false;
  };

  return (
    <dialog
      ref={dialogRef}
      className="sd-dialog"
      aria-labelledby="solution-modal-title"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {solution ? (
        <div className="sd-dialog__panel flex max-h-[92vh] flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-space-900 text-slate-100 shadow-2xl shadow-black/60 supports-[height:100dvh]:max-h-[92dvh] sm:max-h-[88vh] sm:rounded-3xl sm:supports-[height:100dvh]:max-h-[88dvh]">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-signal-cyan">{solution.number}</p>
              <h2 id="solution-modal-title" className="mt-1 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                {solution.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-400">{solution.subheadline}</p>
            </div>
            <button
              type="button"
              data-autofocus
              onClick={close}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-signal-sky/50 hover:text-white ${focusRing}`}
              aria-label="Fechar detalhes da solução"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="overflow-y-auto overscroll-contain focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal-sky"
            tabIndex={0}
            role="region"
            aria-label={`Detalhes de ${solution.name}`}
          >
            {/* Em telas baixas, a foto sai para priorizar texto e ações. */}
            <div className="[@media(max-height:640px)]:hidden">
              <SolutionVisual solution={solution} variant="modal" />
            </div>
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-base leading-7 text-slate-300">{solution.description}</p>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Itens incluídos</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {solution.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-signal-cyan" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 bg-space-950/80 px-5 py-4 sm:flex-row sm:flex-wrap sm:px-6">
            <button
              type="button"
              onClick={() => requestQuote(solution.id)}
              className={`inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-signal-cyan to-signal-sky px-5 text-sm font-semibold text-space-950 transition hover:brightness-110 ${focusRing}`}
            >
              Solicitar cotação
            </button>
            <a
              href={whatsappLink(whatsappMessages.solution(solution.name))}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border border-whatsapp/50 px-5 text-sm font-semibold text-whatsapp transition hover:bg-whatsapp hover:text-whatsapp-ink ${focusRing}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Consultar pelo </span>
              WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href={mailtoLink({
                subject: `Solução ${solution.name} - Sinal Digital`,
                body: whatsappMessages.solution(solution.name)
              })}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/5 ${focusRing}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Consultar por </span>
              E-mail
            </a>
            <button
              type="button"
              onClick={close}
              className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-slate-400 transition hover:text-white sm:ml-auto ${focusRing}`}
            >
              Voltar às soluções
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
