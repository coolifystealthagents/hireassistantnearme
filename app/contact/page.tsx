import { Header, Footer } from '../components';
import { site } from '../data';

export const metadata = {
  title: 'Contact | Request an assistant hiring plan',
  description: 'Request a simple assistant hiring plan with role scope, hours, cost range, interview questions, and first-week checklist.',
  alternates: { canonical: `${site.url}/contact` },
};

export default function Contact() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Request an assistant hiring plan',
    url: `${site.url}/contact`,
    about: { '@type': 'Service', name: 'Assistant hiring planning' },
    publisher: { '@type': 'Organization', name: site.brand, url: site.url },
  };
  return <><Header/><main className="section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="container two"><div><p className="eyebrow">Contact</p><h1>Request an assistant hiring plan</h1><p className="lead">Tell us what you want off your plate. We will map the role, estimated hours, questions to ask, and onboarding checklist.</p><div className="card"><h2>What to include</h2><ul className="list"><li>Your business type and time zone.</li><li>The tasks you want done every week.</li><li>The tools the assistant will use.</li><li>Any limits around money, customer data, legal, or medical work.</li><li>Your preferred budget or hour range.</li></ul></div><p><b>Placeholder:</b> connect this form to the preferred CRM or intake endpoint before paid traffic.</p></div><form className="card" action="/thank-you"><label>Name<br/><input required name="name" /></label><label>Email<br/><input required name="email" type="email" /></label><label>Business type<br/><input name="business" placeholder="real estate, clinic, agency, ecommerce..." /></label><label>What tasks do you want help with?<br/><textarea name="tasks" rows={6} /></label><button className="btn" type="submit">Send request</button></form></div></main><Footer/></>;
}
