import { notFound } from 'next/navigation';
import { Header, Footer, CTA } from '../../components';
import { blogPosts, site, publicSources } from '../../data';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${slug}`,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  };
}

type RichDetail = {
  revision: string;
  directAnswer: readonly string[];
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  decisionRows: readonly { need: string; fit: string; reason: string }[];
  planningNumbers: readonly { value: string; label: string; note: string }[];
  scripts: readonly { title: string; text: string }[];
  scenario: { title: string; intro: string; steps: readonly { step: string; title: string; body: string }[] };
  faqs: readonly { question: string; answer: string }[];
  relatedLinks: readonly { href: string; label: string }[];
  sources: readonly { name: string; url: string; note: string }[];
};

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const richPost = post as typeof post & {
    mainKeyword?: string;
    published?: string;
    richPublished?: boolean;
    detail?: RichDetail;
  };

  if (richPost.richPublished && richPost.detail) {
    const detail = richPost.detail;
    const canonical = `${site.url}/blog/${post.slug}`;
    const published = richPost.published || '2026-07-24';
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: post.title,
      description: post.excerpt,
      url: canonical,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      datePublished: published,
      dateModified: published,
      keywords: richPost.mainKeyword,
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      citation: detail.sources.map((source) => source.url),
    };
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: detail.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    };
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Hiring guides', item: `${site.url}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    };

    return <>
      <Header />
      <main className="section rich-article" data-article-revision={detail.revision}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]) }} />
        <article className="container article-shell">
          <p className="eyebrow">Philippines-only hiring guide</p>
          <h1>{post.title}</h1>
          <p className="lead">{post.excerpt}</p>

          <section className="article-block answer-card" aria-labelledby="direct-answer">
            <h2 id="direct-answer">Direct answer</h2>
            {detail.directAnswer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section className="article-block card">
            <h2>What to decide first</h2>
            <ul className="list">{post.takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          {detail.sections.slice(0, 3).map((section) => <section className="article-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>)}

          <section className="article-block" aria-labelledby="decision-table">
            <h2 id="decision-table">Choose the hiring route that fits</h2>
            <p>Each route below can lead to Filipino talent, but the owner workload is different. Hire Assistant Near Me offers the managed staffing route only.</p>
            <p className="table-scroll-cue" id="table-scroll-cue">Swipe to compare all columns.</p>
            <div className="article-table-wrap" role="region" aria-labelledby="decision-table" aria-describedby="table-scroll-cue" tabIndex={0}>
              <table className="article-table">
                <thead><tr><th scope="col">If you need</th><th scope="col">Use this route</th><th scope="col">Owner workload</th></tr></thead>
                <tbody>{detail.decisionRows.map((row) => <tr key={row.need}><th scope="row">{row.need}</th><td>{row.fit}</td><td>{row.reason}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="article-block" aria-labelledby="planning-numbers">
            <h2 id="planning-numbers">A sample 30-day hiring board</h2>
            <p>These are planning examples, not prices, results, or industry statistics. Change each number to match the role, risk, and review time in your business.</p>
            <div className="number-grid">{detail.planningNumbers.map((item) => <div className="number-card" key={item.value}>
              <span>{item.label}</span><strong>{item.value}</strong><small>{item.note}</small>
            </div>)}</div>
          </section>

          {detail.sections.slice(3, 6).map((section) => <section className="article-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>)}

          <section className="article-block script-grid" aria-labelledby="copy-scripts">
            <h2 id="copy-scripts">Scripts you can copy</h2>
            <p>Use these scripts for a provider call and the first day of work. Replace the task names and approval rules before you send them.</p>
            <div className="two">{detail.scripts.map((script) => <blockquote className="script-card" key={script.title}>
              <h3>{script.title}</h3><div className="script-copy">"{script.text}"</div>
            </blockquote>)}</div>
          </section>

          <section className="article-block workflow-card" aria-labelledby="sample-workflow">
            <h2 id="sample-workflow">{detail.scenario.title}</h2>
            <p>{detail.scenario.intro}</p>
            <ol className="workflow-list">{detail.scenario.steps.map((item) => <li key={item.step}>
              <span>{item.step}</span><div><h3>{item.title}</h3><div className="workflow-copy">{item.body}</div></div>
            </li>)}</ol>
          </section>

          {detail.sections.slice(6).map((section) => <section className="article-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>)}

          <section className="article-block" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Questions about hiring a Filipino assistant</h2>
            <div className="faq-stack">{detail.faqs.map((faq) => <details key={faq.question} open>
              <summary>{faq.question}</summary><p>{faq.answer}</p>
            </details>)}</div>
          </section>

          <section className="article-block card" aria-labelledby="related-guides">
            <h2 id="related-guides">Keep planning</h2>
            <p>Pick the next guide that matches the choice in front of you. Each path helps you prepare a clear Philippines-only staffing brief.</p>
            <ul className="list">{detail.relatedLinks.map((link) => <li key={link.href}><a className="text-link" href={link.href}>{link.label}</a></li>)}</ul>
          </section>

          <section className="article-block sources-card" aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources</h2>
            <p>These official sources support the access, sign-in, worker setup, and privacy notes in this guide. They do not set a price or promise a business result.</p>
            <ul className="list">{detail.sources.map((source) => <li key={source.url}>
              <a className="text-link" href={source.url} rel="noreferrer">{source.name}</a>: {source.note}
            </li>)}</ul>
          </section>

          <section className="managed-cta" aria-labelledby="managed-cta-heading">
            <p className="eyebrow light">Managed staffing from the Philippines</p>
            <h2 id="managed-cta-heading">Bring one clear role to the hiring call.</h2>
            <p>Send the task list, tools, work hours, and approval limits. A staffing team can help shape the role and match a candidate recruited and hired in the Philippines.</p>
            <a className="btn coral" href="/contact">Build my Philippines role brief</a>
          </section>
        </article>
      </main>
      <Footer />
    </>;
  }

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

  return <>
    <Header />
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="container article-shell">
        <p className="eyebrow">{site.brand} guide</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
        <section className="card"><h2>Start with a defined workflow</h2><p>For Philippines-based staffing, document the work, tools, schedule, and desired outcome before candidate matching. Keep business judgment and final approvals with a named manager.</p><h2>Prepare representative examples</h2><p>Use real, appropriately redacted examples to explain quality. Review early work together and update the written process when an exception appears.</p><h2>Plan access and handoffs</h2><p>Provide only the access needed for the position and use named accounts where possible. Write down which questions must be escalated and who receives them.</p></section>
      </article>
      <CTA />
    </main>
    <Footer />
  </>;
}
