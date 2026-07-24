import { notFound } from 'next/navigation';
import { Header, Footer, CTA, JsonLd } from '../../components';
import { fleetServices } from '../../fleet-data';
import { site } from '../../data';

const base = `https://${site.domain.toLowerCase()}`;

export function generateStaticParams() {
  return fleetServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = fleetServices.find((item) => item.slug === slug);
  if (!service) return { title: 'Not found' };

  return {
    title: service.title,
    description: service.desc,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | ${site.brand}`,
      description: service.desc,
      url: `/services/${slug}`,
      images: service.image ? [{ url: service.image, alt: service.imageAlt }] : undefined,
    },
  };
}

export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = fleetServices.find((item) => item.slug === slug);
  if (!service) notFound();

  const url = `${base}/services/${service.slug}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}/#service`,
      name: service.title,
      description: service.desc,
      url,
      serviceOutput: 'Remote assistant support from talent recruited and hired in the Philippines',
      provider: { '@type': 'Organization', '@id': `${base}/#organization`, name: site.brand },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${url}/#first-week`,
      name: `How to start ${service.title.toLowerCase()} support`,
      step: service.firstWeek.map((text, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `Step ${index + 1}`,
        text,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${base}/services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
    ...(service.faqs ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }] : []),
  ];

  return <>
    <Header />
    <main>
      <JsonLd data={schema} />
      <section className={`fleet-hero variant-1 ${service.image ? 'service-image-hero' : ''}`}>
        <div className="container service-hero-grid">
          <div>
            <p className="eyebrow">Filipino remote assistant support</p>
            <h1>{service.title}</h1>
            <p className="lead">{service.desc}</p>
            <a className="btn primary" href="/contact">Discuss this service</a>
          </div>
          {service.image && <figure className="service-hero-photo">
            <img src={service.image} alt={service.imageAlt ?? `${service.title} role illustration`} />
            <figcaption>Role illustration. Candidates for this service are recruited and hired only in the Philippines.</figcaption>
          </figure>}
        </div>
      </section>
      <section className="section">
        <div className="container fleet-detail-grid">
          <div className="card"><h2>Work to include</h2><ul>{service.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div>
          <div className="card"><h2>Controls to retain</h2><ul>{service.controls.map((control) => <li key={control}>{control}</li>)}</ul></div>
          <div className="card" id="first-week"><h2>First-week plan</h2><ol>{service.firstWeek.map((step) => <li key={step}>{step}</li>)}</ol></div>
        </div>
      </section>
      {service.bestFor && service.keepLocal && <section className="service-fit-section">
        <div className="container service-fit-grid">
          <div className="service-fit-copy">
            <p className="eyebrow light">Check the fit before hiring</p>
            <h2>Remote inbox help works best when the rules are easy to see.</h2>
            <p>A Filipino assistant can keep routine messages and meetings moving. Your local team should keep physical work and decisions that need an owner or qualified professional.</p>
            <a className="btn cream" href="/contact">Build a calendar and inbox brief</a>
          </div>
          <div className="service-fit-board">
            <article><span>Good remote fit</span><ul>{service.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><span>Keep with your local team</span><ul>{service.keepLocal.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </div>
      </section>}
      {service.faqs && <section className="section service-faq-section">
        <div className="container service-faq-shell">
          <div><p className="eyebrow">Calendar and inbox questions</p><h2>What owners ask before sharing access</h2></div>
          <div className="service-faq-list">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>}
      <CTA />
    </main>
    <Footer />
  </>;
}
