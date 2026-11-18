# Diagnóstico técnico e validação

Data: 18/11/2026. Origem: pacote de handoff `sinal-digital-claude-code.zip` (código de `app/`, `components/`, `data/`, `lib/`, `types/`, configuração e lockfile). O snapshot sem alterações está no commit "Importa snapshot da landing Sinal Digital". A pasta `handoff/` e a transcrição ficaram fora deste repositório público, porque a transcrição contém caminhos locais da máquina de quem a gerou.

## 1. Snapshot recebido (antes das mudanças)

| Item | Resultado |
| --- | --- |
| Origem do código | Next.js 15.3.1, App Router, React 19, Tailwind 3.4, TypeScript. Raiz reaproveitada do app "Fluency Wealth MVP" (Business English). `package.json` e README ainda com esse nome. |
| Instalação limpa (`npm ci`, Node 22.23.5, npm 10.9.9) | Passou: 145 pacotes em 8 s. Avisos: `next@15.3.1` com vulnerabilidade de segurança (CVE-2025-66478) e `node-domexception` descontinuado. |
| TypeScript (`tsc --noEmit`) | Passou. |
| Build (`next build`) | Passou. `/` estática, 109 kB de First Load JS. Aviso de Browserslist desatualizado. |
| `npm audit --omit=dev` | 6 vulnerabilidades: 1 crítica (`next`) e 5 altas (`sharp`, `postcss`, `nanoid`, `source-map-js`, `form-data` via `openai@4`). |
| Lint | `next lint`, comando removido no Next.js 16. |

A pasta original no OneDrive tinha `node_modules` incompleto (erro `./_tsc.js`). A instalação limpa numa pasta dedicada mostrou que o código em si compilava.

### O que depende do legado de inglês

| Parte | Depende do legado? |
| --- | --- |
| Landing (`app/page.tsx`, `components/sinal-digital/*`, `data/solutions.ts`) | Não. Usa só `next`, `react`, `lucide-react` e Tailwind. |
| `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts` | Compartilhados. O Tailwind mantém tokens de cor do legado (`ink`, `sand`, `coral` etc.). |
| Páginas `/learn`, `/chat`, `/news-lab`, `/speaking`, `/dictionary`, `/review` | Legado. Usam `components/*` (fora de `sinal-digital/`), `data/mock.ts`, `data/modules.ts`, `data/news-*`, `lib/utils.ts` (`clsx`, `tailwind-merge`) e `types/`. |
| APIs `/api/news`, `/api/speaking` (mock) e `/api/teacher` | Legado. `/api/teacher` chama a OpenAI com `OPENAI_API_KEY` (`lib/openai.ts`, `lib/ai/teacher.ts`, `data/agent-prompt.ts`). |
| `typedRoutes` | Usado pelo legado (`components/dashboard.tsx` importa o tipo `Route`). |

## 2. Atualização de plataforma

| Mudança | Motivo |
| --- | --- |
| `next` 15.3.1 → **16.4.6** (fixada) | Versão `latest` estável publicada em 09/11/2026, com as correções de segurança. A linha 15.5.x ainda recebe backports, mas a 16 é a linha atual. |
| `react`/`react-dom` → 19.3.1; `@types/react*` 19.3; `@types/node` 24 | Compatibilidade com Next 16 e Node 24. |
| `openai` 4.104 → 7.60 (app legado) | Remove `zod`, `form-data` e `node-fetch` vulneráveis. O código do coach compila sem mudanças (API Responses). Exige Node ≥ 22. Nenhuma chave foi configurada. |
| ESLint 9.39 + `eslint-config-next` 16.4.6, `eslint.config.mjs` | `next lint` foi removido no Next 16. Os plugins de react, import e jsx-a11y ainda não declaram suporte ao ESLint 10, então ficamos no 9 (dependência só de desenvolvimento). |
| `typedRoutes: true` fora de `experimental` | Estável desde o Next 15.5. |
| `engines.node: "24.x"` | Node 24 LTS: mesma versão da validação final e a que a Vercel vai usar. |
| `next-env.d.ts` fora do Git; `typecheck` = `next typegen && tsc` | Recomendação do Next 16: o arquivo é gerado e importa os tipos de rota de `.next/`. |
| `tsconfig.json` (`jsx: react-jsx`, include de `.next/dev/types`) | Ajuste automático e obrigatório do Next 16. |
| `@fontsource-variable/inter` (OFL) via `next/font/local` | Tipografia consistente sem baixar fonte remota no build (era uma das causas suspeitas dos travamentos antigos). |

Resultado: `npm audit` com **0 vulnerabilidades** (produção e desenvolvimento).

## 3. Escopo de rotas na implantação institucional

Decisão aplicada: preservar o código do legado e desativá-lo no ambiente público.

- `proxy.ts` (convenção do Next 16, antigo `middleware`) responde **404** para as 6 páginas do legado, com a página "Página não encontrada" em português, e **404 JSON** para `/api/news`, `/api/speaking` e `/api/teacher`.
- `ENABLE_LEGACY_APP=true` reativa tudo num ambiente separado. Testado: com a variável, `/learn`, `/chat` e `/api/news` respondem 200, e `/api/teacher` responde 500 por não haver chave.
- Nenhuma chave de IA está conectada ao site. Antes de qualquer ambiente com o coach, a equipe precisa decidir e revisar controle de acesso e limites de `/api/teacher`.
- A home não carrega nenhum chunk JavaScript do legado.

## 4. Validação final (Node 24, cópia limpa do commit)

