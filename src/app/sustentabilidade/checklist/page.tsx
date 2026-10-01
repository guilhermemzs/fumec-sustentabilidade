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
        description="Observe luz, ventilação, água, energia e outros temas com a turma e um professor."
      />
      <div className="container content-space prose">
        <Checklist />
      </div>
    </>
  );
}
