// Roteiro automatizado de QA da landing Sinal Digital (Playwright + Chromium).
// Uso: node qa/landing.cjs [baseUrl] [pastaDeCapturas]
// Exemplo local:   npm run build && npm run start   (em outro terminal)  node qa/landing.cjs http://localhost:3000/
// Exemplo público: node qa/landing.cjs https://<dominio-de-producao>/
// Requer Playwright: npm install --no-save playwright && npx playwright install chromium
const { chromium } = require('playwright');
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BASE = (process.argv[2] || 'http://localhost:3000/').replace(/\/?$/, '/');
const SHOTS = process.argv[3] || fs.mkdtempSync(path.join(os.tmpdir(), 'sinal-qa-'));
const WA = '5511999015519';
const EMAIL = 'decio@sinaldig.com.br';
const SECTIONS = ['inicio', 'solucoes', 'beneficios', 'processo', 'contato'];
const FAMILIES = [
  'Áudio e Vídeo',
  'Computação / Imagem',
  'Infraestrutura / Conectividade / Telecom',
  'Ar Condicionado',
  'Automação Comercial / Segurança Eletrônica',
  'Serviços / Soluções Digitais'
];

let passed = 0;
const failures = [];
async function check(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (error) {
    failures.push(name);
    console.log(`  FAIL ${name}\n       ${String(error.message).split('\n')[0]}`);
  }
}

function watchErrors(page, bucket) {
  page.on('pageerror', (e) => bucket.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') bucket.push(`console: ${m.text()}`);
  });
}

async function headingVisibleBelowHeader(page, id) {
  return page.evaluate((sectionId) => {
    const section = document.getElementById(sectionId);
    const heading = section.querySelector('h1, h2');
    const header = document.querySelector('header');
    const h = heading.getBoundingClientRect();
    const hb = header.getBoundingClientRect().bottom;
    return { top: h.top, headerBottom: hb, vh: window.innerHeight, ok: h.top >= hb - 1 && h.top < window.innerHeight };
  }, id);
}

async function waitScrollEnd(page) {
  let last = -1;
  let stable = 0;
  for (let i = 0; i < 60 && stable < 3; i++) {
    await page.waitForTimeout(100);
    const y = await page.evaluate(() => Math.round(window.scrollY));
    stable = y === last ? stable + 1 : 0;
    last = y;
  }
}

async function focusInsideDialog(page) {
  return page.evaluate(() => {
    const d = document.querySelector('dialog.solution-dialog');
    return d.open && d.contains(document.activeElement);
  });
}

