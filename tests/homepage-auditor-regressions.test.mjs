import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
const root=process.cwd();
const candidates=['app/page.tsx','src/app/page.tsx','src/pages/index.astro','app/components.tsx','components/Nav.tsx','components/Footer.tsx','components/BrandLogo.tsx','components/HeroAnimated.tsx','components/CTASectionAnimated.tsx','components/ParallaxHero.tsx','components/layout/Navbar.tsx','components/layout/Footer.tsx','components/site-chrome.tsx','src/components/Nav.tsx','src/components/Footer.tsx','src/components/Header.tsx','src/components/MobileCTABar.tsx','src/components/LogisticsIllustration.tsx','src/lib/site-config.ts','src/lib/seo.ts','app/layout.tsx','src/app/layout.tsx'].filter(p=>fs.existsSync(path.join(root,p)));
const homepageSource=()=>candidates.map(p=>fs.readFileSync(path.join(root,p),'utf8')).join('\n');
function allSource(){let out=''; const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['.git','node_modules','.next','dist','tests'].includes(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(?:js|jsx|ts|tsx|mjs|astro)$/.test(e.name))out+=fs.readFileSync(p,'utf8')+'\n';}};walk(root);return out;}
test('homepage images have nonempty text labels',()=>assert.ok(!/alt\s*=\s*['"]\s*['"]/.test(homepageSource())));
test('homepage source does not define duplicate main headings',()=>assert.ok((homepageSource().match(/<h1\b/g)||[]).length<=1));
