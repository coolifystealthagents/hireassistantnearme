import {createHash} from 'node:crypto';
import {sep28Hira99ResearchPosts as posts} from '../app/research-sep28-hira99.ts';

const expectedDate=process.env.EXPECTED_PUBLICATION_DATE||'2026-09-28';
const base=process.env.VALIDATION_BASE_URL;
const failures=[];
const shingles=text=>{const words=text.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(Boolean);return new Set(words.slice(0,-4).map((_,i)=>words.slice(i,i+5).join(' ')))};
const body=p=>p.sections.map(s=>`${s.heading} ${s.body}`).join(' ');
const counts=new Map();
for(const p of posts){const words=body(p).split(/\s+/).filter(Boolean).length;counts.set(p.slug,words);if(words<1200)failures.push(`${p.slug}: ${words} body words, expected >=1200`);if(p.published!==expectedDate)failures.push(`${p.slug}: date ${p.published}`);if(p.sources.length<3)failures.push(`${p.slug}: fewer than 3 sources`)}
if(posts.length!==5)failures.push(`expected 5 posts, found ${posts.length}`);
if(new Set(posts.map(p=>p.slug)).size!==posts.length)failures.push('duplicate slugs in batch');
let max={score:0,pair:''};
for(let i=0;i<posts.length;i++)for(let j=i+1;j<posts.length;j++){const a=shingles(body(posts[i])),b=shingles(body(posts[j]));const intersection=[...a].filter(x=>b.has(x)).length;const score=intersection/(a.size+b.size-intersection);if(score>max.score)max={score,pair:`${posts[i].slug} <> ${posts[j].slug}`}}
if(max.score>=.5)failures.push(`maximum shingle overlap ${(max.score*100).toFixed(2)}%: ${max.pair}`);
for(const p of posts)console.log(`${p.slug}\t${counts.get(p.slug)} body words\t${createHash('sha256').update(body(p)).digest('hex')}`);
console.log(`maximum pairwise five-word-shingle Jaccard\t${(max.score*100).toFixed(2)}%\t${max.pair}`);
if(base){const [index,sitemap]=await Promise.all([fetch(`${base}/research`).then(r=>r.text()),fetch(`${base}/sitemap.xml`).then(r=>r.text())]);for(const p of posts){const response=await fetch(`${base}/research/${p.slug}`);const html=await response.text();const canonical=`https://hireassistantnearme.com/research/${p.slug}`;for(const [ok,msg] of [[response.status===200,`HTTP ${response.status}`],[html.includes(`<title>${p.title}`),'title'],[html.includes(`rel="canonical" href="${canonical}"`),'canonical'],[html.includes(`"datePublished":"${expectedDate}"`),'datePublished'],[html.includes(`dateTime="${expectedDate}"`),'visible date'],[html.includes(p.image),'image'],[index.includes(`/research/${p.slug}`),'index'],[sitemap.includes(canonical),'sitemap']])if(!ok)failures.push(`${p.slug}: ${msg}`)}}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Validated exactly 5 September 28 Research articles.');
