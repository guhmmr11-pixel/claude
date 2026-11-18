import type { StaticImageData } from "next/image";
import desktop from "@/public/images/equipment/desktop.jpg";
import monitor from "@/public/images/equipment/monitor.jpg";
import notebook from "@/public/images/equipment/notebook.jpg";
import projetor from "@/public/images/equipment/projetor.jpg";
import tablet from "@/public/images/equipment/tablet.jpg";
import wifi from "@/public/images/equipment/wifi.jpg";

/**
 * Equipamentos em destaque no topo da página. Cada foto abre o painel de cotação
 * já com a família (`solutionId`) e os itens (`items`) marcados. Os itens precisam
 * ter o mesmo texto da lista `includes` da família em data/solutions.ts.
 * Fotos ilustrativas do Unsplash (Unsplash License). Veja docs/ASSETS.md.
 */
export type Equipment = {
  id: string;
  label: string;
  image: StaticImageData;
  alt: string;
  solutionId: string;
  items: string[];
};

export const equipment: Equipment[] = [
  {
    id: "notebooks",
    label: "Notebooks",
    image: notebook,
    alt: "Notebook aberto sobre mesa de escritório",
    solutionId: "computacao-imagem",
    items: ["Desktops e notebooks"]
  },
  {
    id: "desktops",
    label: "Desktops",
    image: desktop,
    alt: "Gabinete de computador com ventoinhas iluminadas em azul",
    solutionId: "computacao-imagem",
    items: ["Desktops e notebooks"]
  },
  {
    id: "monitores",
    label: "Monitores e TVs",
    image: monitor,
    alt: "Estação de trabalho com monitor horizontal e monitor vertical",
    solutionId: "computacao-imagem",
    items: ["Monitores profissionais"]
  },
  {
    id: "tablets",
    label: "Tablets e celulares",
    image: tablet,
    alt: "Tablet com caneta digital sobre mesa escura",
    solutionId: "computacao-imagem",
    items: ["Tablets e smartphones"]
  },
  {
    id: "projetores",
    label: "Projetores",
    image: projetor,
    alt: "Projetor multimídia instalado no teto",
    solutionId: "audio-video",
    items: ["Projetores multimídia"]
  },
  {
    id: "wifi",
    label: "Wi-Fi e roteadores",
    image: wifi,
    alt: "Roteador sem fio com cabo de rede conectado",
    solutionId: "infraestrutura-conectividade-telecom",
    items: ["Access points", "Switches e roteadores"]
  }
];
