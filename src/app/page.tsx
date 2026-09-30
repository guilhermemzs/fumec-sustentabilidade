import Link from 'next/link';
import { ArrowRight, Droplets, Wind, Layers3 } from 'lucide-react';
import { SchoolDrawing } from '@/components/school-drawing';
import { ActionLink, Invite, Timeline } from '@/components/ui';
import { getProjectData } from '@/lib/data';
export const revalidate = 60;
export const metadata = { alternates: { canonical: '/' } };
export default async function Home() {
  const data = await getProjectData();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Entre · universidade & escola',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fumec-sustentabilidade.vercel.app',
    inLanguage: 'pt-BR',
    description:
      'Projeto de Extensão de estudantes de Engenharia Civil da Universidade FUMEC: construção sustentável e educação ambiental em escolas.',
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-label">
            <span className="status-dot" />
            PROJETO DE EXTENSÃO <span>2026 / 2ª ETAPA</span>
          </div>
          <h1>
            Construir um futuro
            <br />
            começa <em>na escola.</em>
          </h1>
          <p className="hero-description">
            Engenharia que sai da universidade e chega à escola. Conhecimento para repensar os
            espaços em que aprendemos, vivemos e construímos.
          </p>
          <div className="hero-actions">
            <ActionLink href="/projeto">Conheça o projeto</ActionLink>
            <Link className="text-link" href="/sustentabilidade">
              Explore e aprenda <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-signature">
            <span className="technical-cross" aria-hidden="true">
              +
            </span>
            <span>
              ENGENHARIA CIVIL
              <br />
              <strong>Universidade FUMEC · Belo Horizonte</strong>
            </span>
          </div>
        </div>
        <div className="hero-illustration">
          <SchoolDrawing />
          <div className="drawing-caption">
            <span>FIG. 01</span> A escola como um sistema vivo <span>ILUSTRAÇÃO CONCEITUAL</span>
          </div>
        </div>
      </section>
      <section className="fact-band" aria-label="Contexto da iniciativa">
        <div className="container facts">
          <div>
            <strong>~200</strong>
            <span>
              escolas contatadas<small>Estimativa da mobilização</small>
            </span>
          </div>
          <div>
            <strong>07</strong>
            <span>
              estudantes de Engenharia Civil<small>Um projeto construído em grupo</small>
            </span>
          </div>
          <div>
            <strong>{String(data.stats.alignment).padStart(2, '0')}</strong>
            <span>
              escolas em alinhamento
              <small>
                {data.source === 'snapshot'
                  ? 'Registro de 30/09/2026'
                  : 'Cadastros públicos no banco'}
              </small>
            </span>
          </div>
        </div>
      </section>
      <section className="section container intro-split">
        <div>
          <p className="eyebrow">01 / DA UNIVERSIDADE PARA A COMUNIDADE</p>
          <h2>
            A sustentabilidade
            <br />
            mora nas <em>boas perguntas.</em>
          </h2>
        </div>
        <div className="intro-text">
          <p>
            Por onde entra a luz? Para onde vai a água da chuva? O que acontece com os materiais que
            descartamos?
          </p>
          <p>
            Somos sete estudantes de Engenharia Civil da Universidade FUMEC. Aproximamos esses temas
            do cotidiano escolar, com escuta, experiências e conteúdo que continua útil depois do
            encontro.
          </p>
          <Link className="text-link" href="/projeto">
            Entenda nossa proposta <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="learning-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / CONHECIMENTO PARA LEVAR COM VOCÊ</p>
              <h2>
                O espaço ensina.
                <br />
                Vamos aprender a observá-lo?
              </h2>
            </div>
            <Link className="text-link" href="/sustentabilidade">
              Todos os temas <ArrowRight size={18} />
            </Link>
          </div>
          <div className="topic-grid">
            {[
              {
                title: 'Água & território',
                icon: Droplets,
                n: '01',
                text: 'Da nascente ao pátio: descubra os caminhos da água e o papel do solo.',
                href: '/sustentabilidade/agua-da-chuva',
                color: 'water',
              },
              {
                title: 'Luz, ar & conforto',
                icon: Wind,
                n: '02',
                text: 'Entenda como os espaços podem aproveitar luz e ventilação natural.',
                href: '/sustentabilidade/ventilacao-natural',
                color: 'air',
              },
              {
                title: 'Materiais & novos ciclos',
                icon: Layers3,
                n: '03',
                text: 'Conheça a história dos materiais e as possibilidades do reaproveitamento.',
                href: '/sustentabilidade/residuo-material',
                color: 'earth',
              },
            ].map((t) => (
              <Link key={t.n} href={t.href} className={'topic ' + t.color}>
                <div className="topic-top">
                  <t.icon size={36} strokeWidth={1.3} />
                  <span>{t.n}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <span className="topic-bottom">
                  Explorar o tema <ArrowRight size={20} />
                </span>
              </Link>
            ))}
          </div>
          <div className="checklist-callout">
            <div>
              <span className="eyebrow">OBSERVAR → CONVERSAR → TRANSFORMAR</span>
              <h3>Minha escola é sustentável?</h3>
              <p>Um checklist para iniciar uma conversa com a sua turma.</p>
            </div>
            <ActionLink href="/sustentabilidade/checklist" secondary>
              Faça a observação
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / UMA TRAJETÓRIA EM CONSTRUÇÃO</p>
            <h2>
              O impacto começa
              <br />
              com o diálogo.
            </h2>
          </div>
          <Link className="text-link" href="/impacto">
            Acompanhe a jornada <ArrowRight size={18} />
          </Link>
        </div>
        <Timeline />
        <p className="source-note">
          As etapas futuras são propostas. Atividades, turmas e estudantes alcançados serão
          registrados após sua realização.
        </p>
      </section>
      <section className="case-teaser">
        <div className="container case-inner">
          <div className="case-formula" aria-label="Solo mais cimento mais água mais vidro moído">
            <span>Solo</span>
            <b>+</b>
            <span>Cimento</span>
            <b>+</b>
            <span>Água</span>
            <b>+</b>
            <span>Vidro moído</span>
            <span className="formula-result">
              ↓<br />
              Uma pergunta de pesquisa
            </span>
          </div>
          <div>
            <p className="eyebrow">04 / ESTUDO DE CASO · REFERÊNCIA ACADÊMICA</p>
            <h2>
              O que um resíduo
              <br />
              pode se tornar?
            </h2>
            <p>
              O estudo Casa da Terra, associado à UNIFEI, nos ajuda a conversar sobre pesquisa,
              solo-cimento e reaproveitamento de vidro.
            </p>
            <p className="caption">
              Referência externa. Não é um projeto desenvolvido pelo nosso grupo.
            </p>
            <ActionLink href="/casa-da-terra" secondary>
              Conheça o estudo
            </ActionLink>
          </div>
        </div>
      </section>
      <Invite />
    </>
  );
}
