"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Mail, MessageCircle, X } from "lucide-react";
import type { Solution } from "@/data/solutions";

type SolutionModalProps = {
  solution: Solution | null;
  onClose: () => void;
};

export function SolutionModal({ solution, onClose }: SolutionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!solution) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements?.length) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [solution, onClose]);

  if (!solution) {
    return null;
  }

  const Icon = solution.icon;
  const whatsappUrl = `https://wa.me/5511999015519?text=${encodeURIComponent(
    `Olá, gostaria de saber mais sobre soluções de ${solution.name} da Sinal Digital.`
  )}`;
  const emailUrl = `mailto:decio@sinaldig.com.br?subject=${encodeURIComponent(
    `Solução ${solution.name} - Sinal Digital`
  )}&body=${encodeURIComponent(
    `Olá, gostaria de saber mais sobre soluções de ${solution.name} da Sinal Digital.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-4 py-4 backdrop-blur-md sm:items-center sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="solution-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="max-h-[92vh] w-full max-w-3xl animate-[modal-in_180ms_ease-out] overflow-y-auto rounded-3xl border border-white/85 bg-white shadow-2xl shadow-slate-950/25"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#063A78] to-[#0B6ACB] text-white shadow-lg shadow-sky-950/20">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-black tracking-[0.18em] text-sky-700">
                {solution.number}
              </p>
              <h2
                id="solution-modal-title"
                className="mt-1 text-2xl font-black leading-tight text-[#052D5F]"
              >
                {solution.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {solution.subheadline}
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            aria-label="Fechar detalhes da solução"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-base leading-8 text-slate-700">{solution.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {solution.includes.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-600" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#075E54] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Consultar esta solução pelo WhatsApp
            </a>
            <a
              href={emailUrl}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#063A78] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Consultar por e-mail
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#063A78] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Voltar às soluções
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
