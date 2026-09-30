import { PageIntro } from '@/components/ui';
import { Checklist } from '@/components/learning-tools';
export const metadata = {
  title: 'Minha escola é sustentável? — Checklist',
  alternates: { canonical: '/sustentabilidade/checklist' },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="ROTEIRO DE OBSERVAÇÃO · PARA ESTUDANTES E PROFESSORES"
        title="Minha escola é sustentável?"
        description="Percorra nove temas, observe o que já existe e descubra novas perguntas. A ideia é iniciar uma conversa, sem atribuir uma certificação ao espaço."
      />
      <div className="container content-space prose">
        <Checklist />
      </div>
    </>
  );
}
