import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '../..');
const errors = [];
const ok = (condition, message) => { if (!condition) errors.push(message); };
const read = (file) => fs.readFileSync(path.join(root,file),'utf8');
const manifest = JSON.parse(read('publishing/2026-10-12/manifest.json'));

function parseExport(file, name, end) {
  const text = read(file);
  const startMark = `export const ${name}`;
  const declaration = text.indexOf(startMark);
  const start = text.indexOf('[', text.indexOf('=', declaration));
  const stop = text.lastIndexOf(end);
  const json = text.slice(start, stop + 1).replaceAll(': published', ': "2026-10-12"');
  return JSON.parse(json);
}

const blogs = parseExport('app/oct12-blog-posts.ts','oct12BlogPosts',']');
const research = parseExport('app/research-oct12.ts','oct12ResearchPosts',']');
const all = [...blogs,...research];
ok(manifest.date === '2026-10-12','manifest date must be 2026-10-12');
ok(blogs.length === 12,`expected 12 Blog items, found ${blogs.length}`);
ok(research.length === 5,`expected 5 Research items, found ${research.length}`);
ok(manifest.blog.length === 12 && manifest.research.length === 5,'manifest section counts are wrong');

const unique = (values) => new Set(values).size === values.length;
ok(unique(all.map(x=>x.slug)),'slugs must be unique');
ok(unique(all.map(x=>x.title)),'titles must be unique');
ok(unique(all.map(x=>x.image)),'thumbnail paths must be unique');
ok(all.every(x=>x.published === '2026-10-12'),'every item must use publication date 2026-10-12');
ok(all.every(x=>!/(^|\s)(2026|oct(?:ober)?\s+12|10[-/]12)(\s|$|:)/i.test(x.title)),'titles must be date-free');

for (const post of blogs) {
  ok(post.richPublished === true,`${post.slug}: Blog must use rich system`);
  ok(post.detail?.sections?.length >= 7,`${post.slug}: needs at least 7 article sections`);
  ok(post.detail?.relatedLinks?.some(x=>x.href === '/blog'),`${post.slug}: missing Blog index link`);
  ok(post.detail?.relatedLinks?.some(x=>x.href === '/research'),`${post.slug}: missing Research related link`);
  ok(post.detail?.sources?.length >= 4,`${post.slug}: needs at least 4 sources`);
  ok(post.takeaways?.length >= 4,`${post.slug}: needs at least 4 takeaways`);
}
for (const post of research) {
  ok(post.sections?.length >= 7,`${post.slug}: needs at least 7 research sections`);
  ok(post.sources?.length >= 8,`${post.slug}: needs at least 8 authoritative sources`);
  ok(post.sources?.every(x=>/^https:\/\//.test(x.url)),`${post.slug}: sources must be HTTPS`);
  ok(post.related?.some(x=>x.href === '/research'),`${post.slug}: missing Research index link`);
  ok(post.related?.some(x=>x.href === '/blog'),`${post.slug}: missing Blog related link`);
  ok(post.tables?.length >= 1 && post.tables[0].rows.length >= 5,`${post.slug}: missing research comparison table`);
}

const blogRegistry = read('app/data.ts');
const researchRegistry = read('app/fleet-data.ts');
ok(blogRegistry.includes("import { oct12BlogPosts } from './oct12-blog-posts';"),'Blog registry import missing');
ok(blogRegistry.includes('...oct12BlogPosts'),'Blog registry spread missing');
ok((blogRegistry.match(/export const blogPosts/g)||[]).length === 1,'Blog registry must have one blogPosts export');
ok(researchRegistry.includes("import { oct12ResearchPosts } from './research-oct12';"),'Research registry import missing');
ok(researchRegistry.includes('...oct12ResearchPosts'),'Research registry spread missing');
ok(fs.existsSync(path.join(root,'app/blog/[slug]/page.tsx')) && fs.existsSync(path.join(root,'app/blog/page.tsx')),'Blog routes missing');
ok(fs.existsSync(path.join(root,'app/research/[slug]/page.tsx')) && fs.existsSync(path.join(root,'app/research/page.tsx')),'Research routes missing');
ok(read('app/blog/[slug]/page.tsx').includes('<time dateTime={published}>'),'Blog visible date rendering missing');
ok(read('app/research/[slug]/page.tsx').includes('<time dateTime={post.published}>'),'Research visible date rendering missing');
ok(read('app/sitemap.xml/route.ts').includes('researchPosts') && read('app/sitemap.xml/route.ts').includes('blogPosts'),'sitemap does not include both registries');

const hashes=[];
for (const post of all) {
  const file=path.join(root,'public',post.image.replace(/^\//,''));
  ok(fs.existsSync(file),`${post.slug}: thumbnail missing`);
  if (!fs.existsSync(file)) continue;
  const buf=fs.readFileSync(file);
  ok(buf.toString('ascii',1,4)==='PNG',`${post.slug}: thumbnail is not PNG`);
  ok(buf.readUInt32BE(16)===1200 && buf.readUInt32BE(20)===630,`${post.slug}: thumbnail must be 1200x630`);
  hashes.push(crypto.createHash('sha256').update(buf).digest('hex'));
}
ok(hashes.length===17 && unique(hashes),'all 17 thumbnails must be visually unique files');

const prose=[];
for (const p of blogs) {
  prose.push(...p.detail.directAnswer,...p.detail.sections.flatMap(s=>s.paragraphs),p.sourceBody);
}
for (const p of research) prose.push(...p.sections.flatMap(s=>s.body.split(/\n\n+/)));
const normalize = s => s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const substantive=prose.filter(x=>normalize(x).split(' ').length>=25);
const seen=new Map();
for (const text of substantive) {
 const key=normalize(text);
 if (seen.has(key)) errors.push(`duplicate substantive paragraph: ${text.slice(0,70)}...`);
 seen.set(key,true);
}
const oldFiles=fs.readdirSync(path.join(root,'app')).filter(x=>/\.(ts|tsx)$/.test(x) && !['oct12-blog-posts.ts','research-oct12.ts'].includes(x));
const oldText=oldFiles.map(x=>read(`app/${x}`)).join('\n');
for (const text of substantive) ok(!oldText.includes(text),`new prose duplicates existing app prose: ${text.slice(0,70)}...`);

const allAppText=fs.readdirSync(path.join(root,'app')).filter(x=>/\.(ts|tsx)$/.test(x)).map(x=>read(`app/${x}`)).join('\n');
for (const post of all) {
 const slugCount=(allAppText.match(new RegExp(`["']${post.slug}["']`,'g'))||[]).length;
 ok(slugCount===1,`${post.slug}: expected one exact slug declaration, found ${slugCount}`);
}

if(errors.length){console.error(`FAIL (${errors.length})`); errors.forEach(e=>console.error(`- ${e}`)); process.exit(1);}
console.log('PASS: 12 Blog + 5 Research, date/routes/registries/related systems, source depth, prose uniqueness, and 17 unique thumbnails verified.');
