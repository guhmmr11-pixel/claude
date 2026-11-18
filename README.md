# Sinal Digital | Site institucional

Landing institucional B2B da Sinal Digital: portfólio em seis áreas de atuação, processo consultivo, diferenciais e contato comercial com mailing. Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 3.

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

Ordem em `app/page.tsx`: header, hero, soluções, benefícios, processo, diferenciais, contato com mailing, rodapé e WhatsApp flutuante. Âncoras do menu: `#inicio`, `#solucoes`, `#beneficios`, `#processo` e `#contato`. A seção de diferenciais também tem `#diferenciais`.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone, e-mail, responsável comercial, mensagens de WhatsApp, logotipo e foto do hero | `data/site.ts` |
| Famílias de soluções (nome, subtítulo, resumo, itens, descrição completa, ícone e imagem) | `data/solutions.ts` |
| Menu | `components/sinal-digital/nav-items.ts` |
| Hero (H1, CTAs, selos, vitrine de equipamentos) | `components/sinal-digital/hero.tsx` |
| Card, visual da família e modal de detalhes | `components/sinal-digital/solution-card.tsx`, `solution-visual.tsx`, `solution-modal.tsx` |
| Benefícios, processo e diferenciais | `components/sinal-digital/benefits.tsx`, `validation-steps.tsx`, `why-sinal-digital.tsx` |
| Contato e mailing | `components/sinal-digital/contact.tsx`, `mailing-form.tsx` |
| Cores da marca | `tailwind.config.ts` (`brand.*` e `whatsapp.*`) |
| Título e descrição para buscadores | `app/layout.tsx` |

## Imagens e logotipo

O site funciona sem imagens: cada família mostra o ícone em um círculo claro, e o hero mostra uma vitrine de equipamentos por ícones. Quando a empresa enviar fotos com uso autorizado ou o logotipo oficial, siga [docs/ASSETS.md](docs/ASSETS.md). Os arquivos ficam em `public/images/`.

## Mailing

Primeira fase sem backend: ao enviar, o formulário valida os campos e abre o aplicativo de e-mail do visitante com uma mensagem pronta para `decio@sinaldig.com.br`. O cadastro só chega quando o visitante envia esse e-mail, e a interface diz isso antes e depois do clique. Se nada abrir, há um botão para copiar a mensagem.

O ponto de integração futura (API, Formspree, EmailJS, Google Sheets ou CRM) está comentado em `handleSubmit`, em `components/sinal-digital/mailing-form.tsx`. Antes de integrar, defina destino, opt-in, política de dados e proteção antispam.

## App legado no mesmo repositório

O projeto nasceu da base de um app de Business English. O código continua aqui (`app/learn`, `app/chat`, `app/news-lab`, `app/speaking`, `app/dictionary`, `app/review`, `app/api/*`, componentes e dados correspondentes). Na implantação institucional, `proxy.ts` responde 404 para essas rotas. Para reativá-las num ambiente separado, defina `ENABLE_LEGACY_APP=true`. Nenhuma chave de IA está conectada ao site. A documentação original do app está em [docs/legacy/FLUENCY-WEALTH-README.md](docs/legacy/FLUENCY-WEALTH-README.md).

## Documentação

- [docs/DIAGNOSTICO.md](docs/DIAGNOSTICO.md): diagnóstico do snapshot, atualização de dependências e resultados de validação.
- [docs/PUBLICACAO.md](docs/PUBLICACAO.md): passo a passo de publicação na Vercel e verificação do link público.
- [docs/ASSETS.md](docs/ASSETS.md): como adicionar logotipo oficial e fotos.
