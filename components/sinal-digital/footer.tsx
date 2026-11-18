import { navItems } from "@/components/sinal-digital/nav-items";
import { SinalLogo } from "@/components/sinal-digital/sinal-logo";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-space-950 pb-24 pt-12 text-slate-400 sm:pb-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-cyan/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div className="flex flex-col gap-4">
          <SinalLogo tone="dark" />
          <p className="text-sm font-semibold text-white">
            {site.name} — {site.tagline}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>Desde {site.since}</li>
            <li>Parceria Acer x Sinal Digital</li>
          </ul>
        </div>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-sky"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-7xl px-4 text-xs text-slate-400 sm:px-6 lg:px-8">
        Imagens ilustrativas.
      </p>
    </footer>
  );
}
