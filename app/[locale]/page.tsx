import '../film.css';
import { getProjects, getSettings } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import FilmHome from '@/components/film/FilmHome';

const IN_REEL = ['sada-project', 'misk-villa', 'warm-rattan-home', 'chandelier-villa', 'classic-view-villa', 'almoosa-north-tower'];

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const more = projects
    .filter((p) => !IN_REEL.includes(p.slug))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, 8)
    .map((p) => ({ slug: p.slug, src: p.cover.src, alt: t(p.cover.alt, locale), name: t(p.name, locale), kind: t(p.kind, locale) }));
  return <FilmHome locale={locale} settings={settings} est={d.est} more={more} />;
}
