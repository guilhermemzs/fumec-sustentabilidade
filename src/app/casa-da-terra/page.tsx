import { PageIntro, ActionLink } from '@/components/ui';
export const metadata = {
  title: 'Casa da Terra — referência acadêmica',
  alternates: { canonical: '/casa-da-terra' },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="ESTUDO DE CASO / REFERÊNCIA ACADÊMICA · UNIFEI"
        title="Resíduo → tecnologia → construção → sustentabilidade."
        description="A Casa da Terra ajuda a formular uma pergunta: é possível transformar um resíduo em parte de um novo material de construção?"
      />
      <div className="container content-space">
        <div className="notice warning">
          <strong>Referência externa.</strong> O estudo está associado à Universidade Federal de
          Itajubá — UNIFEI. Não foi desenvolvido pelo nosso grupo da FUMEC. Esta síntese utiliza o
          contexto fornecido pelo grupo; o documento original ainda não foi disponibilizado nesta
          plataforma.
        </div>
        <div className="two-columns">
          <article className="prose">
            <h2>Uma mistura, várias perguntas</h2>
            <p>
              O material apresentado discute tijolos de solo-cimento com incorporação de vidro
              moído. Solo, cimento, água e resíduo de vidro são combinados para investigar
              possibilidades de reaproveitamento na construção.
            </p>
            <h2>O caminho da pesquisa</h2>
            <ol>
              <li>Coleta e preparo do solo, incluindo peneiramento.</li>
              <li>Dosagem de solo e cimento.</li>
              <li>Coleta, moagem e peneiramento do vidro.</li>
              <li>Fabricação e cura dos tijolos.</li>
              <li>Ensaios laboratoriais de resistência à compressão e absorção de água.</li>
            </ol>
            <p>
              O contexto fornecido menciona misturas com aproximadamente 6%, 8% e 10% de vidro e
              avaliações aos 7, 14 e 28 dias. Essas informações descrevem a investigação; não são
              uma receita de construção.
            </p>
            <h2>O que podemos aprender</h2>
            <p>
              A incorporação de um resíduo precisa ser avaliada em diferentes propriedades. Não é
              correto concluir que vidro sempre melhora um tijolo. Dosagem, processo, cura e uso
              previsto influenciam o desempenho.
            </p>
            <p>
              A principal contribuição educativa é mostrar como uma pergunta ambiental pode se
              transformar em pesquisa e desenvolvimento de materiais. Reaproveitamento e segurança
              precisam caminhar juntos.
            </p>
            <div className="notice warning">
              Vidro quebrado e moído exige manipulação especializada. A experiência proposta para
              estudantes é de discussão e representação, sem moagem ou manuseio de vidro.
            </div>
            <ActionLink href="/sustentabilidade/residuo-material">
              Aprenda sobre novos ciclos
            </ActionLink>
          </article>
          <aside className="aside-note">
            <p className="eyebrow">UMA PERGUNTA PARA A TURMA</p>
            <h2>Qual é a próxima vida de um material?</h2>
            <p>
              Escolha um material descartado. Desenhe um possível novo uso e liste o que precisaria
              ser pesquisado para torná-lo seguro e adequado.
            </p>
            <p>
              <strong>Solo + cimento + água + vidro moído</strong>
              <br />
              Uma composição experimental, sujeita a avaliação técnica.
            </p>
            <p className="caption">
              A referência completa, autores e arquivo acadêmico serão adicionados quando o grupo
              disponibilizar o documento original.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
