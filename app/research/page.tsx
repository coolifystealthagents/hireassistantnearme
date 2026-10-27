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
          <div><p className="eyebrow">{site.brand} research</p><h1>Research for planning Philippines-based support</h1><p className="lead">Source-bounded briefs on the work, evidence, and owner decisions behind a reliable support role.</p></div>
          <aside><strong>What each brief includes</strong><p>A stated question, cited sources, explicit limitations, practical takeaways, and the decisions that remain with an accountable owner.</p></aside>
        </div></section>
        <section className="section"><div className="container">
          <div className="editorial-grid">
            {posts.map((post) => <EditorialCard key={post.slug} href={`/research/${post.slug}`} title={post.title} excerpt={post.excerpt} image={{ src: post.image, alt: post.imageAlt, width: 1200, height: 630 }} published={post.published} kind="Research brief" />)}
          </div>
        </div></section>
      </main>
      <Footer />
    </>
  );
}
