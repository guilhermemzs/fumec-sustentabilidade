import { PageIntro } from '@/components/ui';
import { projectSources, referenceGroups } from '@/lib/learning-sources';

export const metadata = {
  title: 'Referências e fontes',
  alternates: { canonical: '/referencias' },
};

const groups = [
  { title: 'Documentos e registros do ECMA', sources: projectSources },
  ...referenceGroups,
];

export default function References() {
  return (
    <>
      <PageIntro
        eyebrow="ECMA · FONTES DO SITE"
        title="Referências e fontes"
        description="Documentos da equipe que registram o projeto e fontes de apoio para os textos sobre construção sustentável e educação ambiental."
      />
      <div className="container content-space">
        {groups.map((group) => (
          <section className="prose" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href}>{source.title}</a>
                  <p>{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
