import fs from 'node:fs';
import crypto from 'node:crypto';
import { oct2BlogPosts } from '../app/oct2-blog-independent-posts.ts';
import { oct2Hira101ResearchPosts } from '../app/research-oct2-independent-posts.ts';

const normalize = value => value.replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const failures = [];
const results = [];

for (const [family, posts] of [['blog', oct2BlogPosts], ['research', oct2Hira101ResearchPosts]]) {
  for (const post of posts) {
    const path = `.next/server/app/${family}/${post.slug}.html`;
    if (!fs.existsSync(path)) {
      failures.push(`${family}:${post.slug} missing rendered HTML`);
      continue;
    }
    const html = fs.readFileSync(path, 'utf8');
    const plain = normalize(html);
    const expected = normalize(family === 'blog' ? post.detail.directAnswer[0] : post.sections[0].body).slice(0, 160);
    const checks = {
      title: plain.includes(normalize(post.title)),
      h1: new RegExp(`<h1[^>]*>[^<]*${post.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(0, 45)}`, 'i').test(html),
      date: html.includes('October 2, 2026') || html.includes('2026-10-02'),
      canonical: html.includes(`/${family}/${post.slug}`),
      image: html.includes(post.image),
      uniqueBody: plain.includes(expected),
    };
    for (const [check, passed] of Object.entries(checks)) if (!passed) failures.push(`${family}:${post.slug} failed ${check}`);
    results.push({family, slug:post.slug, checks, renderedHash:crypto.createHash('sha256').update(html).digest('hex')});
  }
}

console.log(JSON.stringify({count:results.length,failures,results}, null, 2));
if (results.length !== 17) failures.push(`rendered inventory ${results.length}, expected 17`);
if (failures.length) process.exit(1);
