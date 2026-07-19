import { routes, site } from '../data';

export function GET() {
  const urls = routes.map((path) => `<url><loc>${site.url}${path === '/' ? '' : path}</loc><changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'content-type': 'application/xml' } });
}
