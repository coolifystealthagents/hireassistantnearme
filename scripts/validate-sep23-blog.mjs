import { sep23BlogPosts } from '../app/sep23-blog.ts';

const base = process.env.VALIDATION_BASE_URL || 'http://127.0.0.1:3222';
const failures = [];
if (sep23BlogPosts.length !== 12) failures.push(`expected 12 posts, found ${sep23BlogPosts.length}`);
if (new Set(sep23BlogPosts.map((post) => post.slug)).size !== 12) failures.push('slugs are not unique');

const indexHtml = await fetch(`${base}/blog`).then((response) => response.text());
const sitemapXml = await fetch(`${base}/sitemap.xml`).then((response) => response.text());
for (const post of sep23BlogPosts) {
  const response = await fetch(`${base}/blog/${post.slug}`, { redirect: 'manual' });
  const html = await response.text();
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const canonical = `https://hireassistantnearme.com/blog/${post.slug}`;
  const checks = [
    [response.status === 200, `HTTP ${response.status}`],
    [words >= 900, `${words} rendered words`],
    [html.includes(`<title>${post.title}`), 'title mismatch'],
    [html.includes(`rel="canonical" href="${canonical}"`), 'canonical mismatch'],
    [html.includes('"datePublished":"2026-09-23"'), 'datePublished mismatch'],
    [html.includes('dateTime="2026-09-23"') && html.includes('September 23, 2026'), 'visible date mismatch'],
    [html.includes(post.detail.revision), 'revision marker missing'],
    [sitemapXml.includes(canonical), 'sitemap entry missing'],
    [indexHtml.includes(`/blog/${post.slug}`), 'blog index entry missing'],
  ];
  const failed = checks.filter(([ok]) => !ok).map(([, message]) => message);
  if (failed.length) failures.push(`${post.slug}: ${failed.join(', ')}`);
  console.log(`${post.slug}\t${response.status}\t${words} words\t${failed.length ? 'FAIL' : 'PASS'}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('Validated 12/12 September 23 Blog articles.');
