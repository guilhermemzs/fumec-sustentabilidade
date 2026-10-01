import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { timeline } from '@/lib/project';
import { UniversitySignature } from './university-signature';
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
          <span className="timeline-number">{String(i + 1).padStart(2, '0')}</span>
          <p className="eyebrow">{step.date}</p>
          <h3>{step.title}</h3>
          {step.text ? <p>{step.text}</p> : null}
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
          <p className="eyebrow">CONTATO</p>
          <h2>Converse com a equipe ECMA.</h2>
          <p>Canal para educadores e responsáveis por instituições.</p>
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
          <span className="footer-brand">ECMA.</span>
          <p>
            Entre Construção e Meio Ambiente
            <br />
            Projeto de Extensão · 2026
          </p>
        </div>
        <div>
          <UniversitySignature />
          <p className="eyebrow">PROJETO DE EXTENSÃO · 2026</p>
          <p>
            Estudantes de Engenharia Civil
            <br />
            Universidade FUMEC · Belo Horizonte/MG
          </p>
        </div>
        <nav aria-label="Links do rodapé">
          <Link href="/equipe">Equipe</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/admin">Gestão interna</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>ECMA · Entre Construção e Meio Ambiente</span>
        <span>Construção sustentável & educação ambiental</span>
      </div>
    </footer>
  );
}
