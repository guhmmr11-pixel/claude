import Image from "next/image";
import type { Solution } from "@/data/solutions";

type SolutionVisualProps = {
  solution: Solution;
  /** `card`: topo do card. `modal`: faixa no modal de detalhes. */
  variant?: "card" | "modal";
};

/**
 * Visual da família de soluções.
 * Com `solution.image` preenchido, mostra a foto/ilustração autorizada.
 * Sem imagem, mostra o ícone da família em um círculo claro (fallback padrão).
 */
export function SolutionVisual({ solution, variant = "card" }: SolutionVisualProps) {
  const Icon = solution.icon;
  const isModal = variant === "modal";

  if (solution.image) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-mist">
        <Image
          src={solution.image.src}
          alt={solution.image.alt}
          fill
          sizes={isModal ? "(min-width: 640px) 48rem, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative grid w-full place-items-center overflow-hidden bg-gradient-to-br from-brand-mist via-white to-[#DCEEFA] ${
        isModal ? "h-36 sm:h-44" : "aspect-[16/9]"
      }`}
      aria-hidden="true"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-brand-blue/10" />
      <div className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full border border-brand-blue/10" />
      <span
        className={`relative grid place-items-center rounded-full bg-white text-brand-blue shadow-[0_12px_30px_-12px_rgba(6,58,120,0.35)] ring-1 ring-brand-blue/10 ${
          isModal ? "h-20 w-20 sm:h-24 sm:w-24" : "h-24 w-24"
        }`}
      >
        <Icon className={isModal ? "h-9 w-9 sm:h-11 sm:w-11" : "h-11 w-11"} strokeWidth={1.6} />
      </span>
    </div>
  );
}
