import { Mail, MessageCircle, Phone, UserRound } from "lucide-react";
import { MailingForm } from "@/components/sinal-digital/mailing-form";
import { ScrollReveal } from "@/components/sinal-digital/scroll-reveal";

const whatsappUrl =
  "https://wa.me/5511999015519?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Sinal%20Digital";
const emailUrl = "mailto:decio@sinaldig.com.br";

export function Contact() {
  return (
    <section id="contato" className="scroll-mt-28 bg-[#edf4fa] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-7 max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#0B6ACB]">
            Fale com a Sinal Digital
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#052D5F] sm:text-3xl">
            Receba orientação comercial e cadastre seu interesse.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Receba orientação comercial, tire dúvidas sobre soluções e cadastre-se
            para receber novidades, condições e oportunidades.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <ScrollReveal>
            <div className="h-full rounded-3xl border border-cyan-200/15 bg-gradient-to-br from-[#031B3A] via-[#052D5F] to-[#0B6ACB] p-5 text-white shadow-2xl shadow-sky-950/18">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-100">
                Contato comercial
              </p>
              <h3 className="mt-3 text-2xl font-black">Décio Câmara</h3>
              <p className="mt-1 text-sm font-bold text-cyan-100">Diretor Comercial</p>

              <div className="mt-6 grid gap-3">
                <ContactRow icon={Phone} label="WhatsApp" value="(11) 99901-5519" />
                <ContactRow icon={Mail} label="E-mail" value="decio@sinaldig.com.br" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075E54] px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/15 transition hover:bg-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Entrar em contato pelo WhatsApp
                </a>
                <a
                  href={emailUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/10 px-4 py-3 text-sm font-black text-cyan-100 transition hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Entrar em contato por e-mail
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-950/8">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-[#063A78]">
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0B6ACB]">
                    Mailing / cadastro de interesse
                  </p>
                  <h3 className="text-lg font-black text-[#052D5F]">Conte o que sua empresa procura</h3>
                </div>
              </div>
              <MailingForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

type ContactRowProps = {
  icon: typeof Phone;
  label: string;
  value: string;
};

function ContactRow({ icon: Icon, label, value }: ContactRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-3 shadow-sm backdrop-blur">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/15 text-cyan-100">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-bold text-cyan-100/80">{label}</p>
        <p className="text-sm font-extrabold text-white sm:text-base">{value}</p>
      </div>
    </div>
  );
}
