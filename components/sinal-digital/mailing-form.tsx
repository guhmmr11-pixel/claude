"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Copy, Info, Send } from "lucide-react";
import { solutions } from "@/data/solutions";
import { mailtoLink, site } from "@/data/site";

const NO_PREFERENCE = "Ainda não sei / quero orientação";
// Opções derivadas do catálogo: ao editar data/solutions.ts, o formulário acompanha.
const interestOptions = [NO_PREFERENCE, ...solutions.map((solution) => solution.name)];

const limits = { name: 80, company: 120, email: 120, whatsapp: 20, message: 600 };

type FormState = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  interest: string;
  message: string;
};

type FieldName = keyof FormState;
type Errors = Partial<Record<FieldName, string>>;

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  interest: NO_PREFERENCE,
  message: ""
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  const phoneDigits = form.whatsapp.replace(/\D/g, "");

  if (!form.name.trim()) errors.name = "Informe seu nome.";
  if (!form.company.trim()) errors.company = "Informe o nome da empresa.";

  if (!form.email.trim()) errors.email = "Informe seu e-mail.";
  else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Informe um e-mail válido, como nome@empresa.com.br.";
  }

  if (!phoneDigits) errors.whatsapp = "Informe seu WhatsApp com DDD.";
  else if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.whatsapp = "Informe um número com DDD, como (11) 99999-9999.";
  }

  return errors;
}

function buildMessage(form: FormState) {
  return [
    "Olá, gostaria de entrar no mailing da Sinal Digital.",
    "",
    `Nome: ${form.name.trim()}`,
    `Empresa: ${form.company.trim()}`,
    `E-mail: ${form.email.trim()}`,
    `WhatsApp: ${form.whatsapp.trim()}`,
    `Solução de interesse: ${form.interest}`,
    "",
    `Mensagem: ${form.message.trim() || "Não informado"}`
  ].join("\n");
}

const SUBJECT = "Cadastro de interesse - Sinal Digital";

export function MailingForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  function updateField(field: FieldName, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    setCopied(false);
    if (submitted) setErrors(validate(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setDraftOpened(false);
      return;
    }

    // Ponto de integração futura do mailing.
    // Fase atual (sem backend): abre o aplicativo de e-mail do visitante com a mensagem pronta.
    // O cadastro só chega à Sinal Digital quando o visitante envia esse e-mail.
    // Para integrar (API própria, Formspree, EmailJS, Google Sheets ou CRM), substitua a linha
    // abaixo por um envio assíncrono com `buildMessage(form)` ou com os campos de `form`, trate
    // erro e sucesso e defina antes destino, opt-in, política de dados e proteção antispam.
    window.location.href = mailtoLink({ subject: SUBJECT, body: buildMessage(form) });
    setDraftOpened(true);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(
        `Para: ${site.contact.email}\nAssunto: ${SUBJECT}\n\n${buildMessage(form)}`
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const fieldProps = (field: FieldName) => ({
    id: `${formId}-${field}`,
    name: field,
    value: form[field],
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `${formId}-${field}-error` : undefined,
    className: "form-field"
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4">
      <p className="text-xs text-slate-500">Campos com * são obrigatórios.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id={`${formId}-name`} label="Nome" error={errors.name} required>
          <input
            {...fieldProps("name")}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
            maxLength={limits.name}
            required
            placeholder="Seu nome"
          />
        </Field>
        <Field id={`${formId}-company`} label="Empresa" error={errors.company} required>
          <input
            {...fieldProps("company")}
            onChange={(event) => updateField("company", event.target.value)}
            autoComplete="organization"
            maxLength={limits.company}
            required
            placeholder="Nome da empresa"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id={`${formId}-email`} label="E-mail" error={errors.email} required>
          <input
            {...fieldProps("email")}
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={limits.email}
            required
            placeholder="voce@empresa.com.br"
          />
        </Field>
        <Field id={`${formId}-whatsapp`} label="WhatsApp" error={errors.whatsapp} required>
          <input
            {...fieldProps("whatsapp")}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={limits.whatsapp}
            required
            placeholder="(11) 99999-9999"
          />
        </Field>
      </div>

      <Field id={`${formId}-interest`} label="Solução de interesse">
        <select {...fieldProps("interest")} onChange={(event) => updateField("interest", event.target.value)}>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${formId}-message`} label="Mensagem" hint={`Opcional, até ${limits.message} caracteres.`}>
        <textarea
          {...fieldProps("message")}
          onChange={(event) => updateField("message", event.target.value)}
          maxLength={limits.message}
          rows={4}
          className="form-field min-h-28 resize-y"
          placeholder="Conte rapidamente o que sua empresa precisa."
        />
      </Field>

      <p className="flex gap-2 rounded-xl bg-brand-mist px-4 py-3 text-sm leading-6 text-brand-deep">
        <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          O botão abre seu aplicativo de e-mail com uma mensagem pronta para {site.contact.email}. O
          cadastro é concluído quando você envia esse e-mail.
        </span>
      </p>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-ink px-6 text-sm font-bold text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Entrar no mailing
      </button>

      <div role="status" aria-live="polite">
        {draftOpened ? (
          <div className="rounded-xl border border-brand-blue/25 bg-white p-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-brand-navy">Falta um passo: enviar o e-mail.</p>
            <p className="mt-1">
              Abrimos uma mensagem com seus dados no aplicativo de e-mail. Revise e clique em enviar.
              Se nenhum aplicativo abriu, copie a mensagem e envie para {site.contact.email}.
            </p>
            <button
              type="button"
              onClick={copyMessage}
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg border border-brand-line px-4 font-semibold text-brand-deep transition-colors hover:bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              {copied ? "Mensagem copiada" : "Copiar mensagem"}
            </button>
          </div>
        ) : null}
      </div>

      <p className="text-xs leading-5 text-slate-500">
        Você receberá contatos comerciais e informações sobre soluções da Sinal Digital. Seus dados
        serão usados apenas para atendimento e relacionamento comercial.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  required = false,
  children
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required ? (
          <span className="text-brand-blue" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
