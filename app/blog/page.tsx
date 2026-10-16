import { Header, Footer } from "../components";
import { site } from "../data";
import { editorialCard, publishedBlogPosts } from "../content-policy";
import { postsPerPage } from "../fleet-data";
const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
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
            {posts.map((p) => (
              <article className="editorial-card" key={p.slug}>
                <a className="editorial-image-link" href={`/blog/${p.slug}`} aria-label={`Read ${p.title}`}><img src={editorialCard(p.slug).src} alt={editorialCard(p.slug).alt} width={editorialCard(p.slug).width} height={editorialCard(p.slug).height} loading="lazy" /></a>
                <div><p className="editorial-meta">{"published" in p && typeof p.published === "string" ? <time dateTime={p.published}>Published {formatDate(p.published)}</time> : null}</p><h2><a href={`/blog/${p.slug}`}>{p.title}</a></h2><p>{p.excerpt}</p><a className="text-link" href={`/blog/${p.slug}`}>Read the guide →</a></div>
              </article>
            ))}
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
