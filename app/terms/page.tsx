import { Header, Footer } from '../components';
import { site } from '../data';

export const metadata = {
  title: 'Terms of use',
  description: 'Terms of use placeholder for Hire Assistant Near Me.',
  alternates: { canonical: `${site.url}/terms` },
};

export default function Terms() {
  return <><Header/><main className="section"><div className="container narrow"><p className="eyebrow">Terms</p><h1>Terms of use</h1><p className="lead">This is a placeholder terms page for {site.brand}. Replace it with reviewed legal copy before launch.</p><div className="card"><h2>Educational information</h2><p>The site provides general assistant-hiring education. It is not legal, tax, HR, payroll, or compliance advice.</p><h2>No guaranteed outcome</h2><p>Hiring results depend on role fit, training, provider quality, budget, tools, and management. No ranking, wage, savings, or placement claim should be treated as guaranteed.</p><h2>User responsibility</h2><p>Before hiring, review worker classification, data access, contracts, local rules, and any regulated-industry requirements with the right professional.</p><h2>Changes</h2><p>These placeholder terms may be updated as the site moves from draft to launch.</p></div></div></main><Footer/></>;
}
