import * as data from './data';
import { Header, Footer, JsonLd } from './components';

const d = data as any;
const site = d.site || {};
const services = (d.services || d.roles || d.industries || []).slice(0, 4);
const posts = (d.blogPosts || []).slice(0, 3);
const stats = (d.stats || []).slice(0, 3);
const offer = d.staffingOffer || {};

const title = (x:any) => typeof x === 'string' ? x : (x.title || x.name || x.label || x.question || 'Managed support role');
const text = (x:any) => {
  if (typeof x === 'string') return `A practical staffing lane for ${x} work with clear tasks, safe access, and weekly review.`;
  return x.desc || x.excerpt || x.note || x.body ||
    (x.bestFor ? `Best for ${x.bestFor.join(', ')}` : 'Clear tasks, safe access, owner review, and a managed first week.');
};
const slug = (x:any) => (typeof x === 'string' ? x : (x.slug || title(x))).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const keyword = site.primary || String(site.brand || 'managed offshore staffing').toLowerCase();
const audience = site.audience || 'business owners comparing managed offshore staffing options';
const heroImage = site.heroImage || site.serviceImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';
const taskLabel = keyword.includes('call') ? 'Call coverage' : keyword.includes('bookkeep') || keyword.includes('payroll') || keyword.includes('billing') || keyword.includes('accounts') ? 'Back office tasks' : keyword.includes('program') || keyword.includes('develop') ? 'Dev handoff' : keyword.includes('design') ? 'Design queue' : keyword.includes('legal') ? 'Legal admin' : 'Inbox + admin';
const secondTask = keyword.includes('call') ? 'QA call notes' : keyword.includes('program') || keyword.includes('develop') ? 'Ticket cleanup' : keyword.includes('design') ? 'Page revisions' : 'CRM follow-up';

export default function Home(){
  const schema = {'@context':'https://schema.org','@type':'WebSite',name:site.brand,url:`https://${site.domain}`};
  return <><Header/><main className="belay"><JsonLd data={schema}/>
    <section className="hero">
      <div className="container hero-grid">
        <div className="copy">
          <p className="eyebrow">Premium managed staffing</p>
          <h1>{site.brand}: hire offshore support without screening alone.</h1>
          <p className="lead">A clearer way for {audience} to plan the role, compare providers, and launch dependable remote help with onboarding, QA, backup, and reporting built in.</p>
          <div className="actions"><a className="btn primary" href="/contact">Request staffing plan</a><a className="btn secondary" href="#tasks">Get task ideas</a></div>
          <p className="risk">No public rate card. Share the work first, then get a practical scope.</p>
        </div>
        <div className="match-card">
          <div className="portrait-wrap"><img src={heroImage} alt={site.alt || `${site.brand} managed staffing visual`}/><span className="badge">Top-fit match</span></div>
          <div className="task-note note-a"><b>{taskLabel}</b><span>daily owner brief</span></div>
          <div className="task-note note-b"><b>{secondTask}</b><span>clear handoff rules</span></div>
          <div className="task-note note-c"><b>21-day launch</b><span>scope → shadow → live QA</span></div>
        </div>
      </div>
      <div className="container proof-bar"><span>Right role before right hire</span>{stats.map((s:any,i:number)=><b key={i}>{s.value || s.label}</b>)}</div>
    </section>

    <section className="container section" id="tasks">
      <div className="split-head"><div><p className="eyebrow">Task ideas</p><h2>Start with work that repeats every week.</h2></div><p>Make the hire feel human, specific, and low risk before the contact form. The page explains scope, access, manager review, and the first handoff.</p></div>
      <div className="task-grid">{services.map((s:any,i:number)=><a key={i} href={`/services/${slug(s)}`}><span>{String(i+1).padStart(2,'0')}</span><h3>{title(s)}</h3><p>{text(s)}</p><b>See handoff →</b></a>)}</div>
    </section>

    <section className="relationship"><div className="container rel-grid"><div><p className="eyebrow">Managed, not marketplace</p><h2>Your team should come with backup, onboarding, and quality checks.</h2></div><div className="rel-list">{(offer.included || ['role planning call','candidate matching','onboarding guidance','managed support']).slice(0,4).map((x:string,i:number)=><article key={i}><span>✓</span><p>{x}</p></article>)}</div></div></section>

    <section className="container section guide-row"><div><p className="eyebrow">Before you hire</p><h2>Short guides for safer staffing decisions.</h2></div>{posts.map((p:any,i:number)=><a href={`/blog/${p.slug}`} key={i}><span>{p.minutes || 7} min</span><strong>{title(p)}</strong><p>{text(p)}</p></a>)}</section>

    <section className="container final"><h2>Request the staffing plan before you interview.</h2><a className="btn primary" href="/contact">Request staffing plan</a></section>
  </main><Footer/></>;
}
