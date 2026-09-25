import { createHash } from 'node:crypto';
import { sep25Hira97ResearchPosts as posts } from '../app/research-sep25-hira97.ts';

const base=process.env.VALIDATION_BASE_URL||'http://127.0.0.1:3222';
const expectedDate=process.env.EXPECTED_PUBLICATION_DATE||'2026-09-25';
const failures=[]; const hashes=new Set();
if(posts.length!==5) failures.push(`expected exactly 5 posts, found ${posts.length}`);
if(new Set(posts.map(p=>p.slug)).size!==5) failures.push('slugs are not unique');
const [indexHtml,sitemapXml]=await Promise.all([fetch(`${base}/research`).then(r=>r.text()),fetch(`${base}/sitemap.xml`).then(r=>r.text())]);
for(const post of posts){const response=await fetch(`${base}/research/${post.slug}`,{redirect:'manual'}); const html=await response.text(); const text=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim(); const words=text.split(/\s+/).filter(Boolean).length; const canonical=`https://hireassistantnearme.com/research/${post.slug}`; const hash=createHash('sha256').update(text).digest('hex'); hashes.add(hash); const checks=[[response.status===200,`HTTP ${response.status}`],[words>=1200,`${words} rendered words`],[html.includes(`<title>${post.title}`),'title mismatch'],[html.includes(`rel="canonical" href="${canonical}"`),'canonical mismatch'],[html.includes(`"datePublished":"${expectedDate}"`),'datePublished mismatch'],[html.includes(`dateTime="${expectedDate}"`)&&html.includes('September 25, 2026'),'visible date mismatch'],[html.includes(post.image),'image missing'],[sitemapXml.includes(canonical),'sitemap entry missing'],[indexHtml.includes(`/research/${post.slug}`),'index entry missing']]; const failed=checks.filter(([ok])=>!ok).map(([,m])=>m); if(failed.length) failures.push(`${post.slug}: ${failed.join(', ')}`); console.log(`${post.slug}\t${response.status}\t${words} words\t${hash}\t${failed.length?'FAIL':'PASS'}`)}
if(hashes.size!==5) failures.push('rendered article hashes are not unique');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Validated 5/5 September 25 Research articles.');
