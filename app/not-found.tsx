import { Footer, Header } from './components';

export default function NotFound() {
  return <><Header /><main className="not-found-page"><section className="container"><p className="eyebrow">Page not found</p><h1>This route is not part of the role plan.</h1><p className="lead">The page may have moved or the address may be incomplete. Continue with the service overview or start a role brief.</p><div className="button-row"><a className="btn primary" href="/services">Explore services</a><a className="btn secondary" href="/contact-us">Contact Us</a></div></section></main><Footer /></>;
}
