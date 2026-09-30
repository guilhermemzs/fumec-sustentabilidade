import { PageIntro } from '@/components/ui';
import { requireAdmin } from '@/lib/security';
import { getDb } from '@/db';
import {
  schools,
  engagements,
  activities,
  materials,
  submissions,
  feedback,
  contactEvents,
  teamMembers,
} from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { statuses, statusLabels } from '@/lib/project';
import {
  logout,
  updateSchool,
  saveActivity,
  addMaterial,
  addMember,
  registerContact,
  addSchool,
  clearExpiredLimits,
  removeSubmission,
} from './actions';
export const metadata = { title: 'Gestão do projeto', robots: { index: false, follow: false } };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ result?: string }>;
}) {
  await requireAdmin();
  const db = getDb()!;
  const params = await searchParams;
  const [schoolRows, activityRows, materialRows, messages, feedbackRows, events, members] =
    await Promise.all([
      db.select().from(schools).innerJoin(engagements, eq(schools.id, engagements.schoolId)),
      db.select().from(activities),
      db.select().from(materials),
      db.select().from(submissions).orderBy(desc(submissions.createdAt)).limit(100),
      db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(100),
      db.select().from(contactEvents),
      db.select().from(teamMembers),
    ]);
  const choices = schoolRows.map((r) => (
    <option value={r.schools.id} key={r.schools.id}>
      {r.schools.name}
    </option>
  ));
  return (
    <>
      <PageIntro
        eyebrow="GESTÃO INTERNA · ACESSO AUTENTICADO"
        title="A trajetória continua aqui."
        description="Atualize informações institucionais e registre apenas ações e resultados comprovados. Nenhum campo público deve conter dados pessoais de contatos ou estudantes."
      />
      <div className="container content-space">
        <div className="section-heading">
          <p className="meta-line">
            {schoolRows.length} escolas · {activityRows.length} atividades · {messages.length}{' '}
            mensagens recentes · {events.length} eventos de contato · {members.length} integrantes
            cadastrados
          </p>
          <form action={logout}>
            <button className="button secondary">Sair da gestão</button>
          </form>
        </div>
        {params.result ? (
          <div className={params.result === 'saved' ? 'notice' : 'notice warning'} role="status">
            {params.result === 'saved'
              ? 'Atualização salva.'
              : 'Não foi possível salvar. Revise os campos, as datas e a conexão.'}
          </div>
        ) : null}
        <div className="notice warning">
          Estimativas de público não são alcance realizado. Uma atividade concluída exige data de
          realização. Os números de estudantes e turmas contabilizam participações, sem
          identificação individual. Fotos e outros arquivos publicados devem ter autorização
          adequada.
        </div>
        <div className="admin-grid">
          <section className="admin-panel">
            <h2>Nova instituição</h2>
            <form action={addSchool}>
              <label className="field">
                Nome institucional
                <input name="name" required minLength={5} maxLength={180} />
              </label>
              <label className="field">
                Município (se validado)
                <input name="city" maxLength={100} />
              </label>
              <label className="field">
                Estado
                <select name="status">
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
              </label>
              <p className="caption">
                O novo cadastro começa privado. Confira o nome e o município para evitar duplicação.
              </p>
              <button className="button">Cadastrar instituição</button>
            </form>
          </section>
          <section className="admin-panel">
            <h2>Registrar contato</h2>
            <form action={registerContact}>
              <label className="field">
                Instituição
                <select name="schoolId" required>
                  {choices}
                </select>
              </label>
              <label className="field">
                Canal
                <select name="channel">
                  <option value="email">E-mail</option>
                  <option value="reuniao">Reunião</option>
                  <option value="telefone">Telefone</option>
                  <option value="outro">Outro</option>
                </select>
              </label>
              <label className="field">
                Evento
                <select name="kind">
                  <option value="enviado">Contato enviado</option>
                  <option value="resposta">Resposta</option>
                  <option value="reuniao">Reunião</option>
                </select>
              </label>
              <label className="field">
                Data
                <input name="date" type="date" required />
              </label>
              <p className="caption">
                Registre o evento sem copiar e-mails, números ou nomes pessoais.
              </p>
              <button className="button">Registrar evento</button>
            </form>
          </section>
          <section className="admin-panel">
            <h2>Nova atividade</h2>
            <ActivityForm choices={choices} />
          </section>
          <section className="admin-panel">
            <h2>Publicar material</h2>
            <form action={addMaterial}>
              <label className="field">
                Título
                <input name="title" required minLength={3} maxLength={150} />
              </label>
              <label className="field">
                Descrição
                <textarea name="description" required minLength={5} maxLength={500} />
              </label>
              <label className="field">
                Tipo
                <input name="type" required placeholder="Cartilha, apresentação, relatório…" />
              </label>
              <label className="field">
                Link HTTPS do arquivo
                <input name="fileUrl" type="url" required placeholder="https://…" />
              </label>
              <label className="checkbox-label">
                <input name="published" type="checkbox" />
                <span>Publicar após verificar acesso ao arquivo e autorizações</span>
              </label>
              <button className="button">Adicionar material</button>
            </form>
            <p className="caption">
              {materialRows.length} materiais registrados. O arquivo deve existir e ser acessível;
              não use links fictícios.
            </p>
          </section>
          <section className="admin-panel">
            <h2>Identificar integrante</h2>
            <form action={addMember}>
              <label className="field">
                Nome
                <input name="name" required minLength={3} maxLength={100} />
              </label>
              <label className="field">
                Função no projeto
                <input name="role" maxLength={120} />
              </label>
              <label className="checkbox-label">
                <input name="published" type="checkbox" />
                <span>Integrante autorizou a publicação do nome e função</span>
              </label>
              <button className="button">Adicionar integrante</button>
            </form>
          </section>
          <section className="admin-panel">
            <h2>Feedback anônimo</h2>
            {feedbackRows.length ? (
              feedbackRows.map((f) => (
                <p key={f.id} className="caption">
                  Nota: {f.rating}/5 · {f.response || 'Sem comentário'} · atividade {f.activityId}
                </p>
              ))
            ) : (
              <p className="empty-state">
                Nenhum feedback recebido. Após uma atividade concluída, compartilhe o endereço
                /avaliacao/ID-DA-ATIVIDADE. As respostas não são publicadas automaticamente.
              </p>
            )}
            <h3>Manutenção</h3>
            <form action={clearExpiredLimits}>
              <button className="button secondary">Limpar contadores expirados</button>
            </form>
          </section>
        </div>
        <section className="section">
          <h2>Instituições e alinhamentos</h2>
          {schoolRows.map(({ schools: s, school_engagements: e }) => (
            <details className="admin-panel" key={s.id} style={{ marginBottom: 16 }}>
              <summary>
                {s.name} · {statusLabels[e.status]}
              </summary>
              <form action={updateSchool} style={{ marginTop: 25 }}>
                <input type="hidden" name="id" value={s.id} />
                <label className="field">
                  Estado
                  <select name="status" defaultValue={e.status}>
                    {statuses.map((st) => (
                      <option value={st} key={st}>
                        {statusLabels[st]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  Síntese pública (apenas informações institucionais)
                  <textarea name="summary" defaultValue={e.summary} maxLength={500} />
                </label>
                <div className="admin-grid">
                  <label className="field">
                    Latitude validada
                    <input
                      name="latitude"
                      type="number"
                      min={-90}
                      max={90}
                      step="any"
                      defaultValue={s.latitude ?? ''}
                    />
                  </label>
                  <label className="field">
                    Longitude validada
                    <input
                      name="longitude"
                      type="number"
                      min={-180}
                      max={180}
                      step="any"
                      defaultValue={s.longitude ?? ''}
                    />
                  </label>
                </div>
                <label className="checkbox-label">
                  <input
                    name="publicVisibility"
                    type="checkbox"
                    defaultChecked={s.publicVisibility}
                  />
                  <span>Exibir nome, estado e síntese institucional no site público</span>
                </label>
                <button className="button">Salvar instituição</button>
              </form>
            </details>
          ))}
        </section>
        <section>
          <h2>Atividades e resultados</h2>
          {activityRows.length ? (
            activityRows.map((a) => (
              <details className="admin-panel" key={a.id} style={{ marginBottom: 16 }}>
                <summary>
                  {a.title} · {a.status}
                </summary>
                <ActivityForm choices={choices} activity={a} />
                <p className="caption">Link para feedback: /avaliacao/{a.id}</p>
              </details>
            ))
          ) : (
            <p className="empty-state">Nenhuma atividade cadastrada.</p>
          )}
        </section>
        <section className="section">
          <h2>Mensagens recebidas</h2>
          <p className="caption">
            Dados privados para resposta pelo grupo. Não compartilhe esta página ou copie os
            contatos para conteúdo público.
          </p>
          {messages.length ? (
            messages.map((m) => (
              <details key={m.id} className="admin-panel" style={{ marginBottom: 16 }}>
                <summary>
                  {m.organization} ·{' '}
                  {m.createdAt.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                </summary>
                <p>
                  {m.name} · <a href={'mailto:' + m.email}>{m.email}</a>
                </p>
                <p style={{ whiteSpace: 'pre-wrap' }}>{m.message}</p>
                <form action={removeSubmission}>
                  <input type="hidden" name="id" value={m.id} />
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>
                      Confirmo a exclusão definitiva desta mensagem após atender a solicitação ou
                      encerrar a finalidade.
                    </span>
                  </label>
                  <button className="button secondary">Excluir mensagem definitivamente</button>
                </form>
              </details>
            ))
          ) : (
            <p className="empty-state">Nenhuma mensagem recebida.</p>
          )}
        </section>
      </div>
    </>
  );
}
function ActivityForm({
  choices,
  activity,
}: {
  choices: React.ReactNode;
  activity?: typeof activities.$inferSelect;
}) {
  return (
    <form action={saveActivity} style={{ marginTop: 20 }}>
      {activity ? <input type="hidden" name="id" value={activity.id} /> : null}
      <label className="field">
        Instituição
        <select name="schoolId" defaultValue={activity?.schoolId} required>
          {choices}
        </select>
      </label>
      <label className="field">
        Título
        <input name="title" required minLength={5} maxLength={150} defaultValue={activity?.title} />
      </label>
      <label className="field">
        Descrição pública
        <textarea name="description" maxLength={1500} defaultValue={activity?.description} />
      </label>
      <label className="field">
        Estado
        <select name="status" defaultValue={activity?.status ?? 'planned'}>
          <option value="planned">Planejada</option>
          <option value="confirmed">Confirmada</option>
          <option value="completed">Realizada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </label>
      <div className="admin-grid">
        <label className="field">
          Data prevista
          <input
            name="scheduledAt"
            type="date"
            defaultValue={activity?.scheduledAt?.toISOString().slice(0, 10)}
          />
        </label>
        <label className="field">
          Data de realização
          <input
            name="completedAt"
            type="date"
            defaultValue={activity?.completedAt?.toISOString().slice(0, 10)}
          />
        </label>
        <label className="field">
          Participações de estudantes
          <input
            name="studentsReached"
            type="number"
            min={0}
            max={100000}
            defaultValue={activity?.studentsReached ?? ''}
          />
        </label>
        <label className="field">
          Participações de turmas
          <input
            name="classesReached"
            type="number"
            min={0}
            max={10000}
            defaultValue={activity?.classesReached ?? ''}
          />
        </label>
      </div>
      <p className="caption">
        Deixe vazio quando o alcance não estiver validado. Os indicadores somam apenas atividades
        realizadas.
      </p>
      <button className="button">{activity ? 'Atualizar atividade' : 'Registrar atividade'}</button>
    </form>
  );
}
