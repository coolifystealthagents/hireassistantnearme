import fs from 'node:fs';
import { oct2BlogPosts as blogs } from '../app/oct2-blog.ts';
import { oct2Hira101ResearchPosts as research } from '../app/research-oct2-hira101.ts';

const failures = [];
const inspected = ['app/oct2-blog.ts', 'app/research-oct2-hira101.ts'];
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

console.log(`Inspected: ${inspected.join(', ')}`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS: explicit article sources, no forbidden shared engine, no repeated long paragraph, no repeated heading sequence.');
