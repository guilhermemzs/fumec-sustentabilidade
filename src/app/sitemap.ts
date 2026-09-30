import type { MetadataRoute } from 'next';
import { lessons } from '@/lib/learning';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://fumec-sustentabilidade.vercel.app';
  return [
    '',
    '/projeto',
    '/sustentabilidade',
    '/escolas',
    '/impacto',
    '/casa-da-terra',
    '/materiais',
    '/equipe',
    '/contato',
    '/privacidade',
    '/sustentabilidade/checklist',
    '/sustentabilidade/quiz',
    ...lessons.map((l) => '/sustentabilidade/' + l.slug),
  ].map((path) => ({
    url: base + path,
    changeFrequency: path === '/impacto' || path === '/escolas' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
