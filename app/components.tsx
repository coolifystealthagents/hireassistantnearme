import * as data from './data';

const site = (data as any).site;
const dataAny = data as any;
const footerItems = (dataAny.services || dataAny.roles?.map((title: string)=>({ title, slug: String(title).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') })) || dataAny.industries?.map((title: string)=>({ title, slug: String(title).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') })) || dataAny.blogPosts || []).slice(0,6);
const systemName = site.style || site.badge || site.primary || 'Outsourcing guide';
const badgeName = site.badge || site.primary || 'Hiring guide';

export function JsonLd({data}:{data: any}){return <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />}
export function Header(){return <header className={`nav nav-${site.slug}`} data-system={systemName}><div className='container nav-inner'><a className='logo' href='/' aria-label={`${site.brand} home`}><img className='logo-img' src='/logo.svg' alt={`${site.brand} logo`}/><span className='logo-text'><span className='logo-name'>{site.brand}</span><span className='logo-sub'>{badgeName} · {systemName}</span></span></a><nav className='links'><a href='/#services'>Services</a><a href='/#process'>Process</a><a href='/#compare'>Compare</a><a href='/blog'>Blog</a><a href='/contact'>Contact</a></nav><a className='btn nav-cta' href='/contact'>Start Hiring</a></div></header>}
export function Footer(){return <footer className='footer'><div className='container two'><div><b>{site.brand}</b><p>Stealth Agents-style offshore outsourcing guides for buyers who want clear next steps.</p></div><div>{footerItems.map((s: any)=>{ const label = s.title || s.name || s.label || s.question || String(s); const href = s.slug ? `/services/${s.slug}` : '/blog'; return <a className='pill' href={href} key={s.slug || label}>{label}</a> })}</div></div></footer>}
export function CTA(){return <section className='section dark'><div className='container two'><div><p className='eyebrow'>Ready for a plan?</p><h2>Map the role before you hire.</h2><p>Share the work, tools, schedule, and success metric. Build a small pilot first, then scale what works.</p></div><div><a className='btn' href='/contact'>Get a quote-style plan</a></div></div></section>}
