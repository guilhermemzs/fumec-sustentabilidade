import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ActionLink, PageIntro } from '@/components/ui';
import { lessons } from '@/lib/learning';
export const metadata = {
  title: 'Aprender com o ECMA',
  alternates: { canonical: '/sustentabilidade' },
};
export default function Learn() {
  return (
    <>
      <PageIntro
        eyebrow="ECMA · ACERVO PARA AS ESCOLAS"
        title="Aprender com o ECMA"
        description="Leituras e atividades para educadores retomarem, depois da visita, temas como água, energia e resíduos e investigarem com as turmas como a escola usa esses recursos."
      />
      <div className="container content-space">
        <section aria-labelledby="atividades">
          <h2 id="atividades">Atividades para retomar com a turma</h2>
          <div className="materials-list">
            <article className="material-row">
              <div>
                <h3>Minha escola é sustentável?</h3>
                <p>
                  O checklist orienta a observação de nove temas na escola. A turma pode registrar o
                  que encontrou no caderno e escolher uma melhoria para discutir em grupo.
                </p>
              </div>
              <ActionLink href="/sustentabilidade/checklist" secondary>
                Abrir checklist
              </ActionLink>
            </article>
            <article className="material-row">
              <div>
                <h3>Quiz de sustentabilidade</h3>
                <p>
                  Quatro perguntas com explicações para revisar o tema. O educador também pode ler
                  as perguntas em voz alta e conversar com a turma sobre as respostas.
                </p>
              </div>
              <ActionLink href="/sustentabilidade/quiz" secondary>
                Abrir quiz
              </ActionLink>
            </article>
          </div>
        </section>
        <section className="section" aria-labelledby="leituras">
          <h2 id="leituras">Leituras e propostas de atividades</h2>
          <div className="lesson-grid">
            {lessons.map((lesson, i) => (
              <article className="lesson-item" key={lesson.slug}>
                <p className="eyebrow">
                  {String(i + 1).padStart(2, '0')} / {lesson.category}
                </p>
                <h2>{lesson.title}</h2>
                <p>{lesson.intro}</p>
                <Link className="text-link" href={'/sustentabilidade/' + lesson.slug}>
                  Ler sobre o tema <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
