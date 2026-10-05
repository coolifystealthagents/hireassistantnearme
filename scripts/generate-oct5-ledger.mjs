import fs from 'node:fs';
import crypto from 'node:crypto';
import {oct5BlogPosts as blogs} from '../app/oct5-blog-posts.ts';
import {oct5Hira104ResearchPosts as research} from '../app/research-oct5-hira104.ts';
const contentCommit=process.env.CONTENT_COMMIT;
if(!contentCommit)throw Error('CONTENT_COMMIT required');
const rows=[];
for(const [family,posts] of [['blog',blogs],['research',research]])for(const post of posts){
 const body=(family==='blog'?[...post.detail.directAnswer,...post.detail.sections.flatMap(s=>s.paragraphs)]:post.sections.map(s=>s.body)).join('\n\n');
 rows.push({family,topic:post.title,slug:post.slug,sources:(family==='blog'?post.detail.sources:post.sources).map(s=>s.url),contentHash:crypto.createHash('sha256').update(body).digest('hex'),publicationDate:post.published,contentCommit,deploymentEvidence:null,liveUrl:`https://hireassistantnearme.com/${family}/${post.slug}`,verifiedAt:null});
}
fs.writeFileSync('publishing-runs/2026-10-05-combined-ledger.json',JSON.stringify({cycle:'2026-10-05',publicationTimezone:'UTC',publicationDate:'2026-10-05',publicationDateStatus:'provisional until first successful live verification; reconcile before corrective release if UTC date changes',repository:'coolifystealthagents/hireassistantnearme',productionBranch:'main',contentCommit,status:'citation-corrected-local-validation-passed-awaiting-authorized-push-and-operator-deployment',required:{blog:12,research:5},verified:{blog:0,research:0},entries:rows},null,2)+'\n');
