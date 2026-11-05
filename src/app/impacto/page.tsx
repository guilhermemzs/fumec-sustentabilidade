import Link from 'next/link';
import { PageIntro, Timeline } from '@/components/ui';
import { getProjectData } from '@/lib/data';
import { SchoolVisit } from '@/components/school-visit';
export const revalidate = 60;
export const metadata = {
  title: 'Resultados do projeto',
  alternates: { canonical: '/impacto' },
};
export default async function Page() {
  const d = await getProjectData();
  const items: [string, string][] = [
    [String(d.stats.registered), 'Escolas no cadastro'],
    [String(d.stats.meetings), 'Escolas com reunião realizada'],
    [String(d.stats.alignment), 'Escolas em alinhamento'],
  ];
  if (d.completed !== null) items.push([String(d.completed), 'Atividades realizadas']);
  if (d.classes !== null) items.push([String(d.classes), 'Participações de turmas']);
  if (d.students !== null) items.push([String(d.students), 'Participações de estudantes']);
  return (
    <>
      <PageIntro
        eyebrow="ECMA · EXTENSÃO 2026"
        title="Resultados do projeto"
        description="Dados do levantamento com as escolas, atividades presenciais registradas e cronograma do projeto ECMA."
      />
      <div className="container content-space">
        <div className="metrics-grid">
          {items.map(([value, title]) => (
            <div className="metric" key={title}>
              <strong>{value}</strong>
              <h2>{title}</h2>
            </div>
          ))}
        </div>
        <p className="source-note">
          <Link className="text-link" href="/referencias">
            Consultar as fontes dos dados
          </Link>
        </p>
        {d.activities.length ? (
          <section>
            <h2>Atividades realizadas</h2>
            <div className="materials-list">
              {d.activities.map((a) => (
                <article className="material-row" key={a.id}>
                  <div>
                    <h3>{a.title}</h3>
                    {a.description ? <p>{a.description}</p> : null}
                  </div>
                  <span className="badge">Realizada</span>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        {d.students !== null || d.classes !== null ? (
          <p className="source-note">Participações somadas por atividade realizada.</p>
        ) : null}
        <SchoolVisit />
        <h2>Cronograma do projeto</h2>
        <Timeline />
      </div>
    </>
  );
}
