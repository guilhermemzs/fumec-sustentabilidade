import { PageIntro } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { title: 'Equipe', alternates: { canonical: '/equipe' } };
export default async function Page() {
  const d = await getProjectData();
  return (
    <>
      <PageIntro
        eyebrow="7 ESTUDANTES · ENGENHARIA CIVIL · FUMEC"
        title="Construir em grupo. Aprender com a comunidade."
        description="Uma equipe de estudantes desenvolvendo uma ação extensionista que conecta conhecimento técnico, educação ambiental e realidade escolar."
      />
      <div className="container content-space two-columns">
        <div className="prose">
          <h2>Uma responsabilidade compartilhada</h2>
          <p>
            Pesquisa, planejamento, mobilização de escolas, produção de materiais e avaliação fazem
            parte do trabalho coletivo. A comunidade escolar participa do diálogo que orienta cada
            proposta.
          </p>
          <p>
            Os nomes e funções serão publicados após a confirmação pelo grupo. Nenhum integrante foi
            inventado para preencher esta página.
          </p>
          {d.members.length ? (
            <div className="small-grid">
              {d.members.map((m) => (
                <div key={m.id}>
                  <h3>{m.name}</h3>
                  <p>{m.course}</p>
                  {m.role ? <p>{m.role}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <aside className="aside-note">
          <div className="team-number">07</div>
          <p>
            estudantes de Engenharia Civil
            <br />
            Universidade FUMEC
            <br />
            Projeto de Extensão · 2026
          </p>
        </aside>
      </div>
    </>
  );
}
