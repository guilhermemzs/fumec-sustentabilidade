import Link from 'next/link';
import { PageIntro, ActionLink } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { title: 'Materiais educativos', alternates: { canonical: '/materiais' } };
const localMaterials = [
  {
    title: 'Cartilha · Construção sustentável na escola',
    description:
      'Perguntas, conceitos e atividades para continuar o aprendizado. Material produzido para esta plataforma, em linguagem acessível.',
    href: '/materiais/cartilha.pdf',
    type: 'PDF · CARTILHA EDUCATIVA',
  },
  {
    title: 'Checklist · Minha escola é sustentável?',
    description: 'Roteiro de observação com nove temas. Pode ser impresso e preenchido pela turma.',
    href: '/materiais/checklist.pdf',
    type: 'PDF · ROTEIRO DE OBSERVAÇÃO',
  },
];
export default async function Page() {
  const d = await getProjectData();
  return (
    <>
      <PageIntro
        eyebrow="CONHECIMENTO QUE CONTINUA DEPOIS DO ENCONTRO"
        title="Para aprender, compartilhar e voltar a consultar."
        description="Materiais educativos para estudantes e professores. Use os arquivos em conversas e atividades orientadas, respeitando a segurança e o contexto da escola."
      />
      <div className="container content-space">
        <div className="materials-list">
          {localMaterials.map((m) => (
            <article className="material-row" key={m.href}>
              <div>
                <p className="eyebrow">{m.type}</p>
                <h2>{m.title}</h2>
                <p>{m.description}</p>
              </div>
              <a className="button secondary" href={m.href} download>
                Baixar material ↓
              </a>
            </article>
          ))}
          {d.materials.map((m) => (
            <article className="material-row" key={m.id}>
              <div>
                <p className="eyebrow">{m.type}</p>
                <h2>{m.title}</h2>
                <p>{m.description}</p>
              </div>
              <a
                className="button secondary"
                href={m.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir material ↗
              </a>
            </article>
          ))}
        </div>
        <div className="checklist-callout">
          <div>
            <h3>Prefere explorar na tela?</h3>
            <p>A biblioteca de temas, o checklist e o quiz também estão disponíveis online.</p>
          </div>
          <ActionLink href="/sustentabilidade">Explorar a biblioteca</ActionLink>
        </div>
        <div className="prose">
          <h2>Acervo em construção</h2>
          <p>
            A apresentação original, o documento acadêmico Casa da Terra, registros autorizados de
            atividades e o relatório final serão adicionados quando forem disponibilizados e
            revisados pelo grupo.
          </p>
          <p>
            Esta plataforma não oferece arquivos que ainda não existem. O estudo de caso pode ser
            consultado como{' '}
            <Link href="/casa-da-terra">síntese educativa do contexto fornecido</Link>, com suas
            limitações explicitadas.
          </p>
          <h2>Referências para continuar</h2>
          <p>
            <a href="https://www.fumec.br/" target="_blank" rel="noopener noreferrer">
              Universidade FUMEC
            </a>{' '}
            ·{' '}
            <a href="https://unifei.edu.br/" target="_blank" rel="noopener noreferrer">
              Universidade Federal de Itajubá
            </a>
            . Os links levam às instituições; não são referências completas do estudo Casa da Terra.
          </p>
        </div>
      </div>
    </>
  );
}
