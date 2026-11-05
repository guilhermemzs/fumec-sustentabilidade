type Source = {
  title: string;
  href: string;
  note: string;
};

const sources = {
  presentation: {
    title: 'Equipe ECMA. Construção Sustentável (2026)',
    href: '/materiais/apresentacao-construcao-sustentavel-2026.pdf',
    note: 'Apresentação do grupo sobre as dimensões ambiental, social e econômica da sustentabilidade, as etapas de uma obra e as práticas do cotidiano.',
  },
  education: {
    title: 'Brasil. Política Nacional de Educação Ambiental (Lei nº 9.795/1999)',
    href: 'https://legis.senado.gov.br/norma/551671',
    note: 'Fundamenta a educação ambiental como prática permanente e ajuda a situar as propostas de continuidade nas escolas.',
  },
  construction: {
    title: 'Banco do Nordeste. Guia do Meio Ambiente para o Empreendedor Urbano (2025)',
    href: 'https://www.bnb.gov.br/documents/45787/0/Guia%2Bdo%2BMeio%2BAmbiente%2Bpara%2Bo%2BEmpreendedor%2BUrbano%2B2025.pdf/a15a9667-0027-0a87-332f-1e1e9272d08b?download=true&t=1759187089762&version=1.0',
    note: 'A seção 3.2 trata do ciclo de vida de uma edificação e de escolhas para reduzir o consumo de recursos e a geração de resíduos.',
  },
  supply: {
    title: 'Copasa. Tratamento da água',
    href: 'https://www.copasa.com.br/wps/portal/internet/agua-de-qualidade/tratamento-da-agua',
    note: 'Descreve a captação nos mananciais e o tratamento antes de a água chegar à rede.',
  },
  waterUse: {
    title: 'Ministério da Integração e do Desenvolvimento Regional. Uso consciente da água',
    href: 'https://www.gov.br/mdr/pt-br/assuntos/seguranca-hidrica/projeto-sao-francisco/meio-ambiente-preservado/uso-consciente-da-agua',
    note: 'Reúne exemplos de hábitos que ajudam a economizar água e a identificar vazamentos.',
  },
  ruralRain: {
    title: 'Funasa. Manejo de águas pluviais em áreas rurais do Brasil (2020)',
    href: 'https://www.gov.br/funasa/pt-br/centrais-de-conteudo/arquivos/caderno_sustentar_curso_de_gestao_de_manejo_de_aguas_pluviais_em_areas_rurais.pdf/@@display-file/file',
    note: 'Apresenta exemplos de captação, armazenamento e manejo da água da chuva no contexto rural.',
  },
  drainage: {
    title: 'ANA. Norma de Referência nº 12/2025 sobre drenagem urbana',
    href: 'https://www.gov.br/ana/pt-br/legislacao/resolucoes/resolucoes-regulatorias/2025/245',
    note: 'Relaciona escoamento, infiltração, superfícies permeáveis e soluções de drenagem urbana.',
  },
  rainUse: {
    title: 'Saae Ambiental de Sorocaba. Captação de água da chuva',
    href: 'https://saae.sp.gov.br/dicas-do-saae/captacao-de-agua-da-chuva',
    note: 'Explica a filtragem, o armazenamento protegido e o aproveitamento da água de chuva para usos não potáveis.',
  },
  energy: {
    title:
      'MME e CEPEL. Guia para eficiência energética nas edificações públicas (revisão de 2024)',
    href: 'https://www.gov.br/mme/pt-br/assuntos/ee/publicacoes-e-estudos/GuiadeEficienciaEnergeticaemEdificiosPblicosRevisao2024.pdf',
    note: 'Orienta sobre o aproveitamento da luz natural, o sombreamento e a redução do consumo de energia.',
  },
  ventilation: {
    title: 'Ministério das Cidades. Guia interativo de eficiência energética em edificações',
    href: 'https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/habitacao/arquivos/9-_guia-de-eficiencia-energetica.pdf',
    note: 'Relaciona ventilação natural, clima, aberturas e conforto térmico nas decisões de projeto.',
  },
  materials: {
    title: 'MME. Sistema de Informação do Desempenho Ambiental da Construção (Sidac)',
    href: 'https://www.gov.br/mme/pt-br/assuntos/ee/acoes-e-programas-1/sidac',
    note: 'Apresenta dados brasileiros sobre energia e emissões de CO₂ na produção de materiais de construção.',
  },
  waste: {
    title: 'Conama. Resolução nº 307/2002 sobre resíduos da construção civil',
    href: 'https://conama.mma.gov.br/?id=305.&option=com_sisconama&task=arquivo.download',
    note: 'Define reutilização e reciclagem e reúne diretrizes para separar e destinar resíduos de obras.',
  },
  localWaste: {
    title: 'Prefeitura de Belo Horizonte. Unidades de Recebimento de Pequenos Volumes (URPVs)',
    href: 'https://prefeitura.pbh.gov.br/slu/informacoes/servicos/urpvs-enderecos',
    note: 'Mostra um exemplo local de recebimento de entulho de pequenos geradores e reciclagem de parte desses resíduos.',
  },
} satisfies Record<string, Source>;

export const projectSources: Source[] = [
  sources.presentation,
  {
    title: 'Equipe ECMA. Levantamento com as escolas (2026)',
    href: '/escolas',
    note: 'Os indicadores de mobilização vêm do cadastro e dos registros de diálogo da equipe com as instituições.',
  },
  {
    title: 'Equipe ECMA. Cronograma e registros de atividades (2026)',
    href: '/impacto',
    note: 'Reúne os marcos do projeto e os dados das atividades que têm registro de realização.',
  },
];

export const referenceGroups = [
  {
    title: 'Construção sustentável e educação ambiental',
    sources: [sources.construction, sources.education],
  },
  {
    title: 'Abastecimento, chuva e solo',
    sources: [
      sources.supply,
      sources.waterUse,
      sources.ruralRain,
      sources.drainage,
      sources.rainUse,
    ],
  },
  { title: 'Luz, ventilação e energia', sources: [sources.energy, sources.ventilation] },
  {
    title: 'Materiais, reutilização e reciclagem',
    sources: [sources.materials, sources.waste, sources.localWaste],
  },
];

const sourcesByLesson: Record<string, Source[]> = {
  'construcao-sustentavel': [sources.presentation, sources.construction],
  'casa-sustentavel': [sources.waterUse, sources.energy],
  'escola-sustentavel': [sources.presentation, sources.education],
  'caminho-da-agua': [sources.supply],
  'agua-da-chuva': [sources.drainage, sources.rainUse, sources.ruralRain],
  permeabilidade: [sources.drainage, sources.ruralRain],
  'ventilacao-natural': [sources.ventilation],
  'luz-natural': [sources.energy],
  materiais: [sources.construction, sources.materials],
  'residuo-material': [sources.waste, sources.localWaste],
  'engenharia-ambiente': [sources.presentation, sources.construction, sources.education],
};

export function lessonSources(slug: string) {
  return sourcesByLesson[slug] ?? [];
}
