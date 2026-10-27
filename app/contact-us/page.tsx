import type { Metadata } from 'next';
import { Footer, Header } from '../components';
import { TestimonialsRail } from '../booking-components';
import StandardContactForm from './StandardContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Plan Your Remote Assistant Role',
  description: 'Share the work, tools, schedule, and approval boundaries for a Philippines-based remote assistant role.',
  alternates: { canonical: '/contact-us' },
  robots: { index: true, follow: true },
  openGraph: { title: 'Contact Hire Assistant Near Me', description: 'Plan a dedicated remote assistant role around your workflow.', url: '/contact-us', images: [{ url: '/images/contact-assistant.jpg', width: 560, height: 540, alt: 'Executive assistant working in a professional office' }] },
};

export default function ContactUsPage() {
  return <><Header /><main className="contact-v2">
    <section className="contact-fold"><div className="contact-shell contact-grid"><div className="contact-copy"><p className="contact-kicker">Role planning for remote support</p><h1>Turn the work on your desk into a clear assistant role.</h1><p className="contact-lead">Tell us which work repeats, when it needs attention, and which decisions stay with your team. A staffing specialist can use that context to discuss Philippines-based support.</p><ul className="contact-signals"><li>Role-first conversation</li><li>Tools, hours, and access boundaries</li><li>No in-person or local placements</li></ul><TestimonialsRail contact /></div><StandardContactForm endpoint="/api/contact" encoding="form" /></div></section>
    <section className="parent-brand" aria-labelledby="parent-brand-title"><div className="contact-shell parent-grid"><figure><img src="/images/contact-assistant.jpg" width="560" height="540" alt="Executive assistant working in a professional office" /><figcaption className="official-plate"><img src="/images/stealth-agents-logo-black.png" width="149" height="50" alt="StealthAgents official logo" /><span>Professional remote support</span></figcaption></figure><div><p className="contact-kicker">Powered by StealthAgents</p><h2 id="parent-brand-title">A managed service behind the role conversation.</h2><p>StealthAgents recruits and manages Philippines-based remote assistants. Hire Assistant Near Me helps you define the task lane, schedule, tools, and approval boundaries before the staffing team discusses fit.</p><p>The subsidiary brand stays focused on role planning. StealthAgents provides the operating context for candidate matching, onboarding support, and ongoing staffing conversations.</p><a className="parent-link" href="https://stealthagents.com/" target="_blank" rel="noopener noreferrer">Learn about StealthAgents <span aria-hidden="true">↗</span></a></div></div></section>
    <section className="contact-details"><div className="contact-shell detail-grid"><div><p className="contact-kicker">Useful preparation</p><h2>Bring a real workflow, not a polished job description.</h2><p>One repeated task is enough to begin. Note the trigger, finished result, systems used, response window, and person who gives final approval.</p></div><dl><div><dt>Work to include</dt><dd>Inbox triage, calendar coordination, CRM updates, research notes, customer routing, and recurring admin.</dd></div><div><dt>Keep with your team</dt><dd>Payments, account recovery, legal or medical judgment, final customer promises, and physical office work.</dd></div><div><dt>What happens next</dt><dd>After the form is accepted, choose a consultation time on the next page. You decide whether to continue after the fit conversation.</dd></div></dl></div></section>
  </main><Footer /></>;
}
