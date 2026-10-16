import type { Metadata } from 'next';
import { CTA, Footer, Header, JsonLd } from '../components';
import { site } from '../data';

export const metadata: Metadata = {
  title: 'About Hire Assistant Near Me',
  description: 'Learn how Hire Assistant Near Me helps businesses define remote roles and connects qualified requests with the StealthAgents staffing team in the Philippines.',
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Hire Assistant Near Me', url: `${site.url}/about`,
    about: { '@type': 'Organization', name: site.brand, url: site.url, parentOrganization: { '@type': 'Organization', name: 'StealthAgents', url: 'https://stealthagents.com/' } },
  };
  return <><Header /><main><JsonLd data={schema} />
    <section className="section about-hero"><div className="container about-hero-grid"><div><p className="eyebrow">About the service</p><h1>A clearer way to define remote support before the staffing conversation.</h1><p className="lead">Hire Assistant Near Me is an information and inquiry site for businesses considering Philippines-based remote support. It helps owners turn recurring work into a bounded role brief, then connects qualified inquiries with StealthAgents.</p><div className="button-row"><a className="btn primary" href="/contact-us">Describe the role</a><a className="btn secondary" href="/services">Review role plans</a></div></div><figure><img src="/images/stealth-agents-team.webp" width="1600" height="1067" alt="StealthAgents team members together in the Bacolod office" /><figcaption>Official StealthAgents team, Bacolod</figcaption></figure></div></section>
    <section className="section"><div className="container about-principles"><div><p className="eyebrow">What this site does</p><h2>Role education first, staffing follow-up second.</h2></div><div className="cards"><article className="card"><h3>Clarify the work</h3><p>Service plans separate inputs, outputs, review points, and decisions that stay with the business.</p></article><article className="card"><h3>Set a location boundary</h3><p>The staffing path is for Philippines-based remote assistants. Physical and in-person duties need a local employee or vendor.</p></article><article className="card"><h3>Route qualified inquiries</h3><p>Information submitted through the contact form may be shared with the StealthAgents staffing team for fit and availability follow-up.</p></article></div></div></section>
    <section className="section about-accountability"><div className="container two"><div><p className="eyebrow light">Operating model</p><h2>A subsidiary experience with visible parent accountability.</h2><p>Hire Assistant Near Me provides the role library, comparison tools, and inquiry experience. StealthAgents recruits and manages the Philippines-based talent and conducts the staffing conversation.</p></div><div className="card"><h3>What the owner keeps</h3><ul className="list"><li>Final hiring and scope decisions</li><li>Tool access and approval boundaries</li><li>Licensed, financial, and sensitive judgment</li><li>Review of early work and exceptions</li></ul></div></div></section>
    <CTA />
  </main><Footer /></>;
}
