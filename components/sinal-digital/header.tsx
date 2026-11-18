import { Mail, MessageCircle } from "lucide-react";
import { MobileMenu } from "@/components/sinal-digital/mobile-menu";
import { navItems } from "@/components/sinal-digital/nav-items";
import { SinalLogo } from "@/components/sinal-digital/sinal-logo";
import { mailtoLink, whatsappLink } from "@/data/site";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className={`shrink-0 rounded-lg ${focusRing}`}
          aria-label="Sinal Digital, voltar ao início"
        >
          <SinalLogo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-mist hover:text-brand-deep ${focusRing}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={mailtoLink()}
            className={`hidden h-10 items-center gap-2 rounded-lg border border-brand-line px-3.5 text-sm font-semibold text-brand-deep transition-colors hover:border-brand-blue/40 hover:bg-brand-mist sm:inline-flex ${focusRing}`}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            E-mail
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex h-10 items-center gap-2 rounded-lg bg-whatsapp-dark px-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover sm:px-3.5 ${focusRing}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
