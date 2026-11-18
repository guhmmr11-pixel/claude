"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { QuoteDrawer } from "@/components/sinal-digital/quote/quote-drawer";
import { mergeSelection, type QuoteSelection } from "@/components/sinal-digital/quote/quote-message";

export type QuoteSeed = {
  solutionId?: string;
  items?: string[];
  /** Elemento que recebe o foco quando o painel fecha. Padrão: o elemento focado ao abrir. */
  returnFocusTo?: HTMLElement | null;
};

type QuoteContextValue = {
  openQuote: (seed?: QuoteSeed) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

/**
 * Estado do pedido de cotação. Qualquer botão da página abre o mesmo painel e
 * acrescenta a família/itens de origem à seleção (sem apagar o que já foi marcado).
 * O endereço /#cotacao também abre o painel.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<QuoteSelection>({});
  const returnFocus = useRef<HTMLElement | null>(null);

  const openQuote = useCallback((seed: QuoteSeed = {}) => {
    returnFocus.current = seed.returnFocusTo ?? (document.activeElement as HTMLElement | null);
    setSelection((current) => mergeSelection(current, seed.solutionId, seed.items));
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#cotacao") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const target = returnFocus.current;
    if (target?.isConnected) target.focus();
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#cotacao") openQuote({ returnFocusTo: null });
    };
    window.addEventListener("hashchange", checkHash);
    const frame = requestAnimationFrame(checkHash);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      cancelAnimationFrame(frame);
    };
  }, [openQuote]);

  const value = useMemo(() => ({ openQuote }), [openQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDrawer open={open} selection={selection} onSelectionChange={setSelection} onClose={close} />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote precisa estar dentro de <QuoteProvider>.");
  return context;
}