(async () => {
  const browser = await chromium.launch();
  const errors = [];

  // ---------- 1. Layout por viewport, âncoras e menu ----------
  for (const width of [320, 375, 768, 1024, 1440]) {
    console.log(`\n[viewport ${width}px]`);
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 740 : 900 } });
    const page = await ctx.newPage();
    watchErrors(page, errors);
    await page.goto(BASE, { waitUntil: 'networkidle' });

    await check('sem rolagem horizontal', async () => {
      const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      assert.ok(sw <= cw, `${sw} > ${cw}`);
    });

    await check('grid de soluções com colunas esperadas (1/2/3)', async () => {
      const cols = await page.evaluate(() => getComputedStyle(document.querySelector('#solucoes .grid')).gridTemplateColumns.split(' ').length);
      const expected = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      assert.strictEqual(cols, expected);
    });

    await check('botão flutuante de WhatsApp visível e dentro da tela', async () => {
      const box = await page.locator('a[aria-label^="Falar com a Sinal Digital pelo WhatsApp"]').boundingBox();
      assert.ok(box && box.x + box.width <= width && box.width >= 44 && box.height >= 44);
    });

    const desktop = width >= 1024;
    for (const id of SECTIONS) {
      await check(`âncora #${id} pelo menu deixa o título visível sob o header`, async () => {
        await page.evaluate(() => window.scrollTo(0, 0));
        if (!desktop) {
          await page.locator('header summary').click();
          await page.locator(`header details nav a[href="#${id}"]`).click();
          const open = await page.evaluate(() => document.querySelector('header details').open);
          assert.strictEqual(open, false, 'menu deveria fechar após escolher o link');
        } else {
          await page.locator(`header nav[aria-label="Menu principal"] a[href="#${id}"]`).first().click();
        }
        await waitScrollEnd(page);
        const r = await headingVisibleBelowHeader(page, id);
        assert.ok(r.ok, JSON.stringify(r));
      });
    }

    if (!desktop) {
      await check('menu fecha com Escape e devolve o foco ao botão', async () => {
        await page.locator('header summary').click();
        await page.keyboard.press('Escape');
        const state = await page.evaluate(() => ({ open: document.querySelector('header details').open, focus: document.activeElement.tagName }));
        assert.deepStrictEqual(state, { open: false, focus: 'SUMMARY' });
      });
      await check('menu fecha ao clicar fora', async () => {
        await page.locator('header summary').click();
        const vh = page.viewportSize().height;
        const panelBottom = await page.evaluate(() => document.querySelector('header details > div').getBoundingClientRect().bottom);
        assert.ok(panelBottom < vh - 40, 'painel do menu ocupa a tela toda');
        await page.mouse.click(10, vh - 20);
        assert.strictEqual(await page.evaluate(() => document.querySelector('header details').open), false);
      });
      await check('menu fecha ao passar para layout desktop', async () => {
        await page.locator('header summary').click();
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.waitForTimeout(100);
        assert.strictEqual(await page.evaluate(() => document.querySelector('header details').open), false);
        await page.setViewportSize({ width, height: 740 });
      });
    }

    await ctx.close();
  }

  // ---------- 2. Âncoras por URL completa ----------
  console.log('\n[âncoras por URL]');
  for (const width of [375, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 740 : 900 } });
    const page = await ctx.newPage();
    watchErrors(page, errors);
    for (const id of SECTIONS) {
      await check(`${width}px ${BASE}#${id}`, async () => {
        await page.goto(`${BASE}#${id}`, { waitUntil: 'networkidle' });
        await waitScrollEnd(page);
        const r = await headingVisibleBelowHeader(page, id);
        assert.ok(r.ok, JSON.stringify(r));
        const opacity = await page.evaluate((sid) => getComputedStyle(document.getElementById(sid).querySelector('h1, h2')).opacity, id);
        assert.strictEqual(opacity, '1');
      });
    }
    await ctx.close();
  }

  // ---------- 3. Modal ----------
  console.log('\n[modal de detalhes]');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    watchErrors(page, errors);
    await page.goto(BASE, { waitUntil: 'networkidle' });

    for (const [index, family] of FAMILIES.entries()) {
      await check(`teclado: Enter em "Saiba mais" abre ${family}, foco no fechar, Escape devolve foco`, async () => {
        const trigger = page.locator('#solucoes article').nth(index).getByRole('button', { name: /Saiba mais/ });
        await trigger.focus();
        await page.keyboard.press('Enter');
        await page.waitForSelector('dialog.solution-dialog[open]');
        const title = await page.locator('#solution-modal-title').textContent();
        assert.strictEqual(title, family);
        const focused = await page.evaluate(() => document.activeElement.getAttribute('aria-label'));
        assert.strictEqual(focused, 'Fechar detalhes da solução');
        const wa = await page.locator('dialog a[href*="wa.me"]').getAttribute('href');
        assert.ok(decodeURIComponent(wa).includes(family), 'WhatsApp do modal sem a família');
        const mail = await page.locator('dialog a[href^="mailto:"]').getAttribute('href');
        assert.ok(mail.startsWith(`mailto:${EMAIL}?`) && decodeURIComponent(mail).includes(family));
        await page.keyboard.press('Escape');
        await page.waitForSelector('dialog.solution-dialog:not([open])', { state: 'attached' });
        const back = await page.evaluate(() => document.activeElement.textContent.trim());
        assert.ok(back.startsWith('Saiba mais'), `foco voltou para "${back}"`);
        assert.ok(back.includes(family));
      });
    }

    await check('Tab e Shift+Tab ficam presos no modal (ciclo completo)', async () => {
      await page.locator('#solucoes article').first().getByRole('button', { name: /Saiba mais/ }).click();
      await page.waitForSelector('dialog.solution-dialog[open]');
      const count = await page.evaluate(() => [...document.querySelectorAll('dialog.solution-dialog a[href], dialog.solution-dialog button')].length);
      for (let i = 0; i < count + 2; i++) {
        await page.keyboard.press('Tab');
        assert.ok(await focusInsideDialog(page), `foco saiu do modal no Tab ${i + 1}`);
      }
      await page.locator('dialog [aria-label="Fechar detalhes da solução"]').focus();
      await page.keyboard.press('Shift+Tab');
      const last = await page.evaluate(() => document.activeElement.textContent.trim());
      assert.strictEqual(last, 'Voltar às soluções');
      await page.keyboard.press('Tab');
      const first = await page.evaluate(() => document.activeElement.getAttribute('aria-label'));
      assert.strictEqual(first, 'Fechar detalhes da solução');
    });

    await check('rolagem da página bloqueada com o modal aberto', async () => {
      const overflow = await page.evaluate(() => getComputedStyle(document.documentElement).overflow);
      assert.strictEqual(overflow, 'hidden');
    });

    await check('clique dentro do painel não fecha; clique fora fecha', async () => {
      await page.locator('dialog .solution-dialog__panel p').first().click();
      assert.ok(await page.evaluate(() => document.querySelector('dialog.solution-dialog').open));
      await page.mouse.click(20, 450);
      await page.waitForTimeout(100);
      assert.strictEqual(await page.evaluate(() => document.querySelector('dialog.solution-dialog').open), false);
      const back = await page.evaluate(() => document.activeElement.textContent.trim());
      assert.ok(back.startsWith('Saiba mais'));
    });

    await check('"Voltar às soluções" fecha e devolve o foco', async () => {
      await page.locator('#solucoes article').nth(2).getByRole('button', { name: /Saiba mais/ }).click();
      await page.getByRole('button', { name: 'Voltar às soluções' }).click();
      assert.strictEqual(await page.evaluate(() => document.querySelector('dialog.solution-dialog').open), false);
      assert.ok((await page.evaluate(() => document.activeElement.textContent)).includes(FAMILIES[2]));
    });

    await check('troca de viewport com modal aberto (1440 → 375 → 1024×500)', async () => {
      await page.locator('#solucoes article').nth(4).getByRole('button', { name: /Saiba mais/ }).click();
      for (const vp of [{ width: 375, height: 740 }, { width: 1024, height: 500 }]) {
        await page.setViewportSize(vp);
        await page.waitForTimeout(250);
        const box = await page.locator('dialog .solution-dialog__panel').boundingBox();
        assert.ok(box.y >= -1 && box.y + box.height <= vp.height + 1, `painel fora da tela em ${vp.width}x${vp.height}: ${JSON.stringify(box)}`);
        assert.ok(box.x >= -1 && box.x + box.width <= vp.width + 1);
        for (const name of ['Fechar detalhes da solução', 'Voltar às soluções']) {
          const b = await page.getByRole('button', { name }).boundingBox();
          assert.ok(b && b.y >= 0 && b.y + b.height <= vp.height, `${name} invisível em ${vp.width}x${vp.height}`);
        }
        await page.screenshot({ path: `${SHOTS}/modal-${vp.width}x${vp.height}.png` });
      }
      const scrolls = await page.evaluate(() => {
        const body = document.querySelector('dialog .overflow-y-auto');
        return body.scrollHeight > body.clientHeight;
      });
      assert.ok(scrolls, 'em 1024x500 o conteúdo do modal deveria rolar internamente');
      await page.keyboard.press('Escape');
    });
    await ctx.close();
  }

  // ---------- 4. Links de contato ----------
  console.log('\n[links]');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    watchErrors(page, errors);
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), target: a.target, rel: a.rel, text: a.textContent.trim() })));

    await check('todo link wa.me usa 5511999015519 e abre em nova aba com rel', async () => {
      const wa = links.filter((l) => l.href.includes('wa.me'));
      assert.ok(wa.length >= 9, `só ${wa.length} links de WhatsApp`);
      for (const l of wa) {
        assert.ok(l.href.startsWith(`https://wa.me/${WA}?text=`), l.href);
        assert.strictEqual(l.target, '_blank');
        assert.ok(l.rel.includes('noreferrer'));
      }
    });
    await check('cada card tem WhatsApp contextual com a família', async () => {
      for (const [i, family] of FAMILIES.entries()) {
        const href = await page.locator('#solucoes article').nth(i).locator('a[href*="wa.me"]').getAttribute('href');
        assert.ok(decodeURIComponent(href).includes(`soluções de ${family} da Sinal Digital`), href);
      }
    });
    await check('todo mailto aponta para decio@sinaldig.com.br', async () => {
      const mails = links.filter((l) => l.href.startsWith('mailto:'));
      assert.ok(mails.length >= 3);
      for (const l of mails) assert.ok(l.href.startsWith(`mailto:${EMAIL}`), l.href);
    });
    await check('CTAs do hero e contato presentes', async () => {
      for (const text of ['Consultar soluções', 'Falar com um consultor', 'Entrar em contato pelo WhatsApp', 'Entrar em contato por e-mail']) {
        assert.ok(links.some((l) => l.text.startsWith(text)), text);
      }
      assert.ok(links.find((l) => l.text.startsWith('Consultar soluções')).href === '#solucoes');
    });
    await check('âncoras internas apontam para ids existentes', async () => {
      const ids = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1)).filter((id) => !document.getElementById(id)));
      assert.deepStrictEqual(ids, []);
    });
    await check('telefone e e-mail exibidos no contato', async () => {
      const text = await page.locator('#contato').textContent();
      assert.ok(text.includes('(11) 99901-5519') && text.includes(EMAIL) && text.includes('Décio Câmara') && text.includes('Diretor Comercial'));
    });
    await page.close();
  }

  // ---------- 5. Formulário de mailing ----------
  console.log('\n[mailing]');
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 740 }, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await ctx.newPage();
    watchErrors(page, errors);
    await page.goto(`${BASE}#contato`, { waitUntil: 'networkidle' });
    const client = await ctx.newCDPSession(page);
    await client.send('Page.enable');
    const navs = [];
    client.on('Page.frameRequestedNavigation', (e) => navs.push(e.url));
    const form = page.locator('#contato form');

    await check('seis campos e opções derivadas do catálogo', async () => {
      assert.strictEqual(await form.locator('input, select, textarea').count(), 6);
      const options = await form.locator('select option').allTextContents();
      assert.deepStrictEqual(options, ['Ainda não sei / quero orientação', ...FAMILIES]);
      assert.strictEqual(await form.locator('select').inputValue(), 'Ainda não sei / quero orientação');
      assert.strictEqual(await form.locator('input[name="whatsapp"]').getAttribute('type'), 'tel');
      assert.strictEqual(await form.locator('input[name="email"]').getAttribute('autocomplete'), 'email');
    });
    await check('envio vazio bloqueia, mostra erros e foca o primeiro campo', async () => {
      await form.getByRole('button', { name: 'Entrar no mailing' }).click();
      assert.strictEqual(navs.length, 0, 'não deveria abrir e-mail');
      assert.strictEqual(await form.locator('[aria-invalid="true"]').count(), 4);
      assert.strictEqual(await page.evaluate(() => document.activeElement.name), 'name');
      assert.ok((await form.textContent()).includes('Informe seu nome.'));
      const described = await form.locator('input[name="name"]').getAttribute('aria-describedby');
      assert.ok(described && (await page.locator(`[id="${described}"]`).textContent()).includes('Informe seu nome.'));
    });
    await check('e-mail e WhatsApp inválidos bloqueiam o envio', async () => {
      await form.locator('input[name="name"]').fill('Joana Conceição');
      await form.locator('input[name="company"]').fill('Ação & Cia Ltda.');
      await form.locator('input[name="email"]').fill('joana@empresa');
      await form.locator('input[name="whatsapp"]').fill('1234');
      await form.getByRole('button', { name: 'Entrar no mailing' }).click();
      assert.strictEqual(navs.length, 0);
      const text = await form.textContent();
      assert.ok(text.includes('Informe um e-mail válido') && text.includes('Informe um número com DDD'));
      assert.strictEqual(await page.evaluate(() => document.activeElement.name), 'email');
    });
    await check('dados válidos abrem rascunho com acentos e quebras de linha', async () => {
      await form.locator('input[name="email"]').fill('joana.teste@exemplo.com.br');
      await form.locator('input[name="whatsapp"]').fill('(11) 98888-7777');
      await form.locator('select').selectOption('Ar Condicionado');
      await form.locator('textarea').fill('Precisamos climatizar 3 salas técnicas.\nPrazo: março & abril — orçamento em análise.');
      await form.getByRole('button', { name: 'Entrar no mailing' }).click();
      await page.waitForTimeout(300);
      assert.strictEqual(navs.length, 1, `navegações: ${navs.length}`);
      const url = navs[0];
      assert.ok(url.startsWith(`mailto:${EMAIL}?subject=`), url);
      const params = new URLSearchParams(url.split('?')[1]);
      assert.strictEqual(params.get('subject'), 'Cadastro de interesse - Sinal Digital');
      const body = params.get('body');
      for (const piece of ['Nome: Joana Conceição', 'Empresa: Ação & Cia Ltda.', 'E-mail: joana.teste@exemplo.com.br', 'WhatsApp: (11) 98888-7777', 'Solução de interesse: Ar Condicionado', 'Precisamos climatizar 3 salas técnicas.\nPrazo: março & abril — orçamento em análise.']) {
        assert.ok(body.includes(piece), `corpo sem "${piece}"`);
      }
      assert.ok(!url.includes('+'), 'espaços não devem virar "+" no mailto');
      const status = await page.locator('#contato [role="status"]').textContent();
      assert.ok(status.includes('Falta um passo: enviar o e-mail.'));
      await page.screenshot({ path: `${SHOTS}/form-sent-375.png`, fullPage: false });
    });
    await check('"Copiar mensagem" copia destinatário, assunto e corpo', async () => {
      await page.getByRole('button', { name: 'Copiar mensagem' }).click();
      await page.getByRole('button', { name: 'Mensagem copiada' }).waitFor();
      const clip = await page.evaluate(() => navigator.clipboard.readText());
      assert.ok(clip.startsWith(`Para: ${EMAIL}\nAssunto: Cadastro de interesse - Sinal Digital`) && clip.includes('Joana Conceição'));
    });
    await ctx.close();
  }

  // ---------- 6. Sem JavaScript / movimento reduzido ----------
  console.log('\n[sem JavaScript e movimento reduzido]');
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 740 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#contato`);
    await waitScrollEnd(page);
    await check('sem JS: H1, seis cards, etapas e contato no HTML', async () => {
      assert.strictEqual(await page.locator('h1').count(), 1);
      assert.strictEqual(await page.locator('#solucoes article').count(), 6);
      assert.strictEqual(await page.locator('#processo li').count(), 4);
      assert.ok((await page.locator('#contato').textContent()).includes(EMAIL));
    });
    await check('sem JS: seção de contato visível ao abrir #contato', async () => {
      const r = await headingVisibleBelowHeader(page, 'contato');
      assert.ok(r.ok, JSON.stringify(r));
      const op = await page.evaluate(() => getComputedStyle(document.querySelector('#contato .reveal')).opacity);
      assert.strictEqual(op, '1');
    });
    await check('sem JS: menu mobile abre (details nativo)', async () => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.locator('header summary').click();
      assert.ok(await page.locator('header details nav a[href="#processo"]').isVisible());
    });
    await ctx.close();

    const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const p2 = await rm.newPage();
    await p2.goto(BASE, { waitUntil: 'networkidle' });
    await check('movimento reduzido: nenhuma animação de revelação', async () => {
      const names = await p2.evaluate(() => [...document.querySelectorAll('.reveal')].map((el) => getComputedStyle(el).animationName));
      assert.ok(names.length >= 20 && names.every((n) => n === 'none'), names.join(','));
    });
    await rm.close();

    const mo = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p3 = await mo.newPage();
    await p3.goto(BASE, { waitUntil: 'networkidle' });
    await check('movimento permitido: revelação guiada por rolagem ativa e conteúdo visível ao chegar', async () => {
      const name = await p3.evaluate(() => getComputedStyle(document.querySelector('.reveal')).animationName);
      assert.strictEqual(name, 'reveal-in');
      await p3.locator('#processo').scrollIntoViewIfNeeded();
      await p3.evaluate(() => document.getElementById('processo').scrollIntoView());
      await p3.waitForTimeout(300);
      const op = await p3.evaluate(() => getComputedStyle(document.querySelector('#processo li')).opacity);
      assert.ok(Number(op) > 0.95, `opacidade ${op}`);
    });
    await mo.close();
  }

  // ---------- 7. Escopo de rotas ----------
  console.log('\n[escopo de rotas]');
  {
    const page = await browser.newPage();
    for (const route of ['/learn', '/chat', '/news-lab', '/speaking', '/dictionary', '/review']) {
      await check(`${route} → 404 com página em português`, async () => {
        const res = await page.goto(new URL(route, BASE).href);
        assert.strictEqual(res.status(), 404);
        assert.ok((await page.textContent('h1')).includes('Página não encontrada'));
      });
    }
    await check('/api/teacher (POST) → 404 sem chamar IA', async () => {
      const res = await page.request.post(new URL('/api/teacher', BASE).href, { data: { messages: [{ role: 'user', content: 'teste' }] } });
      assert.strictEqual(res.status(), 404);
    });
    await page.close();
  }

  await check('nenhum erro de console ou de página durante os testes', async () => {
    const relevant = errors.filter((e) => !e.includes('404'));
    assert.deepStrictEqual(relevant, []);
  });

  await browser.close();
  console.log(`\n${passed} verificações ok, ${failures.length} falhas. Capturas em ${SHOTS}`);
  if (failures.length) {
    console.log(failures.map((f) => ` - ${f}`).join('\n'));
    process.exit(1);
  }
})();
