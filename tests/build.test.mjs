import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, existsSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const walk = dir => readdirSync(dir).flatMap(n => statSync(join(dir,n)).isDirectory() ? walk(join(dir,n)) : [join(dir,n)]);
const files = walk(root), html = files.filter(f=>f.endsWith('.html'));
const read = f => readFileSync(f,'utf8');
const routes=['/','/about/','/research/','/applications/','/applications/psy-adr/','/education/','/contact/','/privacy/'];
const resolve = path => join(root, path.replace(/^\//,'') + (path.endsWith('/') ? 'index.html' : ''));
test('all required routes and the custom 404 are generated',()=>{for(const r of routes) assert.ok(existsSync(resolve(r)),r);assert.ok(existsSync(join(root,'404.html')));});
test('custom domain is preserved byte-for-byte in the deployment output',()=>{
 const original=read(new URL('../CNAME',import.meta.url));assert.equal(original.trim(),'mabchonge.me');assert.equal(read(join(root,'CNAME')),original);assert.equal(read(new URL('../public/CNAME',import.meta.url)),original);
});
test('every generated page has correct canonical metadata and semantic landmarks',()=>{const titles=new Set();for(const f of html){const s=read(f);const title=s.match(/<title>(.*?)<\/title>/s)?.[1];assert.ok(title,f);assert.ok(!titles.has(title),'duplicate title');titles.add(title);assert.match(s,/<html lang="en"/);assert.equal((s.match(/<h1(?:\s|>)/g)||[]).length,1,f);assert.match(s,/<main id="main"/);assert.match(s,/<meta name="description" content="[^"]+"/);const route='/'+relative(root,f).replace(/index\.html$/,'');assert.ok(s.includes(`href="https://mabchonge.me${route}"`),route);assert.match(s,/<meta property="og:title"/);const json=s.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];assert.equal(JSON.parse(json)['@type'],'Person');}});
test('all local hrefs, scripts, images, and fragment targets resolve',()=>{for(const f of html){const s=read(f);for(const match of s.matchAll(/\b(?:href|src)="([^"]+)"/g)){const value=match[1];if(/^(https?:|mailto:|data:)/.test(value)) continue;const u=new URL(value,'https://mabchonge.me/'+relative(root,f));const target=resolve(u.pathname);assert.ok(existsSync(target),`${f}: ${value}`);if(u.hash) assert.ok(read(target).includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),`missing target: ${value}`);}}});
test('sitemap includes all public routes and excludes the 404',()=>{const s=read(join(root,'sitemap.xml'));for(const r of routes) assert.ok(s.includes(`<loc>https://mabchonge.me${r}</loc>`),r);assert.ok(!s.includes('404'));assert.match(read(join(root,'robots.txt')),/Sitemap: https:\/\/mabchonge\.me\/sitemap.xml/);assert.match(read(join(root,'404.html')),/content="noindex, follow"/);});
test('public pages do not contain forms or draft tokens and label the prototype',()=>{for(const f of html){const s=read(f);assert.doesNotMatch(s,/<form\b|TODO|Lorem ipsum|INSERT HERE|example\.com/i);}assert.match(read(resolve('/applications/psy-adr/')),/release unverified/);});
test('site remains small and uses no third-party executable assets',()=>{let total=0;for(const f of files)total+=statSync(f).size;assert.ok(total<250_000,`Output too large: ${total}`);for(const f of html) assert.doesNotMatch(read(f),/<script[^>]+src="https?:\/\/|<link[^>]+rel="stylesheet"[^>]+href="https?:\/\//);});
