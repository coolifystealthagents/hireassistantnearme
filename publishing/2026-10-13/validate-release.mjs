#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const pub = path.join(root, 'publishing/2026-10-13');
const manifest = JSON.parse(fs.readFileSync(path.join(pub, 'manifest.json')));
const blogs = JSON.parse(fs.readFileSync(path.join(pub, 'blog-records.json')));
const research = JSON.parse(fs.readFileSync(path.join(pub, 'research-records.json')));
const fail = (message) => { throw new Error(message); };
const assert = (value, message) => { if (!value) fail(message); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const normalize = (value) => value.toLowerCase().replace(/https?:\/\/\S+/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();

function proseStrings(value, key = '') {
  if (typeof value === 'string') {
    return ['slug','title','image','imageAlt','url','href','label','source','published','richPublished','revision','mainKeyword'].includes(key) ? [] : [value];
  }
  if (Array.isArray(value)) return value.flatMap((item) => proseStrings(item, key));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([nextKey, item]) => proseStrings(item, nextKey));
  return [];
}
function wordCount(item) {
  return proseStrings(item).join(' ').replace(/https?:\/\/\S+/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}
function pngInfo(buffer) {
  assert(buffer.subarray(1,4).toString() === 'PNG', 'thumbnail is not PNG');
  const width = buffer.readUInt32BE(16), height = buffer.readUInt32BE(20);
  let offset = 8, title = '';
  while (offset + 12 <= buffer.length) {
    const len = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString();
    const data = buffer.subarray(offset + 8, offset + 8 + len);
    if (type === 'tEXt') {
      const zero = data.indexOf(0);
      if (zero > -1 && data.subarray(0, zero).toString() === 'Title') title = data.subarray(zero + 1).toString();
    }
    offset += 12 + len;
    if (type === 'IEND') break;
  }
  return { width, height, title };
}

assert(manifest.site === 'HireAssistantNearMe.com', 'site mismatch');
assert(manifest.repository === 'coolifystealthagents/hireassistantnearme', 'repository mismatch');
assert(manifest.branch === 'main', 'branch mismatch');
assert(/^[0-9a-f]{40}$/.test(manifest.baseSha), 'immutable base SHA missing');
assert(manifest.date === '2026-10-13', 'release date mismatch');
assert(blogs.length === 12 && research.length === 5, 'expected exactly 12 Blog and 5 Research records');
assert(manifest.blog.length === 12 && manifest.research.length === 5, 'manifest counts mismatch');

const all = [...blogs, ...research];
assert(new Set(all.map((x) => x.slug)).size === 17, 'slugs must be unique');
assert(new Set(all.map((x) => x.title)).size === 17, 'titles must be unique');
assert(new Set(all.map((x) => x.image)).size === 17, 'thumbnail paths must be unique');
const dateWords = /\b(?:january|february|march|april|may|june|july|august|september|october|november|december|20\d\d)\b/i;
for (const item of all) {
  assert(item.published === '2026-10-13', `${item.slug}: publication date mismatch`);
  assert(!dateWords.test(item.title), `${item.slug}: title contains a date`);
  assert(item.image.includes(`oct13-${item.slug}.png`), `${item.slug}: thumbnail path is not exact slug`);
}
for (const item of blogs) {
  assert(wordCount(item) >= 950, `${item.slug}: Blog depth ${wordCount(item)} < 950 words`);
  assert(item.detail?.relatedLinks?.length >= 2, `${item.slug}: Blog related content missing`);
}
const authoritative = /(^|\.)(bls\.gov|gao\.gov|nist\.gov|cisa\.gov|ftc\.gov|iana\.org|archives\.gov|sba\.gov)$/;
for (const item of research) {
  assert(wordCount(item) >= 1150, `${item.slug}: Research depth ${wordCount(item)} < 1150 words`);
  assert(item.sections?.length >= 8, `${item.slug}: Research sections are too shallow`);
  assert(item.sources?.length === 10, `${item.slug}: expected exactly 10 sources`);
  assert(new Set(item.sources.map((x) => x.url)).size === 10, `${item.slug}: sources must be unique`);
  for (const source of item.sources) {
    const url = new URL(source.url);
    assert(url.protocol === 'https:', `${item.slug}: source must use HTTPS`);
    assert(authoritative.test(url.hostname), `${item.slug}: non-authoritative source host ${url.hostname}`);
  }
  assert(item.related?.length >= 2, `${item.slug}: Research related content missing`);
}

const paragraphOwners = new Map();
for (const item of all) {
  for (const paragraph of proseStrings(item).filter((x) => x.trim().split(/\s+/).length >= 35)) {
    const key = normalize(paragraph);
    assert(!paragraphOwners.has(key), `${item.slug}: duplicate substantive prose also in ${paragraphOwners.get(key)}`);
    paragraphOwners.set(key, item.slug);
  }
}

const imageHashes = new Set();
for (const item of all) {
  const imagePath = path.join(root, 'public', item.image.replace(/^\//, ''));
  assert(fs.existsSync(imagePath), `${item.slug}: thumbnail missing`);
  const bytes = fs.readFileSync(imagePath);
  const info = pngInfo(bytes);
  assert(info.width === 1200 && info.height === 630, `${item.slug}: thumbnail dimensions mismatch`);
  assert(info.title === item.title, `${item.slug}: embedded thumbnail title mismatch`);
  imageHashes.add(crypto.createHash('sha256').update(bytes).digest('hex'));
}
assert(imageHashes.size === 17, 'thumbnails must be visually unique files');

const blogSource = read('app/oct13-blog-posts.ts');
const researchSource = read('app/research-oct13.ts');
const dataSource = read('app/data.ts');
const fleetSource = read('app/fleet-data.ts');
assert(dataSource.includes("import { oct13BlogPosts } from './oct13-blog-posts'"), 'Blog registry import missing');
assert(dataSource.includes('...oct13BlogPosts'), 'Blog registry merge missing');
assert(fleetSource.includes("import { oct13ResearchPosts } from './research-oct13'"), 'Research registry import missing');
assert(fleetSource.includes('...oct13ResearchPosts'), 'Research registry merge missing');
for (const item of blogs) assert(blogSource.includes(`\"slug\": \"${item.slug}\"`), `${item.slug}: absent from Blog source`);
for (const item of research) assert(researchSource.includes(`\"slug\": \"${item.slug}\"`), `${item.slug}: absent from Research source`);
const blogIndex = read('app/blog/page.tsx'), blogRoute = read('app/blog/[slug]/page.tsx');
const researchIndex = read('app/research/page.tsx'), researchRoute = read('app/research/[slug]/page.tsx');
assert(blogIndex.includes('blogPosts') && blogRoute.includes('blogPosts'), 'Blog index/route loader missing');
assert(researchIndex.includes('researchPosts') && researchRoute.includes('researchPosts'), 'Research index/route loader missing');
assert(blogRoute.includes('relatedLinks'), 'Blog related-content behavior missing');
assert(researchRoute.includes('post.related'), 'Research related-content behavior missing');

// Collision checks always address the immutable pre-edit tree, so they remain valid after commit.
const baseFiles = execFileSync('git', ['ls-tree','-r','--name-only',manifest.baseSha,'--','public/images'], {cwd: root, encoding:'utf8'});
for (const item of all) assert(!baseFiles.split('\n').includes(`public/${item.image.replace(/^\//,'')}`), `${item.slug}: thumbnail existed at immutable base`);
const headBase = execFileSync('git', ['rev-parse', manifest.baseSha], {cwd: root, encoding:'utf8'}).trim();
assert(headBase === manifest.baseSha, 'immutable base object unavailable');

console.log(`PASS HireAssistantNearMe Oct 13: ${blogs.length} Blog, ${research.length} Research, 17 exact-title thumbnails`);
console.log(`Depth Blog ${Math.min(...blogs.map(wordCount))}-${Math.max(...blogs.map(wordCount))}; Research ${Math.min(...research.map(wordCount))}-${Math.max(...research.map(wordCount))}; ${paragraphOwners.size} unique substantive passages`);
