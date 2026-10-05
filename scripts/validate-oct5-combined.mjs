import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {oct5BlogPosts as blogs} from '../app/oct5-blog-posts.ts';
import {oct5Hira104ResearchPosts as research} from '../app/research-oct5-hira104.ts';

const expected=process.env.EXPECTED_PUBLICATION_DATE||'2026-10-05';
const norm=s=>s.replace(/<[^>]+>/g,' ').replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi,' ').replace(/\s+/g,' ').trim().toLowerCase();
const words=s=>norm(s).split(' ').filter(Boolean);
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const failures=[]; const report=[];
const indexHtml={blog:fs.readFileSync('.next/server/app/blog.html','utf8'),research:fs.readFileSync('.next/server/app/research.html','utf8')};
const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');

for(const [family,posts] of [['blog',blogs],['research',research]])for(const post of posts){
 const sourceParagraphs=family==='blog'?[...post.detail.directAnswer,...post.detail.sections.flatMap(s=>s.paragraphs)]:post.sections.map(s=>s.body);
 const body=sourceParagraphs.join('\n\n'); const htmlPath=`.next/server/app/${family}/${post.slug}.html`;
 const minimum=family==='blog'?900:1200;if(words(body).length<minimum)failures.push(`${family}:${post.slug}: ${words(body).length} body words below ${minimum}`);
 if(!fs.existsSync(htmlPath)){failures.push(`${family}:${post.slug}: rendered route missing`);continue}
 const html=fs.readFileSync(htmlPath,'utf8'),plain=norm(html),url=`https://hireassistantnearme.com/${family}/${post.slug}`;
 const missing=sourceParagraphs.filter(p=>!plain.includes(norm(p)));
 const internal=(family==='blog'?post.detail.bodyLinks:post.related).filter(x=>x.href.startsWith('/'));
 for(const link of internal){const target=link.href==='/'?'.next/server/app/index.html':`.next/server/app${link.href}.html`;if(!fs.existsSync(target)&&!fs.existsSync(`.next/server/app${link.href}/index.html`))failures.push(`${family}:${post.slug}: internal target missing ${link.href}`)}
 const checks={title:plain.includes(norm(post.title)),canonical:html.includes(url),datePublished:html.includes(`"datePublished":"${expected}"`),visibleDate:html.includes(`datetime="${expected}"`)||html.includes(`dateTime="${expected}"`),image:html.includes(post.image),index:indexHtml[family].includes(`/${family}/${post.slug}`),sitemap:sitemap.includes(url),completeBody:missing.length===0};
 for(const [name,ok] of Object.entries(checks))if(!ok)failures.push(`${family}:${post.slug}: ${name} failed`);
 const imagePath=`public${post.image}`;if(!fs.existsSync(imagePath))failures.push(`${family}:${post.slug}: image file missing ${post.image}`);else{try{const meta=await sharp(imagePath).metadata();if(!meta.format||!meta.width||!meta.height)throw Error('undecodable')}catch(e){failures.push(`${family}:${post.slug}: image decode failed`)}}
 report.push({family,slug:post.slug,sourceWords:words(body).length,contentHash:sha(body),renderedHash:sha(html),missingParagraphs:missing.length,checks,image:post.image});
}
if(blogs.length!==12)failures.push(`Blog inventory ${blogs.length}`);if(research.length!==5)failures.push(`Research inventory ${research.length}`);
console.log(JSON.stringify({expectedPublicationDate:expected,count:report.length,failures,report},null,2));
if(failures.length)process.exit(1);
