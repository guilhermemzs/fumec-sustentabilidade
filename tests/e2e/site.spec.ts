import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('páginas públicas, conteúdo e ausência de overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of [
    '/',
    '/projeto',
    '/sustentabilidade',
    '/escolas',
    '/impacto',
    '/materiais',
    '/equipe',
    '/contato',
    '/privacidade',
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test('diretório filtra sem transformar interesse em realização', async ({ page }) => {
  await page.goto('/escolas');
  await page.getByRole('searchbox', { name: 'Buscar instituição' }).fill('Minervina');
  await expect(page.locator('.school-row')).toHaveCount(1);
  await expect(page.locator('.school-row')).toContainText('Em alinhamento');
  await page.getByRole('searchbox').fill('Nenhuma escola com este nome');
  await expect(page.getByText('Nenhuma instituição corresponde aos filtros.')).toBeVisible();
});
test('ECMA publica os retratos na ordem informada e preserva os estados do levantamento', async ({
  page,
}) => {
  await page.goto('/equipe');
  await expect(
    page.getByRole('link', { name: 'ECMA: Entre Construção e Meio Ambiente — início' }),
  ).toBeVisible();
  await expect(page.locator('.member-portrait h3')).toHaveText([
    'Guilherme Menezes',
    'Bernardo Lopes',
    'Luis Ladeira',
  ]);
  await expect(page.locator('.member-portrait img')).toHaveCount(3);
  expect(
    await page
      .locator('.member-portrait img')
      .evaluateAll((images) =>
        images.every(
          (image) =>
            (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBe(true);
  await expect(page.locator('.team-names article')).toHaveCount(4);
  await page.goto('/escolas');
  await expect(page.locator('.school-row')).toHaveCount(62);
  await page.getByRole('searchbox').fill('Maria Modesta');
  await expect(page.locator('.school-row')).toContainText('Reunião realizada');
  await expect(page.locator('.school-row')).toContainText(
    'Rua Doutor Júlio Otaviano Ferreira, 1085',
  );
  await page.getByRole('searchbox').fill('Cidade Nova');
  await expect(page.locator('.school-row')).toHaveCount(1);
  await page.getByRole('searchbox').fill('');
  await page.getByLabel('Etapa do diálogo').selectOption('em_alinhamento');
  await expect(page.locator('.school-row')).toHaveCount(3);
});
test('checklist calcula observações e pode recomeçar', async ({ page }) => {
  await page.goto('/sustentabilidade/checklist');
  await page.locator('.checklist-item select').first().selectOption('sim');
  await page.locator('.checklist-item select').nth(1).selectOption('nao');
  await expect(page.locator('.result-panel')).toContainText('2 de 9 temas respondidos');
  await expect(page.locator('.result-panel')).toContainText('Ventilação');
  await page.getByRole('button', { name: 'Recomeçar' }).click();
  await expect(page.locator('.result-panel')).toContainText('0 de 9');
});
test('quiz mostra explicações e resultado', async ({ page }) => {
  await page.goto('/sustentabilidade/quiz');
  for (const answer of [1, 2, 0, 1]) {
    await page.locator('.quiz-option').nth(answer).click();
    await page.getByRole('button', { name: 'Conferir resposta' }).click();
    await expect(page.getByRole('status')).toContainText('Isso mesmo');
    await page.getByRole('button', { name: 'Continuar' }).click();
  }
  await expect(page.locator('.result-panel')).toContainText('4 de 4');
});
test('admin redireciona acesso anônimo e inexistente retorna 404', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login/);
  const r = await page.goto('/pagina-inexistente');
  expect(r?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Vamos encontrar outra entrada?' })).toBeVisible();
});
test('APIs rejeitam origem externa e dados inválidos', async ({ request, baseURL }) => {
  const external = await request.post('/api/contact', {
    headers: { Origin: 'https://invalid.example' },
    data: {},
  });
  expect(external.status()).toBe(403);
  const invalid = await request.post('/api/contact', {
    headers: { Origin: baseURL! },
    data: { email: 'bad' },
  });
  expect(invalid.status()).toBe(400);
  const feedback = await request.post('/api/feedback', {
    headers: { Origin: baseURL! },
    data: { activityId: 'invalid', rating: 9, response: '' },
  });
  expect(feedback.status()).toBe(400);
});
test('acessibilidade básica em início, escolas, contato e checklist', async ({ page }) => {
  for (const route of ['/', '/equipe', '/escolas', '/contato', '/sustentabilidade/checklist']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
test('materiais reais e metadados de publicação', async ({ request }) => {
  for (const file of ['/materiais/apresentacao-construcao-sustentavel-2026.pdf']) {
    const r = await request.get(file);
    expect(r.status()).toBe(200);
    expect((await r.body()).subarray(0, 4).toString()).toBe('%PDF');
  }
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('/sustentabilidade/agua-da-chuva');
  expect(await sitemap.text()).not.toContain('/casa-da-terra');
  for (const hidden of ['/casa-da-terra', '/materiais/cartilha.pdf', '/materiais/checklist.pdf']) {
    expect((await request.get(hidden)).status()).toBe(404);
  }
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Disallow: /admin');
});
test('menu navega para o projeto em desktop e celular', async ({ page }, info) => {
  await page.goto('/');
  if (info.project.name === 'mobile')
    await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'O projeto', exact: true })
    .click();
  await expect(page).toHaveURL(/\/projeto$/);
  await expect(page.locator('h1')).toContainText('Construção sustentável');
});
test('localizações ausentes são ocultadas e endereços reais continuam consultáveis', async ({
  page,
}) => {
  await page.goto('/escolas');
  await expect(page.getByRole('button', { name: 'Explorar o mapa' })).toHaveCount(0);
  await expect(page.locator('.map-frame')).toHaveCount(0);
  await expect(page.locator('.school-row a')).toHaveCount(62);
  await expect(page.locator('.school-row a').first()).toHaveAttribute(
    'href',
    /openstreetmap.org\/search\?query=/,
  );
});

test('conteúdo público oculta notas internas, estimativas e resultados ausentes', async ({
  page,
}) => {
  for (const route of [
    '/',
    '/projeto',
    '/escolas',
    '/impacto',
    '/materiais',
    '/equipe',
    '/sustentabilidade/residuo-material',
  ]) {
    const response = await page.goto(route);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(
      /GPT|gerad[oa] por IA|a registrar|a validar|falta completar|dado estimado|~200|204 mensagens|Casa da Terra|UNIFEI|Acervo em construção|aguardam atualização|serão adicionados|Manter neste status|Frente prioritária|possibilidade futura/i,
    );
    expect(await response!.text()).not.toContain('Manter neste status');
    await expect(page.getByRole('link', { name: 'Casa da Terra' })).toHaveCount(0);
  }
  await page.goto('/impacto');
  await expect(page.locator('.metric')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'Atividades realizadas' })).toHaveCount(0);
  await expect(page.getByText('Participações de estudantes', { exact: true })).toHaveCount(0);
  await page.goto('/escolas');
  await expect(page.getByRole('option', { name: 'Possibilidade futura', exact: true })).toHaveCount(
    0,
  );
  await page.getByLabel('Etapa do diálogo').selectOption('respondeu');
  await expect(page.locator('.school-row')).toHaveCount(37);
});
