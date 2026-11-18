# Publicação na Vercel

`localhost` só funciona na máquina de quem roda o projeto. Para outras pessoas verem o site, é preciso publicar e verificar o domínio de produção numa sessão sem login.

## Antes de publicar: confirmar com a empresa

| Decisão | Por quê |
| --- | --- |
| **Conta e equipe da Vercel** | O projeto deve ficar na conta ou equipe de quem responde pelo domínio. O plano Hobby é para uso pessoal e não comercial ([termos do Hobby](https://vercel.com/docs/plans/hobby)); para um site empresarial, use um plano compatível (por exemplo, Pro). |
| **Repositório** | Recomendado: um repositório dedicado, por exemplo `sinal-digital-site`, na conta ou organização da empresa (pode ser privado). Hoje o código está no branch `claude/laughing-cray-5cy70i` do repositório público `guhmmr11-pixel/claude`. |
| **Escopo de rotas** | Implantação institucional: só a landing `/`. Páginas e APIs do app legado respondem 404 (`proxy.ts`). Não defina `ENABLE_LEGACY_APP` nem `OPENAI_API_KEY` neste projeto. |
| **Autorização para produção** | Confirme os dados publicados (Décio Câmara, `(11) 99901-5519`, `decio@sinaldig.com.br`), a menção "Parceria Acer x Sinal Digital" e o uso da marca provisória até chegar o logotipo oficial. |
| **Domínio** | O domínio `<projeto>.vercel.app` vem por padrão. Um domínio próprio (por exemplo, `sinaldig.com.br`) exige acesso ao DNS. |

## 1. Preparar o repositório dedicado (opcional, recomendado)

Na sua máquina, a partir de um clone deste repositório:

```bash
git clone --branch claude/laughing-cray-5cy70i https://github.com/guhmmr11-pixel/claude.git sinal-digital-site
```

```bash
cd sinal-digital-site
```

Crie o repositório vazio `sinal-digital-site` no GitHub da empresa e envie o código como `main`:

```bash
git remote set-url origin https://github.com/<organizacao>/sinal-digital-site.git
```

```bash
git push -u origin HEAD:main
```

O que o repositório contém: `app/`, `components/`, `data/`, `lib/`, `types/`, `public/`, `docs/`, `qa/`, `proxy.ts`, as configurações (`next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`, `eslint.config.mjs`), `package.json`, `package-lock.json`, `.env.example`, `.gitignore` e `README.md`. O que não entra (já no `.gitignore`): `.env*`, `node_modules/`, `.next/`, `.vercel/`, logs, `*.tsbuildinfo` e `next-env.d.ts`.

Se a empresa preferir publicar a partir deste repositório, importe `guhmmr11-pixel/claude` e, nas configurações do projeto na Vercel, aponte o **Production Branch** para `claude/laughing-cray-5cy70i`. Outra opção é integrar o branch ao `main` por pull request.

## 2. Criar o projeto na Vercel

1. Em [vercel.com/new](https://vercel.com/new), selecione a **equipe correta** e importe o repositório (a integração com o GitHub precisa ter acesso a ele).
2. **Framework Preset:** Next.js. **Root Directory:** a raiz (onde está `package.json`).
3. **Build Command:** padrão (`npm run build`). **Install Command:** ative o override e use `npm ci`, para instalar exatamente o que está no `package-lock.json` validado. **Output Directory:** padrão.
4. **Node.js:** o `package.json` fixa `engines.node = "24.x"`, e a Vercel usa Node 24 automaticamente.
5. **Environment Variables:** nenhuma é necessária. Opcional: `NEXT_PUBLIC_SITE_URL` com o domínio definitivo (para canonical e Open Graph). Sem ela, o site usa o domínio de produção da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`).
6. Clique em **Deploy** e acompanhe os logs até o estado **Ready**.

Alternativa por linha de comando, com o projeto já vinculado à equipe correta:

```bash
npx vercel@latest deploy --prod
```

## 3. Verificar o link público

1. Em **Settings → Domains**, anote o domínio de produção (por exemplo, `sinal-digital-site.vercel.app`; o nome final depende da disponibilidade).
2. Abra o domínio numa **janela anônima** ou em outro dispositivo, fora da conta da Vercel. Se aparecer tela de login, você abriu uma URL de preview protegida ou a [Deployment Protection](https://vercel.com/docs/deployment-protection) está cobrindo produção. Use o domínio de produção.
3. Rode as verificações rápidas:

   ```bash
   curl -sI https://<dominio>/ | head -1
   ```

   Esperado: `HTTP/2 200`.

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" https://<dominio>/learn
   ```

   Esperado: `404`.

4. Rode o roteiro completo contra o domínio real (Playwright local):

   ```bash
   npm install --no-save playwright && npx playwright install chromium
   ```

   ```bash
   node qa/landing.cjs https://<dominio>/
   ```

   Esperado: `94 verificações ok, 0 falhas`.

5. Confira manualmente no celular: menu, âncoras, um "Saiba mais", um "Consultar solução" (abre o WhatsApp com a família no texto) e o mailing (abre o e-mail com os dados; não precisa enviar).
6. Registre a URL verificada, a data, o commit publicado e o resultado do roteiro.

## Diagnóstico de falhas

- **Build falhou na Vercel:** copie o primeiro erro do log. Confira o commit, a raiz do projeto, a versão do Node (24.x) e se o `package-lock.json` está no commit. O mesmo commit passa localmente com `npm ci && npm run build`.
- **Página pede login:** você está numa URL de preview ou com proteção em produção (veja o passo 3.2).
- **Rotas legadas abrindo:** confira se `ENABLE_LEGACY_APP` foi definida por engano nas variáveis do projeto.
