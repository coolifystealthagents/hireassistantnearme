import type { Metadata } from 'next';
import { Header, Footer } from '../components';
import { site } from '../data';
import { publishedResearchPosts } from '../content-policy';
import { EditorialCard, formatEditorialDate } from '../editorial-components';

export const metadata: Metadata = {
  title: 'Research library',
  description: 'Source-bounded research briefs for planning Philippines-based support roles.',
  alternates: { canonical: `${site.url}/research` },
};

export default function ResearchLibrary() {
  const posts = [...publishedResearchPosts].sort((a, b) =>
    b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
  );
  const latestPosts = posts.slice(0, 9);
  const archive = posts.slice(9).reduce<Record<string, typeof posts>>((groups, post) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(`${post.published}T00:00:00Z`));
    (groups[month] ||= []).push(post);
    return groups;
  }, {});
  return (
    <>
      <Header />
      <main>
        <section className="fleet-hero editorial-index-hero"><div className="container editorial-index-opening">
          <div className="editorial-index-copy"><p className="eyebrow">{site.brand} research</p><h1>Evidence for better support-role decisions.</h1><p className="lead">Source-bounded briefs on workflow design, delegated access, quality review, and the decisions that remain with an accountable owner.</p><div className="research-hero-links"><a className="btn primary" href="#research-library">Browse the library</a><a className="text-link" href="/services">Apply it to a role plan <span>↗</span></a></div></div>
          <figure className="research-hero-visual"><img src="/images/marketing/evidence-review-laptop.jpg" alt="Two people reviewing evidence together on a laptop" width="1200" height="800" /><figcaption>Read the source, test the limitation, and keep the operating judgment with an accountable owner.</figcaption></figure>
        </div></section>
        <section className="research-method-strip"><div className="container"><p>Every brief includes</p><ul><li>A stated question</li><li>Cited sources</li><li>Explicit limitations</li><li>Owner decisions</li></ul></div></section>
        <section className="section research-library-section" id="research-library"><div className="container">
          <div className="section-heading compact research-library-heading"><div><p className="eyebrow">Latest evidence briefs</p><h2>Read the finding. Keep the judgment.</h2></div><p>These briefs support planning; they do not replace legal, financial, security, or operating judgment.</p></div>
          <div className="editorial-grid">
            {latestPosts.map((post) => <EditorialCard key={post.slug} href={`/research/${post.slug}`} title={post.title} excerpt={post.excerpt} image={{ src: post.image, alt: post.imageAlt, width: 1200, height: 630 }} published={post.published} kind="Research brief" />)}
          </div>
          <div className="research-archive" aria-labelledby="research-archive-title">
            <div className="research-archive-heading"><div><p className="eyebrow">Complete archive</p><h2 id="research-archive-title">Browse earlier briefs by month.</h2></div><p>Open a month to scan titles without loading another wall of images.</p></div>
            {Object.entries(archive).map(([month, monthPosts]) => <details key={month}>
              <summary><span>{month}</span><small>{monthPosts.length} briefs</small></summary>
              <ul>{monthPosts.map((post) => <li key={post.slug}><a href={`/research/${post.slug}`}>{post.title}</a><time dateTime={post.published}>{formatEditorialDate(post.published)}</time></li>)}</ul>
            </details>)}
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}
