import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ECMA · Entre Construção e Meio Ambiente',
    short_name: 'ECMA',
    lang: 'pt-BR',
    description: 'Projeto de Extensão · Engenharia Civil · FUMEC',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f5ed',
    theme_color: '#193d2b',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
