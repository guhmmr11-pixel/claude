import {
  AirVent,
  BriefcaseBusiness,
  Camera,
  MonitorSmartphone,
  Network,
  Presentation
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Solution = {
  id: string;
  number: string;
  name: string;
  subheadline: string;
  description: string;
  shortDescription: string;
  image: string;
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
    image: "/images/solutions/audio-video.jpg",
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
    image: "/images/solutions/computacao-imagem.jpg",
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
    image: "/images/solutions/infraestrutura-conectividade.jpg",
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
    image: "/images/solutions/ar-condicionado.jpg",
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
    image: "/images/solutions/automacao-seguranca.jpg",
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
    image: "/images/solutions/servicos-solucoes-digitais.jpg",
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
