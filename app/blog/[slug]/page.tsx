import { Header, Footer, CTA } from '../../components';
import { blogPosts, site, publicSources } from '../../data';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return {
    title: post?.title || 'Assistant hiring guide',
    description: post?.excerpt || 'Plain assistant hiring guide for local business owners.',
    alternates: { canonical: `${site.url}/blog/${slug}` },
    openGraph: {
      title: post?.title || 'Assistant hiring guide',
      description: post?.excerpt || 'Plain assistant hiring guide for local business owners.',
      url: `${site.url}/blog/${slug}`,
      type: 'article',
    },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug) || blogPosts[0];
  const richPost = post as typeof post & {
    mainKeyword?: string;
    detail?: {
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
  };

  if (richPost.detail) {
    const detail = richPost.detail;
    const canonical = `${site.url}/blog/${post.slug}`;
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: canonical,
      mainEntityOfPage: canonical,
      datePublished: '2026-07-22',
      dateModified: '2026-07-22',
      keywords: richPost.mainKeyword,
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      citation: detail.sources.map((source) => source.url),
    };
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
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
      <main className="section rich-article" data-article-revision="2026-07-22-virtual-assistant-for-small-business">
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
            <h2 id="decision-table">Which hiring path fits the work?</h2>
            <p>This table keeps the choice tied to the work that must be done. Hire Assistant Near Me offers managed talent from the Philippines only.</p>
            <div className="table article-table">
              <div className="row"><b>If you need</b><b>Use this path</b><b>Why</b></div>
              {detail.decisionRows.map((row) => <div className="row" key={row.need}><span>{row.need}</span><strong>{row.fit}</strong><span>{row.reason}</span></div>)}
            </div>
          </section>

          <section className="article-block" aria-labelledby="planning-numbers">
            <h2 id="planning-numbers">A sample 30-day planning board</h2>
            <p>These numbers are planning examples, not results, prices, or promises. Change them to fit the work, risk, and review time in your business.</p>
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
            <p>Use these scripts as a starting point for a provider call and the first day of work. Edit the task names and approval limits before you send them.</p>
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
            <h2 id="faq-heading">Questions small business owners ask</h2>
            <div className="faq-stack">{detail.faqs.map((faq) => <details key={faq.question} open>
              <summary>{faq.question}</summary><p>{faq.answer}</p>
            </details>)}</div>
          </section>

          <section className="article-block card" aria-labelledby="related-guides">
            <h2 id="related-guides">Keep planning</h2>
            <p>Use the next guide that matches the decision in front of you. Each path leads back to a Philippines-only managed staffing plan.</p>
            <ul className="list">{detail.relatedLinks.map((link) => <li key={link.href}><a className="text-link" href={link.href}>{link.label}</a></li>)}</ul>
          </section>

          <section className="article-block sources-card" aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources</h2>
            <p>These official sources support the access, security, worker setup, and privacy notes in this guide. They do not set a price or promise a business result.</p>
            <ul className="list">{detail.sources.map((source) => <li key={source.url}>
              <a className="text-link" href={source.url} rel="noreferrer">{source.name}</a>: {source.note}
            </li>)}</ul>
          </section>

          <section className="managed-cta" aria-labelledby="managed-cta-heading">
            <p className="eyebrow light">Managed staffing from the Philippines</p>
            <h2 id="managed-cta-heading">Build one role your team can use.</h2>
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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What makes a good first assistant task?', acceptedAnswer: { '@type': 'Answer', text: 'Start with repeatable work that is easy to check, such as inbox sorting, scheduling, CRM updates, appointment reminders, and simple reports.' } },
      { '@type': 'Question', name: 'Should I hire local or remote first?', acceptedAnswer: { '@type': 'Answer', text: 'Hire local for in-person work. Hire remote for clear recurring admin work that can be reviewed through tools and checklists.' } },
    ],
  };

  return <>
    <Header />
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema]) }} />
      <article className="container" style={{ maxWidth: 900 }}>
        <p className="eyebrow">{site.brand} guide</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p>
        <div className="card"><h2>Key takeaways</h2><ul className="list">{post.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></div>
        {post.sections.map((section) => <section className="article-block" key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
        <section className="article-block card"><h2>Question to copy for a provider call</h2><p className="quote small">"{post.script}"</p></section>
        <section className="article-block"><h2>Check the sources</h2><p>Use these public references when you compare wage data, worker classification, or advertising claims.</p><ul className="list">{publicSources.map((source) => <li key={source.url}><a className="text-link" href={source.url}>{source.name}</a>: {source.note}</li>)}</ul></section>
        <CTA />
      </article>
    </main>
    <Footer />
  </>;
}
