import { notFound, permanentRedirect } from "next/navigation";
import { Header, Footer } from "../../../components";
import { site } from "../../../data";
import { editorialCard, publishedBlogPosts } from "../../../content-policy";
import { postsPerPage } from "../../../fleet-data";
import { EditorialCard } from "../../../editorial-components";
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
            {posts.map((p) => <EditorialCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} excerpt={p.excerpt} image={editorialCard(p.slug)} published={p.published} kind="Guide" minutes={p.minutes || 10} />)}
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
