# ECMA · Entre Construção e Meio Ambiente

Plataforma independente para a segunda etapa do Projeto de Extensão 2026, desenvolvido por sete estudantes de Engenharia Civil da Universidade FUMEC. Tema: construção sustentável e educação ambiental em escolas.

**Site:** https://fumec-sustentabilidade.vercel.app  
**Código:** https://github.com/guilhermemzs/fumec-sustentabilidade

O repositório anterior `guilhermemzs/fumec` foi preservado. Esta iniciativa estudantil não é um site institucional oficial da Universidade.

## Arquitetura

Next.js 16.3.8, React 19.3, TypeScript strict, App Router, Drizzle ORM e PostgreSQL/Neon. Conteúdo educativo pré-renderizado; escolas, equipe e impacto usam revalidação de 60 segundos. Contato e administração são dinâmicos. Componentes de cliente estão restritos a menu, filtros, mapa, formulários, quiz e checklist.

Neon é acessado somente no servidor. Vercel hospeda o aplicativo na região `gru1`; o banco foi criado no plano gratuito, também em São Paulo, por meio do Marketplace. Variáveis de conexão foram injetadas pela integração. GitHub contém código e workflow de lint, typecheck, testes unitários e build.

## Páginas e funcionalidades

- `/`: apresentação da ECMA, ilustração educativa, equipe e mobilização documentada.
- `/projeto`: objetivos, temas da apresentação original e identidade estudantil.
- `/sustentabilidade`: 11 módulos com conceitos, perguntas e atividades orientadas.
- `/sustentabilidade/[slug]`: páginas educativas pré-renderizadas.
- `/sustentabilidade/checklist`: nove temas, resultado educativo e impressão; respostas ficam na memória da página.
- `/sustentabilidade/quiz`: quatro perguntas com explicações; sem envio de respostas.
- `/escolas`: pesquisa e filtros de contato; endereços documentados e links OpenStreetMap. O mapa mostra Belo Horizonte com um raio de visualização de 5 km quando não há coordenadas de escolas; só usa marcadores individuais para coordenadas cadastradas.
- `/impacto`: mobilização, cadastros, alinhamentos e participações após atividades concluídas.
- `/materiais`: apresentação original do grupo (nove páginas), mais arquivos explicitamente publicados na gestão.
- `/equipe`: sete nomes provenientes do material fornecido; retratos de Guilherme Menezes, Bernardo Lopes e Luis Ladeira na foto original, e fotos individuais de Frederico Maders e Caio Augusto. Enquadramento por CSS, preservando as imagens; Frederico fica à esquerda e Caio à direita na nova linha. Os cinco aparecem também na página inicial.
- `/contato`: consentimento, validação, armazenamento privado e proteção contra abuso.
- `/privacidade`: finalidades, fornecedores, gestão de dados e cuidados com menores.
- `/admin`: escolas, coordenadas, estados, contatos institucionais como eventos, atividades e alcance agregado, materiais, integrantes, mensagens e feedbacks.
- `/avaliacao/[id]`: feedback anônimo para atividades realizadas de escolas visíveis.

SEO inclui titles, descriptions, canonical, Open Graph gerado, sitemap, robots, ícone e manifest. Fontes são baixadas no build pelo `next/font` e servidas pela aplicação. Analytics e Speed Insights são ativados em Vercel. Há estados vazios, loading, erro e página 404.

## Banco e migrations

12 tabelas: `schools`, `school_engagements`, `contact_events`, `classes`, `activities`, `impact_metrics`, `educational_materials`, `feedback`, `contact_submissions`, `team_members`, `site_content`, `rate_limits`.

Há chaves estrangeiras, estados enumerados, índices e constraints para coordenadas, notas, quantidades não negativas, anonimato e data de conclusão. Migrations versionadas em `drizzle/`: `0000_strong_starhawk.sql`, `0001_silky_terror.sql` (data de consentimento) e `0002_nostalgic_randall_flagg.sql` (endereço, UF, CEP e data do levantamento).

