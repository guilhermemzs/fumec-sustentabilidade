import type { Metadata } from 'next';
import { DM_Sans, Newsreader } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/ui';
import './globals.css';
const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://fumec-sustentabilidade.vercel.app';
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: 'ECMA — Entre Construção e Meio Ambiente | Extensão FUMEC',
    template: '%s | ECMA · Extensão FUMEC',
  },
  description:
    'Projeto de Extensão de estudantes de Engenharia Civil da Universidade FUMEC: construção sustentável, educação ambiental e diálogo com escolas de Belo Horizonte e região.',
  keywords: [
    'Projeto de Extensão FUMEC',
    'Engenharia Civil FUMEC',
    'Construção sustentável',
    'Educação ambiental',
    'Sustentabilidade nas escolas',
    'Belo Horizonte',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ECMA · Entre Construção e Meio Ambiente',
  },
  twitter: { card: 'summary_large_image' },
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={sans.variable + ' ' + serif.variable}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Navigation />
        <main id="conteudo">{children}</main>
        <Footer />
        {process.env.VERCEL ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
