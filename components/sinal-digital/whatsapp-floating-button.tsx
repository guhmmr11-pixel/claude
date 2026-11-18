import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Sinal Digital pelo WhatsApp (abre em nova aba)"
      className="fixed bottom-4 right-4 z-30 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-whatsapp text-whatsapp-ink shadow-[0_12px_30px_-8px_rgba(6,48,31,0.45)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp-dark sm:bottom-6 sm:right-6 sm:w-auto sm:px-5"
    >
      <MessageCircle className="h-7 w-7 sm:h-6 sm:w-6" aria-hidden="true" />
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  );
}
