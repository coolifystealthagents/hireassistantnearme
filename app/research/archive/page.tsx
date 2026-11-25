import type { Metadata } from 'next';
import { site } from '../../data';
import { ResearchArchivePage } from './archive-page';

export const metadata: Metadata = {
  title: 'Research archive',
  description: 'Browse earlier source-bounded research briefs for planning Philippines-based support roles.',
  alternates: { canonical: `${site.url}/research/archive` },
};

export default function ArchiveIndex() {
  return <ResearchArchivePage page={1} />;
}
