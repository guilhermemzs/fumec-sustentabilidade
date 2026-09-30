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
        title="Uma pergunta leva a outra."
        description="Explore o que você aprendeu sobre água, materiais e escolhas sustentáveis. O quiz não coleta dados nem envia suas respostas."
      />
      <div className="container content-space prose">
        <Quiz />
      </div>
    </>
  );
}
