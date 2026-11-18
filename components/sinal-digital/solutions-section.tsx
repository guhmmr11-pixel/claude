"use client";

import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/sinal-digital/section-heading";
import { SolutionCard } from "@/components/sinal-digital/solution-card";
import { SolutionModal } from "@/components/sinal-digital/solution-modal";
import { solutions, type Solution } from "@/data/solutions";

export function SolutionsSection() {
  const [selected, setSelected] = useState<{ solution: Solution; trigger: HTMLElement } | null>(null);

  const openSolution = useCallback((solution: Solution, trigger: HTMLElement) => {
    setSelected({ solution, trigger });
  }, []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="relative bg-space-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="solucoes-title" eyebrow="O que a Sinal Digital fornece" title="Nossas soluções">
          Seis áreas de atuação para equipar, conectar e manter a operação de empresas, instituições e projetos
          corporativos. Escolha uma área e solicite sua cotação.
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} onOpen={openSolution} />
          ))}
        </div>
      </div>

      <SolutionModal
        solution={selected?.solution ?? null}
        returnFocusTo={selected?.trigger ?? null}
        onClose={closeModal}
      />
    </section>
  );
}
