import { config } from 'dotenv';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
config({ path: '.env.local', quiet: true });
const cli = join(process.env.APPDATA!, 'npm', 'node_modules', 'vercel', 'dist', 'index.js');
for (const key of [
  'ADMIN_PASSWORD_HASH',
  'SESSION_SECRET',
  'RATE_LIMIT_SECRET',
  'NEXT_PUBLIC_SITE_URL',
]) {
  const value = process.env[key];
  if (!value) throw new Error('Configuração ausente: ' + key);
  for (const environment of ['production', 'preview']) {
    const result = spawnSync(
      process.execPath,
      [cli, 'env', 'add', key, environment, '--force', '--yes'],
      { input: value + '\n', encoding: 'utf8', cwd: process.cwd() },
    );
    if (result.status !== 0) {
      console.error('Não foi possível configurar ' + key + ' em ' + environment);
      process.exit(1);
    }
    console.log(key + ' configurada em ' + environment + ' (valor omitido).');
  }
}
