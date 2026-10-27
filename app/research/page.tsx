import type { Metadata } from 'next';
import { Header, Footer } from '../components';
import { site } from '../data';
import { publishedResearchPosts } from '../content-policy';

const publicationDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
});
const formatPublicationDate = (value: string) =>
  publicationDateFormatter.format(new Date(`${value.slice(0, 10)}T00:00:00Z`));

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
      <main className="section">
        <div className="container">
          <p className="eyebrow">{site.brand} research</p>
          <h1>Research for planning Philippines-based support</h1>
          <p className="lead">Source-bounded briefs on the work, evidence, and owner decisions behind a reliable support role.</p>
          <div className="editorial-grid">
            {posts.map((post) => (
              <a className="editorial-card" href={`/research/${post.slug}`} key={post.slug}>
                <p className="eyebrow"><time dateTime={post.published}>{formatPublicationDate(post.published)}</time></p>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span>Read the research →</span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
