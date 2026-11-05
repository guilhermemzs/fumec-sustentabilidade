import { PageIntro, ActionLink } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { title: 'Materiais educativos', alternates: { canonical: '/materiais' } };
const localMaterials = [
  {
    title: 'Arte do jogo de tabuleiro',
    description: 'Imagem completa do tabuleiro com as 27 casas e seus desafios.',
    href: '/images/tabuleiro-ecma-arte.png',
    type: 'PNG · ARTE DO TABULEIRO',
  },
  {
    title: 'Foto do tabuleiro físico',
    description:
      'Fotografia do tabuleiro físico preparado para a atividade presencial de educação ambiental.',
    href: '/images/tabuleiro-ecma.png',
    type: 'PNG · REGISTRO FOTOGRÁFICO',
  },
  {
    title: 'Apresentação · Construção Sustentável',
    description:
      'Apresentação original do grupo para o Projeto de Extensão 2026. Conceitos, práticas essenciais e sustentabilidade no cotidiano.',
    href: '/materiais/apresentacao-construcao-sustentavel-2026.pdf',
    type: 'PDF · APRESENTAÇÃO DO GRUPO · 9 PÁGINAS',
  },
];
export default async function Page() {
  const d = await getProjectData();
  return (
    <>
      <PageIntro
        eyebrow="ECMA · MATERIAL DO GRUPO"
        title="Materiais do projeto"
        description="Registro do jogo de tabuleiro, apresentação do grupo e referências sobre construção sustentável."
      />
      <div className="container content-space">
        <div className="materials-list">
          {localMaterials.map((m) => (
            <article className="material-row" key={m.href}>
              <div>
                <p className="eyebrow">{m.type}</p>
                <h2>{m.title}</h2>
                <p>{m.description}</p>
              </div>
              <a className="button secondary" href={m.href} download>
                Baixar material ↓
              </a>
            </article>
          ))}
          {d.materials.map((m) => (
            <article className="material-row" key={m.id}>
              <div>
                <p className="eyebrow">{m.type}</p>
                <h2>{m.title}</h2>
                <p>{m.description}</p>
              </div>
              <a
                className="button secondary"
                href={m.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir material ↗
              </a>
            </article>
          ))}
        </div>
        <div className="checklist-callout">
          <div>
            <h3>Acervo para as escolas</h3>
            <p>Leituras e atividades para continuar o trabalho com as turmas depois da visita.</p>
          </div>
          <ActionLink href="/sustentabilidade">Acessar a seção Aprender</ActionLink>
        </div>
      </div>
    </>
  );
}
