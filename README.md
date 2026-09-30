# Entre · universidade & escola

Plataforma independente para a segunda etapa do Projeto de Extensão 2026, desenvolvido por sete estudantes de Engenharia Civil da Universidade FUMEC. Tema: construção sustentável e educação ambiental em escolas.

**Site:** https://fumec-sustentabilidade.vercel.app  
**Código:** https://github.com/guilhermemzs/fumec-sustentabilidade

O repositório anterior `guilhermemzs/fumec` foi preservado. Esta iniciativa estudantil não é um site institucional oficial da Universidade.

## Arquitetura

Next.js 16.3.8, React 19.3, TypeScript strict, App Router, Drizzle ORM e PostgreSQL/Neon. Conteúdo educativo pré-renderizado; escolas, equipe e impacto usam revalidação de 60 segundos. Contato e administração são dinâmicos. Componentes de cliente estão restritos a menu, filtros, mapa, formulários, quiz e checklist.

Neon é acessado somente no servidor. Vercel hospeda o aplicativo na região `gru1`; o banco foi criado no plano gratuito, também em São Paulo, por meio do Marketplace. Variáveis de conexão foram injetadas pela integração. GitHub contém código e workflow de lint, typecheck, testes unitários e build.

## Páginas e funcionalidades

- `/`: narrativa, ilustração técnica original e contexto da mobilização.
- `/projeto`: objetivos, metodologia e identidade estudantil.
- `/sustentabilidade`: 11 módulos com conceitos, perguntas e atividades orientadas.
- `/sustentabilidade/[slug]`: páginas educativas pré-renderizadas.
- `/sustentabilidade/checklist`: nove temas, resultado educativo e impressão; respostas ficam na memória da página.
- `/sustentabilidade/quiz`: quatro perguntas com explicações; sem envio de respostas.
- `/escolas`: pesquisa e filtros de estado; mapa Leaflet/OpenStreetMap ativado pelo visitante.
- `/impacto`: mobilização, cadastros, alinhamentos e participações após atividades concluídas.
- `/casa-da-terra`: síntese de referência externa da UNIFEI, explicitamente distinta do trabalho do grupo.
- `/materiais`: cartilha de 14 páginas e checklist de duas páginas, mais arquivos publicados na gestão.
- `/equipe`: estrutura para publicar integrantes autorizados; não contém nomes inventados.
- `/contato`: consentimento, validação, armazenamento privado e proteção contra abuso.
- `/privacidade`: finalidades, fornecedores, gestão de dados e cuidados com menores.
- `/admin`: escolas, coordenadas, estados, contatos institucionais como eventos, atividades e alcance agregado, materiais, integrantes, mensagens e feedbacks.
- `/avaliacao/[id]`: feedback anônimo para atividades realizadas de escolas visíveis.

SEO inclui titles, descriptions, canonical, Open Graph gerado, sitemap, robots, ícone e manifest. Fontes são baixadas no build pelo `next/font` e servidas pela aplicação. Analytics e Speed Insights são ativados em Vercel. Há estados vazios, loading, erro e página 404.

## Banco e migrations

12 tabelas: `schools`, `school_engagements`, `contact_events`, `classes`, `activities`, `impact_metrics`, `educational_materials`, `feedback`, `contact_submissions`, `team_members`, `site_content`, `rate_limits`.

Há chaves estrangeiras, estados enumerados, índices e constraints para coordenadas, notas, quantidades não negativas, anonimato e data de conclusão. Migrations versionadas em `drizzle/`: `0000_strong_starhawk.sql` e `0001_silky_terror.sql` (registro separado da data de consentimento).

O seed idempotente cadastra **39 instituições fornecidas no prompt**, incluindo **três frentes em alinhamento**, e uma estimativa de 200 contatos, marcada como não verificada. Ele não importa Gmail, contatos pessoais, números de telefone, e-mails de responsáveis, estudantes ou resultados de atividades. As 39 instituições são um recorte dos retornos, não a totalidade da mobilização. Coordenadas ficam nulas. Os municípios são omitidos quando não foram confirmados no contexto.

