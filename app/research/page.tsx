import { permanentRedirect } from 'next/navigation';

export const metadata = {
  title: 'Evidence Library',
  description: 'The former research collection has been consolidated into the curated staffing guide library.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/blog' },
};

export default function ResearchRedirect() {
  permanentRedirect('/blog');
}
