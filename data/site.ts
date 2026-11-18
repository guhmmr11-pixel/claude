/**
 * Dados institucionais e de contato da Sinal Digital.
 * Fonte única para header, hero, cards, modal, contato, mailing e botão flutuante.
 */

export type SiteImage = {
  /** Caminho a partir de `public/`, por exemplo `/images/brand/logo-sinal-digital.png`. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const site = {
  name: "Sinal Digital",
  tagline: "O seu parceiro de negócios",
  since: 2011,
  contact: {
    person: "Décio Câmara",
    role: "Diretor Comercial",
    email: "decio@sinaldig.com.br",
    phoneDisplay: "(11) 99901-5519",
    /** Número canônico para links `wa.me`: país + DDD + número, só dígitos. */
    whatsappNumber: "5511999015519"
  },
  /**
   * Logotipo oficial. Enquanto estiver `null`, o site usa a marca desenhada em
   * React/CSS (`components/sinal-digital/sinal-logo.tsx`). Quando a empresa
   * enviar o arquivo, salve-o em `public/images/brand/` e preencha, por exemplo:
   * { src: "/images/brand/logo-sinal-digital.png", alt: "Sinal Digital", width: 480, height: 160 }
   */
  logo: null as SiteImage | null
};

export const whatsappMessages = {
  general: "Olá, gostaria de saber mais sobre as soluções da Sinal Digital",
  consultant: "Olá, gostaria de falar com um consultor da Sinal Digital",
  quote: "Olá, gostaria de solicitar uma cotação à Sinal Digital.",
  solution: (solutionName: string) =>
    `Olá, gostaria de saber mais sobre soluções de ${solutionName} da Sinal Digital.`
};

export function whatsappLink(message: string = whatsappMessages.general) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(options: { subject?: string; body?: string } = {}) {
  const params = new URLSearchParams();

  if (options.subject) params.set("subject", options.subject);
  if (options.body) params.set("body", options.body);

  // URLSearchParams codifica espaço como "+", que vários clientes de e-mail não convertem.
  const query = params.toString().replace(/\+/g, "%20");

  return `mailto:${site.contact.email}${query ? `?${query}` : ""}`;
}
