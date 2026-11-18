import { solutions } from "@/data/solutions";

/** Família marcada no pedido de cotação → itens marcados dessa família. */
export type QuoteSelection = Record<string, string[]>;

export type QuoteDetails = {
  quantity: string;
  deadline: string;
  city: string;
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  notes: string;
};

export const deadlineOptions = ["Imediato", "Até 30 dias", "De 30 a 90 dias", "Ainda planejando"];

export const QUOTE_SUBJECT = "Solicitação de cotação - Sinal Digital";

/** Junta uma nova seleção à atual, sem repetir itens. */
export function mergeSelection(current: QuoteSelection, solutionId?: string, items: string[] = []) {
  if (!solutionId) return current;
  const previous = current[solutionId] ?? [];
  return { ...current, [solutionId]: Array.from(new Set([...previous, ...items])) };
}

/** Monta o texto enviado ao consultor por WhatsApp ou e-mail. */
export function buildQuoteMessage(selection: QuoteSelection, details: QuoteDetails) {
  const lines = ["Olá, gostaria de solicitar uma cotação à Sinal Digital.", "", "Soluções de interesse:"];

  for (const solution of solutions) {
    const items = selection[solution.id];
    if (!items) continue;
    const ordered = solution.includes.filter((item) => items.includes(item));
    lines.push(`• ${solution.name}${ordered.length ? `: ${ordered.join(", ")}` : ""}`);
  }

  lines.push("");
  if (details.quantity.trim()) lines.push(`Quantidade aproximada: ${details.quantity.trim()}`);
  if (details.deadline) lines.push(`Prazo: ${details.deadline}`);
  if (details.city.trim()) lines.push(`Cidade/UF de entrega: ${details.city.trim()}`);
  if (details.quantity.trim() || details.deadline || details.city.trim()) lines.push("");

  lines.push(`Nome: ${details.name.trim()}`);
  lines.push(`Empresa: ${details.company.trim()}`);
  lines.push(`WhatsApp: ${details.whatsapp.trim()}`);
  if (details.email.trim()) lines.push(`E-mail: ${details.email.trim()}`);
  if (details.notes.trim()) lines.push("", `Observações: ${details.notes.trim()}`);

  return lines.join("\n");
}