Pasta dedicada criada com `git archive HEAD`, Node v24.22.3 e npm 11.19.1.

| Comando | Resultado |
| --- | --- |
| `npm ci` | 397 pacotes em 11 s, `found 0 vulnerabilities`. |
| `npm run typecheck` | Passou. |
| `npm run lint` | Passou, sem avisos. |
| `npm run build` | Passou. `/` estática; Proxy ativo. Sem avisos no log de `next start`. |
| `node qa/landing.cjs http://localhost:3200/` | 94 verificações ok, 0 falhas. |
| axe-core 4 (WCAG 2.0/2.1 A e AA + boas práticas) | 0 violações na home e no modal, em 375 e 1440 px. |

O mesmo build também foi validado no Node 22.23.5 durante o desenvolvimento.

### Cobertura do roteiro `qa/landing.cjs`

- Larguras 320, 375, 768, 1024 e 1440 px: sem rolagem horizontal; grid de soluções com 1, 2 e 3 colunas; botão flutuante dentro da tela.
- Âncoras `#inicio`, `#solucoes`, `#beneficios`, `#processo` e `#contato` pelo menu (desktop e mobile) e pela URL completa, com título visível abaixo do header.
- Menu mobile fecha ao escolher link, com Escape (foco volta ao botão), com clique fora e ao passar para desktop.
- Modal das 6 famílias por teclado: Enter abre, foco no botão fechar, Tab e Shift+Tab em ciclo, Escape fecha e devolve o foco ao "Saiba mais" correto. Também: clique dentro não fecha, clique fora fecha, "Voltar às soluções", rolagem da página bloqueada e troca de viewport com modal aberto (1440 → 375 → 1024×500) com controles visíveis.
- Links: todos os `wa.me` usam `5511999015519`, abrem em nova aba com `rel="noreferrer"`, e os dos cards e do modal incluem a família. Todos os `mailto:` usam `decio@sinaldig.com.br`. As âncoras apontam para ids existentes.
- Mailing com dados fictícios: 6 campos; opções derivadas do catálogo; envio vazio bloqueado com mensagens em português e foco no primeiro erro; e-mail e WhatsApp inválidos bloqueados. Dados válidos geram o rascunho `mailto:` com acentos, `&` e quebras de linha preservados, sem `+` no lugar de espaço. Aparece o aviso de que falta enviar o e-mail, e "Copiar mensagem" funciona.
- Sem JavaScript: H1, 6 cards, 4 etapas e contato no HTML; `#contato` visível; menu mobile abre.
- Movimento reduzido: nenhuma animação de revelação. Movimento permitido: revelação guiada por rolagem ativa e conteúdo visível ao chegar.
- Rotas legadas: 404 em português; `POST /api/teacher` → 404.
- Nenhum erro de console ou de página.

## 5. Problemas encontrados e corrigidos com evidência

| Problema | Evidência | Correção |
| --- | --- | --- |
| Rolagem horizontal de 8 px a 320 px | `scrollWidth` 328 > 320. O `<select>` usava a largura da opção mais longa e alargava a coluna implícita do grid. | `grid-cols-1` (`minmax(0,1fr)`) nos grids e `min-w-0` nos campos. |
| Texto do botão "Consultar solução" quebrando a 768 px | Captura do card em 768 px. | `whitespace-nowrap` e base flex que empilha os botões quando não cabem. |
| Link direto para `/#contato` animava ~8.000 px de rolagem | Amostragem de `scrollY`: o título só chegava ao lugar depois de mais de 1 s. | Rolagem suave só com foco na página (`html:focus-within`). Link direto pula na hora. |
| Evento `close` atrasado do `<dialog>` podia fechar um modal recém-aberto | Falha intermitente ao reabrir rapidamente por teclado. | `handleClose` ignora o evento se o diálogo já estiver aberto de novo. |
| Header semitransparente ficava acinzentado sobre o hero, e sobrava uma faixa de 11 px do hero ao navegar por âncora | Captura 1440 px de `#solucoes`. | Header branco sólido e `scroll-padding-top` igual à altura do header (65 px). |
| Faixa visual do modal ocupava a tela em alturas baixas | Captura 1024×500. | Faixa oculta quando a altura da tela é ≤ 640 px. |
| axe: `dl`/`dt` inválidos, botão flutuante fora de landmark, área rolável do modal sem acesso por teclado | Relatório do axe-core. | Lista `ul/li`, `<aside aria-label>` e região rolável com `tabIndex=0` e rótulo. |
| `scroll-reveal.tsx` deixava seções em `opacity-0` até a hidratação e violava a regra `react-hooks/set-state-in-effect` | Lint do Next 16 e histórico de seções em branco. | Removido. A revelação agora é só CSS (`animation-timeline: view()`), com conteúdo visível por padrão. |
| Contraste do botão flutuante (branco sobre `#25D366`, cerca de 2:1) | Cálculo de contraste. | Ícone e texto em verde-escuro `#06301F` sobre o verde do WhatsApp. |

## 6. Peso da home

Medido com Playwright e tamanhos gzip calculados localmente.

| Build | JS (gzip) |
| --- | --- |
| Snapshot (Next 15.3.1) | 106,5 KB |
| Atual (Next 16.4.6) | 150,1 KB |

O aumento vem do runtime: só o chunk do `react-dom` foi de 52 para 70 KB. O código próprio da landing (modal e mailing) é um chunk de cerca de 13 KB gzip. A fonte Inter adiciona 47 KB (woff2, subconjunto latino). Na Vercel, HTML, CSS e JS são servidos com compressão.
