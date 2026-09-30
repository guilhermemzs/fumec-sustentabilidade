import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageIntro, ActionLink } from '@/components/ui';
import { lessons } from '@/lib/learning';
export const metadata = {
  title: 'Aprender sobre construção sustentável',
  alternates: { canonical: '/sustentabilidade' },
};
export default function Learn() {
  return (
    <>
      <PageIntro
        eyebrow="EXPLORAR · OBSERVAR · APRENDER"
        title="A Engenharia Civil faz parte do seu dia."
        description="Uma biblioteca de perguntas para entender os espaços, cuidar dos recursos e conversar sobre sustentabilidade na escola e em casa."
      />
      <div className="container content-space">
        <div className="checklist-callout" style={{ paddingTop: 0, paddingBottom: 45 }}>
          <div>
            <p className="eyebrow">COMECE PELO LUGAR ONDE VOCÊ APRENDE</p>
            <h3>Minha escola é sustentável?</h3>
            <p>Observe nove temas com o checklist educativo.</p>
          </div>
          <ActionLink href="/sustentabilidade/checklist">Explorar o checklist</ActionLink>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson, i) => (
            <article className="lesson-item" key={lesson.slug}>
              <p className="eyebrow">
                {String(i + 1).padStart(2, '0')} / {lesson.category}
              </p>
              <h2>{lesson.title}</h2>
              <p>{lesson.intro}</p>
              <Link className="text-link" href={'/sustentabilidade/' + lesson.slug}>
                Vamos descobrir <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
        <div className="checklist-callout">
          <div>
            <h3>Vamos testar o que aprendemos?</h3>
            <p>Quatro perguntas, com explicações para cada resposta.</p>
          </div>
          <ActionLink href="/sustentabilidade/quiz" secondary>
            Começar o quiz
          </ActionLink>
        </div>
      </div>
    </>
  );
}
