import Image from "next/image";
import type { Solution } from "@/data/solutions";

type SolutionVisualProps = {
  solution: Solution;
  /** `card`: topo do card (com parallax ao rolar). `modal`: faixa no modal de detalhes. */
  variant?: "card" | "modal";
};

/**
 * Foto da família de soluções. Sem `solution.image`, mostra o ícone da família (fallback).
 */
export function SolutionVisual({ solution, variant = "card" }: SolutionVisualProps) {
  const Icon = solution.icon;
  const isModal = variant === "modal";

  if (solution.image) {
    return (
      <div className={`relative w-full overflow-hidden bg-space-800 ${isModal ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
        <div className={`absolute inset-0 ${isModal ? "" : "parallax-media"}`}>
          <Image
            src={solution.image.src}
            alt={solution.image.alt}
            fill
            placeholder="blur"
            sizes={isModal ? "(min-width: 640px) 52rem, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className={`object-cover ${isModal ? "" : "transition duration-700 ease-out group-hover:scale-105"}`}
            style={{ objectPosition: solution.image.position }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-space-850 via-space-850/55 to-transparent" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`relative grid w-full place-items-center overflow-hidden bg-gradient-to-br from-space-800 to-space-700 ${
        isModal ? "aspect-[21/9]" : "aspect-[16/10]"
      }`}
      aria-hidden="true"
    >
      <span className="grid h-24 w-24 place-items-center rounded-full border border-signal-sky/30 bg-signal-sky/10 text-signal-cyan">
        <Icon className="h-11 w-11" strokeWidth={1.5} />
      </span>
    </div>
  );
}
