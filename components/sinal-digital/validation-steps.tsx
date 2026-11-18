import { SectionHeading } from "@/components/sinal-digital/section-heading";

const steps = [
  {
    number: "01",
    title: "Diagnóstico da necessidade",
    text: "Entendemos o ambiente, o objetivo do projeto, volume de equipamentos, prazo e restrições técnicas."
  },
  {
    number: "02",
    title: "Validação técnica",
    text: "Avaliamos compatibilidade, infraestrutura, conectividade, instalação, suporte e requisitos de operação."
  },
  {
    number: "03",
    title: "Proposta comercial",
    text: "Estruturamos a melhor condição com faturamento direto pelo fabricante/distribuidor, garantia e prazo de entrega."
  },
  {
    number: "04",
    title: "Implantação e suporte",
    text: "Apoiamos a instalação, configuração, manutenção e acompanhamento do uso da solução."
  }
];

export function ValidationSteps() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-title"
      className="border-y border-brand-line bg-brand-surface py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="processo-title"
          eyebrow="Processo consultivo"
          title="Validações para avançar com segurança"
        >
          Antes da compra, ajudamos sua empresa a entender necessidade, infraestrutura, melhor
          solução e condições comerciais.
        </SectionHeading>

        <ol className="relative mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
          <span
            className="absolute bottom-6 left-6 top-6 w-px bg-brand-blue/20 lg:bottom-auto lg:left-6 lg:right-6 lg:top-6 lg:h-px lg:w-auto"
            aria-hidden="true"
          />
          {steps.map(({ number, title, text }) => (
            <li key={number} className="reveal relative grid grid-cols-[3rem_1fr] gap-4 lg:block">
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-brand-ink text-sm font-bold text-white ring-8 ring-brand-surface">
                <span className="sr-only">Etapa </span>
                {number}
              </span>
              <div className="lg:mt-5">
                <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
