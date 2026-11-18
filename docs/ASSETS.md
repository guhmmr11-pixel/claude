# Logotipo e imagens

Use somente arquivos fornecidos ou autorizados pela Sinal Digital ou pelo fabricante. Sem os arquivos, o site mantém o fallback (marca desenhada em CSS, ícones nas famílias e vitrine de ícones no hero).

## Logotipo oficial

1. Salve o arquivo em `public/images/brand/`, de preferência SVG ou PNG com fundo transparente, por exemplo `logo-sinal-digital.svg`.
2. Em `data/site.ts`, preencha `logo` com o caminho e as dimensões reais do arquivo:

   ```ts
   logo: { src: "/images/brand/logo-sinal-digital.svg", alt: "Sinal Digital", width: 480, height: 160 },
   ```

3. O header (fundo branco) mostra o arquivo com 40 px de altura. No rodapé (fundo marinho), o arquivo aparece sobre um bloco branco para preservar as cores. Se a empresa tiver uma versão para fundo escuro, ela pode substituir esse bloco num ajuste simples em `components/sinal-digital/sinal-logo.tsx`.
4. Confira o espaço de proteção e a leitura no celular (320 e 375 px).

## Fotos das famílias de soluções

Arquivos sugeridos em `public/images/solutions/`, proporção 16:9, mínimo 960 × 540 px, JPG ou WebP otimizado:

| Família | Arquivo sugerido |
| --- | --- |
| Áudio e Vídeo | `audio-video.jpg` |
| Computação / Imagem | `computacao-imagem.jpg` |
| Infraestrutura / Conectividade / Telecom | `infraestrutura-conectividade.jpg` |
| Ar Condicionado | `ar-condicionado.jpg` |
| Automação Comercial / Segurança Eletrônica | `automacao-seguranca.jpg` |
| Serviços / Soluções Digitais | `servicos-solucoes-digitais.jpg` |

Para ativar uma foto, em `data/solutions.ts`, troque a linha comentada `// image: { ... }` da família por `image: { ... }` e ajuste o texto `alt` para descrever o que aparece na foto. O card e o modal passam a mostrar a imagem. Famílias sem imagem continuam com o ícone.

## Foto do hero

Arquivo sugerido: `public/images/hero/hero-sinal-digital.jpg` (proporção 4:3, mínimo 1200 × 900 px), com equipamentos ou ambiente corporativo. Em `data/site.ts`, preencha `heroImage` com `src`, `alt`, `width` e `height`. A foto aparece a partir de 1024 px de largura; no celular e no tablet, o hero prioriza título e CTAs.
