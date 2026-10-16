import { site } from '../data';
import { fleetServices, postsPerPage } from '../fleet-data';
import { publishedBlogPosts, publishedResearchPosts } from '../content-policy';

export function GET() {
  const base = `https://${site.domain.toLowerCase()}`;
  const pages = Math.max(1, Math.ceil(publishedBlogPosts.length / postsPerPage));
  const paths = [...new Set([
    '', '/about', '/services', '/blog',
    '/compare/local-vs-remote-assistant', '/contact-us', '/privacy', '/terms', '/cancellation-policy',
    ...fleetServices.map((service) => `/services/${service.slug}`),
    ...publishedBlogPosts.map((post) => `/blog/${post.slug}`),
    ...Array.from({ length: Math.max(0, pages - 1) }, (_, index) => `/blog/page/${index + 2}`),
    ...publishedResearchPosts.map((post) => `/research/${post.slug}`),
  ])];
  const body = paths.map((path) => `<url><loc>${base}${path}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, { headers: { 'content-type': 'application/xml' } });
}
