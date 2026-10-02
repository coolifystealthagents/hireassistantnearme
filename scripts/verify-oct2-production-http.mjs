import { oct2BlogPosts } from '../app/oct2-blog-independent-posts.ts';
import { oct2Hira101ResearchPosts } from '../app/research-oct2-independent-posts.ts';

const origin = 'https://hireassistantnearme.com';
const items = [
  ...oct2BlogPosts.map(post => ({family:'blog', ...post})),
  ...oct2Hira101ResearchPosts.map(post => ({family:'research', ...post})),
];
const indexHtml = {};
for (const family of ['blog', 'research']) {
  const response = await fetch(`${origin}/${family}`, {redirect:'follow'});
  indexHtml[family] = {status:response.status, body:await response.text()};
}
const sitemapResponse = await fetch(`${origin}/sitemap.xml`, {redirect:'follow'});
const sitemap = {status:sitemapResponse.status, body:await sitemapResponse.text()};
const results = [];

for (const item of items) {
  const url = `${origin}/${item.family}/${item.slug}`;
  const response = await fetch(url, {redirect:'follow'});
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/is)?.[1] || '';
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1].replace(/<[^>]+>/g,'').trim() || '';
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] || html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i)?.[1] || '';
  const imagePath = item.image;
  const imageUrl = new URL(imagePath, origin).href;
  const imageResponse = await fetch(imageUrl, {redirect:'follow'});
  const imageBytes = new Uint8Array(await imageResponse.arrayBuffer());
  const contentType = imageResponse.headers.get('content-type') || '';
  const hygieneTerms = ['api_key_invalid','paperclip','coolify','deployment mechanics','publishing manifest','qa agent','system prompt'];
  const hygieneHits = hygieneTerms.filter(term => html.toLowerCase().includes(term));
  const checks = {
    routeStatus: response.status === 200,
    exactTitle: title.includes(item.title),
    exactH1: h1 === item.title,
    publicationDate: html.includes('October 2, 2026') && html.includes('2026-10-02'),
    schema: html.includes('datePublished') && html.includes('2026-10-02'),
    canonical: canonical === url,
    imageReferenced: html.includes(imagePath),
    imageStatus: imageResponse.status === 200,
    imageMime: contentType.startsWith('image/'),
    imageNonempty: imageBytes.byteLength > 100,
    indexEntry: indexHtml[item.family].status === 200 && indexHtml[item.family].body.includes(`/${item.family}/${item.slug}`),
    sitemapEntry: sitemap.status === 200 && sitemap.body.includes(url),
    copyHygiene: hygieneHits.length === 0,
  };
  results.push({family:item.family,slug:item.slug,url,checkedAt:new Date().toISOString(),status:response.status,title,h1,canonical,image:{url:imageUrl,status:imageResponse.status,contentType,bytes:imageBytes.byteLength},hygieneHits,checks});
}

const failures = results.flatMap(result => Object.entries(result.checks).filter(([,pass]) => !pass).map(([check]) => `${result.family}:${result.slug}:${check}`));
console.log(JSON.stringify({origin,checkedAt:new Date().toISOString(),indexStatus:{blog:indexHtml.blog.status,research:indexHtml.research.status},sitemapStatus:sitemap.status,required:17,verified:results.filter(result => Object.values(result.checks).every(Boolean)).length,failures,results}, null, 2));
if (failures.length) process.exit(1);
