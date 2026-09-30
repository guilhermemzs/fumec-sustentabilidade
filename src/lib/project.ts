export const referenceDate = '2026-09-30';
export const statuses = [
  'mapeada',
  'contatada',
  'respondeu',
  'interessada',
  'em_alinhamento',
  'reuniao_agendada',
  'reuniao_realizada',
  'atividade_confirmada',
  'atividade_realizada',
  'possibilidade_futura',
  'indisponivel',
] as const;
export type Status = (typeof statuses)[number];
export const statusLabels: Record<Status, string> = {
  mapeada: 'Mapeada',
  contatada: 'Contatada',
  respondeu: 'Respondeu',
  interessada: 'Interessada',
  em_alinhamento: 'Em alinhamento',
  reuniao_agendada: 'Reunião agendada',
  reuniao_realizada: 'Reunião realizada',
  atividade_confirmada: 'Atividade confirmada',
  atividade_realizada: 'Atividade realizada',
  possibilidade_futura: 'Possibilidade futura',
  indisponivel: 'Indisponível neste ciclo',
};
export type School = {
  id: string;
  name: string;
  city: string | null;
  status: Status;
  summary: string;
  priority: boolean;
  latitude: number | null;
  longitude: number | null;
  publicVisibility: boolean;
};
const records: [string, Status, string, boolean?][] = [
  [
    'Escola Municipal Professora Maria Modesta Cravo',
    'em_alinhamento',
    'Alinhamento com a Escola Integrada e evolução para conversa direta e reunião.',
    true,
  ],
  [
    'Escola Municipal Antônio Mourão Guimarães',
    'em_alinhamento',
    'Interesse em uma proposta para três turmas do 6º ano, no turno da tarde.',
    true,
  ],
  [
    'Escola Municipal Minervina Augusta',
    'em_alinhamento',
    'Proposta sobre água, território e preservação de nascentes, conectada à realidade do bairro Planalto.',
    true,
  ],
  [
    'Escola Municipal Hélio Pellegrino',
    'interessada',
    'Possibilidade de trabalhar com três turmas do 9º ano. Público estimado de 100 estudantes; não representa alcance realizado.',
  ],
  [
    'EMEI Pituchinha',
    'interessada',
    'Público informado de quatro turmas de 5 anos. Abordagem prevista: lúdica e visual.',
  ],
  [
    'EMEI Maria da Glória Lommez',
    'interessada',
    'Abertura para a proposta com três turmas de 5 anos, e possibilidade de continuidade em 2027.',
  ],
  [
    'EMEI Tirol',
    'respondeu',
    'Forneceu informações sobre turmas integrais e parciais para adaptação da proposta.',
  ],
  [
    'EMEI Solar Urucuia',
    'respondeu',
    'Relatou Jardim Sensorial, Jardim de Chuva, Sementes da Vida e Horta na Escola.',
  ],
  [
    'EMEI Caetano Furquim',
    'interessada',
    'Interesse em água, irrigação e reaproveitamento de chuva no espaço de horta.',
  ],
  [
    'Escola Municipal Honorina de Barros',
    'respondeu',
    'Relatou horta em implementação e oficina permanente de meio ambiente.',
  ],
  [
    'Escola Municipal Jardim Felicidade',
    'interessada',
    'Interesse em tratamento da água, resíduos e questões ambientais do território.',
  ],
  [
    'Escola Municipal Emídio Berutto',
    'interessada',
    'Possui iniciativa de Escola Sustentável e interesse em conversar sobre a proposta.',
  ],
  [
    'Escola Municipal Professor Edson Pisani',
    'interessada',
    'Interesse em construir a ação com a Escola Integrada. Datas de reunião sugeridas, ainda sem confirmação.',
  ],
  [
    'Escola Municipal Dulce Maria Homem',
    'interessada',
    'A proposta foi considerada alinhada ao projeto pedagógico.',
  ],
  ['EMEI Barreiro', 'interessada', 'Retorno positivo e encaminhamento à coordenação pedagógica.'],
  [
    'EMEI Cornélio Vaz de Melo',
    'interessada',
    'Manifestou interesse e solicitou continuidade do contato.',
  ],
  [
    'Escola Municipal Maria Silveira',
    'interessada',
    'Interesse em conhecer a proposta e disponibilidade para reunião.',
  ],
  ['EMEI Taquaril', 'interessada', 'Manifestou interesse em realizar o projeto na escola.'],
  [
    'Escola Municipal Doutor Júlio Soares',
    'interessada',
    'Manifestou e reforçou interesse em conversar presencialmente.',
  ],
  [
    'Escola Municipal Josefina Souza Lima',
    'interessada',
    'Interesse e sugestão de reunião virtual ou presencial.',
  ],
  ['EMEI Jardim Vitória II', 'interessada', 'Interesse e solicitação de continuidade da conversa.'],
  ['EMEI Jatobá IV', 'interessada', 'Interesse e sugestão de reunião online.'],
  [
    'Escola Municipal Pedro Aleixo',
    'interessada',
    'Interesse e disponibilidade para continuar o alinhamento.',
  ],
  [
    'EMEI Granja de Freitas',
    'respondeu',
    'Informou disponibilidade para agendamento pela manhã, de segunda a quinta-feira.',
  ],
  ['Escola Municipal Belo Horizonte', 'interessada', 'Interesse e disponibilidade para reunião.'],
  [
    'Escola Municipal Presidente Itamar Franco',
    'interessada',
    'Sugeriu conversa presencial na escola.',
  ],
  [
    'Escola Municipal Sebastiana Novais',
    'interessada',
    'Convidou o grupo para conversar presencialmente.',
  ],
  ['EMEI Baleia', 'interessada', 'Interesse e sugestão de reunião online.'],
  [
    'Escola Municipal Francisco Magalhães Gomes',
    'interessada',
    'Solicitou mais informações para conhecer a proposta.',
  ],
  [
    'Escola Municipal Aurélio Buarque de Holanda',
    'respondeu',
    'Contato encaminhado à Escola Integrada, com continuidade da conversa.',
  ],
  [
    'EMEI Águas Claras',
    'respondeu',
    'Continuidade da conversa para adaptação à realidade da unidade.',
  ],
  [
    'EMEI Vila Senhor dos Passos',
    'respondeu',
    'Informou idades e atendimento para definição das turmas adequadas.',
  ],
  [
    'EMEI Lucas Monteiro Machado',
    'respondeu',
    'Forneceu faixas etárias, turnos e quantidades para adaptar a proposta.',
  ],
  [
    'Escola Municipal Professora Consuelita Cândida',
    'respondeu',
    'Forneceu informações sobre o público e abertura à análise da proposta.',
  ],
  ['EMEI Cardoso', 'respondeu', 'Retorno e continuidade do contato.'],
  [
    'Escola Municipal Herbert José de Souza',
    'possibilidade_futura',
    'Novo contato para 2027 foi considerado bem-vindo.',
  ],
  [
    'Escola Municipal Padre Edeimar Massote',
    'possibilidade_futura',
    'Cronograma de 2026 comprometido; possibilidade de realização em 2027.',
  ],
  [
    'Escola Municipal Arthur Guimarães',
    'indisponivel',
    'Demandas de fim de ano impossibilitam a atividade neste ciclo.',
  ],
  [
    'Escola Municipal Polo de Educação Integrada',
    'indisponivel',
    'Contexto institucional dificulta a inclusão imediata de atividades; não representa rejeição permanente.',
  ],
];
export function institutionKey(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
export const initialSchools: School[] = records.map(([name, status, summary, priority], i) => ({
  id: institutionKey(name),
  name,
  status,
  summary,
  priority: priority ?? false,
  city: i === 0 ? 'Belo Horizonte' : null,
  latitude: null,
  longitude: null,
  publicVisibility: true,
}));
export function summarizeSchools(schools: School[]) {
  return {
    registered: schools.length,
    alignment: schools.filter((s) => s.status === 'em_alinhamento').length,
    interested: schools.filter((s) =>
      [
        'interessada',
        'em_alinhamento',
        'reuniao_agendada',
        'reuniao_realizada',
        'atividade_confirmada',
        'atividade_realizada',
      ].includes(s.status),
    ).length,
    participants: schools.filter((s) =>
      ['atividade_confirmada', 'atividade_realizada'].includes(s.status),
    ).length,
  };
}
export const timeline = [
  {
    date: 'Agosto · 2026',
    title: 'Pesquisar para escolher',
    text: 'Estudo de temas de Engenharia Civil, meio ambiente e possibilidades de extensão.',
    state: 'documentada',
  },
  {
    date: 'Setembro · 2026',
    title: 'Uma direção compartilhada',
    text: 'Construção sustentável e educação ambiental em escolas tornam-se o foco do grupo.',
    state: 'documentada',
  },
  {
    date: 'Final de setembro',
    title: 'A universidade encontra a escola',
    text: 'Mobilização de aproximadamente 200 escolas, retornos e início dos alinhamentos.',
    state: 'em andamento',
  },
  {
    date: 'Início de outubro',
    title: 'Da conversa à atividade',
    text: 'Definição das ações com as escolas. Execução e avaliação dependem de confirmação e registro.',
    state: 'prevista',
  },
];
