"use client";

import { useEffect, useRef } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { CheckCircle2, Mail, MessageCircle, X } from "lucide-react";
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

/**
 * Detalhes de uma família de soluções em um <dialog> nativo.
 * O navegador cuida da camada modal (fundo inerte) e do Escape.
 * O componente completa o ciclo de Tab, o clique fora e a devolução do foco.
 */
export function SolutionModal({ solution, returnFocusTo, onClose }: SolutionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerDownOnBackdrop = useRef(false);

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((element) => element.offsetParent !== null);

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
      className="solution-dialog"
      aria-labelledby="solution-modal-title"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {solution ? (
        <div className="solution-dialog__panel flex max-h-[92vh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl shadow-brand-night/30 supports-[height:100dvh]:max-h-[92dvh] sm:max-h-[88vh] sm:rounded-3xl sm:supports-[height:100dvh]:max-h-[88dvh]">
          <div className="flex items-start justify-between gap-4 border-b border-brand-line px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-brand-blue">{solution.number}</p>
              <h2
                id="solution-modal-title"
                className="mt-1 text-xl font-bold leading-snug text-brand-navy sm:text-2xl"
              >
                {solution.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">{solution.subheadline}</p>
            </div>
            <button
              type="button"
              data-autofocus
              onClick={close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-brand-mist hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label="Fechar detalhes da solução"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="overflow-y-auto overscroll-contain focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
            tabIndex={0}
            role="region"
            aria-label={`Detalhes de ${solution.name}`}
          >
            {/* Em telas baixas, a faixa visual sai para priorizar texto e ações. */}
            <div className="[@media(max-height:640px)]:hidden">
              <SolutionVisual solution={solution} variant="modal" />
            </div>
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-base leading-7 text-slate-700">{solution.description}</p>
              <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-brand-deep">
                Itens incluídos
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {solution.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-brand-line bg-brand-surface/60 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-brand-line bg-white px-5 py-4 sm:flex-row sm:flex-wrap sm:px-6">
            <a
              href={whatsappLink(whatsappMessages.solution(solution.name))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-whatsapp-dark px-5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Consultar pelo WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href={mailtoLink({
                subject: `Solução ${solution.name} - Sinal Digital`,
                body: whatsappMessages.solution(solution.name)
              })}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-brand-line px-5 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Consultar por e-mail
            </a>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:ml-auto"
            >
              Voltar às soluções
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
