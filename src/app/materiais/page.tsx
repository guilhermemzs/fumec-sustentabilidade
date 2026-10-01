import { PageIntro, ActionLink } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { title: 'Materiais educativos', alternates: { canonical: '/materiais' } };
const localMaterials = [
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
        description="Apresentação de Construção Sustentável do Projeto de Extensão 2026, fornecida pelo grupo."
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
            <h3>Prefere explorar na tela?</h3>
            <p>A biblioteca de temas, o checklist e o quiz também estão disponíveis online.</p>
          </div>
          <ActionLink href="/sustentabilidade">Explorar a biblioteca</ActionLink>
        </div>
      </div>
    </>
  );
}
