import { PageIntro, ActionLink } from '@/components/ui';
export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 · ESSE CAMINHO AINDA NÃO EXISTE"
        title="Vamos encontrar outra entrada?"
        description="A página não foi encontrada. Você pode voltar ao início ou explorar os conteúdos educativos."
      />
      <div className="container content-space inline-actions">
        <ActionLink href="/">Voltar ao início</ActionLink>
        <ActionLink href="/sustentabilidade" secondary>
          Explorar os temas
        </ActionLink>
      </div>
    </>
  );
}
