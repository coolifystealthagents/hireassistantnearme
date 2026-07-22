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
      <CTA />
    </main>
    <Footer />
  </>;
}
