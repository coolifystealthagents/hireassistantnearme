import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTA, Footer, Header, JsonLd } from '../../components';
import { site } from '../../data';
import { fleetServices } from '../../fleet-data';
import { serviceDetails } from '../../service-content';

const serviceImages: Record<string, { src: string; alt: string }> = {
  'executive-assistance': { src: '/images/assistant-maya.jpg', alt: 'Executive assistant preparing a daily work brief' },
  'calendar-and-inbox-support': { src: '/images/calendar-assistant.jpg', alt: 'Assistant reviewing a calendar and inbox workflow' },
  'customer-service-assistance': { src: '/images/assistant-elena.jpg', alt: 'Customer support assistant preparing a documented response' },
  'sales-administrative-support': { src: '/images/assistant-daniel.jpg', alt: 'Sales administrative assistant reviewing CRM records' },
  'ecommerce-assistance': { src: '/images/local-team.jpg', alt: 'Remote support team reviewing an ecommerce workflow' },
  'real-estate-assistance': { src: '/images/assistant-maya.jpg', alt: 'Real estate assistant organizing transaction records' },
  'marketing-coordination': { src: '/images/assistant-elena.jpg', alt: 'Marketing coordinator preparing an editorial workflow' },
  'bookkeeping-administration': { src: '/images/assistant-daniel.jpg', alt: 'Bookkeeping support assistant organizing source documents' },
  'recruitment-assistance': { src: '/images/local-team.jpg', alt: 'Recruitment support team coordinating candidate records' },
  'project-coordination': { src: '/images/calendar-assistant.jpg', alt: 'Project coordinator reviewing tasks and deadlines' },
};

export function generateStaticParams() { return fleetServices.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = fleetServices.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.desc,
    alternates: { canonical: `${site.url}/services/${slug}` },
    openGraph: { title: service.title, description: service.desc, url: `${site.url}/services/${slug}`, images: [serviceImages[slug]?.src || '/images/local-team.jpg'] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = fleetServices.find((item) => item.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();
  const image = serviceImages[slug];
  const related = fleetServices.filter((item) => item.slug !== slug).slice(0, 3);
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.desc, url: `${site.url}/services/${slug}`, provider: { '@type': 'Organization', name: 'StealthAgents', url: 'https://stealthagents.com/' }, areaServed: 'Remote' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: detail.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Services', item: `${site.url}/services` }, { '@type': 'ListItem', position: 2, name: service.title, item: `${site.url}/services/${slug}` }] },
  ];

  return <><Header /><main>
    <JsonLd data={schema} />
    <section className="fleet-hero service-detail-hero"><div className="container service-hero-grid"><div><p className="fleet-kicker">Philippines-based remote support</p><h1>{service.title}</h1><p>{service.desc}</p><p className="service-audience">{detail.audience}</p><div className="button-row"><a className="btn primary" href="/contact-us">Discuss this role</a><a className="btn secondary" href="/services">Compare all services</a></div></div><figure className="service-hero-photo"><img src={image.src} alt={image.alt} width="1400" height="933" /><figcaption>Illustrative role view. Hire Assistant Near Me recruits remote assistants in the Philippines; it does not provide local or in-person workers.</figcaption></figure></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">A usable role brief</p><h2>Inputs, outputs, and review rules.</h2></div><p>This scope separates work the assistant can prepare from decisions the accountable client-side owner retains.</p></div><div className="service-evidence-grid">
      <article><span>01</span><h3>Inputs the role needs</h3><ul>{detail.inputs.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article><span>02</span><h3>Outputs to expect</h3><ul>{detail.outputs.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article><span>03</span><h3>Quality checks</h3><ul>{detail.quality.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </div></div></section>

    <section className="service-fit-section"><div className="container service-fit-grid"><div className="service-fit-copy"><p className="eyebrow light">Remote versus local</p><h2>Use remote support for tool-based preparation.</h2><p>Keep physical work, licensed judgment, sensitive decisions, and final business authority with your local or accountable team.</p><a className="text-link light-link" href="/compare/local-vs-remote-assistant">Read the local versus remote comparison →</a></div><div className="service-fit-board"><article><span>Good remote lane</span><ul>{service.tasks.map((item) => <li key={item}>{item}</li>)}</ul></article><article><span>Owner controls</span><ul>{service.controls.map((item) => <li key={item}>{item}</li>)}</ul></article></div></div></section>

    <section className="section service-scenarios"><div className="container"><div className="section-heading"><div><p className="eyebrow">Real workflow examples</p><h2>What the handoff looks like.</h2></div><p>Each scenario names what is prepared and where the work stops for accountable review.</p></div><div className="scenario-grid">{detail.scenarios.map((scenario, index) => <article key={scenario.title}><span>Scenario {index + 1}</span><h3>{scenario.title}</h3><p>{scenario.body}</p></article>)}</div></div></section>

    <section className="section muted-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">First-week rollout</p><h2>Start narrow enough to review daily.</h2></div><p>Access grows only after the owner can see the source, output, correction, and exception path.</p></div><ol className="rollout-list">{service.firstWeek.map((item, index) => <li key={item}><span>{index + 1}</span><p>{item}</p></li>)}</ol></div></section>

    <section className="section"><div className="container faq-layout"><div><p className="eyebrow">Common questions</p><h2>{service.title} questions</h2></div><div>{detail.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="section related-services"><div className="container"><p className="eyebrow">Related role plans</p><h2>Compare adjacent support lanes.</h2><div className="related-service-links">{related.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><span>{item.title}</span><small>{item.desc}</small></a>)}</div></div></section>
    <CTA />
  </main><Footer /></>;
}
