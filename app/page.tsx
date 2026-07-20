import * as data from './data';
import { Header, Footer, JsonLd } from './components';
const d=data as any;
const site=d.site||{};
const services=(d.services||d.roles||d.industries||[]).slice(0,4);
const posts=(d.blogPosts||[]).slice(0,3);
const stats=(d.stats||[]).slice(0,3);
const offer=d.staffingOffer||{};
const pretty=(v:any)=>String(v||'virtual assistant support').replace(/\b\w/g,(m)=>m.toUpperCase());
const title=(x:any)=>typeof x==='string'?x:(x.title||x.name||x.label||x.question||'Assistant role');
const text=(x:any)=>typeof x==='string'?x:(x.desc||x.excerpt||x.note||x.body||(x.bestFor?`Best for ${x.bestFor.join(', ')}`:'Clear tasks, safe access, and review rules.'));
const slug=(x:any)=>(x.slug||title(x).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''));
const primary=site.primary||site.brand||'virtual assistant support';
const rolePhrase=String(primary).toLowerCase()
  .replace(/^best\s+/,'')
  .replace(/(company|companies|services|service|provider|providers)/g,'')
  .replace(/(outsource|outsourced|outsourcing|offshore|overseas)/g,'')
  .replace(/\s+/g,' ')
  .trim() || 'business support';
const roleLabel=pretty(rolePhrase.includes('assistant')?rolePhrase:`${rolePhrase} support`).replace(/\bVa\b/g,'VA');
const domain=site.domain||site.brand||'Staffing Guide';
const heroImage=site.heroImage||site.serviceImage||'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';
const tagline=site.angle||site.audience||'managed hiring support with clear scope, safe access, onboarding, and quality checks';
export default function Home(){const schema={'@context':'https://schema.org','@type':'WebSite',name:site.brand,url:`https://${domain}`};return <><Header/><main className="belay"><JsonLd data={schema}/>
<section className="hero"><div className="container hero-grid"><div className="copy"><p className="eyebrow">Premium staffing match</p><h1>Hire managed {roleLabel} without screening alone.</h1><p className="lead">Get clear communicators, business-hour coverage, and a managed launch plan for {tagline}.</p><div className="actions"><a className="btn primary" href="/contact">Request staffing plan</a><a className="btn secondary" href="#tasks">Get task ideas</a></div><p className="risk">No public rate card. Share the role first, then get a practical scope.</p></div><div className="match-card"><div className="portrait-wrap"><img src={heroImage} alt={site.alt||`${site.brand||roleLabel} managed staffing visual`}/><span className="badge">Top-fit match</span></div><div className="task-note note-a"><b>Daily handoff</b><span>clear owner brief</span></div><div className="task-note note-b"><b>Quality checks</b><span>work reviewed weekly</span></div><div className="task-note note-c"><b>21-day launch</b><span>scope → shadow → live QA</span></div></div></div><div className="container proof-bar"><span>Right role before right hire</span>{stats.length?stats.map((s:any,i:number)=><b key={i}>{s.value||s.label}</b>):['Scope first','7-21 days','5-10 tasks'].map((x,i)=><b key={i}>{x}</b>)}</div></section>
<section className="container section" id="tasks"><div className="split-head"><div><p className="eyebrow">Task ideas</p><h2>Start with work that repeats every week.</h2></div><p>Inspired by premium VA and outsourcing competitors: make the hire feel human, specific, and low risk before the contact form.</p></div><div className="task-grid">{services.map((s:any,i:number)=><a key={i} href={`/services/${slug(s)}`}><span>{String(i+1).padStart(2,'0')}</span><h3>{title(s)}</h3><p>{text(s)}</p><b>See handoff →</b></a>)}</div></section>
<section className="relationship"><div className="container rel-grid"><div><p className="eyebrow">Managed, not marketplace</p><h2>Your staffing plan should come with backup, onboarding, and quality checks.</h2></div><div className="rel-list">{(offer.included||['role planning call','candidate matching','onboarding guidance','managed support']).slice(0,4).map((x:string,i:number)=><article key={i}><span>✓</span><p>{x}</p></article>)}</div></div></section>
<section className="container section guide-row"><div><p className="eyebrow">Before you hire</p><h2>Short guides for safer staffing decisions.</h2></div>{posts.map((p:any,i:number)=><a href={`/blog/${p.slug}`} key={i}><span>{p.minutes||7} min</span><strong>{title(p)}</strong><p>{text(p)}</p></a>)}</section>
<section className="container final"><h2>Request the staffing plan before you interview.</h2><a className="btn primary" href="/contact">Request staffing plan</a></section>
</main><Footer/></>}
