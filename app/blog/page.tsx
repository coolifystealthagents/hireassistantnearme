import { Header, Footer } from '../components';
import { blogPosts, site } from '../data';

export const metadata = {
  title: 'Virtual assistant hiring blog',
  description: 'Assistant hiring guides for local business owners comparing local, remote, and overseas help.',
  alternates: { canonical: `${site.url}/blog` },
};

export default function Blog() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Virtual assistant hiring blog',
    url: `${site.url}/blog`,
    hasPart: blogPosts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: `${site.url}/blog/${post.slug}`, name: post.title })),
  };
  return <><Header/><main className="section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="container"><p className="eyebrow">Blog</p><h1>Plain guides for hiring assistant help</h1><p className="lead">Start with the question in front of you: where the work should happen, what to hand off first, or how to train the assistant.</p><div className="cards">{blogPosts.map((p)=><a className="card" href={`/blog/${p.slug}`} key={p.slug}><h3>{p.title}</h3><p>{p.excerpt}</p><span className="pill">{p.minutes} min read</span></a>)}</div></div></main><Footer/></>;
}
