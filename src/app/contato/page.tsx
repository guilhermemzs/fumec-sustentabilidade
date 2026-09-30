import { PageIntro } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Contato', alternates: { canonical: '/contato' } };
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="UMA PROPOSTA COMEÇA COM UMA CONVERSA"
        title="Sua escola tem uma pergunta? Vamos ouvir."
        description="Conte um pouco sobre a instituição, os estudantes e os temas que fazem sentido para a comunidade escolar."
      />
      <div className="container content-space two-columns">
        <ContactForm enabled={Boolean(process.env.DATABASE_URL && process.env.RATE_LIMIT_SECRET)} />
        <aside className="aside-note">
          <p className="eyebrow">CONSTRUIR JUNTOS</p>
          <h2>O território orienta a proposta.</h2>
          <p>
            Idades, turnos, espaços e questões ambientais locais ajudam a adaptar a atividade. O
            envio de uma mensagem não confirma parceria ou agendamento.
          </p>
          <p>
            As mensagens ficam disponíveis à equipe na área de gestão. O retorno depende do
            acompanhamento do grupo.
          </p>
          <p className="caption">
            Canal voltado a educadores e responsáveis por instituições. Não solicitamos dados
            individuais de crianças e adolescentes.
          </p>
        </aside>
      </div>
    </>
  );
}
