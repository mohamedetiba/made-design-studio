import Link from 'next/link';
import { getProjects, getSettings } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Estimator from '@/components/Estimator';
import ServicesList from '@/components/ServicesList';
import ScrollWords from '@/components/ScrollWords';
import Parallax from '@/components/Parallax';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const hero = projects.find((p) => p.slug === 'almoosa-north-tower') || projects[0];
  const ar = locale === 'ar';
  const slides = [
    ...(settings.heroImage ? [{ wide: settings.heroImage, tall: settings.heroImage, alt: 'MADE Design Studio' }] : []),
    { wide: '/media/hero/s1-wide.jpg', tall: '/media/hero/s1-tall.jpg', alt: ar ? 'صالة انتظار بجدار نباتي من تنفيذ MADE' : 'Waiting lounge with a moss wall by MADE' },
    { wide: '/media/hero/s3-wide.jpg', tall: '/media/hero/s3-tall.jpg', alt: ar ? 'تصميم صالة معيشة بجدارية زرقاء' : 'Living room design with a blue mural' },
    { wide: '/media/hero/s2-wide.jpg', tall: '/media/hero/s2-tall.jpg', alt: ar ? 'بهو استقبال بثريا زجاجية' : 'Reception hall with a glass chandelier' },
  ];
  const grid = projects.filter((p) => p.slug !== hero.slug && p.featured).slice(0, 10);

  return (
    <>
      <Hero d={d.hero} locale={locale} slides={slides} />

      {/* introduction */}
      <section className="intro">
        <div className="wrap intro-grid">
          <span className="eyebrow ltr">{d.about.eyebrow}</span>
          <ScrollWords text={d.about.body} className="intro-text" />
        </div>
      </section>

      {/* services */}
      <section id="services" className="svc-sec">
        <div className="wrap col g40">
          <Reveal className="row between end">
            <div className="col g14" style={{ maxWidth: 640 }}>
              <span className="eyebrow">{d.services.eyebrow}</span>
              <h2 className="h2 big">{d.services.title}</h2>
            </div>
            <p className="lead" style={{ maxWidth: 420, fontSize: 17 }}>{d.services.body}</p>
          </Reveal>
          <ServicesList items={d.services.items} href={`/${locale}#estimate`} />
          <div className="row center" style={{ gap: 10 }}>
            <span className="muted small">{d.services.for}</span>
            {d.services.sectors.map((s) => <span key={s} className="pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* signature projects */}
      <section id="projects" className="sig">
        <div className="wrap col g40" style={{ paddingBlock: 'var(--sig-pad)' }}>
          <Reveal className="row between end">
            <div className="col g14">
              <span className="eyebrow">{d.projects.eyebrow}</span>
              <h2 className="h2 big">{d.projects.title}</h2>
            </div>
            <Link className="btn btn-ghost" href={`/${locale}/projects`}>{d.projects.all}</Link>
          </Reveal>
          <Link href={`/${locale}/projects/${hero.slug}`} className="sig-feat">
            <Parallax speed={0.12}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.cover.src} alt={t(hero.cover.alt, locale)} loading="lazy" />
            </Parallax>
            <span className="sig-shade" aria-hidden="true" />
            <span className="sig-cap">
              <span className="eyebrow">{d.projects.featured}</span>
              <span className="sig-name">{t(hero.name, locale)}</span>
              <span className="sig-scope">{t(hero.scope, locale)}</span>
              <span className="sig-go">{d.projects.view} ←</span>
            </span>
          </Link>
          <div className="circles">
            {grid.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 5) * 90} className="circle-wrap">
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
        </div>
      </section>

      <section className="est-band">
        <div className="marq" aria-hidden="true"><span>{d.est.marquee}</span><span>{d.est.marquee}</span><span>{d.est.marquee}</span></div>
        <Estimator d={d.est} settings={settings} />
      </section>

    </>
  );
}
