import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
config({ path: '.env.local', quiet: true });
async function main() { const url = process.env.DATABASE_URL_UNPOOLED; if (!url) throw new Error('Defina DATABASE_URL_UNPOOLED para executar migrations.'); await migrate(drizzle(neon(url)), { migrationsFolder: './drizzle' }); console.log('Migrations aplicadas.'); }
main().catch(() => { console.error('Migration não aplicada. Verifique a conexão direta e as credenciais.'); process.exitCode = 1; });
