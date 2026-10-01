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
    date: '30 de setembro · 2026',
    title: 'Levantamento das escolas',
    text: '62 escolas com resposta: 18 interessadas, três em alinhamento e uma com reunião realizada.',
  },
  {
    date: '30 de setembro · 12h40',
    title: 'Reunião na Maria Modesta Cravo',
    text: 'Encontro com a Escola Estadual Maria Modesta Cravo, em Belo Horizonte.',
  },
];
