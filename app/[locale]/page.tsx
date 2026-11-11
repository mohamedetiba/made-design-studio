import '../film.css';
import { getSettings } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import FilmHome from '@/components/film/FilmHome';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const settings = await getSettings();
  return <FilmHome locale={locale} settings={settings} est={d.est} />;
}
