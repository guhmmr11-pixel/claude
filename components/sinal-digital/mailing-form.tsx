"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";

const solutionOptions = [
  "Áudio e Vídeo",
  "Computação / Imagem",
  "Infraestrutura / Conectividade / Telecom",
  "Ar Condicionado",
  "Automação Comercial / Segurança Eletrônica",
  "Serviços / Soluções Digitais",
  "Ainda não sei / quero orientação"
];

type MailingFormState = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  interest: string;
  message: string;
};

const initialState: MailingFormState = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  interest: solutionOptions[0],
  message: ""
};

export function MailingForm() {
  const [form, setForm] = useState<MailingFormState>(initialState);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Cadastro de interesse - Sinal Digital");
    const body = encodeURIComponent(
      [
        "Olá, gostaria de entrar no mailing da Sinal Digital.",
        "",
        `Nome: ${form.name}`,
        `Empresa: ${form.company}`,
        `E-mail: ${form.email}`,
        `WhatsApp: ${form.whatsapp}`,
        `Solução de interesse: ${form.interest}`,
        "",
        `Mensagem: ${form.message || "Não informado"}`
      ].join("\n")
    );

    return `mailto:decio@sinaldig.com.br?subject=${subject}&body=${body}`;
  }, [form]);

  function updateField(field: keyof MailingFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.company || !form.email || !form.whatsapp) {
      event.currentTarget.reportValidity();
      return;
    }

    // Future integration point: replace this mailto with API/Formspree/EmailJS/Google Sheets/CRM submission.
    window.location.href = mailtoHref;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="form-field"
            placeholder="Seu nome"
          />
        </Field>
        <Field label="Empresa">
          <input
            required
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            className="form-field"
            placeholder="Nome da empresa"
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="E-mail">
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="form-field"
            placeholder="voce@empresa.com.br"
          />
        </Field>
        <Field label="WhatsApp">
          <input
            required
            value={form.whatsapp}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            className="form-field"
            placeholder="(11) 99999-9999"
          />
        </Field>
      </div>

      <Field label="Solução de interesse">
        <select
          value={form.interest}
          onChange={(event) => updateField("interest", event.target.value)}
          className="form-field"
        >
          {solutionOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>

      <Field label="Mensagem">
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="form-field min-h-24 resize-y"
          placeholder="Conte rapidamente o que sua empresa precisa."
        />
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#063A78] px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-950/12 transition hover:bg-[#0B6ACB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Entrar no mailing
      </button>

      <p className="text-xs leading-5 text-slate-500">
        Você receberá contatos comerciais e informações sobre soluções da Sinal Digital.
        Seus dados serão usados apenas para atendimento e relacionamento comercial.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-slate-700">
      {label}
      {children}
    </label>
  );
}
