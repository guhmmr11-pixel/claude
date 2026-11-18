"use client";

import { useCallback, useState } from "react";
import { SolutionCard } from "@/components/sinal-digital/solution-card";
import { SolutionModal } from "@/components/sinal-digital/solution-modal";
import { solutions, type Solution } from "@/data/solutions";

export function SolutionsSection() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const closeModal = useCallback(() => setSelectedSolution(null), []);

  return (
    <section id="solucoes" className="relative scroll-mt-28 overflow-hidden bg-[#edf4fa] py-10 sm:py-12">
      <div
        className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(6,58,120,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(6,58,120,0.045)_1px,transparent_1px)] [background-size:36px_36px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#0B6ACB]">
            Nossas soluções
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#052D5F] sm:text-3xl">
            Tecnologia, equipamentos, infraestrutura e serviços.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Tecnologia, equipamentos, infraestrutura e serviços para empresas,
            instituições e projetos corporativos.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <div key={solution.id} className="h-full">
              <SolutionCard solution={solution} onOpen={setSelectedSolution} />
            </div>
          ))}
        </div>
      </div>
      <SolutionModal solution={selectedSolution} onClose={closeModal} />
    </section>
  );
}
