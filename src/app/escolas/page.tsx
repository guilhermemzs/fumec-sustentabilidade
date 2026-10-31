import { PageIntro, Invite } from '@/components/ui';
import { SchoolDirectory, Territory } from '@/components/schools';
import { getProjectData } from '@/lib/data';
import { SchoolVisit } from '@/components/school-visit';
export const revalidate = 60;
export const metadata = { title: 'Projeto nas escolas', alternates: { canonical: '/escolas' } };
export default async function Page() {
  const data = await getProjectData();
  return (
    <>
      <PageIntro
        eyebrow="ECMA · BELO HORIZONTE E NOVA LIMA"
        title="Escolas e contatos"
        description="Escolas da mobilização do projeto: levantamento de setembro e atividade confirmada na E.M. Florie Wanderley Dias, em Nova Lima. Cadastro atualizado em 31 de outubro de 2026."
      />
      <div className="container content-space">
        <SchoolVisit />
        <p className="meta-line">
          {data.stats.registered} escolas no cadastro · {data.stats.participants} com atividade
          confirmada ou realizada · {data.stats.alignment} em alinhamento · {data.stats.meetings}{' '}
          com reunião realizada
        </p>
        <div className="section">
          <Territory schools={data.schools} />
        </div>
        <SchoolDirectory schools={data.schools} />
      </div>
      <Invite />
    </>
  );
}
