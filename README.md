# Fluency Wealth MVP v1

MVP funcional de uma plataforma premium de aprendizado de inglês com foco em Business English e Finance English, trilha visual estilo progressão gamificada, chat com agente professor, News Lab, speaking e dicionário pessoal.

## Status da entrega

Esta entrega consolida o app como uma versao `v1` pronta para demo, com foco em apresentacao e consistencia do produto.

### Ja pronto

- dashboard premium com progresso, streak, XP e recomendacoes
- learning path com 150 modulos e logica 70/30
- coach chat com UX pronta e arquitetura OpenAI-ready
- News Lab com curadoria premium mockada e fluxo pedagogico editorial
- speaking, dictionary e review prontos para demo
- navegacao fluida entre dashboard, learn, chat, news lab, speaking, dictionary e review

### Ainda mockado

- respostas ao vivo do coach dependem de `OPENAI_API_KEY`
- feed de noticias continua mockado
- speaking continua mockado
- dicionario e progresso ainda nao sao persistidos por usuaria

### Proxima fase

- ativar OpenAI em producao
- persistir progresso, dicionario e historico
- integrar API premium de noticias
- evoluir speaking e revisao com IA

## Arquitetura proposta

O app foi estruturado para crescer como produto:

- `app/`: rotas do Next.js App Router, páginas principais e API routes mockadas.
- `components/`: blocos visuais reutilizáveis e views por feature.
- `data/`: mocks realistas, currículo da trilha, progresso e prompt do agente pedagógico.
- `lib/`: utilitários compartilhados.
- `types/`: tipagem de domínio.

### Decisões de produto e engenharia

- Trilha com `150` módulos e distribuição curricular de `70% business/finance` e `30% general English`.
- Visual premium com navegação lateral, cards, gradientes suaves e ritmo de progressão.
- Mocks preparados para demonstrar UX de ponta sem bloquear o MVP por integrações externas.
- API routes já separadas para futura conexão com OpenAI, notícias, speaking e persistência.
- Curadoria editorial do News Lab preparada para whitelist de fontes premium e fallback mockado.

## Funcionalidades entregues

- Dashboard com progresso geral, streak, XP, recomendação automática e últimas atividades.
- Trilha de aprendizado com mapa visual, checkpoints e módulos concluídos/atuais/bloqueados.
- News Lab com artigo mockado, leitura guiada, vocabulário-chave e interpretação.
- News Lab refinado com filtros editoriais, credibilidade visível da fonte, expressões de business/finance e fluxo de estudo mais robusto.
- Chat com agente professor em fluxo mockado, com arquitetura pronta para OpenAI.
- Speaking com prompt, transcrição, score por critério, feedback e resposta aprimorada.
- Dicionário pessoal com origem, definição, tradução, exemplo e status de revisão.
- Área de revisão com flashcards simples e lógica inicial de reforço.

## Como rodar

Pré-requisitos:

- Node.js 20+
- npm 10+ ou equivalente

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

Defina a sua chave:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Depois rode o app:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Demo v1

Esta versao foi finalizada para apresentacao, sem depender de novas integracoes complexas.

- o chat permanece OpenAI-ready, mas a UI continua apresentavel sem chave
- o News Lab usa mock data premium com aparencia editorial forte
- a base esta organizada para crescer sem retrabalho

## Chat Coach com OpenAI

O chat do professor agora usa a OpenAI Responses API.

Arquivos principais:

- `app/api/teacher/route.ts`: endpoint da aplicação
- `lib/openai.ts`: inicialização do cliente OpenAI
- `lib/ai/teacher.ts`: serviço do professor com montagem de contexto
- `data/agent-prompt.ts`: instrução principal do agente
- `app/chat/page.tsx`: página do chat
- `components/chat-coach.tsx`: experiência do chat no front

### Como funciona

- O front envia mensagens no formato simples `role` + `content`.
- O endpoint valida o payload e encaminha para a camada `lib/ai/teacher.ts`.
- O serviço combina o prompt pedagógico com contexto da usuária:
  - nível
  - progresso
  - módulo atual
  - erros recorrentes
  - foco `70/30 business-general`
- A resposta volta para a interface com estados de carregamento, erro e resposta vazia tratados.

### Persistência futura

O payload do chat já foi estruturado para suportar persistência futura com Supabase sem acoplar o front ao provider:

- histórico de mensagens
- perfil e nível da usuária
- progresso atual
- erros recorrentes
- contexto do módulo

## Rotas principais

- `/`
- `/learn`
- `/chat`
- `/news-lab`
- `/speaking`
- `/dictionary`
- `/review`

## Integrações futuras sugeridas

1. Conectar autenticação e banco com Supabase.
2. Persistir progresso, dicionário, sessões de chat e speaking.
3. Integrar o agente pedagógico real com OpenAI usando `data/agent-prompt.ts`.
4. Buscar notícias reais e gerar atividades dinamicamente.
5. Conectar Web Speech API para speaking real.
6. Adicionar lógica real de desbloqueio, revisão espaçada e analytics pedagógicos.

## Estratégia de fontes do News Lab

O News Lab foi refinado para usar apenas fontes premium e confiáveis de business/economia na camada editorial:

- Financial Times
- The Wall Street Journal
- Bloomberg
- Reuters
- CNBC
- The Economist
- New York Times Business
- Harvard Business Review

### Regras editoriais

- priorizar artigos recentes
- priorizar alta utilidade para business English e finance English
- manter a lógica de `70% business/finance` e `30% general professional English`
- exibir claramente credibilidade e motivo editorial da seleção
- evitar fontes genéricas, fracas ou sensacionalistas

### Estratégia técnica

- A whitelist de fontes vive em `data/news-sources.ts`.
- O endpoint `app/api/news/route.ts` já expõe `acceptedSources` e `sourceMode`.
- Se uma API futura não permitir filtrar adequadamente por essas fontes, o app pode continuar operando com fallback mockado premium sem perda de qualidade.
- Cada artigo é transformado em experiência pedagógica com:
  - manchete original
  - fonte
  - data
  - categoria
  - resumo simplificado
  - vocabulário-chave
  - expressões úteis
  - perguntas de compreensão
  - guia de correção
  - sugestões para salvar no dicionário

## Observação

Neste ambiente, `node`, `npm` e `git` não estavam disponíveis para execução, então o projeto foi montado manualmente e não houve validação por build local. A estrutura está pronta para instalação e execução em um ambiente com Node configurado.
