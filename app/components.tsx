import * as data from './data';
import { fleetServices } from './fleet-data';
import { HeaderClient } from './header-client';

const site = (data as typeof data).site;
const year = new Date().getFullYear();

export function JsonLd({ data: value }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />;
}

export function LogoMark() {
  return <span className="logo-mark-wrap"><img className="logo-img" src="/logo.svg?v=20261016" alt="" width="43" height="43" /><span className="logo-name">{site.brand}</span></span>;
}

export function Header() {
  return <HeaderClient brand={site.brand} />;
}

export function Footer() {
  return <footer className="footer legit-footer"><div className="footer-grid"><div className="footer-brand"><a className="footer-logo" href="/"><LogoMark /></a><p>Explore Philippines-based {site.primary || 'remote assistant'} support designed around documented scope and accountable handoffs.</p><p className="footer-note">Hire Assistant Near Me connects visitors with StealthAgents, which recruits and manages Philippines-based remote talent. Submitted requests may be routed to its staffing team for follow-up.</p><a className="footer-parent-brand" href="https://stealthagents.com/"><span>Powered by StealthAgents</span><img src="/images/stealth-agents-logo-black.png" alt="StealthAgents" width="149" height="50" /></a></div><div><h3>Services</h3><div className="footer-links">{fleetServices.slice(0, 6).map((service) => <a href={`/services/${service.slug}`} key={service.slug}>{service.title}</a>)}</div></div><div><h3>Site</h3><div className="footer-links"><a href="/about">About</a><a href="/blog">Blog</a><a href="/contact-us">Contact Us</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms &amp; Conditions</a></div></div></div><div className="footer-bottom"><span>© {year} {site.brand}. All rights reserved.</span><span>{site.domain}</span></div></footer>;
}

export function CTA() {
  return <section className="final-cta fleet-final"><p className="eyebrow">Philippines-based staffing</p><h2>Define the work before hiring.</h2><p>Share the positions, systems, hours, and approval points your team needs. A staffing specialist can use that context to discuss fit.</p><a className="btn primary" href="/contact-us" id="cta-global-final-contact">Contact Us</a></section>;
}
