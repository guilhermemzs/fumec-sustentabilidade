import { PageIntro, ActionLink } from '@/components/ui';
import { TeamPortraits } from '@/components/team-portraits';
import { UniversitySignature } from '@/components/university-signature';
import { portraits } from '@/lib/team';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { title: 'Equipe', alternates: { canonical: '/equipe' } };
export default async function Page() {
  const d = await getProjectData();
  const otherMembers = d.members.filter((m) => !(m.name in portraits));
  return (
    <>
      <PageIntro
        eyebrow="ECMA · 7 ESTUDANTES · ENGENHARIA CIVIL · FUMEC"
        title="Equipe ECMA"
        description="Entre Construção e Meio Ambiente · Projeto de Extensão 2026."
      />
      <div className="container content-space">
        <TeamPortraits members={d.members} eager />
        <p className="source-note">
          Registro acadêmico dos integrantes em uma apresentação anterior. Da esquerda para a
          direita na imagem original: Guilherme Menezes, Bernardo Lopes e Luis Ladeira.
        </p>
        {otherMembers.length ? (
          <section className="team-more" aria-labelledby="team-more-title">
            <p className="eyebrow">ENGENHARIA CIVIL · FUMEC</p>
            <h2 id="team-more-title">Integrantes</h2>
            <div className="team-names">
              {otherMembers.map((m) => (
                <article key={m.id}>
                  <h3>{m.name}</h3>
                  <p>{m.course} · FUMEC</p>
                  {m.role ? <p>{m.role}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
        <div className="two-columns team-context">
          <div className="prose">
            <h2>Construção sustentável</h2>
            <p>Água, energia, materiais e resíduos são temas da apresentação do grupo.</p>
            <ActionLink href="/materiais">Conheça nossos materiais</ActionLink>
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
            <UniversitySignature />
          </aside>
        </div>
      </div>
    </>
  );
}
