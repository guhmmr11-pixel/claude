import { Mail, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MailingForm } from "@/components/sinal-digital/mailing-form";
import { SectionHeading } from "@/components/sinal-digital/section-heading";
import { mailtoLink, site, whatsappLink } from "@/data/site";

export function Contact() {
  const { contact } = site;

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative overflow-hidden bg-space-950 py-20 sm:py-28">
      <div
        className="absolute left-1/2 top-0 h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-signal-blue/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contato-title" eyebrow="Contato comercial" title="Fale com a Sinal Digital">
          Receba orientação comercial, tire dúvidas sobre soluções e cadastre-se para receber novidades, condições e
          oportunidades.
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="reveal sd-glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="absolute inset-x-0 top-0 h-px overflow-hidden" aria-hidden="true">
              <div className="anim-scan h-px w-1/2 bg-gradient-to-r from-transparent via-signal-cyan to-transparent" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal-cyan">Atendimento comercial</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">{contact.person}</h3>
            <p className="mt-1 text-sm font-medium text-slate-400">{contact.role}</p>

            <ul className="mt-7 grid gap-3">
              <ContactRow icon={Phone} label="WhatsApp" value={contact.phoneDisplay} />
              <ContactRow icon={Mail} label="E-mail" value={contact.email} />
            </ul>

            <div className="mt-7 grid gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-bold text-whatsapp-ink transition hover:bg-[#3BE07A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Entrar em contato pelo WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <a
                href={mailtoLink({ subject: "Contato pelo site - Sinal Digital" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-signal-sky/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                Entrar em contato por e-mail
              </a>
            </div>
          </div>

          <div className="reveal sd-glass rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal-cyan">Mailing e cadastro de interesse</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">Entre no mailing da Sinal Digital</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Conte o que sua empresa procura e receba novidades, condições e oportunidades.
            </p>
            <div className="mt-6">
              <MailingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-signal-sky/25 bg-signal-sky/10 text-signal-cyan">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="break-words text-base font-semibold text-white">{value}</p>
      </div>
    </li>
  );
}
