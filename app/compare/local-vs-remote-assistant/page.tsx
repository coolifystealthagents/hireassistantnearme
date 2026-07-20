import { Header, Footer, CTA } from '../../components';
import { compareRows, faqs, site } from '../../data';

export const metadata = {
  title: 'Local vs remote assistant: which should you hire?',
  description: 'A plain comparison for local business owners deciding between a local assistant, U.S.-remote assistant, overseas VA, or managed assistant service.',
  alternates: { canonical: `${site.url}/compare/local-vs-remote-assistant` },
};

export default function LocalVsRemoteAssistant() {
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
  return <><Header/><main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([howTo, faqSchema]) }} /><section className="hero"><div className="container"><p className="eyebrow">Local vs remote assistant</p><h1>Should you hire a local assistant or a remote VA?</h1><p className="lead">The answer depends on the work. Use this guide to decide what should stay local and what can be handled by a remote assistant.</p><div className="button-row"><a className="btn" href="/contact">Get a role plan</a><a className="btn secondary" href="/blog/virtual-assistant-vs-employee">VA vs employee guide</a></div></div></section><section className="section"><div className="container"><h2>Fast comparison</h2><div className="table"><div className="row"><b>Option</b><b>Best for</b><b>Watch out for</b></div>{compareRows.map((row)=><div className="row" key={row.option}><span>{row.option}</span><span>{row.bestFor}</span><span>{row.watch}</span></div>)}</div></div></section><section className="section"><div className="container two"><div><p className="eyebrow">Keep local</p><h2>Work that usually needs someone nearby</h2><ul className="list"><li>Office errands, mail, scanning, and paper files.</li><li>Front desk coverage where customers walk in.</li><li>Work that needs physical access to inventory or equipment.</li><li>Highly sensitive work that your policy says must stay on site.</li></ul></div><div><p className="eyebrow">Move remote</p><h2>Work that can often be handled online</h2><ul className="list"><li>Inbox sorting and calendar updates.</li><li>CRM cleanup and lead follow-up reminders.</li><li>Customer support drafts and ticket sorting.</li><li>Simple reports, research, data entry, and appointment notes.</li></ul></div></div></section><section className="section"><div className="container"><div className="card"><h2>A simple first-month pilot</h2><ol className="list"><li>Pick one role and 5 to 10 weekly tasks.</li><li>Record the task once with a real example.</li><li>Give limited access, not owner passwords.</li><li>Review every task daily for five business days.</li><li>At day 14, add hours only if quality is steady.</li></ol></div></div></section><section className="section"><div className="container"><p className="eyebrow">FAQs</p><h2>Common near-me assistant questions</h2><div className="cards">{faqs.map((faq)=><div className="card" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</div></div></section><CTA/></main><Footer/></>;
}
