import './globals.css';
import type { Metadata } from 'next';
import { site } from './data';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Hire Assistant Near Me | Local and remote hiring guides', template: '%s | Hire Assistant Near Me' },
  description: 'Compare local and remote assistants, choose the first tasks, and write a role brief your business can use.',
  openGraph: { title: 'Hire Assistant Near Me', description: 'Straightforward assistant hiring guides for local business owners.', url: site.url, siteName: site.brand, type: 'website' },
  twitter: { card: 'summary_large_image', title: site.brand, description: 'Compare local, remote, and overseas assistant options before you hire.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.brand, url: site.url },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.brand, url: site.url, publisher: { '@id': `${site.url}/#organization` } },
  ];
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
