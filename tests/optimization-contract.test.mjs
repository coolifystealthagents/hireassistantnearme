import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = new URL('../', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

function filesUnder(dir, extensions = ['.ts', '.tsx']) {
  const out = [];
  for (const entry of readdirSync(join(root, dir))) {
    const path = join(dir, entry);
    const absolute = join(root, path);
    if (statSync(absolute).isDirectory()) out.push(...filesUnder(path, extensions));
    else if (extensions.some((extension) => path.endsWith(extension))) out.push(path);
  }
  return out;
}

test('required conversion routes and direct-access truth are present', () => {
  assert.ok(existsSync(join(root, 'app/contact-us/page.tsx')));
  assert.ok(existsSync(join(root, 'app/thank-you/page.tsx')));
  assert.ok(existsSync(join(root, 'app/thanks-whats-next/page.tsx')));
  const thankYou = read('app/thank-you/page.tsx');
  const booked = read('app/thanks-whats-next/page.tsx');
  assert.match(thankYou, /go\.oncehub\.com\/StealthAgentsTeam/);
  assert.match(thankYou, /noindex|index:\s*false/);
  assert.match(booked, /noindex|index:\s*false/);
  assert.match(booked, /If your scheduler showed a confirmation/i);
});

test('contact page follows the conversion-first parent-brand contract', () => {
  const contact = read('app/contact-us/page.tsx');
  const footer = read('app/components.tsx');
  const formPosition = contact.indexOf('StandardContactForm');
  const teamPosition = contact.indexOf('stealth-agents-team-bacolod.jpg');
  assert.ok(formPosition >= 0 && teamPosition > formPosition, 'official team section must immediately follow the first-fold form composition');
  assert.doesNotMatch(contact, /stealth-agents-team\.webp/);
  assert.match(contact, /stealth-agents-logo-black\.png/);
  assert.match(contact, /Official team, Bacolod/);
  assert.match(footer, /href=["']\/blog["']>Blog<\/a>/);
  assert.doesNotMatch(footer, />Evidence-backed guides<\/a>/);
  assert.match(contact, /managed-service/i);
  assert.doesNotMatch(contact, /over 35\+|top rated|featured on Forbes/i);
  assert.doesNotMatch(contact, /href=["']\/contact["']/);
  assert.doesNotMatch(contact, /\[\["0[1-9]"/);
});

test('component-managed form waits for a truthful accepted response and emits no client lead event', () => {
  const form = read('app/contact-us/StandardContactForm.tsx');
  const layout = read('app/layout.tsx');
  assert.match(form, /data-acr-managed=["']react["']/);
  assert.match(form, /type=["']button["']/);
  assert.match(form, /onKeyDown=\{handleKeyDown\}/);
  assert.doesNotMatch(form, /onSubmit=/);
  assert.doesNotMatch(form, /type=["']submit["']/);
  assert.doesNotMatch(form, /trackLead|lead_submit|\/ingest\/track/);
  assert.match(form, /redirect: "manual"[\s\S]*if \(!response\.ok\)[\s\S]*result\.ok !== true \|\| result\.redirect !== "\/thank-you"[\s\S]*accepted = true;[\s\S]*location\.assign\(result\.redirect\)/);
  assert.match(form, /disabled=\{busy\}/);
  assert.doesNotMatch(form, /trackerReady|Preparing secure form/);
  assert.doesNotMatch(layout, /funnel_form_submitted|funnel_booking_confirmed/);
  assert.match(form, /role=["']status["']/);
});

test('shared content remains server-side and the interactive header has a narrow client boundary', () => {
  const shared = read('app/components.tsx');
  const header = read('app/header-client.tsx');
  assert.doesNotMatch(shared, /['"]use client['"]/);
  assert.match(header, /['"]use client['"]/);
  assert.doesNotMatch(header, /\.\/data|fleet-data/);
  assert.match(header, /id=["']main-content["']/);
  assert.doesNotMatch(header, /id=["']main-content["'][^>]*aria-hidden/);
  assert.match(header, /Page content begins/);
});

test('global navigation is persistent, compact, and keyboard operable', () => {
  const header = read('app/header-client.tsx');
  const css = read('app/globals.css');
  assert.match(header, /skip-link/);
  const navigation = header.match(/<nav[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || '';
  assert.deepEqual([...navigation.matchAll(/<a href="([^"]+)"/g)].map((match) => match[1]), ['/', '/services', '/contact-us']);
  assert.equal((navigation.match(/<a /g) || []).length, 3);
  assert.match(navigation, />Home<\/a>[\s\S]*>Services<\/a>[\s\S]*>Contact Us<\/a>/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls/);
  assert.match(header, /Escape/);
  assert.match(css, /\.nav\{[^}]*position:\s*sticky/);
  assert.match(css, /scroll-margin-top/);
});

test('commercial layouts contain no decorative numbering or alphabet-label system', () => {
  for (const path of ['app/page.tsx', 'app/services/page.tsx', 'app/services/[slug]/page.tsx', 'app/contact-us/page.tsx']) {
    const source = read(path);
    assert.doesNotMatch(source, /padStart\(2/);
    assert.doesNotMatch(source, /["'`]0[1-9]["'`]/);
  }
  assert.doesNotMatch(read('app/page.tsx'), /market-number|localMarkets\.map\(\(market, index\)/);
  assert.doesNotMatch(read('app/services/page.tsx'), /group\.slugs\.map\(\(slug, index\)|>\{index \+ 1\}<\/span>/);
  assert.doesNotMatch(read('app/services/[slug]/page.tsx'), /Scenario \{index \+ 1\}/);
});

test('public source copy has no forbidden punctuation', () => {
  const failures = [];
  for (const path of filesUnder('app')) {
    const source = read(path);
    if (/[—–]/u.test(source)) failures.push(relative(root, join(root, path)));
  }
  assert.deepEqual(failures, []);
});

test('security policy and canonical host middleware cover production gates', () => {
  const config = read('next.config.mjs');
  const middleware = read('middleware.ts');
  for (const name of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
    assert.match(config, new RegExp(name));
  }
  assert.match(middleware, /canonicalHost = ['"]hireassistantnearme\.com['"]/);
  assert.match(middleware, /request\.nextUrl\.clone\(\)/);
  assert.match(middleware, /destination\.hostname = canonicalHost/);
  assert.match(middleware, /forwardedProtocol \|\| request\.nextUrl\.protocol/);
  assert.match(middleware, /originalVisitorProtocol\(request\.headers\.get\('cf-visitor'\)\)/);
  assert.match(middleware, /visitorProtocol \|\| forwardedProtocol \|\| request\.nextUrl\.protocol/);
  assert.match(middleware, /process\.env\.NODE_ENV !== 'production'/);
  assert.match(middleware, /process\.env\.ALLOW_LOCAL_PREVIEW === '1'/);
  assert.doesNotMatch(middleware, /new URL\(`\$\{request\.nextUrl\.pathname/);
});

test('confirmation routes stay outside the sitemap and official assets exist', () => {
  const sitemap = read('app/sitemap.xml/route.ts');
  const cancellation = read('app/cancellation/page.tsx');
  const contact = read('app/contact-us/page.tsx');
  assert.doesNotMatch(sitemap, /thank-you|thanks-whats-next/);
  assert.match(sitemap, /\/compare\/local-vs-remote-assistant/);
  assert.match(cancellation, /permanentRedirect\(['"]\/cancellation-policy['"]\)/);
  assert.match(contact, /stealth-agents-team-bacolod\.jpg['"] width=["']953["'] height=["']540["']/);
  assert.match(contact, /stealth-agents-logo-black\.png['"] width=["']149["'] height=["']50["']/);
  assert.ok(existsSync(join(root, 'public/images/stealth-agents-team-bacolod.jpg')));
  assert.ok(existsSync(join(root, 'public/images/stealth-agents-logo-black.png')));
});

test('service system contains ten specific role plans and no generic placeholder copy', () => {
  const fleet = read('app/fleet-data.ts');
  const detail = read('app/service-content.ts');
  const page = read('app/services/[slug]/page.tsx');
  const slugs = [...detail.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
  assert.equal(slugs.length, 10);
  assert.equal(new Set(slugs).size, 10);
  assert.doesNotMatch(fleet, /Document the recurring remote assistant work|Complete approved tasks in the client workflow/);
  for (const heading of ['Inputs the role needs', 'Outputs to expect', 'Quality checks', 'Real workflow examples', 'First-week rollout', 'Common questions', 'Related role plans']) {
    assert.match(page, new RegExp(heading));
  }
  assert.doesNotMatch(page, /Remote inbox help|Calendar and inbox questions/);
});

test('curated editorial index uses article-owned thumbnails and retired research redirects', () => {
  const blog = read('app/blog/page.tsx');
  const pagination = read('app/blog/page/[page]/page.tsx');
  const research = read('app/research/page.tsx');
  const editorial = read('app/editorial-components.tsx');
  const policy = read('app/content-policy.ts');
  const booking = read('app/thank-you/page.tsx');
  assert.match(blog, /<EditorialCard[\s\S]*image=\{editorialCard\(p\.slug\)\}/);
  assert.match(pagination, /<EditorialCard[\s\S]*image=\{editorialCard\(p\.slug\)\}/);
  assert.match(editorial, /editorial-image-link[\s\S]*<img/);
  assert.match(editorial, /<time dateTime=\{published\}>/);
  const cardImages = [...policy.matchAll(/src: '([^']+\.webp)'/g)].map((match) => match[1]);
  assert.equal(cardImages.length, 5);
  assert.equal(new Set(cardImages).size, 5);
  assert.doesNotMatch(policy, /local-team\.jpg/);
  assert.match(research, /publishedResearchPosts/);
  assert.match(research, /<EditorialCard[\s\S]*href=\{`\/research\/\$\{post\.slug\}`\}[\s\S]*image=\{\{ src: post\.image, alt: post\.imageAlt/);
  assert.doesNotMatch(booking, /I booked a time|href=["']\/thanks-whats-next/);
  assert.match(booking, /scheduler itself confirms the booking/);
});

test('contact form classes are styled and service hero images are unique with intrinsic dimensions', () => {
  const form = read('app/contact-us/StandardContactForm.tsx');
  const css = read('app/release-v2.css');
  for (const className of ['standard-contact-form', 'form-heading', 'form-grid', 'consent-row', 'form-action', 'submit-button']) {
    assert.match(form, new RegExp(`className=["'][^"']*${className}`));
    assert.match(css, new RegExp(`\\.${className}(?:[,{.:])`));
  }
  const servicePage = read('app/services/[slug]/page.tsx');
  const imagePaths = [...servicePage.matchAll(/src: '([^']+)'/g)].map((match) => match[1]);
  assert.equal(imagePaths.length, 10);
  assert.equal(new Set(imagePaths).size, 10);
  assert.match(servicePage, /width=\{image\.width\} height=\{image\.height\}/);
  assert.equal((servicePage.match(/^  '[^']+': \[[^\n]+\],$/gm) || []).length, 10);
  assert.match(servicePage, /relatedServiceSlugs\[slug\]/);
  assert.doesNotMatch(servicePage, /filter\(\(item\) => item\.slug !== slug\)\.slice/);
  for (const size of ['font-size:13px', 'font-size:12px']) assert.match(css, new RegExp(size));
});

test('editorial consolidation uses an explicit manifest and preserves permanent topic redirects', () => {
  const policy = read('app/content-policy.ts');
  const sitemap = read('app/sitemap.xml/route.ts');
  const blogDetail = read('app/blog/[slug]/page.tsx');
  const researchDetail = read('app/research/[slug]/page.tsx');
  const pagination = read('app/blog/page/[page]/page.tsx');
  const retiredRanking = read('app/blog/top-25-virtual-assistant-companies-small-business/page.tsx');
  const homepage = read('app/page.tsx');
  const approved = [...policy.matchAll(/^  '([^']+)',$/gm)].map((match) => match[1]);
  assert.equal(approved.length, 17);
  assert.match(policy, /approvedBlogSlugs\.has\(post\.slug\)/);
  assert.match(policy, /publishedResearchPosts = researchPosts\.filter\(\(post\) => oct22ResearchSlugs\.has\(post\.slug\) \|\| oct28ResearchSlugs\.has\(post\.slug\)\)/);
  assert.doesNotMatch(policy, /distinctWords|narrativeStrings|frequency/);
  assert.match(sitemap, /publishedBlogPosts\.map/);
  assert.doesNotMatch(sitemap, /['"]\/research['"]/);
  assert.match(blogDetail, /permanentRedirect\(consolidationTarget\(slug, 'blog'\)\)/);
  assert.match(researchDetail, /permanentRedirect\(consolidationTarget\(slug, 'research'\)\)/);
  assert.match(pagination, /if \(n === 1\) permanentRedirect\('\/blog'\)/);
  assert.match(pagination, /!\/\^\[1-9\]\\d\*\$\/\.test\(page\)/);
  assert.match(retiredRanking, /permanentRedirect\('\/compare\/local-vs-remote-assistant'\)/);
  assert.doesNotMatch(retiredRanking, /const companies|editor pick|Top 25/);
  assert.match(homepage, /publishedBlogPosts\.slice\(0,3\)/);
  assert.doesNotMatch(homepage, /blogPosts\.slice\(0,3\)/);
});

test('the general-office clerk guide replaces its retired research path with a scoped project-coordination handoff', () => {
  const data = read('app/data.ts');
  const start = data.indexOf("slug: 'general-office-clerk-outlook-task-design-2026'");
  const end = data.indexOf('\n  },];', start);
  assert.ok(start >= 0 && end > start, 'the approved general-office clerk record must remain bounded');
  const record = data.slice(start, end);
  assert.match(record, /href: '\/services\/project-coordination', label: 'Plan a project coordination lane'/);
  assert.doesNotMatch(record, /\/research\/general-office-clerk-outlook-2024-2034/);
  assert.match(record, /Keep payments, account recovery, legal or medical judgment, sensitive exports, and final customer promises with the accountable owner/);
});

test('contact ingestion preserves required fields, consent, and measured limits', () => {
  const api = read('app/api/contact/route.ts');
  const form = read('app/contact-us/StandardContactForm.tsx');
  const tracker = read('app/ingest/track/route.ts');
  assert.match(api, /text\(form, 'consent', 10\) !== 'yes'/);
  assert.match(api, /text\(form, 'teamSize'/);
  assert.match(api, /text\(form, 'supportArea'/);
  assert.match(api, /new TextEncoder\(\)\.encode\(body\)\.byteLength > MAX_BODY_BYTES/);
  assert.doesNotMatch(form, /tracker\.trackLead|lead_submit|\/ingest\/track/);
  assert.match(tracker, /value\.site_id === SITE_ID/);
  assert.match(tracker, /value\.events\.length <= MAX_EVENTS/);

  assert.match(tracker, /if \(!origin\) return false/);
  assert.match(tracker, /ALLOWED_EVENT_TYPES\.has/);
  assert.match(tracker, /Object\.keys\(value\)\.some\(\(key\) => !ALLOWED_EVENT_KEYS\.has\(key\)\)/);
  assert.match(tracker, /Date\.parse\(value\.timestamp/);
  assert.equal((api.match(/event_type: 'lead_submit'/g) || []).length, 1);
  assert.match(api, /if \(!upstream\.ok \|\| result\?\.ok !== true\) return errorPage\(502\);[\s\S]*after\(\(\) => attemptAcceptedLeadEvent\(clientEventId/);
  assert.match(api, /Analytics is deliberately nonblocking after accepted lead ingestion/);
  assert.match(api, /return NextResponse\.json\(\{ ok: true, redirect: '\/thank-you' \}/);
  assert.doesNotMatch(tracker, /'lead_submit',/);
  assert.match(api, /TRUST_PROXY_HEADERS === '1'[\s\S]*x-forwarded-for[\s\S]*\.at\(-1\)[\s\S]*isIP\(forwarded\)/);
  assert.match(tracker, /TRUST_PROXY_HEADERS === '1'[\s\S]*x-forwarded-for[\s\S]*\.at\(-1\)[\s\S]*isIP\(forwarded\)/);
  assert.match(api, /validated-global-contact', max: 300/);
  assert.match(tracker, /validated-global-tracking', max: 10_000/);
  assert.ok(api.indexOf("if (!name || !email") < api.indexOf('const clientLimit = clientKey(request)'), 'contact limiter must run only after schema validation');
  assert.ok(tracker.indexOf('if (!validPayload(payload))') < tracker.indexOf('const clientLimit = clientKey(request)'), 'tracking limiter must run only after event validation');
  assert.match(api, /declaredLength <= 0 \|\| request\.headers\.has\('transfer-encoding'\)/);
  assert.match(tracker, /declaredLength <= 0 \|\| request\.headers\.has\('transfer-encoding'\)/);
  assert.doesNotMatch(tracker, /await upstream\.text\(\)/);
  assert.match(tracker, /status: upstream\.ok \? 200 : 502/);
});

test('contact marquee uses ten sourced reviews, horizontal recycling, and no playback controls', () => {
  const rail = read('app/booking-components.tsx');
  const provenance = JSON.parse(read('app/review-provenance.json'));
  const css = read('app/release-v3.css');
  const legacyCss = read('app/globals.css');
  assert.equal(provenance.source, 'https://stealthagents.com/');
  assert.equal(provenance.records.length, 10);
  assert.equal(new Set(provenance.records.map((item) => item.name)).size, 10);
  assert.match(rail, /StealthAgents reviews/);
  assert.match(rail, /requestAnimationFrame/);
  assert.match(rail, /track\.append\(first\)/);
  assert.doesNotMatch(rail, /Pause|Play|Previous|Next|\.\.\.stealthAgentsReviews/);
  assert.match(css, /\.sa-testimonial-track\{display:flex/);
  assert.match(css, /animation:none/);
  assert.match(css, /\.sa-testimonial-card\{display:block!important/);
  assert.doesNotMatch(legacyCss, /contact-review-scroll|sa-testimonial-scroll|nth-child\(n\+4\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
});

test('V3 route, parent-brand, hero, and article utility contracts are present', () => {
  const homepage = read('app/page.tsx');
  const header = read('app/header-client.tsx');
  const shared = read('app/components.tsx');
  const sitemap = read('app/sitemap.xml/route.ts');
  const article = read('app/blog/[slug]/page.tsx');
  const sidebar = read('app/article-sidebar.tsx');
  const about = read('app/about/page.tsx');
  const services = read('app/services/page.tsx');
  const blog = read('app/blog/page.tsx');
  const comparison = read('app/compare/local-vs-remote-assistant/page.tsx');
  const blogLayout = read('app/blog/layout.tsx');
  assert.match(homepage, /localMarkets\.map\(\(market\)/);
  assert.doesNotMatch(homepage, /market-number/);
  assert.match(homepage, /editorialCard\(post\.slug\)[\s\S]*<figure><img/);
  assert.doesNotMatch(blogLayout, /BlogBanner|data-blog-banner-slot/);
  assert.match(header, /Powered by StealthAgents/);
  assert.match(shared, /Powered by StealthAgents/);
  assert.match(sitemap, /'\/about'/);
  assert.match(about, /<h1>[\s\S]*stealth-agents-team\.webp/);
  assert.match(services, /index-hero-visual/);
  assert.match(blog, /blog-index-hero-grid/);
  assert.match(comparison, /comparison-hero-grid/);
  assert.match(comparison, /<ArticleSidebar title=\{title\}/);
  assert.match(comparison, /<table><caption>/);
  assert.equal((article.match(/<ArticleSidebar title=\{post\.title\}/g) || []).length, 3);
  assert.match(article, /editorialCard\(post\.slug\)\.width/);
  assert.match(sidebar, /IntersectionObserver/);
  assert.match(sidebar, /querySelectorAll<HTMLHeadingElement>\('h2'\)/);
  assert.match(sidebar, /<details className="mobile-toc">/);
  assert.match(sidebar, /<aside className="article-sidebar"/);
  assert.match(sidebar, /toc-level-\$\{item\.level\}/);
  assert.match(sidebar, /aria-current=\{active === item\.id \? 'location'/);
  const v3Css = read('app/release-v3.css');
  assert.match(v3Css, /max-height:calc\(100vh - 128px\);overflow-y:auto/);
  assert.match(v3Css, /position:relative;top:auto;max-height:none;overflow:visible/);
  assert.match(about, /From workload to role brief/);
  assert.match(about, /Quality and accountability/);
  assert.match(about, /Fit boundaries/);
  assert.match(about, /title: \{ absolute: 'About Hire Assistant Near Me' \}/);
});

test('V3 long-form routes do not repeat the retired template paragraphs', () => {
  const service = read('app/services/[slug]/page.tsx');
  const article = read('app/blog/[slug]/page.tsx');
  for (const phrase of [
    'This scope separates work the assistant can prepare',
    'Keep physical work, licensed judgment',
    'Each scenario names what is prepared',
    'Access grows only after the owner can see',
  ]) assert.doesNotMatch(service, new RegExp(phrase));
  for (const phrase of [
    'Each route below can lead to Filipino talent',
    'These are planning examples, not terms',
    'Use these scripts for a provider call',
    'Pick the next guide that matches',
    'These official sources support',
    'Send the task list, tools, work hours',
  ]) assert.doesNotMatch(article, new RegExp(phrase));
});

test('desktop opening composition has a bounded 768px height budget', () => {
  const css = read('app/release-v2.css');
  assert.match(css, /@media \(min-width: 1060px\)/);
  assert.match(css, /\.nav-inner\{min-height:68px\}/);
  assert.match(css, /\.finder-hero\{padding-top:18px\}/);
  assert.match(css, /\.hero-visual\{height:505px\}/);
  assert.match(css, /\.task-strip>\*\{min-height:72px/);
});
