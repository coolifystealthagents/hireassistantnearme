import { notFound, permanentRedirect } from "next/navigation";
import { Header, Footer } from "../../../components";
import { site } from "../../../data";
import { editorialCard, publishedBlogPosts } from "../../../content-policy";
import { postsPerPage } from "../../../fleet-data";
const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const canonicalPage = /^[1-9]\d*$/.test(page) ? Number(page) : NaN;
  return {
    title: Number.isFinite(canonicalPage) ? `Blog page ${canonicalPage}` : 'Blog',
    description: Number.isFinite(canonicalPage) ? `Browse page ${canonicalPage} of Philippines-based staffing and workflow articles.` : 'Browse Philippines-based staffing and workflow articles.',
    alternates: { canonical: canonicalPage === 1 ? '/blog' : Number.isFinite(canonicalPage) ? `/blog/page/${canonicalPage}` : '/blog' },
  };
}
export function generateStaticParams() {
  const pages = Math.max(1, Math.ceil(publishedBlogPosts.length / postsPerPage));
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }));
}
export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!/^[1-9]\d*$/.test(page)) notFound();
  const n = Number(page);
  if (n === 1) permanentRedirect('/blog');
  const pages = Math.max(1, Math.ceil(publishedBlogPosts.length / postsPerPage));
  if (!Number.isInteger(n) || n < 1 || n > pages) notFound();
  const posts = publishedBlogPosts.slice((n - 1) * postsPerPage, n * postsPerPage);
  return (
    <>
      <Header />
      <main>
        <section className="fleet-hero">
          <div className="container">
            <p className="eyebrow">Blog page {n}</p>
            <h1>{site.brand} guides</h1>
            <p className="lead">
              Browse Philippines-based staffing and workflow articles.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container editorial-grid">
            {posts.map((p) => (
              <article className="editorial-card" key={p.slug}>
                <a className="editorial-image-link" href={`/blog/${p.slug}`} aria-label={`Read ${p.title}`}><img src={editorialCard(p.slug).src} alt={editorialCard(p.slug).alt} width={editorialCard(p.slug).width} height={editorialCard(p.slug).height} loading="lazy" /></a>
                <div><p className="editorial-meta">{'published' in p && typeof p.published === 'string' ? <time dateTime={p.published}>Published {formatDate(p.published)}</time> : null}</p><h2><a href={`/blog/${p.slug}`}>{p.title}</a></h2><p>{p.excerpt}</p><a className="text-link" href={`/blog/${p.slug}`}>Read the guide →</a></div>
              </article>
            ))}
          </div>
          <nav className="pagination" aria-label="Blog pages">
            {Array.from({ length: pages }, (_, i) => (
              <a
                aria-current={i + 1 === n ? "page" : undefined}
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
