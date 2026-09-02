import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const [blog, research, data, fleet, sitemap, blogRoute, researchRoute] = await Promise.all([
  read('../app/sep2-blog.ts'), read('../app/research-sep2.ts'), read('../app/data.ts'),
  read('../app/fleet-data.ts'), read('../app/sitemap.xml/route.ts'),
  read('../app/blog/[slug]/page.tsx'), read('../app/research/[slug]/page.tsx'),
]);

const blogRows = [...blog.matchAll(/\{slug:'([^']+)',title:'([^']+)'/g)].map((m) => ({slug:m[1], title:m[2]}));
const researchRows = [...research.matchAll(/\{slug:'([^']+)',title:'([^']+)'/g)].map((m) => ({slug:m[1], title:m[2]}));
assert.equal(blogRows.length, 12, 'exactly 12 September 2 blog records');
assert.equal(researchRows.length, 5, 'exactly 5 September 2 research records');
assert.equal(new Set([...blogRows, ...researchRows].map((row) => row.slug)).size, 17, 'unique slugs');
assert.equal(new Set([...blogRows, ...researchRows].map((row) => row.title)).size, 17, 'unique titles');
assert.match(blog, /const published = '2026-09-02'/);
assert.match(blog, /Publication date: September 2, 2026/);
assert.match(research, /const published = '2026-09-02'/);
assert.match(data, /\.\.\.sep2BlogPosts/);
assert.match(fleet, /\.\.\.sep2ResearchPosts/);
assert.match(sitemap, /blogs\.map/);
assert.match(sitemap, /researchPosts\.map/);
assert.match(blogRoute, /datePublished: published/);
assert.match(researchRoute, /datePublished: post\.published/);
assert.match(blogRoute, /alternates: \{ canonical:/);
assert.match(researchRoute, /alternates: \{ canonical:/);

const manifest = [
  ...blogRows.map((row) => ({type:'Blog', ...row, path:`/blog/${row.slug}`})),
  ...researchRows.map((row) => ({type:'Research', ...row, path:`/research/${row.slug}`})),
];
const bodySeeds = [...blog.matchAll(/title:'([^']+)'.*?lane:'([^']+)'.*?output:'([^']+)'/g)].map((m) => m.slice(1).join('|'))
  .concat([...research.matchAll(/title:'([^']+)'.*?question:'([^']+)'.*?finding:'([^']+)'/g)].map((m) => m.slice(1).join('|')));
assert.equal(bodySeeds.length, 17, '17 body identity seeds');
assert.equal(new Set(bodySeeds.map((value) => createHash('sha256').update(value).digest('hex'))).size, 17, 'unique body hashes');
console.log(JSON.stringify(manifest, null, 2));
