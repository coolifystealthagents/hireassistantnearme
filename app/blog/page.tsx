import { Header, Footer } from "../components";
import { site } from "../data";
import { editorialCard, publishedBlogPosts } from "../content-policy";
import { postsPerPage } from "../fleet-data";
import { EditorialCard } from "../editorial-components";
export const metadata = {
  title: 'Blog',
  description: `Philippines-based ${site.primary} planning guides.`,
  alternates: { canonical: '/blog' },
};
export default function Blog() {
  const pages = Math.max(1, Math.ceil(publishedBlogPosts.length / postsPerPage));
  const posts = publishedBlogPosts.slice(0, postsPerPage);
  return (
    <>
      <Header />
      <main>
        <section className="fleet-hero variant-1">
          <div className="container blog-index-hero-grid"><div>
            <p className="eyebrow">Blog</p>
            <h1>Hire Assistant Near Me guides</h1>
            <p className="lead">
              Practical planning for Philippines-based remote assistant roles,
              workflows, and manager handoffs.
            </p></div><figure className="index-hero-visual"><img src="/images/aug21-research-evidence-map.webp" alt="Evidence map connecting role scope, source checks, and manager handoffs" width="1662" height="946" /><figcaption>Five maintained guides for decisions that need evidence and clear ownership.</figcaption></figure>
          </div>
        </section>
        <section className="section">
          <div className="container editorial-grid">
            {posts.map((p) => <EditorialCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} excerpt={p.excerpt} image={editorialCard(p.slug)} published={p.published} kind="Guide" minutes={p.minutes || 10} />)}
          </div>
          <nav className="pagination" aria-label="Blog pages">
            {Array.from({ length: pages }, (_, i) => (
              <a
                aria-current={i === 0 ? "page" : undefined}
                href={i === 0 ? "/blog" : `/blog/page/${i + 1}`}
                key={i}
              >
                {i + 1}
              </a>
            ))}
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
