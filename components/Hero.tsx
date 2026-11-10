import { Fragment } from 'react';
import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/** Full-screen project image (client's choice) with the introduction laid over it; a curtain lifts on load. */
export default function Hero({ d, locale, image, mobile, alt }: { d: Dict['hero']; locale: Locale; image: string; mobile?: string; alt: string }) {
  const words = (line: string, offset: number) =>
    line.split(' ').map((w, i) => (
      <Fragment key={w + i}>
        <span className="w"><span style={{ animationDelay: `${1.25 + (offset + i) * 0.09}s` }}>{w}</span></span>{' '}
      </Fragment>
    ));
  const n1 = d.title1.split(' ').length;
  return (
    <section id="top" className="hero-full">
      <picture>
        {mobile && <source media="(max-width: 720px)" srcSet={mobile} />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src={image} alt={alt} fetchPriority="high" />
      </picture>
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="col g20" style={{ maxWidth: 680 }}>
          <span className="eyebrow ltr hero-fade" style={{ textAlign: locale === 'ar' ? 'right' : 'left', color: 'var(--taupe)', animationDelay: '1.2s' }}>{d.eyebrow}</span>
          <h1 className="hero-title">{words(d.title1, 0)}<br />{words(d.title2, n1)}</h1>
          <p className="hero-lead hero-fade" style={{ animationDelay: '1.7s' }}>{d.body}</p>
          <div className="row hero-fade" style={{ gap: 12, animationDelay: '1.85s' }}>
            <Link className="btn btn-light" href={`/${locale}#estimate`}>{d.cta1}</Link>
            <Link className="btn btn-ghost" href={`/${locale}/projects`}>{d.cta2}</Link>
          </div>
          <div className="row hero-cities hero-fade" style={{ animationDelay: '2s' }}>
            {d.cities.map((c, i) => (
              <span key={c}>{i > 0 && <span aria-hidden="true" style={{ marginInlineEnd: 14, opacity: 0.5 }}>·</span>}{c}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="curtain" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/made-logo-light.svg" alt="" />
      </div>
    </section>
  );
}
