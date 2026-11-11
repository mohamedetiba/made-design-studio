import type { Metadata } from 'next';
import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import Reveal from '@/components/Reveal';
import ScaleIn from '@/components/ScaleIn';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return { title: d.about.title, description: d.about.body, alternates: { canonical: `/${locale}/about`, languages: { ar: '/ar/about', en: '/en/about' } } };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  return (
    <>
      <section id="studio">
        <div className="wrap row center g56 sp">
          <Reveal className="zoom studio-img" style={{ flex: '1 1 340px', minWidth: 0, height: 460 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/0353.jpg" alt="MADE Design Studio" />
          </Reveal>
          <Reveal className="col g20" style={{ flex: '1.3 1 460px', minWidth: 0 }}>
            <span className="eyebrow">{d.about.eyebrow}</span>
            <h1 className="h1">{d.about.title}</h1>
            <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(20px,2vw,26px)', lineHeight: 1.7 }}>{d.studio.quote}</p>
            <div className="row" style={{ gap: 0, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
              {[d.studio.reem, d.studio.nader].map(([n, r]) => (
                <div key={n} className="col g8" style={{ flex: '1 1 200px', padding: '18px 0' }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{n}</span>
                  <span className="muted small">{r}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: 'var(--body)', maxWidth: 560 }}>{d.about.body}</p>
          </Reveal>
        </div>
      </section>

      <section aria-label={locale === 'ar' ? 'الحِرفة' : 'Craft'} style={{ background: 'var(--ink)', paddingBlock: 80 }}>
        <ScaleIn>
          <div className="lens">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/misk-villa/misk-villa-04.jpg" alt={locale === 'ar' ? 'تفاصيل مطبخ فيلا مسك' : 'Kitchen details, Misk Villa'} loading="lazy" />
          </div>
          <div className="cap"><h2>{locale === 'ar' ? 'كل وصلة محسوبة. كل خامة مختارة.' : 'Every joint considered. Every material chosen.'}</h2></div>
        </ScaleIn>
      </section>

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
                <span style={{ fontSize: 18, fontWeight: 600 }}>{h}</span>
                <span style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--body)' }}>{b}</span>
              </Reveal>
            ))}
          </ol>
          <div><Link className="btn btn-dark" href={`/${locale}#estimate`}>{d.est.cta}</Link></div>
        </div>
      </section>
    </>
  );
}
