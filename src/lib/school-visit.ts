import type { School } from './project';

export const schoolVisit = {
  title: 'Jogo de tabuleiro na escola',
  description:
    'A atividade presencial foi planejada para estudantes de 10 a 11 anos. As crianças vão jogar em um tabuleiro físico e conversar sobre decisões de uma obra que afetam o uso da água, da energia e dos materiais.',
  startsAt: '2026-11-06T12:00:00-03:00',
  endsAt: '2026-11-06T15:00:00-03:00',
  dateLabel: '06 de novembro de 2026',
  timeLabel: 'Das 12h às 15h',
  mapUrl: 'https://maps.app.goo.gl/wgpWCNDNc5GwticU8?g_st=aw',
};

// Confirmação da equipe em 31/10; o levantamento histórico de setembro é preservado.
export const visitSchool: School = {
  id: 'e-m-florie-wanderley-dias',
  name: 'E.M. Florie Wanderley Dias',
  city: 'Nova Lima',
  address: 'Rua Princesa Isabel, 120',
  neighborhood: 'Vila São José',
  state: 'MG',
  postalCode: '34000-000',
  educationType: null,
  snapshotDate: '2026-10-31',
  status: 'atividade_confirmada',
  summary: '',
  priority: false,
  latitude: null,
  longitude: null,
  publicVisibility: true,
};
