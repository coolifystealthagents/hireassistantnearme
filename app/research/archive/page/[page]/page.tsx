import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { site } from '../../../../data';
import { researchArchivePageCount } from '../../../archive-data';
import { ResearchArchivePage } from '../../archive-page';

export function generateStaticParams() {
  return Array.from({ length: Math.max(researchArchivePageCount() - 1, 0) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const page = Number((await params).page);
  return {
    title: `Research archive, page ${page}`,
    description: 'Browse earlier source-bounded research briefs for planning Philippines-based support roles.',
    alternates: { canonical: `${site.url}/research/archive/page/${page}` },
  };
}

export default async function ArchivePagination({ params }: { params: Promise<{ page: string }> }) {
  const page = Number((await params).page);
  if (!Number.isInteger(page) || page < 2 || page > researchArchivePageCount()) notFound();
  return <ResearchArchivePage page={page} />;
}
