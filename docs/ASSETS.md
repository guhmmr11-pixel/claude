# Logotipo e imagens

## Fotos atuais (ilustrativas)

As fotos do site vêm do Unsplash e seguem a [Unsplash License](https://unsplash.com/license): uso comercial permitido, sem obrigação de atribuição, e proibida a revenda das fotos como estão. Elas ilustram as categorias e não representam modelos ou marcas vendidos pela Sinal Digital. O rodapé avisa "Imagens ilustrativas". Quando a empresa tiver fotos próprias ou autorizadas pelos fabricantes, substitua os arquivos mantendo os mesmos nomes.

| Arquivo | Onde aparece | Foto no Unsplash (CDN) |
| --- | --- | --- |
| `public/images/hero/data-center.jpg` | Fundo do topo | `photo-1580106815433-a5b1d1d53d85` |
| `public/images/solutions/audio-video.jpg` | Áudio e Vídeo | `photo-1590402494682-cd3fb53b1f70` |
| `public/images/solutions/computacao-imagem.jpg` | Computação / Imagem | `photo-1629904853716-f0bc54eea481` |
| `public/images/solutions/infraestrutura-conectividade.jpg` | Infraestrutura / Conectividade / Telecom | `photo-1520869562399-e772f042f422` |
| `public/images/solutions/ar-condicionado.jpg` | Ar Condicionado (recorte no aparelho do teto) | `photo-1600508774634-4e11d34730e2` |
| `public/images/solutions/automacao-seguranca.jpg` | Automação Comercial / Segurança Eletrônica | `photo-1557597774-9d273605dfa9` |
| `public/images/solutions/servicos-solucoes-digitais.jpg` | Serviços / Soluções Digitais | `photo-1573164713988-8665fc963095` |
| `public/images/equipment/notebook.jpg` | Equipamento: Notebooks | `photo-1496181133206-80ce9b88a853` |
| `public/images/equipment/desktop.jpg` | Equipamento: Desktops | `photo-1587202372775-e229f172b9d7` |
| `public/images/equipment/monitor.jpg` | Equipamento: Monitores e TVs | `photo-1616763355548-1b606f439f86` |
| `public/images/equipment/tablet.jpg` | Equipamento: Tablets e celulares | `photo-1544244015-0df4b3ffc6b0` |
| `public/images/equipment/projetor.jpg` | Equipamento: Projetores (aparece a marca BenQ) | `photo-1528395874238-34ebe249b3f2` |
| `public/images/equipment/wifi.jpg` | Equipamento: Wi-Fi e roteadores | `photo-1606904825846-647eb07f5be2` |

Endereço de cada original: `https://images.unsplash.com/<id da tabela>`. A foto de projetor mostra a marca do fabricante; troque-a se a empresa não trabalhar com essa marca.

## Como trocar uma foto

1. Prepare o arquivo em JPG ou WebP. Categorias: proporção próxima de 3:2, mínimo 1600 px de largura. Equipamentos: proporção 9:7, mínimo 900 × 700 px. Fundo do topo: mínimo 2400 px de largura.
2. Substitua o arquivo em `public/images/...` com o mesmo nome. O Next.js gera automaticamente versões menores e o placeholder desfocado.
3. Atualize o texto alternativo (`alt`) em `data/solutions.ts` ou `data/equipment.ts` para descrever a nova foto.
4. Se o assunto principal da foto não estiver no centro, ajuste `position` (CSS `object-position`) da família em `data/solutions.ts`, como já é feito em Ar Condicionado (`"50% 18%"`).

## Logotipo oficial

1. Salve o arquivo em `public/images/brand/`, de preferência SVG ou PNG com fundo transparente, por exemplo `logo-sinal-digital.svg`.
2. Em `data/site.ts`, preencha `logo` com o caminho e as dimensões reais do arquivo:

   ```ts
   logo: { src: "/images/brand/logo-sinal-digital.svg", alt: "Sinal Digital", width: 480, height: 160 },
   ```

3. O site agora é escuro. No header e no rodapé, o logo aparece sobre um bloco branco para preservar as cores originais. Se a empresa tiver uma versão para fundo escuro, ajuste `components/sinal-digital/sinal-logo.tsx` para usá-la sem o bloco.
4. Confira o espaço de proteção e a leitura no celular (320 e 375 px).
