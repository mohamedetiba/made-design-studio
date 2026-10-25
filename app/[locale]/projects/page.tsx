import type { Metadata } from 'next';
import { getBeforeAfter, getProjects, getSpaces } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
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
  const [projects, spaces, ba] = await Promise.all([getProjects(), getSpaces(), getBeforeAfter()]);
  const tab = sp.tab === 'spaces' || sp.space ? 'spaces' : sp.tab === 'ba' ? 'ba' : 'projects';
  return (
    <>
      <section className="wrap col g20 rise" style={{ padding: '72px 24px 40px' }}>
        <span className="eyebrow">{d.pj.eyebrow}</span>
        <h1 className="h1" style={{ fontSize: 'clamp(36px,4.6vw,62px)' }}>{d.pj.title1}<br /><span className="muted">{d.pj.title2}</span></h1>
        <p className="lead">{d.pj.body}</p>
      </section>
      <ProjectsBrowser projects={projects} spaces={spaces} ba={ba} locale={locale} d={d.pj} dp={d.projects} dba={d.ba} initialTab={tab} initialSpace={sp.space} />
    </>
  );
}
