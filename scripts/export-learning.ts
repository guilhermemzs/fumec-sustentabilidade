import { writeFile } from 'node:fs/promises';
import { lessons, checklistItems } from '../src/lib/learning';
writeFile(process.argv[2], JSON.stringify({ lessons, checklist: checklistItems }, null, 2)).then(
  () => console.log('Conteúdo educativo exportado.'),
);
