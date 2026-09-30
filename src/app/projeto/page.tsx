import { PageIntro, Timeline, Invite } from '@/components/ui';
export const metadata = { title: 'O projeto', alternates: { canonical: '/projeto' } };
export default function Project() {
  return (
    <>
      <PageIntro
        eyebrow="ENGENHARIA CIVIL · FUMEC · EXTENSÃO 2026"
        title="Conhecimento que atravessa os muros da universidade."
        description="Construção sustentável e educação ambiental em escolas: uma iniciativa de sete estudantes, feita para aproximar Engenharia Civil e comunidade."
      />
      <div className="container content-space two-columns">
        <article className="prose">
          <h2>Por que a escola?</h2>
          <p>
            Casas, escolas e cidades usam recursos naturais todos os dias. A escola oferece um
            espaço para discutir esses usos, ouvir experiências e aproximar escolhas técnicas de
            situações que os estudantes reconhecem.
          </p>
          <p>
            O projeto surgiu da busca por uma ação extensionista com interação real com a
            comunidade. Depois de pesquisar possibilidades ligadas a resíduos, materiais, drenagem e
            meio ambiente, o grupo escolheu a construção sustentável como eixo para a segunda etapa.
          </p>
          <h2>O que queremos construir</h2>
          <p>
            Queremos mostrar como luz, ventilação, água, materiais e espaços verdes se relacionam
            com conforto, consumo e impactos ambientais. A proposta une atividades adaptadas à
            escola e materiais que podem continuar sendo utilizados por estudantes e professores.
          </p>
          <h2>Uma metodologia que começa ouvindo</h2>
          <ol>
            <li>
              <strong>Pesquisar:</strong> estudar temas e referências da Engenharia Civil.
            </li>
            <li>
              <strong>Escutar:</strong> conhecer o público e a realidade da escola.
            </li>
            <li>
              <strong>Planejar:</strong> definir linguagem, temas e uma atividade viável.
            </li>
            <li>
              <strong>Experimentar:</strong> realizar a ação após alinhamento e confirmação.
            </li>
            <li>
              <strong>Avaliar:</strong> reunir registros, alcance e feedback anônimo.
            </li>
            <li>
              <strong>Compartilhar:</strong> disponibilizar aprendizados e materiais educativos.
            </li>
          </ol>
          <h2>Continuidade além da disciplina</h2>
          <p>
            Este espaço registra a trajetória, reúne conteúdo educativo e permite atualizar os
            resultados. A plataforma deve continuar útil depois da entrega acadêmica.
          </p>
        </article>
        <aside className="aside-note">
          <p className="eyebrow">IDENTIDADE DO PROJETO</p>
          <h2>Engenharia que chega à escola.</h2>
          <p>
            <strong>Instituição de origem</strong>
            <br />
            Universidade FUMEC
          </p>
          <p>
            <strong>Curso</strong>
            <br />
            Engenharia Civil
          </p>
          <p>
            <strong>Grupo</strong>
            <br />7 estudantes
          </p>
          <p>
            <strong>Território</strong>
            <br />
            Belo Horizonte e Região Metropolitana
          </p>
          <p>
            <strong>Ciclo</strong>
            <br />
            2026 · Segunda etapa
          </p>
          <p className="caption">
            Iniciativa desenvolvida por estudantes. Não representa um canal institucional oficial da
            Universidade.
          </p>
        </aside>
      </div>
      <section className="container content-space">
        <h2>Nossa trajetória até aqui.</h2>
        <Timeline />
      </section>
      <Invite />
    </>
  );
}
