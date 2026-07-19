import './globals.css';
import type { Metadata } from 'next';
import { site } from './data';

export const metadata: Metadata = {
  metadataBase: new URL('https://hireassistantnearme.com'),
  title: { default: 'Hire Assistant Near Me | Simple virtual assistant hiring guides', template: '%s | Hire Assistant Near Me' },
  description: 'Simple, practical guides for hiring, pricing, onboarding, and managing hire assistant near me support.',
  openGraph: { title: 'Hire Assistant Near Me', description: 'Practical virtual assistant hiring guides for busy teams.', url: 'https://hireassistantnearme.com', siteName: 'Hire Assistant Near Me', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
