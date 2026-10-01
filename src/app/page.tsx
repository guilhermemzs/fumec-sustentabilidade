import Link from 'next/link';
import { ArrowRight, Droplets, Wind, Layers3 } from 'lucide-react';
import { SchoolDrawing } from '@/components/school-drawing';
import { ActionLink, Invite, Timeline } from '@/components/ui';
import { getProjectData } from '@/lib/data';
import { TeamPortraits } from '@/components/team-portraits';
export const revalidate = 60;
export const metadata = { alternates: { canonical: '/' } };
export default async function Home() {
  const data = await getProjectData();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ECMA · Entre Construção e Meio Ambiente',
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
            Construção sustentável
            <br />
            <em>na escola.</em>
          </h1>
          <p className="hero-description">
            ECMA — Entre Construção e Meio Ambiente. Projeto de Extensão de estudantes de Engenharia
            Civil da Universidade FUMEC.
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
        </div>
      </section>
      <section className="fact-band" aria-label="Contexto da iniciativa">
        <div className="container facts">
          <div>
            <strong>{data.stats.replies}</strong>
            <span>
              escolas com resposta<small>Levantamento de 30/09/2026</small>
            </span>
          </div>
          <div>
            <strong>07</strong>
            <span>
              estudantes de Engenharia Civil<small>Universidade FUMEC</small>
            </span>
          </div>
          <div>
            <strong>{String(data.stats.alignment).padStart(2, '0')}</strong>
            <span>
              escolas em alinhamento
              <small>Levantamento de 30/09/2026</small>
            </span>
          </div>
        </div>
      </section>
      <section className="section container intro-split">
        <div>
          <p className="eyebrow">01 / O PROJETO</p>
          <h2>
            Engenharia Civil e
            <br />
            <em>meio ambiente.</em>
          </h2>
        </div>
        <div className="intro-text">
          <p>
            Por onde entra a luz? Para onde vai a água da chuva? O que acontece com os materiais que
            descartamos?
          </p>
          <p>
            Somos sete estudantes de Engenharia Civil da Universidade FUMEC. O projeto aborda água,
            energia, materiais e resíduos no cotidiano escolar.
          </p>
          <Link className="text-link" href="/projeto">
            Entenda nossa proposta <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      {data.members.some((m) => m.photoUrl) ? (
        <section className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ECMA · ENTRE CONSTRUÇÃO E MEIO AMBIENTE</p>
              <h2>Equipe ECMA</h2>
            </div>
            <Link className="text-link" href="/equipe">
              Conheça a equipe <ArrowRight size={18} />
            </Link>
          </div>
          <TeamPortraits members={data.members} />
          <p className="source-note">
            Integrantes em um registro acadêmico anterior. O projeto atual reúne sete estudantes de
            Engenharia Civil.
          </p>
        </section>
      ) : null}
      <section className="learning-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / TEMAS EDUCATIVOS</p>
              <h2>
                Construção sustentável
                <br />
                no cotidiano.
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
            <p className="eyebrow">03 / ESCOLAS</p>
            <h2>Mobilização das escolas</h2>
          </div>
          <Link className="text-link" href="/impacto">
            Ver os registros <ArrowRight size={18} />
          </Link>
        </div>
        <Timeline />
      </section>
      <Invite />
    </>
  );
}
