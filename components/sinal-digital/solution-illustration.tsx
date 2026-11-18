import {
  AirVent,
  Camera,
  Cpu,
  Monitor,
  Network,
  Presentation,
  Settings,
  Video
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon[]> = {
  "audio-video": [Presentation, Video, Monitor],
  "computacao-imagem": [Monitor, Cpu, Settings],
  "infraestrutura-conectividade-telecom": [Network, Cpu, Monitor],
  "ar-condicionado": [AirVent, Settings, Monitor],
  "automacao-seguranca": [Camera, Network, Settings],
  "servicos-solucoes-digitais": [Settings, Network, Presentation]
};

export function SolutionIllustration({
  solutionId,
  variant = "card"
}: {
  solutionId: string;
  variant?: "card" | "large";
}) {
  const icons = iconMap[solutionId] ?? [Monitor, Cpu, Network];
  const isLarge = variant === "large";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-cyan-200/15 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.35),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.28),transparent_24%),linear-gradient(135deg,#031B3A,#0A3F78)] p-3 shadow-inner shadow-cyan-950/30 ${
        isLarge ? "h-full min-h-[16rem]" : "h-28"
      }`}
    >
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(125,211,252,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.18)_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden="true" />
      <div className="absolute inset-x-8 bottom-2 h-12 rounded-full bg-cyan-300/20 blur-2xl" aria-hidden="true" />
      <div className="relative flex h-full items-end justify-between gap-2">
        {icons.map((Icon, index) => (
          <div
            key={`${solutionId}-${index}`}
            className={`grid place-items-center rounded-2xl border border-white/20 bg-white/12 text-cyan-100 shadow-xl shadow-sky-950/25 backdrop-blur transition group-hover:-translate-y-1 ${
              isLarge
                ? index === 1
                  ? "h-36 w-40"
                  : "h-24 w-24"
                : index === 1
                  ? "h-20 w-24"
                  : "h-16 w-16"
            }`}
          >
            <Icon
              className={
                isLarge ? (index === 1 ? "h-16 w-16" : "h-10 w-10") : index === 1 ? "h-9 w-9" : "h-7 w-7"
              }
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
