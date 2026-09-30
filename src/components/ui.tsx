import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { timeline } from '@/lib/project';
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </div>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={secondary ? 'button secondary' : 'button'}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Timeline() {
  return (
    <ol className="timeline">
      {timeline.map((step, i) => (
        <li key={step.title}>
          <span className="timeline-number">0{i + 1}</span>
          <p className="eyebrow">{step.date}</p>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          <span className={step.state === 'prevista' ? 'badge muted' : 'badge'}>{step.state}</span>
        </li>
      ))}
    </ol>
  );
}
export function Invite() {
  return (
    <section className="invite">
      <div className="container invite-inner">
        <div>
          <p className="eyebrow">UMA CONVERSA PODE SER O COMEÇO</p>
          <h2>
            Vamos construir essa
            <br />
            ideia com a sua escola?
          </h2>
          <p>A atividade começa ouvindo as necessidades da comunidade escolar.</p>
        </div>
        <ActionLink href="/contato">Converse com o grupo</ActionLink>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <span className="footer-brand">entre.</span>
          <p>
            Engenharia que sai da universidade
            <br />e chega à escola.
          </p>
        </div>
        <div>
          <p className="eyebrow">PROJETO DE EXTENSÃO · 2026</p>
          <p>
            Estudantes de Engenharia Civil
            <br />
            Universidade FUMEC · Belo Horizonte/MG
          </p>
          <p className="caption">
            Iniciativa estudantil. Este não é um site institucional oficial da Universidade.
          </p>
        </div>
        <nav aria-label="Links do rodapé">
          <Link href="/equipe">Equipe</Link>
          <Link href="/casa-da-terra">Casa da Terra</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/admin">Gestão interna</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>Conhecimento que encontra o território.</span>
        <span>Construção sustentável & educação ambiental</span>
      </div>
    </footer>
  );
}
