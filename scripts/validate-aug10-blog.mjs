import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const date = '2026-08-10';
const manifestPath = '.paperclip/aug10-2026/blog.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const fail = (message) => { throw new Error(message); };

if (manifest.entries.length < manifest.minimum || manifest.entries.length < 22) fail('accepted count is below 22');
const slugs = new Set();
const source = fs.readFileSync('app/data.ts', 'utf8');
const parentSource = execFileSync('git', ['show', `${manifest.entries[0].introducedByCommit}^:app/data.ts`], { encoding: 'utf8' });

for (const entry of manifest.entries) {
  if (slugs.has(entry.slug)) fail(`duplicate slug: ${entry.slug}`);
  slugs.add(entry.slug);
  if (!/^\/blog\/[a-z0-9-]+$/.test(entry.route) || entry.route !== `/blog/${entry.slug}`) fail(`bad Blog route: ${entry.route}`);
  if (entry.sourcePath !== 'app/data.ts' || !fs.existsSync(entry.sourcePath)) fail(`missing source: ${entry.sourcePath}`);
  const topicSlug = entry.slug.replace(/-assistant-guide-2026$/, '');
  const record = source.indexOf(`['${topicSlug}',`);
  if (record < 0) fail(`source slug missing: ${entry.slug}`);
  const window = source.slice(record, record + 7000);
  if (!window.includes('slug: `${slug}-assistant-guide-2026`')) fail(`source route record missing: ${entry.slug}`);
  if (!window.includes(`published: '${date}'`)) fail(`source date missing: ${entry.slug}`);
  if (entry.sourceDate !== date || entry.renderedDate !== date) fail(`manifest date mismatch: ${entry.slug}`);
  if (parentSource.includes(`['${topicSlug}',`)) fail(`slug was not absent at introducing parent: ${entry.slug}`);
  const htmlPath = `.next/server/app/blog/${entry.slug}.html`;
  if (!fs.existsSync(htmlPath)) fail(`built route missing: ${entry.route}`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('datePublished') || !html.includes(date) || !html.includes(`dateTime=\"${date}\"`) && !html.includes(`datetime=\"${date}\"`)) fail(`rendered date missing: ${entry.slug}`);
  if (!html.includes(`canonical\" href=\"https://hireassistantnearme.com${entry.route}`)) fail(`canonical missing: ${entry.route}`);
  if (!html.includes('<link rel="canonical"')) fail(`canonical tag missing: ${entry.route}`);
  if (!fs.readFileSync('app/sitemap.xml/route.ts', 'utf8').includes('blogs.map')) fail('Blog sitemap mapping missing');
}

if (!source.includes('blogPosts = [...baseBlogPosts, ...dailyBlogPosts].sort((a, b) => b.published.localeCompare(a.published))')) fail('source does not sort Blog index newest-first');
console.log(`August 10 Blog regression PASS: ${manifest.entries.length} entries, source/rendered dates, provenance, canonical routes, sitemap inputs, and index order verified.`);
