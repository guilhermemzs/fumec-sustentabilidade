const presentation = {
  title: 'ECMA · Construção Sustentável · Projeto de Extensão 2026',
  href: '/materiais/apresentacao-construcao-sustentavel-2026.pdf',
};
const water = {
  title: 'Copasa · Tratamento da água',
  href: 'https://www.copasa.com.br/wps/portal/internet/agua-de-qualidade/tratamento-da-agua',
};
const rain = {
  title: 'Funasa · Manejo de águas pluviais em áreas rurais do Brasil (2020)',
  href: 'https://www.gov.br/funasa/pt-br/centrais-de-conteudo/arquivos/caderno_sustentar_curso_de_gestao_de_manejo_de_aguas_pluviais_em_areas_rurais.pdf/@@display-file/file',
};
const ventilation = {
  title: 'ProjetEEE · Ventilação natural',
  href: 'https://projeteee.mme.gov.br/estrategia/ventilacao-natural/',
};
const light = {
  title: 'MME e CEPEL · Guia para eficiência energética nas edificações públicas (revisão 2024)',
  href: 'https://www.gov.br/mme/pt-br/assuntos/ee/publicacoes-e-estudos/GuiadeEficienciaEnergeticaemEdificiosPblicosRevisao2024.pdf',
};

export function lessonSources(slug: string) {
  if (slug === 'caminho-da-agua') return [water];
  if (['agua-da-chuva', 'permeabilidade'].includes(slug)) return [rain];
  if (slug === 'ventilacao-natural') return [ventilation];
  if (slug === 'luz-natural') return [light];
  return [presentation];
}
