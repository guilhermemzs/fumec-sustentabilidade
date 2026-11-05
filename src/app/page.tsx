import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ActionLink, Invite } from '@/components/ui';
import { getProjectData } from '@/lib/data';
import { portraits } from '@/lib/team';
import { TeamPortraits } from '@/components/team-portraits';
import { SchoolVisit } from '@/components/school-visit';

export const revalidate = 60;
export const metadata = { alternates: { canonical: '/' } };

export default async function Home() {
  const data = await getProjectData();
  const membersWithoutPortrait = data.members.filter(
    (member) => !portraits[member.name] || !member.photoUrl,
  );
  const additionalNames = new Intl.ListFormat('pt-BR').format(
    membersWithoutPortrait.map((member) => member.name),
  );
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ECMA · Entre Construção e Meio Ambiente',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fumec-sustentabilidade.vercel.app',
    inLanguage: 'pt-BR',
    description:
      'Resultados do ECMA, projeto de extensão de Engenharia Civil da Universidade FUMEC sobre construção sustentável e educação ambiental.',
  };
  const mobilization = [
    [data.stats.registered, 'Escolas no cadastro'],
    [data.stats.meetings, 'Escolas com reunião realizada'],
    [data.stats.alignment, 'Escolas em alinhamento'],
  ];

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
            Resultados do <em>projeto ECMA</em>
          </h1>
          <p className="hero-description">
            Acompanhe os resultados do levantamento com as escolas e as atividades presenciais de
            educação ambiental do projeto Entre Construção e Meio Ambiente, da Universidade FUMEC.
          </p>
          <div className="hero-actions">
            <ActionLink href="/impacto">Ver resultados</ActionLink>
            <Link className="text-link" href="/projeto">
              Conheça o projeto <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <figure className="hero-illustration board-photo">
          <Image
            src="/images/tabuleiro-ecma.png"
            width={1280}
            height={720}
            sizes="(max-width: 600px) 92vw, (max-width: 920px) 540px, 48vw"
            alt="Tabuleiro colorido com 27 casas e desafios sobre água, energia e resíduos em uma obra."
            preload
          />
          <figcaption>
            Jogo de tabuleiro preparado pela equipe ECMA para a atividade presencial.
          </figcaption>
        </figure>
      </section>
      <section className="fact-band" aria-label="Resultados da mobilização escolar">
        <div className="container facts">
          {mobilization.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>
                {label}
                <small>Levantamento de 31/10/2026</small>
              </span>
            </div>
          ))}
        </div>
      </section>
      <div className="container visit-space">
        <SchoolVisit />
      </div>
      <section className="section container intro-split">
        <div>
          <p className="eyebrow">EXTENSÃO UNIVERSITÁRIA</p>
          <h2>
            Engenharia Civil e
            <br />
            <em>meio ambiente.</em>
          </h2>
        </div>
        <div className="intro-text">
          <p>
            O ECMA reúne sete estudantes de Engenharia Civil da Universidade FUMEC. O projeto
            aproxima a construção sustentável do cotidiano escolar com exemplos sobre água, energia,
            materiais e resíduos.
          </p>
          <Link className="text-link" href="/projeto">
            Saiba como funciona o projeto <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="learning-section section">
        <div className="container intro-split">
          <div>
            <p className="eyebrow">APRENDER</p>
            <h2>Da visita ao cotidiano da escola</h2>
          </div>
          <div className="intro-text">
            <p>
              O acervo do ECMA reúne leituras e atividades para as escolas retomarem os temas da
              visita ao longo do ano.
            </p>
            <ActionLink href="/sustentabilidade">Acessar o acervo</ActionLink>
          </div>
        </div>
      </section>
      {data.members.length ? (
        <section className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ECMA · ENTRE CONSTRUÇÃO E MEIO AMBIENTE</p>
              <h2>Equipe ECMA</h2>
            </div>
            <Link className="text-link" href="/equipe">
              Conheça a equipe <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <TeamPortraits members={data.members} />
          {additionalNames ? (
            <p className="source-note">Integrantes da equipe: {additionalNames}.</p>
          ) : null}
        </section>
      ) : null}
      <Invite />
    </>
  );
}
