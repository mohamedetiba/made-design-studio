import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, getProjects, getSettings } from '@/lib/content';
import { PROJECTS } from '@/lib/seed';
import { getDict, locales, siteUrl } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import Gallery from '@/components/Gallery';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return locales.flatMap((locale) => PROJECTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  const title = t(p.seo?.metaTitle, locale) || t(p.name, locale);
  const description = t(p.seo?.metaDescription, locale) || `${t(p.kind, locale)} — ${t(p.scope, locale)}`;
  return {
    title,
    description,
    keywords: p.seo?.keywords,
    robots: p.seo?.noIndex ? { index: false } : undefined,
    alternates: { canonical: `/${locale}/projects/${slug}`, languages: { ar: `/ar/projects/${slug}`, en: `/en/projects/${slug}` } },
    openGraph: { title, description, images: [p.seo?.ogImage || p.cover.src] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const [p, all, settings] = await Promise.all([getProject(slug), getProjects(), getSettings()]);
  if (!p) notFound();
  const d = getDict(locale);
  const i = all.findIndex((x) => x.slug === slug);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const name = t(p.name, locale);
  const wa = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(d.detail.waMsg(name))}`;
  const story = [p.brief, p.challenge, p.concept, p.result].filter(Boolean);

  return (
    <article>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'CreativeWork', name, about: t(p.kind, locale), description: t(p.scope, locale),
        image: p.gallery.slice(0, 6).map((g) => (g.src.startsWith('http') ? g.src : siteUrl + g.src)),
        creator: { '@type': 'Organization', name: 'MADE Design Studio', url: siteUrl },
        url: `${siteUrl}/${locale}/projects/${slug}`,
      }} />
      <section className="wrap col g20 rise" style={{ padding: '48px 24px 32px' }}>
        <Link href={`/${locale}/projects`} className="muted small">{d.detail.back}</Link>
        <h1 className="h1" style={{ fontSize: 'clamp(34px,4.4vw,58px)' }}>{name}</h1>
        <dl className="row" style={{ gap: 40, margin: 0 }}>
          {[[d.detail.kind, t(p.kind, locale)], [d.detail.scope, t(p.scope, locale)], [d.detail.photos, `${p.gallery.length} · ${p.executed ? d.detail.real : d.detail.render}`]].map(([k, v]) => (
            <div key={k} className="col g8"><dt className="muted small">{k}</dt><dd style={{ margin: 0, fontSize: 17 }}>{v}</dd></div>
          ))}
        </dl>
      </section>
      <div className="wrap rise2" style={{ padding: '0 24px' }}>
        <div className="zoom" style={{ height: 'min(72vh,680px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.cover.src} alt={t(p.cover.alt, locale)} />
        </div>
      </div>
      {story.length > 0 && (
        <section className="wrap col g20" style={{ padding: '56px 24px 0', maxWidth: 860 }}>
          {story.map((s, k) => <p key={k} className="lead" style={{ maxWidth: 'none' }}>{t(s, locale)}</p>)}
        </section>
      )}
      <section className="wrap" style={{ padding: '56px 24px' }}>
        <Gallery images={p.gallery} locale={locale} />
      </section>
      <section className="bg-ink">
        <div className="wrap row between center" style={{ padding: '56px 24px' }}>
          <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(22px,2.4vw,32px)', lineHeight: 1.6, maxWidth: 680 }}>{d.detail.cta}</p>
          <a className="btn btn-light" href={wa} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>{d.est.cta}</a>
        </div>
      </section>
      <nav className="wrap row between" style={{ padding: '40px 24px 80px' }} aria-label="projects">
        <Link href={`/${locale}/projects/${prev.slug}`} className="col g8" style={{ textDecoration: 'none' }}><span className="muted small">{d.detail.prev}</span><span style={{ fontWeight: 600 }}>{t(prev.name, locale)}</span></Link>
        <Link href={`/${locale}/projects/${next.slug}`} className="col g8" style={{ textDecoration: 'none', textAlign: 'end' }}><span className="muted small">{d.detail.next}</span><span style={{ fontWeight: 600 }}>{t(next.name, locale)}</span></Link>
      </nav>
    </article>
  );
}
