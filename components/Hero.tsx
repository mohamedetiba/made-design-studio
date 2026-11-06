import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/** Full-screen project image with the introduction laid over it. */
export default function Hero({ d, locale, image, alt }: { d: Dict['hero']; locale: Locale; image: string; alt: string }) {
  return (
    <section id="top" className="hero-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-bg" src={image} alt={alt} fetchPriority="high" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="rise col g20" style={{ maxWidth: 620 }}>
          <span className="eyebrow ltr" style={{ textAlign: locale === 'ar' ? 'right' : 'left', color: 'var(--taupe)' }}>{d.eyebrow}</span>
          <h1 className="hero-title">{d.title1}<br />{d.title2}</h1>
          <p className="hero-lead">{d.body}</p>
          <div className="row" style={{ gap: 12 }}>
            <Link className="btn btn-light" href={`/${locale}#estimate`}>{d.cta1}</Link>
            <Link className="btn btn-ghost" href={`/${locale}/projects`}>{d.cta2}</Link>
          </div>
          <div className="row hero-cities">
            {d.cities.map((c, i) => (
              <span key={c}>{i > 0 && <span aria-hidden="true" style={{ marginInlineEnd: 14, opacity: 0.5 }}>·</span>}{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
