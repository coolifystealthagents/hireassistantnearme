import { Header, Footer } from '../components';
import { site } from '../data';

export const metadata = {
  title: 'Privacy policy',
  description: 'Privacy policy placeholder for Hire Assistant Near Me.',
  alternates: { canonical: `${site.url}/privacy` },
};

export default function Privacy() {
  return <><Header/><main className="section"><div className="container narrow"><p className="eyebrow">Privacy</p><h1>Privacy policy</h1><p className="lead">This is a placeholder privacy page for {site.brand}. Replace it with reviewed legal copy before collecting live leads or running ads.</p><div className="card"><h2>What this site may collect</h2><p>If the contact form is connected, the site may collect your name, email, business type, and task notes so a hiring plan can be prepared.</p><h2>How the information may be used</h2><p>Information may be used to reply to your request, prepare assistant-role guidance, improve the site, and prevent spam.</p><h2>Third-party tools</h2><p>Analytics, hosting, CRM, email, or scheduling tools may process limited data. Add the real vendor list before launch.</p><h2>Contact</h2><p>Replace this section with the correct business contact email before launch.</p></div></div></main><Footer/></>;
}
