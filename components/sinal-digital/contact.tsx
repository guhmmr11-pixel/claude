import { Mail, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MailingForm } from "@/components/sinal-digital/mailing-form";
import { SectionHeading } from "@/components/sinal-digital/section-heading";
import { mailtoLink, site, whatsappLink } from "@/data/site";

export function Contact() {
  const { contact } = site;

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contato-title" eyebrow="Contato comercial" title="Fale com a Sinal Digital">
          Receba orientação comercial, tire dúvidas sobre soluções e cadastre-se para receber
          novidades, condições e oportunidades.
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="reveal rounded-2xl bg-gradient-to-br from-brand-navy via-brand-deep to-brand-ink p-6 text-white shadow-[0_24px_60px_-30px_rgba(3,27,58,0.6)] sm:p-8 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-cyan">
              Atendimento comercial
            </p>
            <h3 className="mt-4 text-2xl font-bold">{contact.person}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-300">{contact.role}</p>

            <ul className="mt-7 grid gap-3">
              <ContactRow icon={Phone} label="WhatsApp" value={contact.phoneDisplay} />
              <ContactRow icon={Mail} label="E-mail" value={contact.email} />
            </ul>

            <div className="mt-7 grid gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 text-sm font-bold text-whatsapp-ink transition-colors hover:bg-[#3BE07A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Entrar em contato pelo WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <a
                href={mailtoLink({ subject: "Contato pelo site - Sinal Digital" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                Entrar em contato por e-mail
              </a>
            </div>
          </div>

          <div className="reveal rounded-2xl border border-brand-line bg-white p-6 shadow-[0_1px_2px_rgba(3,27,58,0.06)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">
              Mailing e cadastro de interesse
            </p>
            <h3 className="mt-3 text-xl font-bold text-brand-navy">Conte o que sua empresa procura</h3>
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
    <li className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-sky/15 text-brand-cyan">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-300">{label}</p>
        <p className="break-words text-base font-bold text-white">{value}</p>
      </div>
    </li>
  );
}
