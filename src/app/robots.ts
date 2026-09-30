import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/avaliacao/'] },
    sitemap:
      (process.env.NEXT_PUBLIC_SITE_URL || 'https://fumec-sustentabilidade.vercel.app') +
      '/sitemap.xml',
  };
}