O levantamento de **30/09/2026** substitui o recorte inicial: **62 escolas com resposta**, 18 interessadas, 32 possibilidades futuras, cinco com retorno inicial, três em alinhamento, três indisponíveis neste ciclo e uma com reunião realizada. CSV e aba Escolas do XLSX foram comparados campo a campo (62 registros iguais; a planilha possui uma coluna adicional de origem). A fonte do levantamento está em `src/data/school-survey.json`, sem contatos pessoais. Sua leitura fica em `src/lib/survey.ts`, fora dos componentes de cliente. A projeção pública elimina notas de acompanhamento e prioridades internas. Endereços, bairros, município, UF e CEP disponíveis foram importados. Coordenadas continuam nulas; cada cartão permite consultar o endereço no OpenStreetMap.

A reunião da Maria Modesta Cravo está registrada em 30/09/2026 às 12h40, com fuso de São Paulo. Isso não significa atividade confirmada ou alcance realizado. A estimativa de aproximadamente 200 escolas contatadas não é publicada. Nenhum conteúdo de caixa de e-mail, telefone ou contato pessoal foi importado.

O seed é idempotente para novas instalações. Para atualizar a base antiga: `npm run db:migrate`, `npm run db:import-survey` (prévia) e `npm run db:import-survey -- --apply`. A importação cria backup local de escolas, estados e integrantes em `work/backups` fora do repositório, aplica as alterações em transação, preserva coordenadas e não repete um snapshot já aplicado. Não exclui instituições; se encontrar registros fora da fonte, exige revisão antes de importar.

O identificador institucional inicial deriva do nome normalizado. Confira registros antes de adicionar escolas: nomes distintos ou abreviações podem se referir à mesma instituição. A deduplicação formal da campanha permanece pendente. Eventos de contato pertencem ao cadastro único da instituição e permitem consultas exatas após importação validada. O número 204 é uma contagem de mensagens, nunca utilizado como quantidade de escolas.

Atividades só entram no alcance após serem marcadas como realizadas. O alcance representa **participações**, sem deduplicação de pessoas entre encontros. Campos vazios significam não informado, e não zero. Não há nomes de estudantes no banco. As tabelas `classes` e `site_content` estão preparadas para gestão detalhada futura; atualmente o painel registra turmas como quantidades agregadas. Estimativas da campanha não integram a consulta pública.

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

Para testar uma publicação: defina `TEST_BASE_URL` com o domínio. O teste de integração necessita conexão ao mesmo banco e arquivo local de acesso. `scripts/capture-qa.ts` gera capturas em `work/qa` fora do repositório para revisão visual. A apresentação original é preservada sem alteração.

## Política de publicação

A área pública omite informações ausentes, estimativas, previsões sem confirmação e avisos internos. Notas de acompanhamento permanecem na gestão e não são enviadas aos componentes de cliente. Os 32 registros classificados internamente como `possibilidade_futura` aparecem apenas como `Respondeu`; a fonte e os estados na administração são preservados.

O alcance só é mostrado para atividades realizadas com data de conclusão. Uma contagem ausente é omitida; zero é mantido quando foi explicitamente informado em uma atividade. Interesse, alinhamento e reunião não se tornam resultados de execução.

Em 01/10/2026, a página Casa da Terra, a cartilha e o checklist em PDF foram retirados da publicação, inclusive seus links e entradas no sitemap. Os arquivos e o gerador foram preservados em `../../work/unpublished-2026-10-01/`, fora do diretório publicado. Esses endereços retornam 404. O checklist e o quiz online permanecem educativos, e os módulos incluem referências consultáveis da apresentação original, Copasa, Funasa, ProjetEEE e MME/CEPEL.

Datas e resultados novos devem ser documentados antes da publicação. Funções de integrantes, marcadores individuais sem coordenadas e arquivos adicionais ficam ocultos quando ausentes. Revisões e pendências pertencem à gestão, não às páginas públicas.

Em 01/10/2026, a pedido do usuário, o mapa regional foi reativado com círculo de 5 km como referência de navegação, sem representar alcance ou área atendida. A consulta confirmou 62 escolas públicas e nenhuma com coordenadas. `scripts/update-team-photos.ts` atualiza somente os dois integrantes identificados, preserva seus IDs, cria backup local e verifica a quantidade de membros. Execute sem `--apply` para conferir a prévia.
