import Link from 'next/link';
import { getProjects, getSettings } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Estimator from '@/components/Estimator';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const hero = projects.find((p) => p.slug === 'almoosa-north-tower') || projects[0];
  const heroPic = (projects.find((p) => p.slug === 'chandelier-villa') || hero).cover;
  const grid = projects.filter((p) => p.slug !== hero.slug && p.featured).slice(0, 10);

  return (
    <>
      <Hero d={d.hero} locale={locale} image={settings.heroImage || '/media/hero/hero-wide.jpg'} mobile={settings.heroImage ? undefined : '/media/hero/hero-01.jpg'} alt={settings.heroImage ? t(heroPic.alt, locale) : (locale === 'ar' ? 'صالة انتظار بجدار نباتي من تنفيذ MADE' : 'Waiting lounge with a moss wall by MADE')} />

      {/* services */}
      <section id="services" className="wrap col g40 sp">
        <Reveal className="row between end">
          <div className="col g14" style={{ maxWidth: 640 }}>
            <span className="eyebrow">{d.services.eyebrow}</span>
            <h2 className="h2">{d.services.title}</h2>
          </div>
          <p className="lead" style={{ maxWidth: 420, fontSize: 17 }}>{d.services.body}</p>
        </Reveal>
        <Reveal className="services-grid">
          {d.services.items.map(([title, body], i) => (
            <div key={title} className={`service${i === 3 ? ' dark' : ''}`}>
              <span className="num" style={i === 3 ? { color: 'var(--taupe)' } : undefined}>0{i + 1}</span>
              <span style={{ fontSize: 19, fontWeight: 600 }}>{title}</span>
              <span style={{ fontSize: 15, lineHeight: 1.8, color: i === 3 ? 'var(--line)' : 'var(--body)' }}>{body}</span>
            </div>
          ))}
        </Reveal>
        <div className="row center" style={{ gap: 10 }}>
          <span className="muted small">{d.services.for}</span>
          {d.services.sectors.map((s, i) => <span key={s} className="pill" style={i === 5 ? { borderColor: 'var(--ink)', fontWeight: 500 } : undefined}>{s}</span>)}
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="bg-sand"><div className="wrap sec col g40">
        <Reveal className="row between end">
          <div className="col g14">
            <span className="eyebrow">{d.projects.eyebrow}</span>
            <h2 className="h2">{d.projects.title}</h2>
          </div>
          <Link className="btn btn-line" href={`/${locale}/projects`}>{d.projects.all}</Link>
        </Reveal>
        <Reveal className="row g40">
          <Link href={`/${locale}/projects/${hero.slug}`} className="zoom feat-img" style={{ flex: '2 1 520px', minWidth: 0, height: 540, display: 'block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.cover.src} alt={t(hero.cover.alt, locale)} />
            {hero.executed && <span className="badge-dark">{d.projects.executed}</span>}
          </Link>
          <div className="col g20" style={{ flex: '1 1 320px', minWidth: 0 }}>
            <span className="eyebrow" style={{ fontSize: 12 }}>{d.projects.featured}</span>
            <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, lineHeight: 1.5 }}>{t(hero.name, locale)}</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: 'var(--body)' }}>{t(hero.scope, locale)}</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
              {hero.gallery.slice(2, 5).map((g) => (
                <div key={g.src} className="zoom" style={{ height: 92 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={t(g.alt, locale)} loading="lazy" />
                </div>
              ))}
            </div>
            <Link href={`/${locale}/projects/${hero.slug}`} style={{ fontWeight: 500 }}>{d.projects.view}</Link>
          </div>
        </Reveal>
        <div className="circles" style={{ marginTop: 24 }}>
          {grid.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 5) * 90}>
              <Link href={`/${locale}/projects/${p.slug}`} className="circle">
                <span className="ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover.src} alt={t(p.cover.alt, locale)} loading="lazy" />
                </span>
                <span className="col g8"><span className="nm">{t(p.name, locale)}</span><span className="kd">{t(p.kind, locale)}</span></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div></section>

      <Estimator d={d.est} settings={settings} />

    </>
  );
}
