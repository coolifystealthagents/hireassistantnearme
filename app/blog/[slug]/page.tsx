import { Header, Footer, CTA } from '../../components';
import { blogPosts, site, publicSources } from '../../data';

export function generateStaticParams() { return blogPosts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return {
    title: post?.title || 'Assistant hiring guide',
    description: post?.excerpt || 'Plain assistant hiring guide for local business owners.',
    alternates: { canonical: `${site.url}/blog/${slug}` },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: site.brand },
    publisher: { '@type': 'Organization', name: site.brand, url: site.url },
    citation: publicSources.map((source) => source.url),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the safest first assistant task?', acceptedAnswer: { '@type': 'Answer', text: 'Start with repeatable work that is easy to check, such as inbox sorting, scheduling, CRM updates, appointment reminders, and simple reports.' } },
      { '@type': 'Question', name: 'Should I hire local or remote first?', acceptedAnswer: { '@type': 'Answer', text: 'Hire local for in-person work. Hire remote or overseas for clear recurring admin work that can be reviewed through tools and checklists.' } },
    ],
  };

  return <><Header/><main className="section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema]) }} /><article className="container" style={{maxWidth:900}}><p className="eyebrow">{site.brand} guide</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p><div className="card"><h2>Key takeaways</h2><ul className="list">{post.takeaways.map((item)=><li key={item}>{item}</li>)}</ul></div>{post.sections.map((section)=><section className="article-block" key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<section className="article-block"><h2>Local vs remote decision table</h2><div className="table"><div className="row"><b>If the task needs...</b><b>Lean toward...</b><b>Why</b></div><div className="row"><span>Office presence, errands, paper files</span><span>Local assistant</span><span>The work cannot be checked fully online.</span></div><div className="row"><span>Inbox, calendar, CRM, support replies</span><span>Remote assistant</span><span>The work is tool-based and easy to review.</span></div><div className="row"><span>Daily coverage at a lower plan</span><span>Overseas VA or managed service</span><span>Good SOPs can make distance less important.</span></div></div></section><section className="article-block card"><h2>Copy-ready provider question</h2><p className="quote small">“{post.script}”</p></section><section className="article-block"><h2>Sources to verify</h2><p>Use these public references to check wage, contractor, and business guidance before using hard claims in ads or sales copy.</p><ul className="list">{publicSources.map((source)=><li key={source.url}><a className="text-link" href={source.url}>{source.name}</a>: {source.note}</li>)}</ul></section><section className="article-block"><h2>Next step</h2><p>If you want a safer first hire, write the task list before you shop providers. Then ask each provider how they screen, train, replace, and review the assistant.</p><p><a className="text-link" href="/contact">Request an assistant hiring plan →</a></p></section></article><CTA/></main><Footer/></>;
}
