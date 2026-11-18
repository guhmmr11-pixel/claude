"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Dispatch, FormEvent, KeyboardEvent, MouseEvent, PointerEvent, ReactNode, SetStateAction } from "react";
import { Check, Copy, Mail, MessageCircle, Send, X } from "lucide-react";
import {
  QUOTE_SUBJECT,
  buildQuoteMessage,
  deadlineOptions,
  type QuoteDetails,
  type QuoteSelection
} from "@/components/sinal-digital/quote/quote-message";
import { solutions } from "@/data/solutions";
import { mailtoLink, site, whatsappLink } from "@/data/site";

type QuoteDrawerProps = {
  open: boolean;
  selection: QuoteSelection;
  onSelectionChange: Dispatch<SetStateAction<QuoteSelection>>;
  onClose: () => void;
};

type ErrorKey = "solutions" | "name" | "company" | "whatsapp" | "email";
type Errors = Partial<Record<ErrorKey, string>>;

const initialDetails: QuoteDetails = {
  quantity: "",
  deadline: "",
  city: "",
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  notes: ""
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

function validate(selection: QuoteSelection, details: QuoteDetails): Errors {
  const errors: Errors = {};
  const digits = details.whatsapp.replace(/\D/g, "");

  if (!Object.keys(selection).length) errors.solutions = "Selecione pelo menos uma solução.";
  if (!details.name.trim()) errors.name = "Informe seu nome.";
  if (!details.company.trim()) errors.company = "Informe o nome da empresa.";
  if (!digits) errors.whatsapp = "Informe seu WhatsApp com DDD.";
  else if (digits.length < 10 || digits.length > 13) {
    errors.whatsapp = "Informe um número com DDD, como (11) 99999-9999.";
  }
  if (details.email.trim() && !EMAIL_PATTERN.test(details.email.trim())) {
    errors.email = "Informe um e-mail válido ou deixe em branco.";
  }

  return errors;
}

/** Painel de cotação em <dialog> nativo. Sem backend: monta a mensagem e abre WhatsApp ou e-mail. */
export function QuoteDrawer({ open, selection, onSelectionChange, onClose }: QuoteDrawerProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pointerDownOnBackdrop = useRef(false);
  const [details, setDetails] = useState<QuoteDetails>(initialDetails);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      if (!dialog.open) onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const message = buildQuoteMessage(selection, details);

  function revalidate(nextSelection: QuoteSelection, nextDetails: QuoteDetails) {
    if (submitted) setErrors(validate(nextSelection, nextDetails));
    setSentVia(null);
    setCopied(false);
  }

  function updateDetail(field: keyof QuoteDetails, value: string) {
    const next = { ...details, [field]: value };
    setDetails(next);
    revalidate(selection, next);
  }

  function toggleSolution(solutionId: string) {
    const next = { ...selection };
    if (next[solutionId]) delete next[solutionId];
    else next[solutionId] = [];
    onSelectionChange(next);
    revalidate(next, details);
  }

  function toggleItem(solutionId: string, item: string) {
    const current = selection[solutionId] ?? [];
    const items = current.includes(item) ? current.filter((value) => value !== item) : [...current, item];
    const next = { ...selection, [solutionId]: items };
    onSelectionChange(next);
    revalidate(next, details);
  }

  function send(channel: "whatsapp" | "email") {
    setSubmitted(true);
    const nextErrors = validate(selection, details);
    setErrors(nextErrors);

    const order: ErrorKey[] = ["solutions", "name", "company", "whatsapp", "email"];
    const firstInvalid = order.find((key) => nextErrors[key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      setSentVia(null);
      return;
    }

    // Ponto de integração futura: trocar por envio a uma API/CRM. Hoje o visitante confirma o envio.
    if (channel === "whatsapp") {
      const link = document.createElement("a");
      link.href = whatsappLink(message);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.click();
    } else {
      window.location.href = mailtoLink({ subject: QUOTE_SUBJECT, body: message });
    }
    setSentVia(channel);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`Para: ${site.contact.email}\nAssunto: ${QUOTE_SUBJECT}\n\n${message}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

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

  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pointerDownOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (pointerDownOnBackdrop.current && event.target === event.currentTarget) dialogRef.current?.close();
    pointerDownOnBackdrop.current = false;
  };

  const fieldProps = (field: Exclude<ErrorKey, "solutions"> | "quantity" | "city" | "notes") => ({
    id: `${id}-${field}`,
    "data-field": field,
    value: details[field],
    onChange: (event: { target: { value: string } }) => updateDetail(field, event.target.value),
    "aria-invalid": errors[field as ErrorKey] ? (true as const) : undefined,
    "aria-describedby": errors[field as ErrorKey] ? `${id}-${field}-error` : undefined,
    className: "form-field"
  });

  const selectedCount = Object.keys(selection).length;

  return (
    <dialog
      ref={dialogRef}
      className="sd-drawer"
      aria-labelledby={`${id}-title`}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <div className="sd-drawer__panel flex h-full max-h-[100dvh] flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-space-900 text-slate-100 shadow-2xl shadow-black/60 md:rounded-none md:rounded-l-3xl">
        <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="absolute inset-x-0 top-0 h-px overflow-hidden" aria-hidden="true">
            <div className="anim-scan h-px w-1/2 bg-gradient-to-r from-transparent via-signal-cyan to-transparent" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal-cyan">Cotação</p>
            <h2 id={`${id}-title`} className="mt-1 font-display text-2xl font-semibold text-white">
              Solicitar cotação
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Marque o que sua empresa precisa. Você revisa e envia pelo WhatsApp ou e-mail.
            </p>
          </div>
          <button
            type="button"
            data-autofocus
            onClick={() => dialogRef.current?.close()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-signal-sky/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky"
            aria-label="Fechar cotação"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form
          ref={formRef}
          noValidate
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            send("whatsapp");
          }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
            <Step number="1" title="O que você precisa?">
              <div
                role="group"
                aria-label="Soluções"
                aria-describedby={errors.solutions ? `${id}-solutions-error` : undefined}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              >
                {solutions.map((solution, index) => {
                  const active = Boolean(selection[solution.id]);
                  return (
                    <button
                      key={solution.id}
                      type="button"
                      data-field={index === 0 ? "solutions" : undefined}
                      aria-pressed={active}
                      onClick={() => toggleSolution(solution.id)}
                      className={`group flex items-center gap-3 rounded-xl border p-2 pr-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky ${
                        active
                          ? "border-signal-sky/70 bg-signal-sky/10 text-white"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
                      }`}
                    >
                      <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg">
                        {solution.image ? (
                          <Image
                            src={solution.image.src}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                            style={{ objectPosition: solution.image.position }}
                          />
                        ) : null}
                      </span>
                      <span className="flex-1 leading-snug">{solution.name}</span>
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                          active ? "border-signal-sky bg-signal-sky text-space-950" : "border-white/25"
                        }`}
                        aria-hidden="true"
                      >
                        {active ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
              <FieldError id={`${id}-solutions-error`} message={errors.solutions} />

              {solutions
                .filter((solution) => selection[solution.id])
                .map((solution) => (
                  <fieldset key={solution.id} className="mt-4">
                    <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {solution.name}: itens (opcional)
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {solution.includes.map((item) => {
                        const checked = selection[solution.id]?.includes(item) ?? false;
                        return (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={checked}
                            onClick={() => toggleItem(solution.id, item)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky ${
                              checked
                                ? "border-signal-cyan/70 bg-signal-cyan/15 text-white"
                                : "border-white/15 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            {checked ? <Check className="h-3.5 w-3.5 text-signal-cyan" aria-hidden="true" /> : null}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
            </Step>

            <Step number="2" title="Quantidade e prazo">
              <div className="grid grid-cols-1 gap-4">
                <Field id={`${id}-quantity`} label="Quantidade aproximada" hint="Ex.: 20 notebooks, 3 salas de reunião.">
                  <input {...fieldProps("quantity")} maxLength={120} placeholder="Opcional" />
                </Field>
                <fieldset>
                  <legend className="text-sm font-semibold text-slate-200">Prazo</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {deadlineOptions.map((option) => (
                      <label
                        key={option}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal-sky ${
                          details.deadline === option
                            ? "border-signal-cyan/70 bg-signal-cyan/15 text-white"
                            : "border-white/15 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`${id}-deadline`}
                          value={option}
                          checked={details.deadline === option}
                          onChange={() => updateDetail("deadline", option)}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field id={`${id}-city`} label="Cidade/UF de entrega">
                  <input {...fieldProps("city")} maxLength={80} autoComplete="address-level2" placeholder="Opcional" />
                </Field>
              </div>
            </Step>

            <Step number="3" title="Seus dados">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id={`${id}-name`} label="Nome" required error={errors.name}>
                  <input {...fieldProps("name")} autoComplete="name" maxLength={80} placeholder="Seu nome" />
                </Field>
                <Field id={`${id}-company`} label="Empresa" required error={errors.company}>
                  <input {...fieldProps("company")} autoComplete="organization" maxLength={120} placeholder="Nome da empresa" />
                </Field>
                <Field id={`${id}-whatsapp`} label="WhatsApp" required error={errors.whatsapp}>
                  <input
                    {...fieldProps("whatsapp")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="(11) 99999-9999"
                  />
                </Field>
                <Field id={`${id}-email`} label="E-mail" error={errors.email}>
                  <input
                    {...fieldProps("email")}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={120}
                    placeholder="Opcional"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field id={`${id}-notes`} label="Observações">
                    <textarea
                      {...fieldProps("notes")}
                      rows={3}
                      maxLength={500}
                      className="form-field min-h-20 resize-y"
                      placeholder="Modelo, configuração, local de instalação... (opcional)"
                    />
                  </Field>
                </div>
              </div>
            </Step>

            <details className="group mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky [&::-webkit-details-marker]:hidden">
                Ver mensagem que será enviada
                <span className="ml-1 text-signal-cyan group-open:hidden">+</span>
                <span className="ml-1 hidden text-signal-cyan group-open:inline">−</span>
              </summary>
              <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-300">
                {message}
              </pre>
            </details>
          </div>

          <div className="border-t border-white/10 bg-space-950/80 px-5 py-4 sm:px-6">
            <div role="status" aria-live="polite">
              {sentVia ? (
                <div className="mb-3 rounded-xl border border-signal-sky/30 bg-signal-sky/10 p-3 text-sm leading-6 text-slate-200">
                  <p className="font-semibold text-white">Falta um passo: confirmar o envio.</p>
                  <p>
                    {sentVia === "whatsapp"
                      ? "Abrimos o WhatsApp com sua cotação. Toque em enviar na conversa."
                      : "Abrimos seu e-mail com a cotação. Revise e clique em enviar."}{" "}
                    Se nada abriu, copie a mensagem e envie para {site.contact.email}.
                  </p>
                  <button
                    type="button"
                    onClick={copyMessage}
                    className="mt-2 inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 px-3 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    {copied ? "Mensagem copiada" : "Copiar mensagem"}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp sm:flex-1 px-5 text-sm font-bold text-whatsapp-ink transition hover:bg-[#3BE07A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Enviar pelo WhatsApp
              </button>
              <button
                type="button"
                onClick={() => send("email")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-signal-sky/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar por e-mail
              </button>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              {selectedCount
                ? `${selectedCount} ${selectedCount === 1 ? "solução selecionada" : "soluções selecionadas"}. `
                : ""}
              Para {site.contact.person}, {site.contact.role.toLowerCase()}.
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

function Step({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-white">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-signal-sky/15 text-xs text-signal-cyan">
          {number}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-200">
        {label}
        {required ? (
          <span className="text-signal-cyan" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (obrigatório)</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-slate-400">{hint}</p> : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-red-300">
      {message}
    </p>
  );
}
