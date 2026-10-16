import { notFound, permanentRedirect } from "next/navigation";
import { Header, Footer } from "../../../components";
import { site } from "../../../data";
import { publishedBlogPosts } from "../../../content-policy";
import { postsPerPage } from "../../../fleet-data";
import { FeaturedComparison } from "../../FeaturedComparison";
import { editorialImage } from "../../../editorial-images";
const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  return {
    title: `Blog page ${n}`,
    description: `Browse page ${n} of Philippines-based staffing and workflow articles.`,
    alternates: { canonical: n === 1 ? '/blog' : `/blog/page/${n}` },
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
                <a className="editorial-image-link" href={`/blog/${p.slug}`} aria-label={`Read ${p.title}`}><img src={editorialImage(p.slug)} alt={`Editorial illustration for ${p.title}`} loading="lazy" /></a>
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
        {n === 2 ? <FeaturedComparison /> : null}
      </main>
      <Footer />
    </>
  );
}
