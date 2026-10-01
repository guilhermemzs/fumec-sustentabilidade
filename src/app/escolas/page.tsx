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
        eyebrow="ESCUTA · CONTATO · CONSTRUÇÃO CONJUNTA"
        title="Cada escola, um contexto. Cada conversa, uma possibilidade."
        description="A proposta se adapta às faixas etárias, aos espaços e aos temas relevantes para a comunidade. Conheça o estado dos diálogos registrados."
      />
      <div className="container content-space">
        <div className="notice">
          Interesse e alinhamento não significam parceria confirmada ou atividade realizada. Esta
          lista reúne um recorte dos retornos informados pelo grupo, não todas as escolas da
          campanha.
        </div>
        <p className="meta-line">
          Levantamento de 30/09/2026 · {data.stats.replies} escolas com resposta ·{' '}
          {data.stats.alignment} em alinhamento · {data.stats.meetings} com reunião realizada.
          Endereços e estados fornecidos pelo grupo.
        </p>
        {data.source === 'snapshot' ? (
          <p className="meta-line">
            Fonte: informações fornecidas pelo grupo · referência: 30/09/2026. Atualizações do banco
            estão indisponíveis.
          </p>
        ) : null}
        <SchoolDirectory schools={data.schools} />
        <div className="section">
          <Territory schools={data.schools} />
        </div>
        <h2>Uma proposta que respeita a realidade.</h2>
        <div className="small-grid">
          <div>
            <h3>Educação infantil</h3>
            <p>
              Histórias, observação visual e experiências lúdicas, com a participação de educadores.
            </p>
          </div>
          <div>
            <h3>Ensino fundamental</h3>
            <p>Perguntas sobre água, materiais, luz e os espaços que fazem parte do cotidiano.</p>
          </div>
          <div>
            <h3>Território e comunidade</h3>
            <p>Nascentes, hortas, resíduos e outras questões locais ajudam a orientar o diálogo.</p>
          </div>
        </div>
      </div>
      <Invite />
    </>
  );
}
