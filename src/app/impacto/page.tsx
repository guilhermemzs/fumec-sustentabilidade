import { PageIntro, Timeline } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = {
  title: 'Trajetória, impacto e resultados',
  alternates: { canonical: '/impacto' },
};
export default async function Page() {
  const d = await getProjectData();
  const items = [
    [
      '~200',
      'Escolas contatadas',
      'Estimativa de contexto. 204 mensagens não equivalem a 204 instituições únicas.',
    ],
    [
      String(d.stats.replies),
      'Escolas com resposta',
      'Levantamento de 30/09/2026 fornecido pelo grupo. Este recorte não representa todas as escolas contatadas.',
    ],
    [
      String(d.stats.meetings),
      'Reuniões realizadas',
      'A reunião na Maria Modesta Cravo ocorreu em 30/09, às 12h40. Não equivale a uma atividade confirmada ou realizada.',
    ],
    [
      String(d.stats.alignment),
      'Em alinhamento',
      'Estado registrado; não representa atividade confirmada.',
    ],
    [
      d.completed === null ? 'A registrar' : String(d.completed),
      'Atividades realizadas',
      d.source === 'snapshot'
        ? 'Não há resultados de execução validados nesta referência.'
        : 'Contagem de atividades marcadas como concluídas no banco.',
    ],
    [
      d.classes === null ? 'A registrar' : String(d.classes),
      'Participações de turmas',
      'Registradas apenas em atividades concluídas. Uma mesma turma pode participar mais de uma vez.',
    ],
    [
      d.students === null ? 'A registrar' : String(d.students),
      'Participações de estudantes',
      'Soma de participações em atividades concluídas; não deduplicada entre atividades.',
    ],
  ];
  return (
    <>
      <PageIntro
        eyebrow="TRANSPARÊNCIA · MOBILIZAÇÃO · RESULTADOS"
        title="Acompanhar também é construir."
        description="Registramos o que foi feito, o que está em conversa e o que ainda precisa acontecer. Estimativas e resultados realizados têm significados diferentes."
      />
      <div className="container content-space">
        <div className="notice">
          Levantamento atualizado: 30 de setembro de 2026.{' '}
          {d.source === 'database'
            ? 'Indicadores de execução consultados no banco.'
            : 'Exibindo o registro institucional de referência; indicadores de execução aguardam atualização.'}
        </div>
        <div className="metrics-grid">
          {items.map(([value, title, note]) => (
            <div className="metric" key={title}>
              <strong style={value === 'A registrar' ? { fontSize: 29 } : undefined}>
                {value}
              </strong>
              <h2>{title}</h2>
              <p>{note}</p>
            </div>
          ))}
        </div>
        <h2>Da pesquisa ao encontro.</h2>
        <Timeline />
        <div className="prose">
          <h2>Como os resultados serão acompanhados</h2>
          <p>
            Instituições possuem um registro único. Contatos são eventos relacionados a cada escola.
            Atividades registram data, estado, participações de turmas e estudantes, sem coletar
            nomes de crianças e adolescentes.
          </p>
          <p>
            Após cada atividade, poderão ser reunidos feedbacks anônimos e registros qualitativos.
            Fotos identificáveis de menores só poderão ser publicadas com autorização adequada e
            revisão do grupo.
          </p>
          <h2>Mobilização é parte da extensão</h2>
          <p>
            O contato com aproximadamente 200 escolas gerou respostas, manifestações de interesse e
            oportunidades de alinhamento. Essa aproximação é uma etapa do trabalho e não deve ser
            confundida com estudantes já alcançados.
          </p>
        </div>
        {d.activities.length ? (
          <section>
            <h2>Atividades registradas</h2>
            <div className="materials-list">
              {d.activities.map((a) => (
                <article className="material-row" key={a.id}>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                  </div>
                  <span className="badge">
                    {
                      {
                        planned: 'Planejada',
                        confirmed: 'Confirmada',
                        completed: 'Realizada',
                        cancelled: 'Cancelada',
                      }[a.status]
                    }
                  </span>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <p className="empty-state">
            As atividades e seus resultados aparecerão aqui depois de cadastrados e validados pelo
            grupo.
          </p>
        )}
      </div>
    </>
  );
}
