import Link from 'next/link';
import { getBeforeAfter, getPosts, getProjects, getSettings, getSpaces, getTestimonials } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import ProjectCard from '@/components/ProjectCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import Testimonials from '@/components/Testimonials';
import Estimator from '@/components/Estimator';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const [projects, spaces, ba, testimonials, posts, settings] = await Promise.all([getProjects(), getSpaces(), getBeforeAfter(), getTestimonials(), getPosts(), getSettings()]);
  const hero = projects.find((p) => p.slug === 'almoosa-north-tower') || projects[0];
  const grid = projects.filter((p) => p.slug !== hero.slug && p.featured).slice(0, 6);
  const firstBa = ba[0];

  return (
    <>
      <Hero d={d.hero} locale={locale} />

      {/* four words */}
      <section aria-label="MADE" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap grid grid-fit-260" style={{ gap: 0 }}>
          {d.words.map(([k, v], i) => (
            <Reveal key={k} delay={i * 120} className="col g8" style={{ padding: '32px 20px', borderInlineEnd: i < 3 ? '1px solid var(--line)' : 0 }}>
              <span className="eyebrow ltr" style={{ textAlign: 'start' }}>{k}</span>
              <span style={{ fontSize: 18, fontWeight: 500 }}>{v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* services */}
      <section id="services" className="wrap col g40" style={{ padding: '110px 24px 40px' }}>
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
              <span style={{ fontSize: 22, fontWeight: 600 }}>{title}</span>
              <span style={{ fontSize: 15, lineHeight: 1.8, color: i === 3 ? 'var(--line)' : 'var(--body)' }}>{body}</span>
            </div>
          ))}
        </Reveal>
        <div className="row center" style={{ gap: 10 }}>
          <span className="muted small">{d.services.for}</span>
          {d.services.sectors.map((s, i) => <span key={s} className="pill" style={i === 5 ? { borderColor: 'var(--ink)', fontWeight: 500 } : undefined}>{s}</span>)}
        </div>
      </section>

      {/* made to fit */}
      <section className="bg-ink" style={{ marginTop: 70 }}>
        <div className="wrap sec row center g56">
          <Reveal className="col g20" style={{ flex: '1 1 460px', minWidth: 0 }}>
            <span className="eyebrow">{d.fit.eyebrow}</span>
            <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(32px,3.8vw,52px)', lineHeight: 1.45 }}>{d.fit.t1}<br /><span style={{ color: 'var(--taupe)' }}>{d.fit.t2}</span></p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.9, color: 'var(--line)', maxWidth: 480 }}>{d.fit.body}</p>
          </Reveal>
          <ol style={{ flex: '1 1 420px', minWidth: 0, listStyle: 'none', margin: 0, padding: 0 }}>
            {d.fit.steps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 120} className="row" style={{ gap: 20, alignItems: 'baseline', padding: '20px 0', borderBottom: i < 4 ? '1px solid var(--wood)' : 0 }}>
                <span className="latin" style={{ color: i === 4 ? 'var(--taupe)' : 'var(--brown)', fontSize: 14 }}>0{i + 1}</span>
                <span style={{ fontSize: 20, color: i === 4 ? 'var(--taupe)' : undefined }}>{s}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="wrap sec col g40">
        <Reveal className="row between end">
          <div className="col g14">
            <span className="eyebrow">{d.projects.eyebrow}</span>
            <h2 className="h2">{d.projects.title}</h2>
          </div>
          <Link className="btn btn-line" href={`/${locale}/projects`}>{d.projects.all} ({projects.length})</Link>
        </Reveal>
        <Reveal className="row g40">
          <Link href={`/${locale}/projects/${hero.slug}`} className="zoom feat-img" style={{ flex: '2 1 520px', minWidth: 0, height: 540, display: 'block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.cover.src} alt={t(hero.cover.alt, locale)} />
            {hero.executed && <span className="badge-dark">{d.projects.executed}</span>}
          </Link>
          <div className="col g20" style={{ flex: '1 1 320px', minWidth: 0 }}>
            <span className="eyebrow" style={{ fontSize: 12 }}>{d.projects.featured}</span>
            <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 500, lineHeight: 1.45 }}>{t(hero.name, locale)}</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: 'var(--body)' }}>{t(hero.scope, locale)}</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
              {hero.gallery.slice(2, 5).map((g) => (
                <div key={g.src} className="zoom" style={{ height: 92 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={t(g.alt, locale)} loading="lazy" />
                </div>
              ))}
            </div>
            <Link href={`/${locale}/projects/${hero.slug}`} style={{ fontWeight: 500 }}>{d.projects.view} ({hero.gallery.length} {d.projects.photos})</Link>
          </div>
        </Reveal>
        <div className="grid grid-fill-300" style={{ gap: '36px 24px', marginTop: 24 }}>
          {grid.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <ProjectCard p={p} locale={locale} executedLabel={d.projects.executed} photosLabel={d.projects.photos} height={260} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* spaces */}
      <section id="spaces" className="bg-sand">
        <div className="wrap col g40 sp">
          <Reveal className="row between end">
            <div className="col g14" style={{ maxWidth: 640 }}>
              <span className="eyebrow">{d.spaces.eyebrow}</span>
              <h2 className="h2">{d.spaces.title}</h2>
            </div>
            <p className="lead" style={{ maxWidth: 420, fontSize: 16 }}>{d.spaces.body}</p>
          </Reveal>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
            {spaces.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 90} style={i === 0 ? { gridRow: 'span 2' } : undefined}>
                <Link href={`/${locale}/projects?space=${s.slug}`} className={`tile zoom${i === 0 ? ' tile-lg' : ''}`} style={{ height: i === 0 ? '100%' : 240, minHeight: i === 0 ? 496 : 240 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.cover} alt={t(s.name, locale)} loading="lazy" style={{ position: 'absolute', inset: 0 }} />
                  <span className="cap">{t(s.name, locale)}<span style={{ display: 'block', fontSize: 13, fontWeight: 400, color: 'var(--line)', marginTop: 4 }}>{s.images.length} {d.projects.photos}</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* before / after */}
      {firstBa && (
        <section aria-label={d.ba.eyebrow} style={{ borderTop: '1px solid var(--line)' }}>
          <div className="wrap col g28 sp">
            <Reveal className="row between end">
              <div className="col g14">
                <span className="eyebrow">{d.ba.eyebrow}</span>
                <h2 className="h2">{d.ba.title}</h2>
              </div>
              <Link className="btn btn-line" href={`/${locale}/projects?tab=ba`}>{d.ba.all}</Link>
            </Reveal>
            <Reveal><BeforeAfterSlider before={firstBa.before} after={firstBa.after} labels={[d.ba.before, d.ba.after]} aria={`${d.ba.before} / ${d.ba.after}`} /></Reveal>
            <span className="muted small">{t(firstBa.projectName, locale)} — {t(firstBa.label, locale)} · {d.ba.note}</span>
          </div>
        </section>
      )}

      <Testimonials items={testimonials} locale={locale} d={d.wa} />

      {/* journey */}
      <section id="journey" className="bg-sand">
        <div className="wrap col g40 sp">
          <Reveal className="col g14">
            <span className="eyebrow">{d.journey.eyebrow}</span>
            <h2 className="h2">{d.journey.title}</h2>
          </Reveal>
          <ol className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', listStyle: 'none', margin: 0, padding: 0 }}>
            {d.journey.steps.map(([h, b], i) => (
              <Reveal as="li" key={h} delay={i * 120} className="col g14" style={{ borderTop: `2px solid ${i === 3 ? 'var(--brown)' : 'var(--ink)'}`, paddingTop: 20 }}>
                <span className="latin muted" style={{ fontSize: 13, letterSpacing: 2 }}>STEP 0{i + 1}</span>
                <span style={{ fontSize: 20, fontWeight: 600 }}>{h}</span>
                <span style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--body)' }}>{b}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Estimator d={d.est} settings={settings} />

      {/* studio */}
      <section id="studio" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="wrap row center g56 sp">
          <Reveal className="zoom studio-img" style={{ flex: '1 1 340px', minWidth: 0, height: 460 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/0353.jpg" alt="MADE Design Studio" loading="lazy" />
          </Reveal>
          <Reveal className="col g20" style={{ flex: '1.3 1 460px', minWidth: 0 }}>
            <span className="eyebrow">{d.studio.eyebrow}</span>
            <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(26px,2.8vw,38px)', lineHeight: 1.6 }}>{d.studio.quote}</p>
            <div className="row" style={{ gap: 0, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
              {[d.studio.reem, d.studio.nader].map(([n, r]) => (
                <div key={n} className="col g8" style={{ flex: '1 1 200px', padding: '18px 0' }}>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{n}</span>
                  <span className="muted small">{r}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: 'var(--body)', maxWidth: 560 }}>{d.studio.bio}</p>
          </Reveal>
        </div>
      </section>

      {/* journal */}
      <section id="journal" className="bg-sand">
        <div className="wrap col g40 sp">
          <Reveal className="row between end">
            <div className="col g14">
              <span className="eyebrow">{d.blog.eyebrow}</span>
              <h2 className="h2">{d.blog.title}</h2>
            </div>
            <Link className="btn btn-line" href={`/${locale}/blog`}>{d.blog.all}</Link>
          </Reveal>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28 }}>
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link href={`/${locale}/blog/${p.slug}`} className="card">
                  <div className="zoom" style={{ height: 240 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image.src} alt={t(p.image.alt, locale)} loading="lazy" />
                  </div>
                  <span className="muted" style={{ fontSize: 13 }}>{t(p.category, locale)}</span>
                  <span style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.6 }}>{t(p.title, locale)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
