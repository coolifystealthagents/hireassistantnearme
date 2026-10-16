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
  const formPosition = contact.indexOf('StandardContactForm');
  const teamPosition = contact.indexOf('stealth-agents-team.webp');
  assert.ok(formPosition >= 0 && teamPosition > formPosition, 'team section must immediately follow the first-fold form composition');
  assert.match(contact, /stealth-agents-logo-black\.png/);
  assert.match(contact, /Official team, Bacolod/);
  assert.match(contact, /managed service/i);
  assert.doesNotMatch(contact, /over 35\+|top rated|featured on Forbes/i);
  assert.doesNotMatch(contact, /href=["']\/contact["']/);
  assert.doesNotMatch(contact, /\[\["0[1-9]"/);
});

test('component-managed form has one accepted-response lead event and no native submit event', () => {
  const form = read('app/contact-us/StandardContactForm.tsx');
  const layout = read('app/layout.tsx');
  assert.match(form, /data-acr-managed=["']react["']/);
  assert.match(form, /type=["']button["']/);
  assert.match(form, /onKeyDown=\{handleKeyDown\}/);
  assert.doesNotMatch(form, /onSubmit=/);
  assert.doesNotMatch(form, /type=["']submit["']/);
  assert.match(form, /const tracker = window\.acrTracker;[\s\S]*if \(!tracker\?\.trackLead\)[\s\S]*return;[\s\S]*fetch\(/);
  assert.match(form, /if \(!response\.ok\)[\s\S]*accepted = true;[\s\S]*tracker\.trackLead\([\s\S]*location\.assign/);
  assert.match(form, /disabled=\{busy \|\| !trackerReady\}/);
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
  assert.match(header, /Home[\s\S]*Services[\s\S]*Contact Us/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls/);
  assert.match(header, /Escape/);
  assert.match(css, /\.nav\{[^}]*position:\s*sticky/);
  assert.match(css, /scroll-margin-top/);
});

test('commercial layouts contain no decorative zero-padding system', () => {
  for (const path of ['app/page.tsx', 'app/services/page.tsx', 'app/services/[slug]/page.tsx', 'app/contact-us/page.tsx']) {
    const source = read(path);
    assert.doesNotMatch(source, /padStart\(2/);
    assert.doesNotMatch(source, /["'`]0[1-9]["'`]/);
  }
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
  assert.doesNotMatch(middleware, /new URL\(`\$\{request\.nextUrl\.pathname/);
});

test('confirmation routes stay outside the sitemap and official assets exist', () => {
  const sitemap = read('app/sitemap.xml/route.ts');
  const cancellation = read('app/cancellation/page.tsx');
  const contact = read('app/contact-us/page.tsx');
  assert.doesNotMatch(sitemap, /thank-you|thanks-whats-next/);
  assert.match(sitemap, /\/compare\/local-vs-remote-assistant/);
  assert.match(cancellation, /permanentRedirect\(['"]\/cancellation-policy['"]\)/);
  assert.match(contact, /stealth-agents-team\.webp['"] width=["']1600["'] height=["']1067["']/);
  assert.match(contact, /stealth-agents-logo-black\.png['"] width=["']149["'] height=["']50["']/);
  assert.ok(existsSync(join(root, 'public/images/stealth-agents-team.webp')));
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

test('editorial indexes render content thumbnails and booking has no self-attested bypass', () => {
  const blog = read('app/blog/page.tsx');
  const pagination = read('app/blog/page/[page]/page.tsx');
  const research = read('app/research/page.tsx');
  const booking = read('app/thank-you/page.tsx');
  assert.match(blog, /editorial-image-link[\s\S]*<img/);
  assert.match(pagination, /editorial-image-link[\s\S]*<img/);
  assert.match(pagination, /<time dateTime=/);
  assert.match(research, /research-card-image[\s\S]*<img/);
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
});

test('editorial consolidation removes formulaic routes from discovery and preserves permanent topic redirects', () => {
  const policy = read('app/content-policy.ts');
  const sitemap = read('app/sitemap.xml/route.ts');
  const blogDetail = read('app/blog/[slug]/page.tsx');
  const researchDetail = read('app/research/[slug]/page.tsx');
  const pagination = read('app/blog/page/[page]/page.tsx');
  assert.match(policy, /distinctWords >= 300/);
  assert.match(policy, /publishedBlogPosts/);
  assert.match(policy, /publishedResearchPosts/);
  assert.match(sitemap, /publishedBlogPosts\.map/);
  assert.match(sitemap, /publishedResearchPosts\.map/);
  assert.match(blogDetail, /permanentRedirect\(consolidationTarget\(slug, 'blog'\)\)/);
  assert.match(researchDetail, /permanentRedirect\(consolidationTarget\(slug, 'research'\)\)/);
  assert.match(pagination, /if \(n === 1\) permanentRedirect\('\/blog'\)/);
});

test('desktop opening composition has a bounded 768px height budget', () => {
  const css = read('app/release-v2.css');
  assert.match(css, /@media \(min-width: 1060px\)/);
  assert.match(css, /\.nav-inner\{min-height:68px\}/);
  assert.match(css, /\.finder-hero\{padding-top:18px\}/);
  assert.match(css, /\.hero-visual\{height:505px\}/);
  assert.match(css, /\.task-strip>\*\{min-height:72px/);
});
