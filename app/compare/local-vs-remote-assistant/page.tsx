import { Header, Footer, CTA } from '../../components';
import { compareRows, faqs, site } from '../../data';
import { ArticleSidebar } from '../../article-sidebar';

export const metadata = {
  title: 'Local vs remote assistant: which should you hire?',
  description: 'Compare work that needs a local employee with work suited to a Filipino remote assistant. Hire Assistant Near Me recruits only in the Philippines.',
  alternates: { canonical: `${site.url}/compare/local-vs-remote-assistant` },
};

export default function LocalVsRemoteAssistant() {
  const title = 'Should you keep the work local or hire a Filipino remote assistant?';
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to choose local vs remote assistant support',
    step: [
      { '@type': 'HowToStep', name: 'List the work', text: 'Write the weekly tasks, tools, customer touchpoints, and expected output.' },
      { '@type': 'HowToStep', name: 'Mark what must be local', text: 'Keep in-person duties, errands, paper files, and sensitive office tasks local.' },
      { '@type': 'HowToStep', name: 'Move tool-based work remote', text: 'Consider remote help for inbox, calendar, CRM, support drafts, reporting, and follow-up.' },
      { '@type': 'HowToStep', name: 'Run a short pilot', text: 'Start with a focused pilot scope and review work daily for the first week.' },
    ],
  };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };

  return <><Header/><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([howTo, faqSchema]) }} />
    <section className="hero"><div className="container comparison-hero-grid"><div><p className="eyebrow">Local vs remote assistant</p><h1>{title}</h1><p className="lead">Keep physical duties with a local employee or vendor. Hire Assistant Near Me recruits only in the Philippines for work that can be done through online tools.</p><div className="button-row"><a className="btn" href="/contact-us">Get a Philippines-based role plan</a><a className="btn secondary" href="/blog">VA vs employee guide</a></div></div><figure className="index-hero-visual"><img src="/images/local-vs-remote-admin-benchmark-2026.webp" alt="Visual comparison of local administrative work and remote assistant work" width="1672" height="941" /><figcaption>Separate place-based duties from work that can move through secure online tools.</figcaption></figure></div></section>
    <section className="section comparison-article-section"><div className="container article-layout"><ArticleSidebar title={title}/><article className="article-shell comparison-article" data-article-body>
      <section><h2>Fast comparison</h2><div className="table-scroll" tabIndex={0} aria-label="Local and remote assistant comparison"><table><caption>Where local and remote assistant options fit</caption><thead><tr><th scope="col">Option</th><th scope="col">Best for</th><th scope="col">Watch out for</th></tr></thead><tbody>{compareRows.map((row)=><tr key={row.option}><th scope="row">{row.option}</th><td>{row.bestFor}</td><td>{row.watch}</td></tr>)}</tbody></table></div></section>
      <section><h2>Work that usually needs someone nearby</h2><p>Place-based responsibilities should stay with a local employee or vendor who can physically reach the office, inventory, equipment, or customer.</p><ul className="list"><li>Office errands, mail, scanning, and paper files.</li><li>Front desk coverage where customers walk in.</li><li>Work that needs physical access to inventory or equipment.</li><li>Highly sensitive work that your policy says must stay on site.</li></ul></section>
      <section><h2>Work that can often be handled online</h2><p>Tool-based recurring work can move to a remote assistant when the inputs, output, access limits, and review owner are clear.</p><ul className="list"><li>Inbox sorting and calendar updates.</li><li>CRM cleanup and lead follow-up reminders.</li><li>Customer support drafts and ticket sorting.</li><li>Simple reports, research, data entry, and appointment notes.</li></ul></section>
      <section className="card"><h2>A simple first-month pilot</h2><ol className="list"><li>Pick one role and a short list of weekly tasks.</li><li>Record the task once with a real example.</li><li>Give limited access, not owner passwords.</li><li>Review each batch closely while the assistant is learning.</li><li>Add hours only after the first tasks are steady.</li></ol></section>
      <section><h2>Common near-me assistant questions</h2><div className="cards">{faqs.map((faq)=><div className="card" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</div></section>
    </article></div></section>
    <CTA/>
  </main><Footer/></>;
}
