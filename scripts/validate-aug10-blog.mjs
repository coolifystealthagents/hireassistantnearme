import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const date = '2026-08-10';
const manifestPath = '.paperclip/aug10-2026/blog.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const fail = (message) => { throw new Error(message); };
const sourceRecords = JSON.parse(fs.readFileSync('.paperclip/aug10-2026/blog-source-records.json', 'utf8'));

if (manifest.entries.length < manifest.minimum || manifest.entries.length < 22) fail('accepted count is below 22');
const slugs = new Set();
const source = fs.readFileSync('app/data.ts', 'utf8');

for (const entry of manifest.entries) {
  if (slugs.has(entry.slug)) fail(`duplicate slug: ${entry.slug}`);
  slugs.add(entry.slug);
  if (!/^\/blog\/[a-z0-9-]+$/.test(entry.route) || entry.route !== `/blog/${entry.slug}`) fail(`bad Blog route: ${entry.route}`);
  if (entry.sourcePath !== '.paperclip/aug10-2026/blog-source-records.json' || !fs.existsSync(entry.sourcePath)) fail(`missing source: ${entry.sourcePath}`);
  const record = sourceRecords.find((item) => item.slug === entry.slug && item.published === date);
  if (!record) fail(`explicit source publication record missing: ${entry.slug}`);
  const introducingSource = execFileSync('git', ['show', `${entry.introducedByCommit}:app/data.ts`], { encoding: 'utf8' });
  const introducingRecords = JSON.parse(execFileSync('git', ['show', `${entry.introducedByCommit}:.paperclip/aug10-2026/blog-source-records.json`], { encoding: 'utf8' }));
  const parentRecords = JSON.parse(execFileSync('git', ['show', `${entry.introducedByCommit}^:.paperclip/aug10-2026/blog-source-records.json`], { encoding: 'utf8' }));
  if (!introducingRecords.some((item) => item.slug === entry.slug && item.published === date)) fail(`slug/date absent at introducing commit: ${entry.slug}`);
  if (parentRecords.some((item) => item.slug === entry.slug && item.published === date)) fail(`slug/date was not absent at introducing parent: ${entry.slug}`);
  if (!introducingSource.includes(entry.slug)) fail(`routed article slug missing from app data: ${entry.slug}`);
  if (entry.sourceDate !== date || entry.renderedDate !== date) fail(`manifest date mismatch: ${entry.slug}`);
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
