import type { Metadata } from 'next';
import { Header, Footer } from '../components';
import { site } from '../data';
import { publishedResearchPosts } from '../content-policy';
import { EditorialCard } from '../editorial-components';

export const metadata: Metadata = {
  title: 'Research library',
  description: 'Source-bounded research briefs for planning Philippines-based support roles.',
  alternates: { canonical: `${site.url}/research` },
};

export default function ResearchLibrary() {
  const posts = [...publishedResearchPosts].sort((a, b) =>
    b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
  );
  return (
    <>
      <Header />
      <main>
        <section className="fleet-hero editorial-index-hero"><div className="container editorial-index-opening">
          <div className="editorial-index-copy"><p className="eyebrow">{site.brand} research</p><h1>Evidence for better support-role decisions.</h1><p className="lead">Source-bounded briefs on workflow design, delegated access, quality review, and the decisions that remain with an accountable owner.</p><div className="research-hero-links"><a className="btn primary" href="#research-library">Browse the library</a><a className="text-link" href="/services">Apply it to a role plan <span>↗</span></a></div></div>
          <figure className="research-hero-visual"><img src="/images/research-library-evidence-flow.svg" alt="Diagram showing sources becoming bounded findings and accountable operating decisions" width="1200" height="760" /><figcaption>Question → evidence → limitations → practical takeaway.</figcaption></figure>
        </div></section>
        <section className="research-method-strip"><div className="container"><p>Every brief includes</p><ul><li>A stated question</li><li>Cited sources</li><li>Explicit limitations</li><li>Owner decisions</li></ul></div></section>
        <section className="section research-library-section" id="research-library"><div className="container">
          <div className="section-heading compact research-library-heading"><div><p className="eyebrow">Latest evidence briefs</p><h2>Read the finding. Keep the judgment.</h2></div><p>These briefs support planning; they do not replace legal, financial, security, or operating judgment.</p></div>
          <div className="editorial-grid">
            {posts.map((post) => <EditorialCard key={post.slug} href={`/research/${post.slug}`} title={post.title} excerpt={post.excerpt} image={{ src: post.image, alt: post.imageAlt, width: 1200, height: 630 }} published={post.published} kind="Research brief" />)}
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}
