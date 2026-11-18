import { SinalLogo } from "@/components/sinal-digital/sinal-logo";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-night pb-24 pt-10 text-slate-300 sm:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <SinalLogo tone="dark" />
          <p className="text-sm font-semibold text-white">
            {site.name} — {site.tagline}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <li>Desde {site.since}</li>
          <li>Parceria Acer x Sinal Digital</li>
        </ul>
      </div>
    </footer>
  );
}
