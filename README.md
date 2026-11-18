# Sinal Digital | Site institucional

Site institucional B2B da Sinal Digital, com tema escuro e transições. Mostra o que a empresa fornece (equipamentos, áudio e vídeo, redes, climatização, segurança e serviços) com fotos clicáveis que abrem um pedido de cotação, além de benefícios, processo consultivo, contato comercial e mailing. Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 3.

## Rodar localmente

Pré-requisito: Node.js 24 LTS (o mesmo usado na validação e fixado em `engines`). O Next.js 16 aceita Node ≥ 20.9, mas o SDK `openai` do app legado exige Node ≥ 22.

```bash
npm ci
npm run dev
```

No Windows, use `npm.cmd ci` e `npm.cmd run dev` se o PowerShell bloquear `npm.ps1`. Abra o endereço exibido pelo Next.js. `localhost` só funciona na sua máquina; o link público vem da publicação (veja [docs/PUBLICACAO.md](docs/PUBLICACAO.md)).

| Script | Uso |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento. |
| `npm run build` | Build de produção (o mesmo comando da Vercel). |
| `npm run start` | Serve o build de produção localmente. |
| `npm run lint` | ESLint 9 com `eslint-config-next` (o `next lint` foi removido no Next.js 16). |
| `npm run typecheck` | Gera os tipos de rota (`next typegen`) e roda `tsc --noEmit`. |
| `node qa/landing.cjs <url>` | Roteiro de QA no navegador (viewports, âncoras, modal, links, mailing, rotas). Requer Playwright: `npm install --no-save playwright && npx playwright install chromium`. |

## Estrutura da página

Ordem em `app/page.tsx`: header fixo, hero com fotos de equipamentos (`#inicio`, `#equipamentos`), soluções (`#solucoes`), benefícios e diferenciais (`#beneficios`), como funciona (`#processo`), contato com mailing (`#contato`), rodapé e WhatsApp flutuante. O endereço `/#cotacao` abre direto o painel de cotação.

### Cotação

Todo botão "Solicitar cotação", "Cotar" ou foto de equipamento abre o mesmo painel lateral (`components/sinal-digital/quote/`). A família e os itens de origem já vêm marcados, e cliques seguidos somam itens ao pedido. O visitante informa quantidade, prazo, cidade e contato. O site monta a mensagem e abre o WhatsApp (`5511999015519`) ou o e-mail (`decio@sinaldig.com.br`), e o envio é confirmado pelo visitante. Não há backend nem preços. Sem JavaScript, os botões viram links de WhatsApp com mensagem de cotação.

### Movimento

As transições usam só CSS: entrada escalonada do topo, zoom lento na foto de fundo, anéis de "sinal", header que vira vidro ao rolar e revelação, parallax e linha de progresso guiados pela rolagem (`animation-timeline`). O conteúdo é visível sem JavaScript, e quem prefere movimento reduzido não vê animações. Os tokens ficam em `app/globals.css` e `tailwind.config.ts` (`space.*`, `signal.*`).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone, e-mail, responsável comercial, mensagens de WhatsApp e logotipo | `data/site.ts` |
| Famílias de soluções (nome, subtítulo, resumo, itens, descrição completa, ícone e foto) | `data/solutions.ts` |
| Equipamentos clicáveis do topo (foto, nome, família e itens marcados na cotação) | `data/equipment.ts` |
| Painel de cotação (campos, validação, texto da mensagem) | `components/sinal-digital/quote/quote-drawer.tsx`, `quote-message.ts` |
| Menu | `components/sinal-digital/nav-items.ts` |
| Hero (H1, CTAs, selos, mosaico de equipamentos) | `components/sinal-digital/hero.tsx` |
| Card, visual da família e modal de detalhes | `components/sinal-digital/solution-card.tsx`, `solution-visual.tsx`, `solution-modal.tsx` |
| Benefícios e diferenciais, como funciona | `components/sinal-digital/benefits.tsx`, `validation-steps.tsx` |
| Contato e mailing | `components/sinal-digital/contact.tsx`, `mailing-form.tsx` |
| Cores e movimento | `tailwind.config.ts` (`space.*`, `signal.*`, `whatsapp.*`) e `app/globals.css` |
| Título e descrição para buscadores | `app/layout.tsx` |

## Imagens e logotipo

As fotos atuais são ilustrativas, do Unsplash (licença com uso comercial permitido), e ficam em `public/images/`. A lista com a origem de cada uma e o passo a passo para trocar por fotos próprias ou pelo logotipo oficial estão em [docs/ASSETS.md](docs/ASSETS.md).

## Mailing

Primeira fase sem backend: ao enviar, o formulário valida os campos e abre o aplicativo de e-mail do visitante com uma mensagem pronta para `decio@sinaldig.com.br`. O cadastro só chega quando o visitante envia esse e-mail, e a interface diz isso antes e depois do clique. Se nada abrir, há um botão para copiar a mensagem.

O ponto de integração futura (API, Formspree, EmailJS, Google Sheets ou CRM) está comentado em `handleSubmit`, em `components/sinal-digital/mailing-form.tsx`. Antes de integrar, defina destino, opt-in, política de dados e proteção antispam.

## App legado no mesmo repositório

O projeto nasceu da base de um app de Business English. O código continua aqui (`app/learn`, `app/chat`, `app/news-lab`, `app/speaking`, `app/dictionary`, `app/review`, `app/api/*`, componentes e dados correspondentes). Na implantação institucional, `proxy.ts` responde 404 para essas rotas. Para reativá-las num ambiente separado, defina `ENABLE_LEGACY_APP=true`. Nenhuma chave de IA está conectada ao site. A documentação original do app está em [docs/legacy/FLUENCY-WEALTH-README.md](docs/legacy/FLUENCY-WEALTH-README.md).

## Documentação

- [docs/DIAGNOSTICO.md](docs/DIAGNOSTICO.md): diagnóstico do snapshot, atualização de dependências e resultados de validação.
- [docs/PUBLICACAO.md](docs/PUBLICACAO.md): passo a passo de publicação na Vercel e verificação do link público.
- [docs/ASSETS.md](docs/ASSETS.md): como adicionar logotipo oficial e fotos.