O identificador institucional inicial deriva do nome normalizado. Confira registros antes de adicionar escolas: nomes distintos ou abreviações podem se referir à mesma instituição. A deduplicação formal da campanha permanece pendente. Eventos de contato pertencem ao cadastro único da instituição e permitem consultas exatas após importação validada. O número 204 é uma contagem de mensagens, nunca utilizado como quantidade de escolas.

Atividades só entram no alcance após serem marcadas como realizadas. O alcance representa **participações**, sem deduplicação de pessoas entre encontros. Campos vazios significam não informado, e não zero. Não há nomes de estudantes no banco. As tabelas `classes` e `site_content` estão preparadas para gestão detalhada futura; atualmente o painel registra turmas como quantidades agregadas. A estimativa da campanha é mantida separadamente dos cadastros atuais.

## Desenvolvimento

```sh
npm ci
cp .env.example .env.local
# Configure o Neon no ambiente local sem versionar valores.
npm run db:migrate
npm run db:seed
npm run admin:setup
npm run dev
```

Variáveis: `DATABASE_URL` (pooled), `DATABASE_URL_UNPOOLED` (direta para migrations), `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `RATE_LIMIT_SECRET`. Nunca use prefixo `NEXT_PUBLIC_` para segredos.

`admin:setup` gera senha forte, hash scrypt e segredos de sessão/limitação. A senha é salva em `admin-access.txt`, ignorado pelo Git. Guarde-a em um gerenciador de senhas. O script não substitui credenciais existentes. `scripts/sync-vercel-env.ts` envia apenas as variáveis administrativas e o endereço público à Vercel usando a CLI já autenticada; não imprime valores.

Não execute `vercel env pull` sobre `.env.local` sem preservar configurações administrativas locais, pois ele pode sobrescrever o arquivo. Não compartilhe capturas ou arquivos da área administrativa contendo mensagens pessoais.

## Segurança e manutenção

Login exige senha scrypt e cria JWT HS256 com audiência/emissor, expiração de oito horas e cookie HttpOnly/Secure/SameSite Strict. Todas as Server Actions verificam a sessão. APIs verificam origem, tamanho e schema Zod. Limites de envio e tentativas são atômicos e persistidos no banco; a chave usa HMAC do endereço de conexão, sem armazená-lo bruto. O mapa utiliza `textContent` nos popups. Arquivos externos devem usar HTTPS.

O painel permite excluir mensagens mediante confirmação do responsável. O grupo deve acompanhar pedidos de acesso, correção e exclusão, revisar retenção, limpar contadores expirados e revisar arquivos publicados. Os feedbacks não são publicados automaticamente. Não inclua dados pessoais no texto público, nas avaliações ou nos materiais.

O recebimento não envia e-mail automaticamente: as mensagens ficam na gestão para resposta pelo grupo. Não foi configurado um serviço de envio que dependeria de domínio/remetente autorizado. A autenticação usa um acesso compartilhado da equipe; contas individuais podem ser adicionadas futuramente.

## Verificação

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
# Com banco e senha locais configurados e servidor iniciado:
npx tsx scripts/integration-smoke.ts
```

Os testes de navegador verificam páginas, responsividade, filtros, quiz, checklist, controle de acesso, 404, validação das APIs, PDFs reais e acessibilidade com axe (WCAG A/AA). O teste de integração usa dados sintéticos identificados como descartáveis, verifica contato, sessão, feedback e constraints e remove somente seus próprios registros. Não representa uma certificação integral WCAG nem auditoria de segurança independente.

Para testar uma publicação: defina `TEST_BASE_URL` com o domínio. O teste de integração necessita conexão ao mesmo banco e arquivo local de acesso. `scripts/capture-qa.ts` gera capturas em `work/qa` fora do repositório para revisão visual. PDFs foram reabertos, extraídos, renderizados e revisados visualmente.

## Pendências de conteúdo

- Confirmar nomes e funções dos sete integrantes e autorizações de publicação.
- Fornecer documento acadêmico original da Casa da Terra e referência bibliográfica completa.
- Fornecer apresentações e registros originais do grupo, sem placeholders.
- Validar coordenadas, municípios e deduplicação completa da campanha.
- Registrar datas confirmadas, atividades realizadas, participações e resultados reais.
- Revisar academicamente a cartilha antes de utilizá-la como material oficial do grupo.

Nenhuma parceria, foto identificável de menor ou resultado futuro foi inventado para preencher o site.
