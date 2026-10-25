/**
 * Imports every project, space, before/after pair, testimonial, article and the
 * site settings from lib/seed.ts into your Sanity dataset — images included.
 *
 *   1. fill NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in .env
 *   2. npm run seed
 *
 * Safe to run more than once: documents use fixed IDs (createOrReplace) and
 * images are de-duplicated by Sanity's content hash.
 */
import { createClient } from '@sanity/client';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { BEFORE_AFTER, POSTS, PROJECTS, SETTINGS, SPACES, TESTIMONIALS } from '../lib/seed';
import type { Img } from '../lib/types';

// tiny .env loader (no dependency)
for (const f of ['.env.local', '.env']) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('✗ Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env first.');
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false });

const assets = new Map<string, string>();
async function upload(src: string): Promise<string> {
  if (assets.has(src)) return assets.get(src)!;
  const file = path.join(process.cwd(), 'public', src);
  const asset = await client.assets.upload('image', createReadStream(file), { filename: path.basename(file) });
  assets.set(src, asset._id);
  process.stdout.write('.');
  return asset._id;
}
const image = async (src: string, extra: Record<string, unknown> = {}) => ({ _type: 'image', asset: { _type: 'reference', _ref: await upload(src) }, ...extra });
const key = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').slice(-12) + Math.random().toString(36).slice(2, 6);
const ls = (v?: { ar: string; en?: string }, type = 'localeString') => (v ? { _type: type, ar: v.ar, en: v.en } : undefined);
const lt = (v?: { ar: string; en?: string }) => ls(v, 'localeText');
const seo = (s?: (typeof PROJECTS)[number]['seo']) => s && { _type: 'seo', metaTitle: ls(s.metaTitle), metaDescription: lt(s.metaDescription), focusKeyword: s.focusKeyword, keywords: s.keywords };

async function run() {
  console.log(`→ Seeding ${projectId}/${dataset}`);
  const tx = client.transaction();

  // spaces
  for (const [i, s] of SPACES.entries()) {
    tx.createOrReplace({ _id: `space-${s.slug}`, _type: 'space', name: ls(s.name), slug: { _type: 'slug', current: s.slug }, intro: lt(s.intro), order: i, cover: s.cover ? await image(s.cover) : undefined });
  }

  // projects
  for (const [i, p] of PROJECTS.entries()) {
    const gal = async (g: Img) => ({ _key: key(g.src), ...(await image(g.src)), alt: ls(g.alt), stage: g.stage, space: g.space ? { _type: 'reference', _ref: `space-${g.space}` } : undefined });
    tx.createOrReplace({
      _id: `project-${p.slug}`, _type: 'project', order: i,
      name: ls(p.name), slug: { _type: 'slug', current: p.slug }, sector: p.sector, kind: ls(p.kind), scope: lt(p.scope),
      executed: p.executed, featured: !!p.featured, location: ls(p.location), area: p.area, duration: ls(p.duration),
      brief: lt(p.brief), challenge: lt(p.challenge), concept: lt(p.concept), result: lt(p.result),
      cover: await image(p.cover.src, { alt: ls(p.cover.alt) }),
      gallery: await Promise.all(p.gallery.map(gal)),
      seo: seo(p.seo),
    });
  }

  // before / after
  for (const [i, b] of BEFORE_AFTER.entries()) {
    tx.createOrReplace({ _id: `ba-${i}`, _type: 'beforeAfter', order: i, featured: i === 0, project: { _type: 'reference', _ref: `project-${b.project}` }, label: ls(b.label), before: await image(b.before), after: await image(b.after) });
  }

  // testimonials
  for (const [i, x] of TESTIMONIALS.entries()) {
    tx.createOrReplace({ _id: `testimonial-${i}`, _type: 'testimonial', order: i, screenshot: await image(x.screenshot), quote: lt(x.quote), who: ls(x.who), featured: x.featured, consent: true });
  }

  // blog
  const cats = new Map<string, string>();
  for (const p of POSTS) {
    const id = `category-${(p.category.en || p.category.ar).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    if (!cats.has(id)) { cats.set(id, id); tx.createOrReplace({ _id: id, _type: 'category', title: ls(p.category), slug: { _type: 'slug', current: id.replace('category-', '') } }); }
    const toPT = (blocks: typeof p.body.ar = []) => blocks.map((b) => ('text' in b && typeof b.text === 'string'
      ? { _type: 'block', _key: key(b.text), style: (b as { style: string }).style, markDefs: [], children: [{ _type: 'span', _key: key(b.text + 's'), text: b.text, marks: [] }] }
      : { _key: key(JSON.stringify(b)), ...b }));
    tx.createOrReplace({
      _id: `post-${p.slug}`, _type: 'post', title: ls(p.title), slug: { _type: 'slug', current: p.slug },
      category: { _type: 'reference', _ref: id }, excerpt: lt(p.excerpt), author: p.author, publishedAt: new Date(p.publishedAt).toISOString(),
      mainImage: await image(p.image.src, { alt: ls(p.image.alt) }),
      body: { _type: 'localeBlock', ar: toPT(p.body.ar), en: toPT(p.body.en) },
      faq: p.faq?.map((f) => ({ _key: key(f.q.ar), _type: 'faqItem', q: ls(f.q), a: lt(f.a) })),
      seo: seo(p.seo),
    });
  }

  // settings
  tx.createOrReplace({
    _id: 'siteSettings', _type: 'siteSettings', phone: SETTINGS.phone, whatsapp: SETTINGS.whatsapp, email: SETTINGS.email,
    address: ls(SETTINGS.address), social: SETTINGS.social.map((s) => ({ _key: key(s.url), ...s })),
    rateDesign: SETTINGS.rates.design, rateFitout: SETTINGS.rates.fitout, rateTurnkey: SETTINGS.rates.turnkey,
  });

  console.log(`\n→ ${assets.size} images uploaded, committing documents…`);
  await tx.commit();
  console.log('✓ Done. Open /studio to edit.');
}

run().catch((e) => { console.error(e); process.exit(1); });
