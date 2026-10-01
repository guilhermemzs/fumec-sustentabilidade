import { PageIntro } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Contato', alternates: { canonical: '/contato' } };
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="ECMA · CONTATO"
        title="Entre em contato"
        description="Conte um pouco sobre a instituição, os estudantes e os temas que fazem sentido para a comunidade escolar."
      />
      <div className="container content-space two-columns">
        <ContactForm enabled={Boolean(process.env.DATABASE_URL && process.env.RATE_LIMIT_SECRET)} />
        <aside className="aside-note">
          <p className="eyebrow">COMUNIDADE ESCOLAR</p>
          <h2>Contato com o grupo</h2>
          <p>Informe a instituição e o assunto da mensagem para conversar com a equipe ECMA.</p>
          <p className="caption">
            Canal voltado a educadores e responsáveis por instituições. Não solicitamos dados
            individuais de crianças e adolescentes.
          </p>
        </aside>
      </div>
    </>
  );
}
