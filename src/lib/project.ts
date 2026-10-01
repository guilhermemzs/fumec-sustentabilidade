import surveySchools from '../data/school-survey.json';
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
  address: string | null;
  neighborhood: string | null;
  state: string | null;
  postalCode: string | null;
  educationType: string | null;
  snapshotDate: string | null;
  status: Status;
  summary: string;
  priority: boolean;
  latitude: number | null;
  longitude: number | null;
  publicVisibility: boolean;
};
export function institutionKey(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
export const initialSchools: School[] = surveySchools.map((school) => ({
  ...school,
  id: institutionKey(school.name),
  status: school.status as Status,
  latitude: null,
  longitude: null,
  publicVisibility: true,
}));
export function summarizeSchools(schools: School[]) {
  return {
    registered: schools.length,
    meetings: schools.filter((s) => s.status === 'reuniao_realizada').length,
    replies: schools.filter((s) => !['mapeada', 'contatada'].includes(s.status)).length,
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
    text: 'Mobilização da campanha e levantamento de 62 escolas com resposta em 30/09. Três em alinhamento e uma reunião realizada; execução ainda não confirmada.',
    state: 'em andamento',
  },
  {
    date: 'Início de outubro',
    title: 'Da conversa à atividade',
    text: 'Definição das ações com as escolas. Execução e avaliação dependem de confirmação e registro.',
    state: 'prevista',
  },
];
