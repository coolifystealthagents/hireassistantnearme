import {createHash} from 'node:crypto';
import {readFileSync,readdirSync} from 'node:fs';
import {oct5Hira104ResearchPosts as posts} from '../app/research-oct5-hira104.ts';

const expected=process.env.EXPECTED_PUBLICATION_DATE||'2026-10-06';
const failures=[];
const words=p=>p.sections.map(s=>`${s.heading} ${s.body}`).join(' ').split(/\s+/).filter(Boolean).length;
const body=p=>p.sections.map(s=>`${s.heading} ${s.body}`).join(' ');
const shingle=text=>{const a=text.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(Boolean);return new Set(a.slice(0,-4).map((_,i)=>a.slice(i,i+5).join(' ')))};
if(posts.length!==5)failures.push(`expected 5 posts; found ${posts.length}`);
if(new Set(posts.map(p=>p.slug)).size!==5)failures.push('duplicate batch slug');
const olderSource=readdirSync('app').filter(name=>/^research-.*\.ts$/.test(name)&&name!=='research-oct5-hira104.ts').map(name=>readFileSync(`app/${name}`,'utf8')).join('\n');
const fleetSource=readFileSync('app/fleet-data.ts','utf8');
for(const p of posts){
 if(words(p)<1200)failures.push(`${p.slug}: ${words(p)} words`);
 if(p.published!==expected)failures.push(`${p.slug}: date ${p.published}`);
 if(p.sources.length<3)failures.push(`${p.slug}: fewer than 3 sources`);
 if(olderSource.includes(`slug:'${p.slug}'`)||olderSource.includes(`slug: '${p.slug}'`))failures.push(`${p.slug}: existing inventory collision`);
 for(const link of p.related)if(link.href.startsWith('/services/')&&!fleetSource.includes(`slug: '${link.href.slice('/services/'.length)}'`))failures.push(`${p.slug}: missing internal destination ${link.href}`);
 console.log(`${p.slug}\t${words(p)} body words\t${createHash('sha256').update(body(p)).digest('hex')}`);
}
let max={score:0,pair:''};
for(let i=0;i<posts.length;i++)for(let j=i+1;j<posts.length;j++){const a=shingle(body(posts[i])),b=shingle(body(posts[j]));const n=[...a].filter(x=>b.has(x)).length;const score=n/(a.size+b.size-n);if(score>max.score)max={score,pair:`${posts[i].slug} <> ${posts[j].slug}`}}
console.log(`maximum pairwise five-word-shingle Jaccard\t${(max.score*100).toFixed(2)}%\t${max.pair}`);
if(max.score>=.5)failures.push(`overlap ${(max.score*100).toFixed(2)}%`);
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Validated exactly 5 October 5 Research handoff articles.');
