import { permanentRedirect } from 'next/navigation';

export const metadata = {
  title: 'Assistant Hiring Comparison',
  description: 'This outdated provider ranking has been retired in favor of a transparent hiring-model comparison.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/compare/local-vs-remote-assistant' },
};

export default function RetiredProviderRanking() {
  permanentRedirect('/compare/local-vs-remote-assistant');
}
