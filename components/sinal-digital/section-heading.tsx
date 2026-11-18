import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Cabeçalho padrão das seções (tema escuro): rótulo, título (h2) e parágrafo opcional. */
export function SectionHeading({ id, eyebrow, title, children, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`reveal max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-signal-cyan ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-6 bg-signal-cyan/70" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 font-display text-[1.9rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.6rem]"
      >
        {title}
      </h2>
      {children ? <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">{children}</p> : null}
    </div>
  );
}
