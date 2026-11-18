"use client";

import { useEffect, useRef } from "react";
import { Mail, Menu, MessageCircle, X } from "lucide-react";
import { navItems } from "@/components/sinal-digital/nav-items";
import { mailtoLink, whatsappLink } from "@/data/site";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky";

/**
 * Menu para celular e tablet. Usa <details>/<summary>, então abre e fecha mesmo
 * antes da hidratação ou sem JavaScript. Depois de hidratado, fecha ao escolher
 * um link, com Escape, com clique fora e quando a tela chega ao layout desktop.
 */
export function MobileMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const close = () => {
      details.open = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        close();
        details.querySelector("summary")?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) close();
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleViewport = () => {
      if (desktop.matches) close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktop.addEventListener("change", handleViewport);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktop.removeEventListener("change", handleViewport);
    };
  }, []);

  const closeMenu = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  return (
    <details ref={detailsRef} className="group lg:hidden">
      <summary
        className={`grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-white/15 text-slate-100 transition-colors hover:border-signal-sky/60 [&::-webkit-details-marker]:hidden ${focusRing}`}
        aria-label="Menu de navegação"
      >
        <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
        <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
      </summary>

      <div className="absolute inset-x-0 top-full border-b border-white/10 bg-space-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`rounded-lg px-3 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white ${focusRing}`}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            <a
              href={mailtoLink()}
              onClick={closeMenu}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 text-sm font-semibold text-white hover:bg-white/5 ${focusRing}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              E-mail
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-whatsapp text-sm font-semibold text-whatsapp-ink hover:bg-[#3BE07A] ${focusRing}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </nav>
      </div>
    </details>
  );
}
