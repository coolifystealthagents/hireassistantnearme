import fs from 'node:fs';
import { oct2BlogPosts as blogs } from '../app/oct2-blog.ts';
import { oct2Hira101ResearchPosts as research } from '../app/research-oct2-hira101.ts';
import { oct2IndependentBlogContent } from '../app/oct2-blog-independent-content.ts';
import { oct2IndependentResearchContent } from '../app/research-oct2-independent-content.ts';

const failures = [];
const inspected = [
  'app/oct2-blog.ts',
  'app/research-oct2-hira101.ts',
  'app/oct2-blog-independent-content.ts',
  'app/research-oct2-independent-content.ts',
];
const forbidden = [
  /profiles\.map\s*\(/,
  /seeds\.map\s*\(/,
  /\brawSections\b/,
  /\bbaseSections\b/,
  /\bpersonalize\b/,
  /\bvoices\b/,
  /\bsectionPlans\b/,
  /\bresearchPlans\b/,
];
for (const file of inspected) {
  const source = fs.readFileSync(file, 'utf8');
  for (const pattern of forbidden) if (pattern.test(source)) failures.push(`${file}: shared article engine ${pattern}`);
}

const normalize = text => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const words = text => normalize(text).split(' ').filter(Boolean);
const shingles = text => {
  const tokens = words(text);
  return new Set(tokens.slice(0, -4).map((_, index) => tokens.slice(index, index + 5).join(' ')));
};
const paragraphsFor = (post, family) => family === 'blog'
  ? [...post.detail.directAnswer, ...post.detail.sections.flatMap(section => section.paragraphs)]
  : post.sections.map(section => section.body);

for (const [family, posts] of [['blog', blogs], ['research', research]]) {
  const longParagraphs = new Map();
  const sequences = new Map();
  for (const post of posts) {
    const headings = (family === 'blog' ? post.detail.sections : post.sections).map(section => normalize(section.heading)).join('|');
    sequences.set(headings, [...(sequences.get(headings) || []), post.slug]);
    for (const paragraph of paragraphsFor(post, family)) {
      const key = normalize(paragraph);
      if (key.split(' ').length < 40) continue;
      longParagraphs.set(key, [...(longParagraphs.get(key) || []), post.slug]);
    }
  }
  for (const slugs of longParagraphs.values()) if (new Set(slugs).size > 1) failures.push(`${family}: repeated substantive paragraph in ${[...new Set(slugs)].join(', ')}`);
  for (const slugs of sequences.values()) if (slugs.length > 1) failures.push(`${family}: repeated heading sequence in ${slugs.join(', ')}`);
}

const independent = [
  ...Object.entries(oct2IndependentBlogContent).map(([slug, entry]) => ({
    family: 'blog',
    slug,
    minimum: 900,
    paragraphs: [...entry.directAnswer, ...entry.sections.flatMap(section => section.paragraphs)],
  })),
  ...Object.entries(oct2IndependentResearchContent).map(([slug, entry]) => ({
    family: 'research',
    slug,
    minimum: 1200,
    paragraphs: entry.sections.map(section => section.body),
  })),
];

if (independent.filter(item => item.family === 'blog').length !== 12) failures.push('independent Blog inventory is not exactly 12');
if (independent.filter(item => item.family === 'research').length !== 5) failures.push('independent Research inventory is not exactly 5');

const paragraphOwners = new Map();
for (const item of independent) {
  const body = item.paragraphs.join(' ');
  const count = words(body).length;
  if (count < item.minimum) failures.push(`${item.family}:${item.slug} has ${count} words; minimum ${item.minimum}`);
  for (const paragraph of item.paragraphs) {
    if (words(paragraph).length < 40) continue;
    const key = normalize(paragraph);
    paragraphOwners.set(key, [...(paragraphOwners.get(key) || []), `${item.family}:${item.slug}`]);
  }
}
for (const owners of paragraphOwners.values()) {
  if (new Set(owners).size > 1) failures.push(`independent repeated long paragraph in ${[...new Set(owners)].join(', ')}`);
}

let maximumOverlap = { value: 0, left: '', right: '', shared: 0 };
for (let left = 0; left < independent.length; left += 1) {
  for (let right = left + 1; right < independent.length; right += 1) {
    const leftSet = shingles(independent[left].paragraphs.join(' '));
    const rightSet = shingles(independent[right].paragraphs.join(' '));
    const shared = [...leftSet].filter(value => rightSet.has(value)).length;
    const value = shared / (leftSet.size + rightSet.size - shared);
    if (value > maximumOverlap.value) maximumOverlap = {
      value,
      shared,
      left: `${independent[left].family}:${independent[left].slug}`,
      right: `${independent[right].family}:${independent[right].slug}`,
    };
  }
}
if (maximumOverlap.value >= 0.5) failures.push(`independent maximum five-word-shingle overlap is ${(maximumOverlap.value * 100).toFixed(2)}%`);

console.log(`Inspected: ${inspected.join(', ')}`);
console.log(`Independent inventory: ${independent.length}; maximum five-word-shingle overlap ${(maximumOverlap.value * 100).toFixed(2)}% (${maximumOverlap.left} / ${maximumOverlap.right}; ${maximumOverlap.shared} shared)`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS: explicit article sources, no forbidden shared engine, no repeated long paragraph, no repeated heading sequence.');
