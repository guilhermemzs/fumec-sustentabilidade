import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageIntro } from '@/components/ui';
import { lessons } from '@/lib/learning';
export const metadata = {
  title: 'Referências sobre construção sustentável',
  alternates: { canonical: '/sustentabilidade' },
};
export default function Learn() {
  return (
    <>
      <PageIntro
        eyebrow="ECMA · TEXTOS DE APOIO"
        title="Temas de construção sustentável"
        description="Textos de referência sobre os temas abordados pelo projeto ECMA."
      />
      <div className="container content-space">
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
      </div>
    </>
  );
}
