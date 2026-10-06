import crypto from 'node:crypto';
import fs from 'node:fs';
import sharp from 'sharp';
import { oct5BlogPosts as blogs } from '../app/oct5-blog-posts.ts';
import { oct5Hira104ResearchPosts as research } from '../app/research-oct5-hira104.ts';

const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3000';
const expectedDate = process.env.EXPECTED_PUBLICATION_DATE || '2026-10-06';
const normalize = (value) => value.replace(/<[^>]+>/g, ' ').replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
const failures = [];
const routes = [];
const internalUrls = new Set();
const authorityUrls = new Set();
const imageUrls = new Set();
const officialSearchEvidence = {
  'https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-495.pdf': 'Official ABA search result exposes Formal Opinion 495, dated December 16, 2020, titled Lawyers Working Remotely, and its remote-practice analysis.',
  'https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise': 'Official FBI search result exposes the current BEC page, examples, reporting route, and advice to verify payment or account changes through a known channel.',
};

for (const [family, posts] of [['blog', blogs], ['research', research]]) {
  for (const post of posts) {
    const path = `/${family}/${post.slug}`;
    const response = await fetch(`${base}${path}`);
    const html = await response.text();
    const plain = normalize(html);
    const paragraphs = family === 'blog' ? [...post.detail.directAnswer, ...post.detail.sections.flatMap((section) => section.paragraphs)] : post.sections.map((section) => section.body);
    const body = paragraphs.join('\n\n');
    const missing = paragraphs.filter((paragraph) => !plain.includes(normalize(paragraph)));
    const canonical = `https://hireassistantnearme.com${path}`;
    const checks = {
      http: response.status === 200,
      title: plain.includes(normalize(post.title)),
      completeBody: missing.length === 0,
      canonical: html.includes(canonical),
      datePublished: html.includes(`"datePublished":"${expectedDate}"`),
      visibleDate: html.includes(`datetime="${expectedDate}"`) || html.includes(`dateTime="${expectedDate}"`),
      image: html.includes(post.image),
    };
    for (const [name, passed] of Object.entries(checks)) if (!passed) failures.push(`${path}: ${name}`);
    const links = family === 'blog' ? post.detail.bodyLinks : post.related;
    for (const link of links) if (link.href.startsWith('/')) internalUrls.add(link.href);
    for (const source of family === 'blog' ? post.detail.sources : post.sources) authorityUrls.add(source.url);
    imageUrls.add(post.image);
    routes.push({ path, status: response.status, title: post.title, sourceWords: normalize(body).split(' ').filter(Boolean).length, paragraphCount: paragraphs.length, missingParagraphs: missing.length, sourceHash: hash(body), matchedBodyHash: missing.length ? null : hash(body), checks });
  }
}

const indexes = {};
for (const family of ['blog', 'research']) {
  const response = await fetch(`${base}/${family}`);
  const html = await response.text();
  const expected = routes.filter((route) => route.path.startsWith(`/${family}/`));
  const missing = expected.filter((route) => !html.includes(route.path)).map((route) => route.path);
  indexes[family] = { status: response.status, missing };
  if (response.status !== 200 || missing.length) failures.push(`${family} index`);
}
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
const sitemapText = await sitemapResponse.text();
const sitemapMissing = routes.filter((route) => !sitemapText.includes(`https://hireassistantnearme.com${route.path}`)).map((route) => route.path);
if (sitemapResponse.status !== 200 || sitemapMissing.length) failures.push('sitemap');

const internal = [];
for (const path of [...internalUrls].sort()) {
  const response = await fetch(`${base}${path}`);
  internal.push({ path, status: response.status });
  if (response.status !== 200) failures.push(`internal ${path}: ${response.status}`);
}

const images = [];
for (const path of [...imageUrls].sort()) {
  const response = await fetch(`${base}${path}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const signature = bytes.subarray(0, 12).toString('hex');
  let decoded = null;
  try { const metadata = await sharp(bytes).metadata(); decoded = { format: metadata.format, width: metadata.width, height: metadata.height }; } catch {}
  const mime = response.headers.get('content-type');
  const valid = response.status === 200 && mime === 'image/jpeg' && signature.startsWith('ffd8ff') && decoded?.format === 'jpeg';
  images.push({ path, status: response.status, mime, signature, decoded, valid });
  if (!valid) failures.push(`image ${path}`);
}

const authority = [];
for (const url of [...authorityUrls].sort()) {
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 HireAssistantNearMe citation audit' } });
    const browserEvidence = officialSearchEvidence[url] ?? null;
    authority.push({ url, status: response.status, finalUrl: response.url, mime: response.headers.get('content-type'), browserEvidence });
    if (response.status !== 200 && !(response.status === 403 && browserEvidence)) failures.push(`authority ${url}: ${response.status}`);
  } catch (error) {
    authority.push({ url, status: null, error: error.message });
    failures.push(`authority ${url}: ${error.message}`);
  }
}

const report = { auditedAt: new Date().toISOString(), base, expectedDate, counts: { routes: routes.length, internal: internal.length, images: images.length, authority: authority.length, authority200: authority.filter((item) => item.status === 200).length, authority403: authority.filter((item) => item.status === 403).length }, failures, routes, indexes, sitemap: { status: sitemapResponse.status, missing: sitemapMissing }, internal, images, authority };
fs.writeFileSync('publishing-runs/2026-10-05-local-http-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ counts: report.counts, failures }, null, 2));
if (failures.length) process.exit(1);
