import { chromium, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
async function main() {
  const browser = await chromium.launch();
  await mkdir('../../work/qa', { recursive: true });
  for (const mode of ['desktop', 'mobile']) {
    const { defaultBrowserType, ...phone } = devices['iPhone 13'];
    void defaultBrowserType;
    const context = await browser.newContext(
      mode === 'desktop' ? { viewport: { width: 1440, height: 1000 } } : phone,
    );
    const page = await context.newPage();
    await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000', {
      waitUntil: 'networkidle',
    });
    await page.screenshot({ path: '../../work/qa/home-' + mode + '.png', fullPage: true });
    await page.screenshot({ path: '../../work/qa/hero-' + mode + '.png' });
    await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3000') + '/equipe', {
      waitUntil: 'networkidle',
    });
    await page.screenshot({ path: '../../work/qa/equipe-' + mode + '.png', fullPage: true });
    await page
      .locator('.team-portraits')
      .screenshot({ path: '../../work/qa/retratos-' + mode + '.png' });
    await page
      .locator('.portrait-pair')
      .screenshot({ path: '../../work/qa/novos-retratos-' + mode + '.png' });
    for (const route of ['impacto', 'materiais', 'escolas']) {
      await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3000') + '/' + route, {
        waitUntil: 'networkidle',
      });
      await page.screenshot({
        path: '../../work/qa/' + route + '-' + mode + '.png',
        fullPage: true,
      });
      if (route === 'escolas') {
        await page.getByRole('button', { name: 'Explorar o mapa' }).click();
        await page.locator('.leaflet-tile-loaded').first().waitFor();
        await page
          .locator('.map-frame')
          .screenshot({ path: '../../work/qa/mapa-' + mode + '.png' });
      }
    }
    await context.close();
  }
  await browser.close();
  console.log('Capturas de desktop e mobile salvas em work/qa.');
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
