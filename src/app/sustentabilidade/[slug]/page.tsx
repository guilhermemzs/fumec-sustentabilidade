import { notFound } from 'next/navigation';
import Link from 'next/link';
import { lessons } from '@/lib/learning';
import { PageIntro, ActionLink } from '@/components/ui';
export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  return {
    title: lesson?.title ?? 'Conteúdo não encontrado',
    description: lesson?.intro,
    alternates: { canonical: '/sustentabilidade/' + slug },
  };
}
export default async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) notFound();
  return (
    <>
      <PageIntro eyebrow={lesson.category} title={lesson.title} description={lesson.intro} />
      <div className="container content-space two-columns">
        <article className="prose">
          <Link className="back-link" href="/sustentabilidade">
            ← Voltar aos temas
          </Link>
          {lesson.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <div className="result-panel">
            <h2>Para levar com você</h2>
            <p>{lesson.takeaway}</p>
          </div>
          <div className="lesson-navigation">
            <ActionLink href="/sustentabilidade/quiz">Experimente o quiz</ActionLink>
          </div>
        </article>
        <aside className="aside-note">
          <p className="eyebrow">UMA ATIVIDADE PARA A TURMA</p>
          <h2>Do texto ao espaço.</h2>
          <p>{lesson.activity}</p>
          <p className="caption">
            Converse com um professor. As atividades são educativas e não autorizam intervenções
            técnicas no edifício.
          </p>
        </aside>
      </div>
    </>
  );
}
