import { PageIntro, Timeline, Invite } from '@/components/ui';
import { SchoolVisit } from '@/components/school-visit';
export const metadata = { title: 'O projeto', alternates: { canonical: '/projeto' } };
export default function Project() {
  return (
    <>
      <PageIntro
        eyebrow="ENGENHARIA CIVIL · FUMEC · EXTENSÃO 2026"
        title="Construção sustentável e educação ambiental"
        description="ECMA (Entre Construção e Meio Ambiente). Projeto de extensão de sete estudantes de Engenharia Civil da Universidade FUMEC."
      />
      <div className="container visit-space">
        <SchoolVisit />
      </div>
      <div className="container content-space two-columns">
        <article className="prose">
          <h2>Objetivo</h2>
          <p>
            Apresentar conceitos de construção sustentável e práticas de cuidado com o meio ambiente
            no cotidiano escolar.
          </p>
          <h2>Temas do projeto</h2>
          <p>
            Planejamento, escolha de materiais, uso da água e da energia e destinação de resíduos. A
            apresentação do grupo aborda as dimensões ambiental, social e econômica da
            sustentabilidade e o ciclo de vida das construções.
          </p>
          <h2>Atividade presencial</h2>
          <p>
            O jogo de tabuleiro foi preparado para estudantes de 10 a 11 anos. As casas da trilha
            apresentam situações de uma obra, como separar resíduos, economizar água e aproveitar a
            luz natural. A dinâmica acontece com o tabuleiro físico e conversa em grupo.
          </p>
          <h2>Divulgação dos resultados</h2>
          <p>
            Este site reúne o levantamento com as escolas, os registros das atividades e os
            materiais do projeto para consulta pública.
          </p>
          <h2>Apresentação do grupo</h2>
          <p>
            <a href="/materiais/apresentacao-construcao-sustentavel-2026.pdf">
              Construção Sustentável · Projeto de Extensão 2026
            </a>
          </p>
        </article>
        <aside className="aside-note">
          <p className="eyebrow">ECMA</p>
          <h2>Entre Construção e Meio Ambiente</h2>
          <p>
            <strong>Universidade</strong>
            <br />
            FUMEC
          </p>
          <p>
            <strong>Curso</strong>
            <br />
            Engenharia Civil
          </p>
          <p>
            <strong>Grupo</strong>
            <br />7 estudantes
          </p>
          <p>
            <strong>Escolas do levantamento</strong>
            <br />
            Belo Horizonte/MG
          </p>
          <p>
            <strong>Ciclo</strong>
            <br />
            2026 · Segunda etapa
          </p>
        </aside>
      </div>
      <section className="container content-space">
        <h2>Cronograma do projeto</h2>
        <Timeline />
      </section>
      <Invite />
    </>
  );
}
