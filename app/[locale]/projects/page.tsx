import Link from 'next/link';
import type { Metadata } from 'next';
import { getBeforeAfter, getProjects, getSpaces, getSettings } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import ProjectsBrowser from '@/components/ProjectsBrowser';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return {
    title: locale === 'ar' ? 'مشاريع التصميم الداخلي والتشطيب' : 'Interior design & fit-out projects',
    description: d.pj.body,
    alternates: { canonical: `/${locale}/projects`, languages: { ar: '/ar/projects', en: '/en/projects' } },
  };
}

export default async function ProjectsPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ tab?: string; space?: string }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  const d = getDict(locale);
  const [projects, spaces, ba, settings] = await Promise.all([getProjects(), getSpaces(), getBeforeAfter(), getSettings()]);
  const tab = sp.tab === 'spaces' || sp.space ? 'spaces' : sp.tab === 'ba' ? 'ba' : sp.tab === 'videos' ? 'videos' : 'projects';
  return (
    <>
      <section className="pj-hero">
        <div className="wrap col g20 rise" style={{ paddingBottom: 40 }}>
          <span className="eyebrow">{d.pj.eyebrow}</span>
          <h1 className="h1">{d.pj.title1}<br /><span className="muted">{d.pj.title2}</span></h1>
          <p className="lead">{d.pj.body}</p>
        </div>
        <div className="strip rise2">
          {projects.filter((p) => p.featured).concat(projects.filter((p) => !p.featured)).slice(0, 10).map((p) => (
            <Link key={p.slug} href={`/${locale}/projects/${p.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover.src} alt={t(p.cover.alt, locale)} loading="lazy" />
              <span className="cap"><b>{t(p.name, locale)}</b><span>{t(p.kind, locale)}</span></span>
            </Link>
          ))}
        </div>
      </section>
      <ProjectsBrowser projects={projects} spaces={spaces} ba={ba} locale={locale} d={d.pj} dp={d.projects} dba={d.ba} initialTab={tab} initialSpace={sp.space} reels={settings.reels} />
    </>
  );
}
