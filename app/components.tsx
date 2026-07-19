import { site } from './data';

export function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="/" className="logo"><span className="mark">VA</span><span>{site.brand}</span></a>
        <nav className="links">
          <a href="/#services">Services</a>
          <a href="/#pricing">Pricing</a>
          <a href="/compare/local-vs-remote-assistant">Local vs remote</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
        <a className="btn" href="/contact">Get shortlist</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <b>{site.brand}</b>
          <p>Research-backed virtual assistant hiring guides for buyers who want clear steps, not hype.</p>
          <p>© {new Date().getFullYear()} {site.brand}. Independent education site. Replace contact details before launch.</p>
        </div>
        <div>
          <b>Plan your hire</b>
          <p><a href="/compare/local-vs-remote-assistant">Local vs remote assistant</a></p>
          <p><a href="/blog/virtual-assistant-costs">Assistant cost guide</a></p>
          <p><a href="/blog/assistant-onboarding-checklist">Onboarding checklist</a></p>
        </div>
        <div>
          <b>Site</b>
          <p><a href="/contact">Contact</a></p>
          <p><a href="/privacy">Privacy</a></p>
          <p><a href="/terms">Terms</a></p>
        </div>
      </div>
    </footer>
  );
}

export function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="callout">
          <p className="eyebrow" style={{ color: 'white' }}>Need help deciding?</p>
          <h2>Get a simple assistant hiring plan.</h2>
          <p>Tell us the tasks, tools, hours, and coverage you need. We will map the role, cost range, interview questions, and first-week checklist.</p>
          <a className="btn secondary" href="/contact">Request a quote-style plan</a>
        </div>
      </div>
    </section>
  );
}
