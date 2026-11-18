import { Mail, MessageCircle } from "lucide-react";
import { MobileMenu } from "@/components/sinal-digital/mobile-menu";
import { navItems } from "@/components/sinal-digital/nav-items";
import { QuoteButton } from "@/components/sinal-digital/quote/quote-button";
import { SinalLogo } from "@/components/sinal-digital/sinal-logo";
import { mailtoLink, whatsappLink } from "@/data/site";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky";

/** Header fixo: transparente sobre o hero e com fundo de vidro ao rolar (CSS `.sd-header`). */
export function Header() {
  return (
    <header className="sd-header fixed inset-x-0 top-0 z-40 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className={`shrink-0 rounded-lg ${focusRing}`} aria-label="Sinal Digital, voltar ao início">
          <SinalLogo tone="dark" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-signal-cyan after:transition-transform hover:text-white hover:after:scale-x-100 ${focusRing}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={mailtoLink()}
            aria-label="Enviar e-mail para a Sinal Digital"
            className={`hidden h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-200 transition hover:border-signal-sky/60 hover:text-white sm:grid ${focusRing}`}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar pelo WhatsApp (abre em nova aba)"
            className={`hidden h-10 w-10 place-items-center rounded-full bg-whatsapp text-whatsapp-ink transition hover:bg-[#3BE07A] sm:grid ${focusRing}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <QuoteButton
            className={`inline-flex h-10 items-center rounded-full bg-gradient-to-r from-signal-cyan to-signal-sky px-4 text-sm font-semibold text-space-950 shadow-[0_0_24px_-6px_rgba(34,211,238,0.7)] transition hover:brightness-110 ${focusRing}`}
          >
            <span className="sm:hidden">Cotar</span>
            <span className="hidden sm:inline">Solicitar cotação</span>
          </QuoteButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
