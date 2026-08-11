import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const date = '2026-08-10';
const manifestPath = '.paperclip/aug10-2026/research.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const fail = (message) => { throw new Error(message); };
const requiredManifestKeys = ['schemaVersion', 'contract', 'targetDate', 'family', 'domain', 'repository', 'branch', 'minimum', 'priorRunId', 'priorIssueId', 'validationCommands', 'cleanBuildPassed', 'existingCompliancePassed', 'indexNewestFirstPassed', 'entries'];
if (JSON.stringify(Object.keys(manifest)) !== JSON.stringify(requiredManifestKeys)) fail('manifest top-level shape changed');
if (manifest.schemaVersion !== 1 || manifest.contract !== 'sites3-aug10-public-date-v6' || manifest.targetDate !== date || manifest.family !== 'research') fail('manifest identity mismatch');
if (manifest.entries.length < manifest.minimum || manifest.entries.length < 10) fail('accepted count is below 10');

const source = fs.readFileSync('app/fleet-data.ts', 'utf8');
const slugs = new Set();
const entryKeys = ['slug', 'route', 'sourcePath', 'provenance', 'introducedByCommit', 'sourceDateField', 'sourceDate', 'renderedDateFields', 'renderedDate'];
for (const entry of manifest.entries) {
  if (JSON.stringify(Object.keys(entry)) !== JSON.stringify(entryKeys)) fail(`entry shape changed: ${entry.slug}`);
  if (slugs.has(entry.slug)) fail(`duplicate slug: ${entry.slug}`);
  slugs.add(entry.slug);
  if (!/^\/research\/[a-z0-9-]+$/.test(entry.route) || entry.route !== `/research/${entry.slug}`) fail(`bad Research route: ${entry.route}`);
  if (entry.sourcePath !== 'app/fleet-data.ts' || !fs.existsSync(entry.sourcePath)) fail(`missing source: ${entry.sourcePath}`);
  if (!/^[0-9a-f]{40}$/.test(entry.introducedByCommit)) fail(`bad introducing commit: ${entry.slug}`);
  if (!['original-aug10-batch', 'repair-replacement'].includes(entry.provenance)) fail(`bad provenance: ${entry.slug}`);
  if (entry.sourceDateField !== 'published' || entry.sourceDate !== date || entry.renderedDate !== date) fail(`manifest date mismatch: ${entry.slug}`);
  if (!entry.renderedDateFields.includes('datePublished') || !entry.renderedDateFields.includes('time[datetime]')) fail(`rendered date fields incomplete: ${entry.slug}`);

  const commitSource = execFileSync('git', ['show', `${entry.introducedByCommit}:${entry.sourcePath}`], { encoding: 'utf8' });
  const parentSource = execFileSync('git', ['show', `${entry.introducedByCommit}^:${entry.sourcePath}`], { encoding: 'utf8' });
  if (!commitSource.includes(`['${entry.slug}',`)) fail(`slug missing at introducing commit: ${entry.slug}`);
  if (parentSource.includes(`['${entry.slug}',`)) fail(`slug was not absent at introducing parent: ${entry.slug}`);
  const recordStart = source.indexOf(`['${entry.slug}',`);
  if (recordStart < 0) fail(`source slug missing: ${entry.slug}`);
  if (!source.slice(recordStart, recordStart + 20000).includes(`published:'${date}'`)) fail(`source date missing: ${entry.slug}`);

  const htmlPath = `.next/server/app/research/${entry.slug}.html`;
  if (!fs.existsSync(htmlPath)) fail(`built route missing: ${entry.route}`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('datePublished') || !html.includes(date) || !html.includes(`dateTime=\"${date}\"`) && !html.includes(`datetime=\"${date}\"`)) fail(`rendered date missing: ${entry.slug}`);
  if (!html.includes(`<link rel=\"canonical\" href=\"https://hireassistantnearme.com${entry.route}`)) fail(`canonical missing: ${entry.route}`);
  if (!html.includes(`https://hireassistantnearme.com${entry.route}`)) fail(`route metadata missing: ${entry.route}`);
}

const sitemapSource = fs.readFileSync('app/sitemap.xml/route.ts', 'utf8');
if (!sitemapSource.includes('researchPosts.map(r=>`/research/${r.slug}`)')) fail('Research sitemap mapping missing');
const indexHtml = fs.readFileSync('.next/server/app/research.html', 'utf8');
const firstAccepted = Math.min(...manifest.entries.map((entry) => indexHtml.indexOf(`/research/${entry.slug}`)));
const older = indexHtml.indexOf('/research/administrative-assistant-wage-benchmark-2026');
if (firstAccepted < 0 || older < 0 || firstAccepted > older) fail('Research index is not newest-first');
if (!source.includes('].sort((a, b) => b.published.localeCompare(a.published));')) fail('Research source does not sort newest-first');
console.log(`August 10 Research regression PASS: ${manifest.entries.length} entries, source/rendered dates, provenance, canonical routes, sitemap inputs, and index order verified.`);
