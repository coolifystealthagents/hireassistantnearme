import { Header, Footer, JsonLd } from './components';
import { blogPosts, faqs, localMarkets, roles, site } from './data';

const roleDetails = [
  { title: roles[0], image: '/images/assistant-maya.jpg', note: 'Calendar, inbox, meeting prep, and loose ends that follow you home.', fit: 'Role example · owner-led teams' },
  { title: roles[1], image: '/images/assistant-daniel.jpg', note: 'Ticket sorting, reply drafts, call notes, and follow-up during your business hours.', fit: 'Role example · busy service desks' },
  { title: roles[3], image: '/images/assistant-elena.jpg', note: 'CRM upkeep, document prep, reports, and recurring admin that needs a steady owner.', fit: 'Role example · growing operations' },
];

const tasks = ['Inbox and calendar', 'Customer follow-up', 'CRM cleanup', 'Reports and admin'];

export default function Home() {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: site.brand, url: site.url },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ];
  return <><Header/><main className="finder-home" data-design="local-finder-2026"><JsonLd data={schema}/>
    <section className="finder-hero">
      <div className="container hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">A clearer way to hire assistant help</p>
          <h1>Find an assistant <em>who fits your workday.</em></h1>
          <p className="hero-deck">Keep in-person work with your local team. Move repeat online work to a Filipino assistant hired for your hours, tools, and task list.</p>
          <div className="hero-actions">
            <a className="btn primary" href="/contact">Build my role brief</a>
            <a className="text-link" href="/compare/local-vs-remote-assistant">Compare local and remote <span>↗</span></a>
          </div>
          <div className="hero-note"><span className="note-icon">⌖</span><p><strong>Searching "near me"?</strong> We recruit only in the Philippines. You get remote help planned around your local workday, not an in-person hire.</p></div>
        </div>
        <div className="hero-visual">
          <img src="/images/local-team.jpg" alt="Small business team planning work for a Philippines-based remote assistant"/>
          <div className="location-card">
            <div className="location-top"><span>Role brief</span><b>01</b></div>
            <h2>Where should the work happen?</h2>
            <div className="choice active"><span>●</span><div><b>Filipino remote assistant</b><small>For work handled in your online tools</small></div></div>
            <div className="choice"><span>○</span><div><b>Keep it with your local team</b><small>For front desk, errands, or paper files</small></div></div>
            <div className="choice"><span>○</span><div><b>Help me sort the role</b><small>Separate online tasks from in-person work</small></div></div>
          </div>

        </div>
      </div>
      <div className="container task-strip" aria-label="Common assistant tasks">
        <span className="strip-label">Popular starting points</span>
        {tasks.map((task, index) => <a href="#roles" key={task}><i>{String(index + 1).padStart(2, '0')}</i>{task}</a>)}
      </div>
    </section>

    <section className="section role-section" id="roles">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">Choose the work, then the person</p><h2>Start with a role that has edges.</h2></div><p>An assistant can do a lot. That does not mean one person should do everything. A tighter brief makes screening, onboarding, and review much easier.</p></div>
        <div className="role-grid">
          {roleDetails.map((role, index) => <article className="role-card" key={role.title}>
            <div className="role-photo"><img src={role.image} alt={`${role.title} support role example`}/><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="role-body"><small>{role.fit}</small><h3>{role.title}</h3><p>{role.note}</p><a href="/contact">Add this to my brief <span>→</span></a></div>
          </article>)}
        </div>
        <p className="image-disclaimer">These photos illustrate assistant roles. They do not show available candidates or customer endorsements.</p>
      </div>
    </section>

    <section className="decision-section">
      <div className="container decision-grid">
        <div className="decision-intro"><p className="eyebrow light">The location test</p><h2>Keep physical work local. Send online work to the Philippines.</h2><p>If someone needs the office key, this service is not the right fit. If the work lives in your inbox, calendar, CRM, or help desk, a Filipino remote assistant can handle it during agreed hours.</p><a className="btn cream" href="/compare/local-vs-remote-assistant">Use the full comparison</a></div>
        <div className="decision-board">
          <div className="board-head"><span>Keep with your local team</span><span>Send to a Filipino assistant</span></div>
          <div className="board-row"><div><b>Front desk coverage</b><small>Walk-ins and on-site calls</small></div><div><b>Inbox triage</b><small>Drafts, labels, and follow-up</small></div></div>
          <div className="board-row"><div><b>Paper files</b><small>Scanning and physical records</small></div><div><b>CRM upkeep</b><small>Notes, stages, and reminders</small></div></div>
          <div className="board-row"><div><b>Office errands</b><small>Mail, supplies, and drop-offs</small></div><div><b>Scheduling</b><small>Calendars and confirmations</small></div></div>
          <div className="board-foot">We provide remote talent only from the Philippines. We do not fill in-person positions.</div>
        </div>
      </div>
    </section>

    <section className="section markets-section">
      <div className="container">
        <div className="section-heading compact"><div><p className="eyebrow">Built around a real workday</p><h2>One search. Different local needs.</h2></div><p>The same assistant brief will not work for every city or business. These examples show how the task mix can change.</p></div>
        <div className="market-grid">{localMarkets.map((market, index) => <article key={market.city}><div className="market-number">{String(index + 1).padStart(2, '0')}</div><h3>{market.city}</h3><p>{market.focus}</p><span>{market.tasks}</span></article>)}</div>
      </div>
    </section>

    <section className="brief-section">
      <div className="container brief-grid">
        <div className="brief-copy"><p className="eyebrow">A useful first brief</p><h2>A short task list is enough to begin.</h2><p>Add the hours and the decisions that stay with you. You do not need a polished job description or a stack of SOPs before the first conversation.</p></div>
        <ol className="brief-steps">
          <li><span>01</span><div><b>List the repeat work</b><p>Write down what keeps coming back every day or week.</p></div></li>
          <li><span>02</span><div><b>Mark the sensitive parts</b><p>Keep approvals, money decisions, and customer promises with the right owner.</p></div></li>
          <li><span>03</span><div><b>Decide when to review it</b><p>Check the work daily at first. Review less often once the assistant can handle it reliably.</p></div></li>
        </ol>
      </div>
    </section>

    <section className="section guidance-section">
      <div className="container guidance-card">
        <div><p className="eyebrow">Planning guidance</p><h2>Test the role before you add more work.</h2><p>A limited weekly schedule makes it easier to spot missing instructions. The range below is an example for planning, not a promised result.</p></div>
        <div className="guidance-range"><span>Suggested pilot</span><strong>10–20</strong><b>hours each week</b><small>Adjust for the role, tools, and review time.</small></div>
      </div>
    </section>

    <section className="section reading-section">
      <div className="container">
        <div className="section-heading compact"><div><p className="eyebrow">Do the homework without the rabbit hole</p><h2>Plain hiring guides.</h2></div><a className="text-link" href="/blog">View all guides <span>↗</span></a></div>
        <div className="reading-grid">{blogPosts.slice(0,3).map((post, index) => <a href={`/blog/${post.slug}`} key={post.slug}><span>{String(index + 1).padStart(2, '0')} · {post.minutes} min</span><h3>{post.title}</h3><p>{post.excerpt}</p></a>)}</div>
      </div>
    </section>

    <section className="final-section"><div className="container final-inner"><div><p className="eyebrow light">Ready when the task list is messy</p><h2>Bring the work. We'll help shape the role.</h2></div><a className="btn coral" href="/contact">Build my role brief</a></div></section>
  </main><Footer/></>;
}
