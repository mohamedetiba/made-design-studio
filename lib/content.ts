import { groq } from 'next-sanity';
import { sanityEnabled } from '@/sanity/env';
import { sanityFetch, urlFor } from '@/sanity/client';
import { BEFORE_AFTER, POSTS, PROJECTS, SETTINGS, SPACES, TESTIMONIALS } from './seed';
import type { BeforeAfter, Img, L, Post, Project, Settings, Space, Testimonial } from './types';

/* ------------------------------------------------------------------ */
/* GROQ                                                                */
/* ------------------------------------------------------------------ */
const projectFields = groq`
  "slug": slug.current, name, sector, kind, scope, executed, featured, location, area, duration,
  brief, challenge, concept, result, seo{..., "ogImage": ogImage},
  cover{..., alt},
  gallery[]{..., alt, stage, "space": space->slug.current}
`;

const Q = {
  projects: groq`*[_type == "project"] | order(order asc, _createdAt desc){ ${projectFields} }`,
  project: groq`*[_type == "project" && slug.current == $slug][0]{ ${projectFields} }`,
  spaces: groq`*[_type == "space"] | order(order asc){ "slug": slug.current, name, intro, cover }`,
  beforeAfter: groq`*[_type == "beforeAfter"] | order(order asc){ label, before, after, "project": project->slug.current, "projectName": project->name }`,
  testimonials: groq`*[_type == "testimonial"] | order(order asc){ screenshot, quote, who, featured }`,
  posts: groq`*[_type == "post" && !(seo.noIndex == true)] | order(publishedAt desc){ "slug": slug.current, title, excerpt, mainImage, publishedAt, author, "category": category->title, seo }`,
  post: groq`*[_type == "post" && slug.current == $slug][0]{ "slug": slug.current, title, excerpt, mainImage, publishedAt, author, "category": category->title, body, faq, seo }`,
  settings: groq`*[_type == "siteSettings"][0]`,
};

/* ------------------------------------------------------------------ */
/* Mapping Sanity -> site types                                        */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
const mapImg = (i: Any, fallbackAlt: L): Img => ({ src: urlFor(i), alt: i?.alt?.ar ? i.alt : fallbackAlt, space: i?.space, stage: i?.stage });
const mapProject = (p: Any): Project => ({
  ...p,
  cover: mapImg(p.cover, p.name),
  gallery: (p.gallery || []).map((g: Any) => mapImg(g, p.name)),
  seo: p.seo ? { ...p.seo, ogImage: p.seo.ogImage ? urlFor(p.seo.ogImage, 1200) : undefined } : undefined,
});

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */
export async function getProjects(): Promise<Project[]> {
  if (!sanityEnabled) return PROJECTS;
  const r = await sanityFetch<Any[]>(Q.projects, {}, ['project']);
  return r?.length ? r.map(mapProject) : PROJECTS;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  if (!sanityEnabled) return PROJECTS.find((p) => p.slug === slug);
  const r = await sanityFetch<Any>(Q.project, { slug }, ['project']);
  return r ? mapProject(r) : PROJECTS.find((p) => p.slug === slug);
}

export async function getSpaces(): Promise<Space[]> {
  if (!sanityEnabled) return SPACES;
  const [spaces, projects] = await Promise.all([sanityFetch<Any[]>(Q.spaces, {}, ['space']), getProjects()]);
  if (!spaces?.length) return SPACES;
  return spaces.map((s) => {
    const images = projects.flatMap((p) => p.gallery.filter((g) => g.space === s.slug).map((g) => ({ ...g, project: p.slug, projectName: p.name })));
    return { slug: s.slug, name: s.name, intro: s.intro, cover: s.cover ? urlFor(s.cover, 1000) : images[0]?.src, images };
  });
}

export async function getBeforeAfter(): Promise<BeforeAfter[]> {
  if (!sanityEnabled) return BEFORE_AFTER;
  const r = await sanityFetch<Any[]>(Q.beforeAfter, {}, ['beforeAfter']);
  return r?.length ? r.map((b) => ({ ...b, before: urlFor(b.before), after: urlFor(b.after) })) : BEFORE_AFTER;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityEnabled) return TESTIMONIALS;
  const r = await sanityFetch<Any[]>(Q.testimonials, {}, ['testimonial']);
  return r?.length ? r.map((x) => ({ ...x, screenshot: urlFor(x.screenshot, 800) })) : TESTIMONIALS;
}

export async function getPosts(): Promise<Post[]> {
  if (!sanityEnabled) return POSTS;
  const r = await sanityFetch<Any[]>(Q.posts, {}, ['post']);
  return r?.length ? r.map((p) => ({ ...p, image: mapImg(p.mainImage, p.title), body: { ar: [] } })) : POSTS;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  if (!sanityEnabled) return POSTS.find((p) => p.slug === slug);
  const r = await sanityFetch<Any>(Q.post, { slug }, ['post']);
  if (!r) return POSTS.find((p) => p.slug === slug);
  return { ...r, image: mapImg(r.mainImage, r.title), body: r.body || { ar: [] } };
}

export async function getSettings(): Promise<Settings> {
  if (!sanityEnabled) return SETTINGS;
  const s = await sanityFetch<Any>(Q.settings, {}, ['siteSettings']);
  if (!s) return SETTINGS;
  return {
    phone: s.phone || SETTINGS.phone,
    whatsapp: s.whatsapp || SETTINGS.whatsapp,
    email: s.email,
    address: s.address?.ar ? s.address : SETTINGS.address,
    social: s.social?.length ? s.social : SETTINGS.social,
    rates: { design: s.rateDesign ?? SETTINGS.rates.design, fitout: s.rateFitout ?? SETTINGS.rates.fitout, turnkey: s.rateTurnkey ?? SETTINGS.rates.turnkey },
  };
}
