import Image from "next/image";
import { site } from "@/data/site";

type SinalLogoProps = {
  /** `light`: fundo claro (header). `dark`: fundo marinho (rodapé). */
  tone?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
};

// Marca provisória desenhada a partir da referência enviada na conversa.
// Quando `site.logo` for preenchido em data/site.ts, o arquivo oficial substitui este desenho.
const pixels = [
  "col-start-4 row-start-1 bg-[#0B6ACB]",
  "col-start-5 row-start-1 bg-[#063A78]",
  "col-start-6 row-start-1 bg-[#35BDF2]",
  "col-start-3 row-start-2 bg-[#063A78]",
  "col-start-4 row-start-2 bg-[#0B6ACB]",
  "col-start-5 row-start-2 bg-[#35BDF2]",
  "col-start-6 row-start-2 bg-[#7DD3FC]",
  "col-start-3 row-start-3 bg-[#0B6ACB]",
  "col-start-4 row-start-3 bg-[#063A78]",
  "col-start-5 row-start-3 bg-[#0B6ACB]",
  "col-start-2 row-start-4 bg-[#063A78]",
  "col-start-3 row-start-4 bg-[#0B6ACB]",
  "col-start-4 row-start-4 bg-[#35BDF2]",
  "col-start-5 row-start-5 bg-[#0B6ACB]",
  "col-start-6 row-start-6 bg-[#35BDF2]"
];

export function SinalLogo({ tone = "light", showTagline = false, className = "" }: SinalLogoProps) {
  const isDark = tone === "dark";

  if (site.logo) {
    return (
      <span
        className={`inline-flex items-center ${isDark ? "rounded-xl bg-white px-3 py-2" : ""} ${className}`}
      >
        <Image
          src={site.logo.src}
          alt={site.logo.alt}
          width={site.logo.width}
          height={site.logo.height}
          className="h-10 w-auto"
          priority={!isDark}
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-10 shrink-0 grid-cols-6 grid-rows-6 gap-[2px]" aria-hidden="true">
        {pixels.map((pixel, index) => (
          <span key={index} className={`${pixel} rounded-[1.5px]`} />
        ))}
      </span>
      <span className="leading-none">
        <span className="block text-[0.95rem] font-extrabold uppercase tracking-[0.14em]">
          <span className={`block ${isDark ? "text-white" : "text-brand-ink"}`}>Sinal</span>
          <span className={`mt-0.5 block ${isDark ? "text-brand-cyan" : "text-brand-blue"}`}>
            Digital
          </span>
        </span>
        {showTagline ? (
          <span
            className={`mt-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {site.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
