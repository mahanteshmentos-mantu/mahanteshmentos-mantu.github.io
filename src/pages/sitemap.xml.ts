import type { APIRoute } from 'astro';
import { applications, research, resources } from '../data/content';
import { identity, navigation } from '../data/site';
export const GET: APIRoute = () => {
  const routes = [...navigation.map(n=>n.href), '/privacy/', ...applications.map(r=>`/applications/${r.slug}/`), ...research.map(r=>`/research/${r.slug}/`), ...resources.map(r=>`/education/${r.slug}/`)];
  const escape = (s:string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${escape(new URL(r,identity.url).href)}</loc></url>`).join('')}</urlset>`, {headers:{'Content-Type':'application/xml'}});
};
