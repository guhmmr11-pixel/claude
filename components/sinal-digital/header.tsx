import { Mail, MessageCircle } from "lucide-react";
import { SinalLogo } from "@/components/sinal-digital/sinal-logo";

const whatsappUrl =
  "https://wa.me/5511999015519?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Sinal%20Digital";
const emailUrl = "mailto:decio@sinaldig.com.br";
const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/20 bg-[#031B3A] text-white shadow-2xl shadow-slate-950/22">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(125,211,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.12)_1px,transparent_1px)] [background-size:34px_34px]" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          aria-label="Sinal Digital, voltar ao início"
        >
          <SinalLogo compact />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={emailUrl}
            className="hidden items-center justify-center gap-2 rounded-xl border border-cyan-200/20 bg-[#092D59] px-3 py-2 text-sm font-black text-cyan-100 shadow-lg shadow-cyan-950/15 transition hover:bg-[#0E3D77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:inline-flex"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            E-mail
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B6ACB] px-3 py-2 text-sm font-black text-white shadow-lg shadow-cyan-950/25 transition hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:px-4"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
      <nav
        className="relative mx-auto flex max-w-7xl gap-1 overflow-x-auto border-t border-cyan-200/12 px-4 py-1.5 sm:px-6 lg:hidden"
        aria-label="Menu principal mobile"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
