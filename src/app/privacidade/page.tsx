import { PageIntro } from '@/components/ui';
export const metadata = { title: 'Privacidade', alternates: { canonical: '/privacidade' } };
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="CUIDADO COM DADOS · REFERÊNCIA 30/09/2026"
        title="Respeitar as pessoas faz parte do projeto."
        description="Esta página explica como a plataforma utiliza dados de contato, registros institucionais e informações de navegação."
      />
      <article className="container content-space prose">
        <h2>Contato e finalidade</h2>
        <p>
          O formulário solicita nome, instituição, e-mail e mensagem para que o grupo de estudantes
          responsável pelo projeto possa avaliar e responder a contatos. O consentimento é
          registrado no envio. Os dados não aparecem publicamente e ficam restritos à gestão
          autenticada.
        </p>
        <p>
          Para solicitar acesso, correção ou exclusão de uma mensagem, utilize o mesmo formulário
          com o e-mail originalmente informado. A equipe deve verificar a solicitação antes de
          atendê-la.
        </p>
        <h2>Armazenamento e acesso</h2>
        <p>
          Mensagens são armazenadas no PostgreSQL fornecido pelo Neon, com o aplicativo hospedado na
          Vercel. A equipe deve restringir o acesso e revisar periodicamente a necessidade de
          retenção, removendo os contatos quando a finalidade for encerrada.
        </p>
        <h2>Segurança e sessões</h2>
        <p>
          A área administrativa usa cookie de sessão necessário, com duração máxima de oito horas.
          Para limitar abuso, o sistema mantém contadores associados a uma representação
          criptográfica do endereço de conexão, sem registrar o endereço bruto nessa tabela. Os
          contadores expiram após uma hora e podem ser limpos pela equipe.
        </p>
        <h2>Crianças e adolescentes</h2>
        <p>
          Não solicitamos nomes de estudantes, contatos, informações sensíveis ou avaliações
          associadas à identidade. Feedbacks são anônimos. Imagens identificáveis de menores não
          devem ser publicadas sem autorização adequada e revisão do grupo.
        </p>
        <h2>Conteúdo institucional</h2>
        <p>
          O cadastro público utiliza nomes de instituições e sínteses de estados de contato. Não
          publica conversas integrais, e-mails pessoais, nomes de responsáveis ou telefones
          extraídos da mobilização.
        </p>
        <h2>Navegação e mapa</h2>
        <p>
          O checklist e o quiz mantêm respostas apenas na página, sem enviá-las ao servidor. O mapa
          carrega recursos do OpenStreetMap somente quando ativado. As fontes são servidas pela
          própria aplicação, sem consultar o Google Fonts durante a visita.
        </p>
        <p>
          Na hospedagem Vercel, Analytics e Speed Insights registram informações agregadas de uso e
          desempenho. Esses provedores também podem tratar registros técnicos necessários ao
          funcionamento dos serviços. Não incluímos o conteúdo dos formulários nos eventos de
          análise.
        </p>
        <h2>Responsabilidade pela gestão</h2>
        <p>
          A plataforma é uma iniciativa estudantil, e não um canal institucional oficial da
          Universidade FUMEC. O grupo é responsável por acompanhar solicitações e manter estas
          informações atualizadas.
        </p>
      </article>
    </>
  );
}
