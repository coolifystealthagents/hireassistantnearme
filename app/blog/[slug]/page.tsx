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

type StrictDetail = {
  revision: string;
  directAnswer: readonly { text: string; sourceLabel?: string; sourceUrl?: string }[];
  sections: readonly { heading: string; paragraphs: readonly { text: string; sourceLabel?: string; sourceUrl?: string }[] }[];
  statisticRows: readonly { measure: string; value: string; period: string; meaning: string }[];
  chartRows: readonly { label: string; value: number }[];
  chartNote: string;
  expertQuote: { text: string; person: string; title: string; sourceLabel: string; sourceUrl: string };
  accessRows: readonly { area: string; firstAccess: string; ownerKeeps: string }[];
  processSteps: readonly { short: string; title: string; note: string }[];
  ctas: readonly { slot: string; eyebrow: string; heading: string; body: string; label: string; href: string }[];
  faqs: readonly { question: string; answer: string }[];
  relatedLinks: readonly { href: string; label: string }[];
  sources: readonly { name: string; url: string; note: string }[];
};

type RichDetail = {
  revision: string;
  directAnswer: readonly string[];
  bodyLinks?: readonly { href: string; label: string }[];
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  decisionRows: readonly { need: string; fit: string; reason: string }[];
  benchmarkRows?: readonly { measure: string; local: string; remote: string; reading: string }[];
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
    strictPublished?: boolean;
    image?: string;
    imageAlt?: string;
    detail?: RichDetail;
    strictDetail?: StrictDetail;
  };

  if (richPost.strictPublished && richPost.strictDetail) {
    const detail = richPost.strictDetail;
    const canonical = `${site.url}/blog/${post.slug}`;
    const published = richPost.published || '2026-07-25';
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
    const maxChartValue = Math.max(...detail.chartRows.map((row) => row.value));
    const renderParagraph = (paragraph: { text: string; sourceLabel?: string; sourceUrl?: string }) => <p data-narrative="true" key={paragraph.text}>
      {paragraph.text}{paragraph.sourceUrl && paragraph.sourceLabel ? <> <a className="inline-source" href={paragraph.sourceUrl} rel="noreferrer">{paragraph.sourceLabel}</a>.</> : null}
    </p>;
    const renderBanner = (slot: string) => {
      const banner = detail.ctas.find((item) => item.slot === slot);
      return banner ? <aside className="article-banner" data-article-banner={slot} aria-label={`${slot} article action`}>
        <div><p className="eyebrow light">{banner.eyebrow}</p><h2>{banner.heading}</h2><p>{banner.body}</p></div>
        <a className="btn coral" href={banner.href}>{banner.label}</a>
      </aside> : null;
    };

    return <>
      <Header />
      <main className="section rich-article strict-article" data-article-slug={post.slug} data-article-revision={detail.revision}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]) }} />
        <article className="container article-shell">
          <p className="eyebrow">Philippines-only hiring guide · <time dateTime={published}>{published}</time></p>
          <h1>{post.title}</h1>
          <p className="lead" data-narrative="true">{post.excerpt} The owner keeps final control while the assistant works inside a clear task lane.</p>
          <p className="revision-note" data-revision-note={detail.revision}>Reviewed against primary sources on {published}.</p>

          <section className="article-block answer-card" aria-labelledby="direct-answer">
            <h2 id="direct-answer">Direct answer</h2>
            {detail.directAnswer.map(renderParagraph)}
          </section>

          <section className="article-block card">
            <h2>First rules to write down</h2>
            <ul className="list">{post.takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          {renderBanner('top')}

          {detail.sections.slice(0, 3).map((section) => <section className="article-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map(renderParagraph)}
          </section>)}

          <section className="article-block" data-module="security-statistics" aria-labelledby="security-statistics">
            <h2 id="security-statistics">What the 2024 FBI report recorded</h2>
            <p data-narrative="true">The figures below come from reports sent to the FBI Internet Crime Complaint Center. They describe reported events, so they should not be read as a count of every event that happened.</p>
            <div className="article-table-wrap" role="region" aria-labelledby="security-statistics" tabIndex={0}>
              <table className="article-table"><caption>Published online crime complaint figures</caption>
                <thead><tr><th scope="col">Measure</th><th scope="col">Published value</th><th scope="col">Period</th><th scope="col">What it means</th></tr></thead>
                <tbody>{detail.statisticRows.map((row) => <tr key={row.measure}><th scope="row">{row.measure}</th><td>{row.value}</td><td>{row.period}</td><td>{row.meaning}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="module-source"><a className="inline-source" href={detail.sources[0].url} rel="noreferrer">Source: FBI 2024 IC3 Annual Report</a></p>
          </section>

          <figure className="article-block visual-card" data-visual-type="labeled-data-chart">
            <h2>Complaints that reported an actual loss</h2>
            <svg className="security-chart" viewBox="0 0 760 260" role="img" aria-labelledby="chart-title chart-desc">
              <title id="chart-title">FBI IC3 complaints in 2024</title>
              <desc id="chart-desc">Horizontal bars compare all 859,532 complaints with 256,256 complaints that reported an actual loss.</desc>
              {detail.chartRows.map((row, index) => {
                const y = 54 + index * 92;
                const width = Math.round((row.value / maxChartValue) * 500);
                return <g key={row.label}>
                  <text x="0" y={y - 12} className="chart-label">{row.label}</text>
                  <rect x="0" y={y} width="500" height="34" rx="8" className="chart-track" />
                  <rect x="0" y={y} width={width} height="34" rx="8" className={index === 0 ? 'chart-bar primary-bar' : 'chart-bar secondary-bar'} />
                  <text x={Math.min(width + 14, 620)} y={y + 24} className="chart-value">{row.value.toLocaleString('en-US')}</text>
                </g>;
              })}
            </svg>
            <figcaption>{detail.chartNote} <a className="inline-source" href={detail.sources[0].url} rel="noreferrer">Open the FBI report</a>.</figcaption>
          </figure>

          {detail.sections.slice(3, 6).map((section) => <section className="article-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map(renderParagraph)}
          </section>)}

          {renderBanner('middle')}

          <section className="article-block quote-section" aria-labelledby="expert-note">
            <h2 id="expert-note">Report a suspected incident</h2>
            <blockquote>"{detail.expertQuote.text}"</blockquote>
            <p className="quote-credit">{detail.expertQuote.person}, {detail.expertQuote.title}. <a className="inline-source" href={detail.expertQuote.sourceUrl} rel="noreferrer">{detail.expertQuote.sourceLabel}</a>.</p>
          </section>

          <section className="article-block" data-module="access-boundary-table" aria-labelledby="access-boundaries">
            <h2 id="access-boundaries">A first-access table for common assistant work</h2>
            <p data-narrative="true">Use this table as a starting point, then change it to match the tools and legal duties in your business. A Filipino assistant can prepare and update approved work while the accountable owner keeps sensitive control.</p>
            <p className="table-scroll-cue" id="access-table-cue">Swipe to compare all columns.</p>
            <div className="article-table-wrap" role="region" aria-labelledby="access-boundaries" aria-describedby="access-table-cue" tabIndex={0}>
              <table className="article-table"><caption>Suggested first-access boundaries</caption>
                <thead><tr><th scope="col">Work area</th><th scope="col">Start with</th><th scope="col">Owner or manager keeps</th></tr></thead>
                <tbody>{detail.accessRows.map((row) => <tr key={row.area}><th scope="row">{row.area}</th><td>{row.firstAccess}</td><td>{row.ownerKeeps}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <figure className="article-block visual-card process-visual" data-visual-type="security-process-diagram">
            <h2>A safe access handoff</h2>
            <svg viewBox="0 0 940 260" role="img" aria-labelledby="process-title process-desc">
              <title id="process-title">Five-step virtual assistant security process</title>
              <desc id="process-desc">Map the task, limit access, test safely, check the work, and close access.</desc>
              <path d="M92 92 H848" className="process-line" />
              {detail.processSteps.map((step, index) => {
                const x = 92 + index * 189;
                return <g key={step.short}>
                  <circle cx={x} cy="92" r="38" className="process-dot" />
                  <text x={x} y="99" textAnchor="middle" className="process-short">{step.short}</text>
                  <text x={x} y="158" textAnchor="middle" className="process-title">{step.title}</text>
                  <foreignObject x={x - 78} y="174" width="156" height="64"><div className="process-note">{step.note}</div></foreignObject>
                </g>;
              })}
            </svg>
            <figcaption>This process is a planning aid. The business should adjust it for its systems, contracts, data, and legal duties.</figcaption>
          </figure>

          {detail.sections.slice(6).map((section) => <section className="article-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map(renderParagraph)}
          </section>)}

          {renderBanner('bottom')}

          <section className="article-block" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Questions about virtual assistant security</h2>
            <div className="faq-stack">{detail.faqs.map((faq) => <details key={faq.question} open>
              <summary>{faq.question}</summary><p>{faq.answer}</p>
            </details>)}</div>
          </section>

          <section className="article-block card" aria-labelledby="related-guides">
            <h2 id="related-guides">Keep planning the role</h2>
            <p data-narrative="true">Pick the next page that matches the work you want to hand over. Each link stays inside the Philippines-only hiring path on this site.</p>
            <ul className="list">{detail.relatedLinks.map((link) => <li key={link.href}><a className="text-link" href={link.href}>{link.label}</a></li>)}</ul>
          </section>

          <section className="article-block sources-card" data-source-list aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources</h2>
            <p data-narrative="true">These primary sources support the figures, quote, account guidance, access guidance, and Philippine privacy notes above. We checked each link before publication and kept the source wording separate from our planning advice.</p>
            <ol className="list">{detail.sources.map((source) => <li key={source.url}>
              <a className="text-link" href={source.url} rel="noreferrer">{source.name}</a>: {source.note}
            </li>)}</ol>
          </section>
        </article>
      </main>
      <Footer />
    </>;
  }

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
          <p className="eyebrow">Philippines-only hiring guide · <time dateTime={published}>{published}</time></p>
          <h1>{post.title}</h1>
          <p className="lead">{post.excerpt}</p>
          {richPost.image && <figure className="article-hero-image"><img src={richPost.image} alt={richPost.imageAlt || ''} width="1200" height="675" /></figure>}
          <div className='blog-standards-strip' aria-label='Article standards'><span>Source-backed guidance</span><span>Contextual internal links</span><span>Consolidated planning tables</span></div>

          <section className="article-block answer-card" aria-labelledby="direct-answer">
            <h2 id="direct-answer">Direct answer</h2>
            {detail.directAnswer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {detail.bodyLinks?.length ? <p className="article-context-links">Continue with the <>{detail.bodyLinks.map((link, index) => <span key={link.href}>{index ? index === detail.bodyLinks!.length - 1 ? ' and ' : ', ' : null}<a className="text-link" href={link.href} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>{link.label}</a></span>)}</>.</p> : null}
          </section>

          <section className="article-block card">
            <h2>Key takeaways</h2>
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
            <h2 id="planning-numbers">Key stats and a 30-day scorecard</h2>
            <p>These are planning examples, not terms, results, or industry statistics. Change each number to match the role, risk, and review time in your business.</p>
            <div className="number-grid">{detail.planningNumbers.map((item) => <div className="number-card" key={item.value}>
              <span>{item.label}</span><strong>{item.value}</strong><small>{item.note}</small>
            </div>)}</div>
          </section>

          {detail.benchmarkRows?.length ? <section className="article-block" aria-labelledby="benchmark-table">
            <h2 id="benchmark-table">Consolidated benchmark table</h2>
            <p>Use the table to separate published U.S. labor data from the operating questions a Philippines-based remote role still needs the owner to answer.</p>
            <p className="table-scroll-cue" id="benchmark-table-cue">Swipe to compare all columns.</p>
            <div className="article-table-wrap" role="region" aria-labelledby="benchmark-table" aria-describedby="benchmark-table-cue" tabIndex={0}>
              <table className="article-table"><caption>Local administrative hire and Philippines-based remote assistant comparison</caption>
                <thead><tr><th scope="col">Measure</th><th scope="col">Local U.S. hire</th><th scope="col">Philippines-based remote assistant</th><th scope="col">How to read it</th></tr></thead>
                <tbody>{detail.benchmarkRows.map((row) => <tr key={row.measure}><th scope="row">{row.measure}</th><td>{row.local}</td><td>{row.remote}</td><td>{row.reading}</td></tr>)}</tbody>
              </table>
            </div>
          </section> : null}

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
            <p>These official sources support the access, sign-in, worker setup, and privacy notes in this guide. They do not set a terms or promise a business result.</p>
            <ul className="list">{detail.sources.map((source) => <li key={source.url}>
              <a className="text-link" href={source.url} rel="noreferrer">{source.name}</a>: {source.note}
            </li>)}</ul>
          </section>

          <section className="managed-cta" aria-labelledby="managed-cta-heading">
            <p className="eyebrow light">Managed staffing from the Philippines</p>
            <h2 id="managed-cta-heading">Bring one clear role to the hiring call.</h2>
            <p>Send the task list, tools, work hours, and approval limits. A staffing team can help shape the role and match a candidate recruited and hired in the Philippines.</p>
            <a className="btn coral" href="/contact-us">Build my Philippines role brief</a>
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
        <section className="card"><h2>Start with a defined workflow</h2><p>For Philippines-based staffing, document the work, tools, schedule, and desired outcome before candidate matching. Keep business judgment and final approvals with a named manager. <a href="https://www.ilo.org/global/topics/non-standard-employment/WCMS_534825/lang--en/index.htm" target="_blank" rel="noopener noreferrer">International Labour Organization guidance on remote work arrangements</a> reinforces the need for clear expectations, communication rhythms, and accountable handoffs.</p><aside className='article-rotation-banner article-rotation-banner-middle' data-article-banner='true'><p className='eyebrow'>Midpoint planning check</p><h2>Compare providers against one written workflow</h2><p>Use one task lane, one reviewer, and one quality check so each provider conversation is easier to judge.</p><a className='btn' href='/contact-us'>Contact Us</a></aside><h2>Prepare representative examples</h2><p>Use real, appropriately redacted examples to explain quality. Review early work together and update the written process when an exception appears.</p><h2>Plan access and handoffs</h2><p>Provide only the access needed for the position and use named accounts where possible. Write down which questions must be escalated and who receives them.</p></section>
      </article>
      <CTA />
    </main>
    <Footer />
  </>;
}
