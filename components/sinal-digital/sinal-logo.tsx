type SinalLogoProps = {
  compact?: boolean;
};

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

export function SinalLogo({ compact = false }: SinalLogoProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-cyan-200/22 bg-white px-3 py-2 text-[#063A78] shadow-lg shadow-sky-950/16 ${
        compact ? "max-w-[240px]" : "max-w-[290px]"
      }`}
      aria-label="Sinal Digital"
    >
      <div className="relative grid h-12 w-14 shrink-0 grid-cols-6 grid-rows-6 gap-0.5" aria-hidden="true">
        {pixels.map((className, index) => (
          <span key={index} className={`${className} rounded-[2px]`} />
        ))}
      </div>
      <div className="leading-none">
        <span
          className={`block font-black uppercase tracking-[0.08em] text-[#063A78] ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          SINAL
        </span>
        <span
          className={`block font-black uppercase tracking-[0.08em] text-[#0B6ACB] ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          DIGITAL
        </span>
        {!compact ? (
          <span className="mt-1 block text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#063A78]">
            O seu parceiro de negócios
          </span>
        ) : null}
      </div>
    </div>
  );
}
