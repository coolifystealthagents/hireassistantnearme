import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTA, Footer, Header, JsonLd } from '../../components';
import { site } from '../../data';
import { fleetServices } from '../../fleet-data';
import { serviceDetails } from '../../service-content';

const serviceImages: Record<string, { src: string; alt: string; width: number; height: number }> = {
  'executive-assistance': { src: '/images/assistant-maya.jpg', alt: 'Portrait of a remote assistant at a workspace', width: 800, height: 1200 },
  'calendar-and-inbox-support': { src: '/images/calendar-assistant.jpg', alt: 'Remote assistant reviewing calendar information on a laptop', width: 1400, height: 933 },
  'customer-service-assistance': { src: '/images/aug20-blog-support-escalations.webp', alt: 'Editorial illustration of a customer-support escalation workflow', width: 1024, height: 1024 },
  'sales-administrative-support': { src: '/images/aug20-blog-crm-cleanup.webp', alt: 'Editorial illustration of CRM record cleanup', width: 1024, height: 1024 },
  'ecommerce-assistance': { src: '/images/aug20-blog-order-exceptions.webp', alt: 'Editorial illustration of an ecommerce order exception queue', width: 1024, height: 1024 },
  'real-estate-assistance': { src: '/images/aug20-blog-listing-admin.webp', alt: 'Editorial illustration of real-estate listing administration', width: 1024, height: 1024 },
  'marketing-coordination': { src: '/images/aug20-blog-content-calendar.webp', alt: 'Editorial illustration of a marketing content calendar', width: 1024, height: 1024 },
  'bookkeeping-administration': { src: '/images/aug20-blog-invoice-followup.webp', alt: 'Editorial illustration of an invoice follow-up workflow', width: 1024, height: 1024 },
  'recruitment-assistance': { src: '/images/aug21-blog-interview-notes.webp', alt: 'Editorial illustration of structured interview notes', width: 1536, height: 1024 },
  'project-coordination': { src: '/images/aug20-blog-meeting-notes.webp', alt: 'Editorial illustration of project meeting notes and actions', width: 1024, height: 1024 },
};

const relatedServiceSlugs: Record<string, string[]> = {
  'executive-assistance': ['calendar-and-inbox-support', 'project-coordination', 'recruitment-assistance'],
  'calendar-and-inbox-support': ['executive-assistance', 'customer-service-assistance', 'project-coordination'],
  'customer-service-assistance': ['ecommerce-assistance', 'sales-administrative-support', 'executive-assistance'],
  'sales-administrative-support': ['marketing-coordination', 'customer-service-assistance', 'project-coordination'],
  'ecommerce-assistance': ['customer-service-assistance', 'bookkeeping-administration', 'marketing-coordination'],
  'real-estate-assistance': ['sales-administrative-support', 'bookkeeping-administration', 'project-coordination'],
  'marketing-coordination': ['sales-administrative-support', 'project-coordination', 'ecommerce-assistance'],
  'bookkeeping-administration': ['ecommerce-assistance', 'project-coordination', 'executive-assistance'],
  'recruitment-assistance': ['executive-assistance', 'project-coordination', 'calendar-and-inbox-support'],
  'project-coordination': ['executive-assistance', 'marketing-coordination', 'recruitment-assistance'],
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
  const related = (relatedServiceSlugs[slug] || [])
    .map((relatedSlug) => fleetServices.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof fleetServices)[number] => Boolean(item));
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.desc, url: `${site.url}/services/${slug}`, provider: { '@type': 'Organization', name: 'StealthAgents', url: 'https://stealthagents.com/' }, areaServed: 'Remote' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: detail.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Services', item: `${site.url}/services` }, { '@type': 'ListItem', position: 2, name: service.title, item: `${site.url}/services/${slug}` }] },
  ];

  return <><Header /><main>
    <JsonLd data={schema} />
    <section className="fleet-hero service-detail-hero"><div className="container service-hero-grid"><div><p className="fleet-kicker">Philippines-based remote support</p><h1>{service.title}</h1><p>{service.desc}</p><p className="service-audience">{detail.audience}</p><div className="button-row"><a className="btn primary" href="/contact-us">Discuss this role</a><a className="btn secondary" href="/services">Compare all services</a></div></div><figure className="service-hero-photo"><img src={image.src} alt={image.alt} width={image.width} height={image.height} /><figcaption>Illustrative role view. Hire Assistant Near Me recruits remote assistants in the Philippines; it does not provide local or in-person workers.</figcaption></figure></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">A usable role brief</p><h2>Inputs, outputs, and review rules.</h2></div><p>For {service.title.toLowerCase()}, begin with {detail.inputs[0].toLowerCase()} and review {detail.outputs[0].toLowerCase()} before widening the lane.</p></div><div className="service-evidence-grid">
      <article><span>Required context</span><h3>Inputs the role needs</h3><ul>{detail.inputs.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article><span>Reviewable work</span><h3>Outputs to expect</h3><ul>{detail.outputs.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article><span>Owner review</span><h3>Quality checks</h3><ul>{detail.quality.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </div></div></section>

    <section className="service-fit-section"><div className="container service-fit-grid"><div className="service-fit-copy"><p className="eyebrow light">Remote versus local</p><h2>Use remote support for tool-based preparation.</h2><p>In this role, the remote lane can cover {service.tasks[0].toLowerCase()}. The accountable owner still controls {service.controls[0].toLowerCase()}.</p><a className="text-link light-link" href="/compare/local-vs-remote-assistant">Read the local versus remote comparison →</a></div><div className="service-fit-board"><article><span>Good remote lane</span><ul>{service.tasks.map((item) => <li key={item}>{item}</li>)}</ul></article><article><span>Owner controls</span><ul>{service.controls.map((item) => <li key={item}>{item}</li>)}</ul></article></div></div></section>

    <section className="section service-scenarios"><div className="container"><div className="section-heading"><div><p className="eyebrow">Real workflow examples</p><h2>What the handoff looks like.</h2></div><p>The first example, {detail.scenarios[0].title.toLowerCase()}, shows both the prepared work and the point where owner review begins.</p></div><div className="scenario-grid">{detail.scenarios.map((scenario) => <article key={scenario.title}><h3>{scenario.title}</h3><p>{scenario.body}</p></article>)}</div></div></section>

    <section className="section muted-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">First-week rollout</p><h2>Start narrow enough to review daily.</h2></div><p>The opening checkpoint is specific to this lane: {service.firstWeek[0]}</p></div><ol className="rollout-list">{service.firstWeek.map((item, index) => <li key={item}><span>{index + 1}</span><p>{item}</p></li>)}</ol></div></section>

    <section className="section"><div className="container faq-layout"><div><p className="eyebrow">Common questions</p><h2>{service.title} questions</h2></div><div>{detail.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="section related-services"><div className="container"><p className="eyebrow">Related role plans</p><h2>Compare adjacent support lanes.</h2><div className="related-service-links">{related.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><span>{item.title}</span><small>{item.desc}</small></a>)}</div></div></section>
    <CTA />
  </main><Footer /></>;
}
