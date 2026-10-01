import { PageIntro, Timeline } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = {
  title: 'Mobilização e resultados',
  alternates: { canonical: '/impacto' },
};
export default async function Page() {
  const d = await getProjectData();
  const items: [string, string][] = [
    [String(d.stats.replies), 'Escolas com resposta'],
    [String(d.stats.meetings), 'Escolas com reunião realizada'],
    [String(d.stats.alignment), 'Escolas em alinhamento'],
  ];
  if (d.completed !== null) items.push([String(d.completed), 'Atividades realizadas']);
  if (d.classes !== null) items.push([String(d.classes), 'Participações de turmas']);
  if (d.students !== null) items.push([String(d.students), 'Participações de estudantes']);
  return (
    <>
      <PageIntro
        eyebrow="ECMA · ESCOLAS"
        title="Mobilização das escolas"
        description="Respostas e encontros registrados no levantamento de 30 de setembro de 2026."
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
        <h2>Registros de setembro</h2>
        <Timeline />
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
      </div>
    </>
  );
}
