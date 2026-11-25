import { Header, Footer } from '../../components';
import { site } from '../../data';
import { formatEditorialDate } from '../../editorial-components';
import { archivedResearchPosts, researchArchivePageCount, researchArchivePageSize } from '../archive-data';

export function ResearchArchivePage({ page }: { page: number }) {
  const allPosts = archivedResearchPosts();
  const pageCount = researchArchivePageCount();
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = (safePage - 1) * researchArchivePageSize;
  const posts = allPosts.slice(start, start + researchArchivePageSize);
  const pageHref = (value: number) => value === 1 ? '/research/archive' : `/research/archive/page/${value}`;

  return <>
    <Header />
    <main className="research-archive-page">
      <section className="research-archive-hero"><div className="container">
        <p className="eyebrow">{site.brand} research</p>
        <h1>Earlier evidence briefs.</h1>
        <p className="lead">Browse the complete archive in smaller groups. Each brief states its sources, limitations, and the decisions that remain with an accountable owner.</p>
        <a className="text-link" href="/research">← Back to latest research</a>
      </div></section>
      <section className="section"><div className="container">
        <div className="research-archive-page-heading"><div><p className="eyebrow">Archive page {safePage} of {pageCount}</p><h2>{allPosts.length} earlier briefs, 24 at a time.</h2></div><p>Showing {start + 1} to {Math.min(start + researchArchivePageSize, allPosts.length)} of {allPosts.length} briefs.</p></div>
        <ol className="research-archive-list" start={start + 1}>
          {posts.map((post) => <li key={post.slug}>
            <div><span>Research brief</span><time dateTime={post.published}>{formatEditorialDate(post.published)}</time></div>
            <h2><a href={`/research/${post.slug}`}>{post.title}</a></h2>
            <p>{post.excerpt}</p>
            <a className="text-link" href={`/research/${post.slug}`}>Read brief <span aria-hidden="true">→</span></a>
          </li>)}
        </ol>
        <nav className="research-archive-pagination" aria-label="Research archive pages">
          {safePage > 1 ? <a href={pageHref(safePage - 1)} rel="prev">← Newer briefs</a> : <span />}
          <span>Page {safePage} of {pageCount}</span>
          {safePage < pageCount ? <a href={pageHref(safePage + 1)} rel="next">Older briefs →</a> : <span />}
        </nav>
      </div></section>
    </main>
    <Footer />
  </>;
}
