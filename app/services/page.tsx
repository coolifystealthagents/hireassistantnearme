import type { Metadata } from 'next';
import { CTA, Footer, Header } from '../components';
import { site } from '../data';
import { fleetServices } from '../fleet-data';

export const metadata: Metadata = { title: 'Remote Assistant Services', description: 'Compare Philippines-based remote assistant roles by workstream, inputs, outputs, controls, and first-week review.', alternates: { canonical: `${site.url}/services` } };

const groups = [
  { label: 'Leadership and operations', note: 'Protect executive attention and keep recurring work visible.', slugs: ['executive-assistance', 'calendar-and-inbox-support', 'project-coordination'] },
  { label: 'Customers and revenue', note: 'Prepare customer, sales, and ecommerce work without transferring remedies or commercial judgment.', slugs: ['customer-service-assistance', 'sales-administrative-support', 'ecommerce-assistance'] },
  { label: 'Specialist administration', note: 'Support record-heavy workflows while accountable professionals retain decisions.', slugs: ['real-estate-assistance', 'marketing-coordination', 'bookkeeping-administration', 'recruitment-assistance'] },
];

export default function ServicesPage() {
  const featured = fleetServices[0];
  return <><Header /><main>
    <section className="fleet-hero service-index-hero"><div className="container service-index-opening"><div><p className="fleet-kicker">Remote assistant role library</p><h1>Choose a workstream, not an “all-purpose” assistant.</h1><p>Each service plan defines the inputs, outputs, approval boundaries, and first-week review for a Philippines-based remote assistant. Local and in-person workers are not offered.</p><div className="button-row"><a className="btn primary" href="/contact-us">Build my role brief</a><a className="btn secondary" href="#service-directory">Browse the directory</a></div></div><aside><span>Start with one lane</span><h2>{featured.title}</h2><p>{featured.desc}</p><a className="text-link" href={`/services/${featured.slug}`}>Open the complete role plan →</a></aside></div></section>

    <section className="section service-principles"><div className="container"><div className="section-heading"><div><p className="eyebrow">How to compare</p><h2>Three questions before a role title.</h2></div><p>A good scope is specific enough that an owner can review the work and identify the decisions that remain local.</p></div><div className="principle-row"><article><b>What enters?</b><p>Name the approved records, tools, examples, and access.</p></article><article><b>What comes back?</b><p>Define the draft, tracker, brief, queue, or other reviewable output.</p></article><article><b>Where does it stop?</b><p>Keep payments, sensitive judgment, promises, and exceptions with a named owner.</p></article></div></div></section>

    <section className="section service-directory-section" id="service-directory"><div className="container"><div className="section-heading compact"><div><p className="eyebrow">Ten specific role plans</p><h2>Find the lane closest to your repeated work.</h2></div><p>Every detail page includes service-specific inputs, outputs, quality checks, scenarios, rollout steps, and FAQs.</p></div><div className="service-directory">{groups.map((group) => <section className="service-group" key={group.label}><header><p>{group.label}</p><span>{group.note}</span></header><div>{group.slugs.map((slug, index) => { const service = fleetServices.find((item) => item.slug === slug)!; return <a href={`/services/${service.slug}`} key={service.slug}><span>{index + 1}</span><div><h3>{service.title}</h3><p>{service.desc}</p></div><b aria-hidden="true">↗</b></a>; })}</div></section>)}</div></div></section>

    <section className="service-fit-section"><div className="container service-fit-grid"><div className="service-fit-copy"><p className="eyebrow light">Location boundary</p><h2>“Near me” does not mean in person.</h2><p>Hire Assistant Near Me recruits assistants in the Philippines. Use a local employee or vendor for front-desk coverage, physical records, equipment, errands, and work that must happen on site.</p><a className="text-link light-link" href="/compare/local-vs-remote-assistant">Compare local and remote work →</a></div><div className="service-fit-board"><article><span>Often suitable remotely</span><ul><li>Inbox, calendar, CRM, and support preparation</li><li>Record organization and exception queues</li><li>Research, drafts, status tracking, and follow-up</li></ul></article><article><span>Keep local or accountable</span><ul><li>Physical access, walk-ins, errands, and equipment</li><li>Licensed advice and sensitive judgment</li><li>Payments, promises, remedies, and final approval</li></ul></article></div></div></section>
    <CTA />
  </main><Footer /></>;
}
