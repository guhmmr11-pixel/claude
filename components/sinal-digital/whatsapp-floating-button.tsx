import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/5511999015519?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Sinal%20Digital";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Sinal Digital pelo WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-950/25 transition hover:scale-105 hover:bg-[#1DB954] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 sm:bottom-6 sm:right-6 sm:h-14 sm:w-auto sm:gap-2 sm:px-5"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      <span className="hidden text-sm font-black sm:inline">WhatsApp</span>
    </a>
  );
}
