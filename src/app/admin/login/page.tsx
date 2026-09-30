import { redirect } from 'next/navigation';
import { PageIntro } from '@/components/ui';
import { AdminLogin } from '@/components/admin-login';
import { isAdmin, adminConfigured } from '@/lib/security';
export const metadata = { title: 'Acesso à gestão', robots: { index: false, follow: false } };
export default async function Page() {
  if (await isAdmin()) redirect('/admin');
  return (
    <>
      <PageIntro
        eyebrow="ÁREA RESTRITA · EQUIPE DO PROJETO"
        title="Cuidar da trajetória."
        description="Acesso protegido para atualizar escolas, atividades, materiais e resultados."
      />
      <div className="container content-space prose">
        {!adminConfigured() ? (
          <div className="notice warning">
            O acesso administrativo ainda está em configuração. O conteúdo público continua
            disponível.
          </div>
        ) : null}
        <AdminLogin enabled={adminConfigured()} />
      </div>
    </>
  );
}
