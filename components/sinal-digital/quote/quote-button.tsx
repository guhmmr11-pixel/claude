"use client";

import type { ReactNode } from "react";
import { useQuote, type QuoteSeed } from "@/components/sinal-digital/quote/quote-provider";
import { whatsappLink, whatsappMessages } from "@/data/site";

type QuoteButtonProps = {
  seed?: Omit<QuoteSeed, "returnFocusTo">;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/**
 * Abre o painel de cotação. Antes da hidratação ou sem JavaScript, funciona como
 * link para o WhatsApp com uma mensagem de cotação pronta.
 */
export function QuoteButton({ seed, className, children, ...rest }: QuoteButtonProps) {
  const { openQuote } = useQuote();

  return (
    <a
      href={whatsappLink(whatsappMessages.quote)}
      target="_blank"
      rel="noreferrer"
      aria-haspopup="dialog"
      data-quote-trigger
      className={className}
      aria-label={rest["aria-label"]}
      onClick={(event) => {
        event.preventDefault();
        openQuote({ ...seed, returnFocusTo: event.currentTarget });
      }}
    >
      {children}
    </a>
  );
}
