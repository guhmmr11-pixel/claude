import {
  AirVent,
  BriefcaseBusiness,
  Camera,
  MonitorSmartphone,
  Network,
  Presentation
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import arCondicionado from "@/public/images/solutions/ar-condicionado.jpg";
import audioVideo from "@/public/images/solutions/audio-video.jpg";
import automacaoSeguranca from "@/public/images/solutions/automacao-seguranca.jpg";
import computacaoImagem from "@/public/images/solutions/computacao-imagem.jpg";
import infraestruturaConectividade from "@/public/images/solutions/infraestrutura-conectividade.jpg";
import servicosSolucoesDigitais from "@/public/images/solutions/servicos-solucoes-digitais.jpg";

/**
 * Foto da família de soluções (arquivos em `public/images/solutions/`).
 * As fotos atuais são ilustrativas, do Unsplash (Unsplash License, uso comercial permitido).
 * Para trocar por fotos próprias ou autorizadas, substitua o arquivo mantendo o nome
 * ou altere o import no topo deste arquivo. Veja docs/ASSETS.md.
 */
export type SolutionImage = {
  src: StaticImageData;
  /** Descrição curta do que aparece na imagem. */
  alt: string;
  /** Ponto focal do recorte (CSS object-position). Padrão: centro. */
  position?: string;
};

export type Solution = {
  id: string;
  number: string;
  name: string;
  subheadline: string;
  description: string;
  shortDescription: string;
  /** Sem imagem, o card e o modal mostram o ícone da família (fallback). */
  image?: SolutionImage;
  includes: string[];
  icon: LucideIcon;
};

export const solutions: Solution[] = [
  {
    id: "audio-video",
    number: "01",
    name: "Áudio e Vídeo",
    subheadline: "Projeção, Sonorização e Videoconferência",
    description:
      "Soluções para ambientes corporativos, educacionais, auditórios, igrejas, salas de reunião e espaços de treinamento. Inclui projetores multimídia, telas de projeção, caixas acústicas, microfones, mesas de som, sistemas de sonorização, videoconferência, lousas digitais e equipamentos para apresentação e colaboração.",
    shortDescription:
      "Projetores, telas, caixas acústicas, microfones, videoconferência e recursos para apresentação e colaboração.",
    image: { src: audioVideo, alt: "Profissional apresentando em uma tela interativa de grande formato em sala de reunião" },
    includes: [
      "Projetores multimídia",
      "Telas de projeção",
      "Caixas acústicas e microfones",
      "Videoconferência",
      "Lousas digitais"
    ],
    icon: Presentation
  },
  {
    id: "computacao-imagem",
    number: "02",
    name: "Computação / Imagem",
    subheadline: "Desktops, Notebooks, Monitores e Impressão",
    description:
      "Linha completa para produtividade, operação e infraestrutura de trabalho. Inclui desktops, notebooks, mini PCs, servidores, tablets, smartphones, monitores profissionais, scanners, impressoras, painéis de LED, soluções de imagem, vídeo wall e equipamentos para ambientes administrativos, técnicos e comerciais.",
    shortDescription:
      "Desktops, notebooks, tablets, monitores, impressão e soluções para produtividade e operação.",
    image: { src: computacaoImagem, alt: "Equipe trabalhando em estações com desktops e monitores" },
    includes: [
      "Desktops e notebooks",
      "Tablets e smartphones",
      "Monitores profissionais",
      "Impressoras e scanners",
      "Painéis de LED e vídeo wall"
    ],
    icon: MonitorSmartphone
  },
  {
    id: "infraestrutura-conectividade-telecom",
    number: "03",
    name: "Infraestrutura / Conectividade / Telecom",
    subheadline: "Rede, Telefonia e Conectividade",
    description:
      "Soluções para estruturação, expansão e modernização da conectividade empresarial. Inclui switches, roteadores, access points, cabeamento, racks, armazenamento, telefonia, controle de acesso, rede corporativa, CFTV, automação e equipamentos para ambientes que exigem estabilidade, segurança e desempenho.",
    shortDescription:
      "Switches, roteadores, access points, cabeamento, racks, telefonia e rede corporativa.",
    image: { src: infraestruturaConectividade, alt: "Switch em rack com cabos de fibra óptica conectados" },
    includes: [
      "Switches e roteadores",
      "Access points",
      "Cabeamento e racks",
      "Telefonia",
      "CFTV e rede corporativa"
    ],
    icon: Network
  },
  {
    id: "ar-condicionado",
    number: "04",
    name: "Ar Condicionado",
    subheadline: "Climatização para Ambientes Corporativos",
    description:
      "Soluções de climatização para empresas, salas técnicas, escritórios, ambientes comerciais, educacionais e corporativos. Inclui equipamentos de ar condicionado, apoio em escolha de soluções, fornecimento e integração com projetos de infraestrutura, sempre considerando eficiência, conforto e adequação ao ambiente.",
    shortDescription:
      "Climatização para escritórios, salas técnicas, ambientes educacionais e operações corporativas.",
    image: { src: arCondicionado, alt: "Escritório corporativo climatizado com ar-condicionado cassete no teto", position: "50% 18%" },
    includes: [
      "Equipamentos de ar condicionado",
      "Apoio na escolha técnica",
      "Integração com infraestrutura",
      "Eficiência e conforto",
      "Soluções para ambientes críticos"
    ],
    icon: AirVent
  },
  {
    id: "automacao-seguranca",
    number: "05",
    name: "Automação Comercial / Segurança Eletrônica",
    subheadline: "Automação, Controle e Monitoramento",
    description:
      "Soluções voltadas à operação comercial, segurança e controle de ambientes. Inclui leitores de código de barras, impressoras, terminais de atendimento, equipamentos de ponto de venda, câmeras, DVR/NVR, controle de acesso, sensores, sistemas de monitoramento e dispositivos para maior eficiência operacional.",
    shortDescription:
      "Leitores, impressoras, câmeras, DVR/NVR, controle de acesso e monitoramento.",
    image: { src: automacaoSeguranca, alt: "Parede com várias câmeras de segurança" },
    includes: [
      "Leitores de código de barras",
      "Terminais e PDV",
      "Câmeras",
      "DVR/NVR",
      "Sensores e controle de acesso"
    ],
    icon: Camera
  },
  {
    id: "servicos-solucoes-digitais",
    number: "06",
    name: "Serviços / Soluções Digitais",
    subheadline: "Projetos, Instalação, Suporte e Manutenção",
    description:
      "Atuação consultiva para apoiar o cliente do projeto à implantação. Inclui levantamento de necessidades, indicação de soluções, instalação, configuração, suporte técnico, manutenção, integração de equipamentos, projetos personalizados e acompanhamento para garantir melhor uso da tecnologia no dia a dia.",
    shortDescription:
      "Projetos, instalação, configuração, suporte, integração de equipamentos e manutenção.",
    image: { src: servicosSolucoesDigitais, alt: "Profissionais com notebooks em um corredor de data center", position: "50% 40%" },
    includes: [
      "Projetos personalizados",
      "Instalação",
      "Configuração",
      "Suporte técnico",
      "Manutenção e integração"
    ],
    icon: BriefcaseBusiness
  }
];

export function getSolution(id: string) {
  return solutions.find((solution) => solution.id === id);
}
