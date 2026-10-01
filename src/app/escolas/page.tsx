import { PageIntro, Invite } from '@/components/ui';
import { SchoolDirectory, Territory } from '@/components/schools';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { title: 'Projeto nas escolas', alternates: { canonical: '/escolas' } };
export default async function Page() {
  const data = await getProjectData();
  return (
    <>
      <PageIntro
        eyebrow="ECMA · BELO HORIZONTE"
        title="Escolas e contatos"
        description="Instituições que responderam à mobilização do projeto, com endereços e estados de contato do levantamento de 30 de setembro de 2026."
      />
      <div className="container content-space">
        <p className="meta-line">
          {data.stats.replies} escolas com resposta · {data.stats.alignment} em alinhamento ·{' '}
          {data.stats.meetings} com reunião realizada
        </p>
        <SchoolDirectory schools={data.schools} />
        {data.schools.some((s) => s.latitude !== null && s.longitude !== null) ? (
          <div className="section">
            <Territory schools={data.schools} />
          </div>
        ) : null}
      </div>
      <Invite />
    </>
  );
}
