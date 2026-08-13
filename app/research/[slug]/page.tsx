import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '../../components';
import { researchPosts } from '../../fleet-data';
import { site } from '../../data';

const publicationDateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const formatPublicationDate = (value: string) => publicationDateFormatter.format(new Date(`${value}T00:00:00Z`));

export function generateStaticParams() { return researchPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = researchPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `${site.url}/research/${post.slug}` }, openGraph: { title: post.title, description: post.excerpt, url: `${site.url}/research/${post.slug}`, images: [post.image] } };
}

export default async function ResearchArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = researchPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const schema = [
    { '@context': 'https://schema.org', '@type': 'ResearchArticle', headline: post.title, description: post.excerpt, datePublished: post.published, dateModified: post.published, image: `${site.url}${post.image}`, mainEntityOfPage: `${site.url}/research/${post.slug}`, author: { '@type': 'Organization', name: site.brand }, publisher: { '@type': 'Organization', name: site.brand } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Research', item: `${site.url}/research` }, { '@type': 'ListItem', position: 2, name: post.title, item: `${site.url}/research/${post.slug}` }] },
  ];
  return <><Header /><main><article className="section"><div className="container article-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <p className="eyebrow">{site.brand} research · <time dateTime={post.published}>{formatPublicationDate(post.published)}</time></p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p>
    <img className="article-thumbnail" src={post.image} alt={post.imageAlt} />
    <section className="card"><h2>Key stats</h2><div className="research-stat-grid">{post.keyStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span><small>Source: {stat.source}</small></div>)}</div></section>
    <section className="card"><h2>Key takeaways</h2><ul>{post.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul></section>
    {post.sections.map((section) => <section className="card" key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
    {post.tables.map((table) => <section className="card" key={table.caption}><h2>{table.caption}</h2><div className="research-table-wrap"><table><caption className="sr-only">{table.caption}</caption><thead><tr>{table.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{table.rows.map((row) => <tr key={row.join('|')}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>)}
    <section className="card"><h2>Sources ({post.sources.length})</h2><ol>{post.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.name}</a></li>)}</ol></section>
    <section className="card"><h2>Related research</h2><ul>{post.related.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></section>
  </div></article></main><Footer /></>;
}
