import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Cabeçalho padrão das seções: rótulo curto, título (h2) e um parágrafo opcional. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  tone = "light",
  className = ""
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={`max-w-3xl ${className}`}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.22em] ${
          isDark ? "text-brand-cyan" : "text-brand-blue"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
