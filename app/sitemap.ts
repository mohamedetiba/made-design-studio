import type { MetadataRoute } from 'next';
import { getPosts, getProjects } from '@/lib/content';
import { siteUrl } from '@/lib/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const entry = (path: string, priority: number, lastModified?: string) => ({
    url: `${siteUrl}/ar${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    priority,
    alternates: { languages: { ar: `${siteUrl}/ar${path}`, en: `${siteUrl}/en${path}` } },
  });
  return [
    entry('', 1),
    entry('/projects', 0.9),
    entry('/blog', 0.8),
    ...projects.filter((p) => !p.seo?.noIndex).map((p) => entry(`/projects/${p.slug}`, 0.7)),
    ...posts.filter((p) => !p.seo?.noIndex).map((p) => entry(`/blog/${p.slug}`, 0.7, p.publishedAt)),
  ];
}
