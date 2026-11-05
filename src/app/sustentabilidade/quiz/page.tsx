import { PageIntro } from '@/components/ui';
import { Quiz } from '@/components/learning-tools';
export const metadata = {
  title: 'Quiz de sustentabilidade',
  alternates: { canonical: '/sustentabilidade/quiz' },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="APRENDER BRINCANDO · 4 PERGUNTAS"
        title="Quiz de sustentabilidade"
        description="Quatro perguntas sobre água e sustentabilidade, com explicações para cada resposta."
      />
      <div className="container content-space prose">
        <Quiz />
      </div>
    </>
  );
}
