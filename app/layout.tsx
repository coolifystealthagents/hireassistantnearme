import './globals.css';
import type { Metadata } from 'next';
import { site } from './data';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Hire Assistant Near Me | Filipino remote assistants', template: '%s | Hire Assistant Near Me' },
  description: 'Plan a Philippines-based remote assistant role for your local business, choose the first tasks, and write a clear hiring brief.',
  openGraph: { title: 'Hire Assistant Near Me', description: 'Philippines-based remote assistant staffing for local business owners.', url: site.url, siteName: site.brand, type: 'website' },
  twitter: { card: 'summary_large_image', title: site.brand, description: 'Plan a Filipino remote assistant role around your business hours and online tools.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.brand, url: site.url },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.brand, url: site.url, publisher: { '@id': `${site.url}/#organization` } },
  ];
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
