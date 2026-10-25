import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export default function Hero({ d, locale }: { d: Dict['hero']; locale: Locale }) {
  return (
    <section id="top" className="wrap row center g40 hero">
      <div className="rise col g28" style={{ flex: '1 1 420px', minWidth: 0 }}>
        <span className="eyebrow ltr" style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>{d.eyebrow}</span>
        <h1 className="h1">{d.title1}<br />{d.title2}</h1>
        <p className="lead" style={{ fontSize: 19 }}>{d.body}</p>
        <div className="row" style={{ gap: 14 }}>
          <Link className="btn btn-dark" href={`/${locale}#estimate`}>{d.cta1}</Link>
          <Link className="btn btn-line" href={`/${locale}/projects`}>{d.cta2}</Link>
        </div>
        <div className="row muted small" style={{ gap: 22 }}>
          {d.cities.map((c, i) => (
            <span key={c}>{i > 0 && <span aria-hidden="true" style={{ marginInlineEnd: 22 }}>·</span>}{c}</span>
          ))}
        </div>
      </div>
      <div className="rise2" style={{ flex: '1 1 480px', minWidth: 0, position: 'relative' }}>
        <svg viewBox="0 0 560 520" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label={d.badge}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#D8CFC3" strokeWidth="0.6" /></pattern>
            <linearGradient id="wood" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6B5442" /><stop offset="1" stopColor="#3B2F25" /></linearGradient>
          </defs>
          <rect width="560" height="520" fill="url(#grid)" />
          <g className="mat">
            <rect x="60" y="80" width="440" height="360" fill="#E6DED2" />
            <g fill="url(#wood)">
              {[70, 98, 126, 412, 440, 468].map((x) => <rect key={x} x={x} y="90" width="22" height="340" />)}
            </g>
            <path d="M200 430V220a80 80 0 0 1 160 0v210z" fill="#C9BBA8" />
            <rect x="170" y="370" width="220" height="46" fill="#F4F0EA" stroke="#B9A994" />
            <circle cx="280" cy="150" r="16" fill="#E9C98F" opacity="0.9" />
          </g>
          <g fill="none" stroke="#80705F" strokeWidth="1.4">
            <rect className="bp" x="60" y="80" width="440" height="360" />
            <path className="bp bp2" d="M200 430V220a80 80 0 0 1 160 0v210" />
            <path className="bp bp2" d="M70 90v340M92 90v340M98 90v340M120 90v340M126 90v340M148 90v340M412 90v340M434 90v340M440 90v340M462 90v340M468 90v340M490 90v340" />
            <path className="bp bp3" d="M170 370h220v46H170zM170 416v14M390 416v14" />
            <path className="bp bp3" d="M280 80v54M264 150a16 16 0 0 0 32 0z" />
            <path className="bp bp4" d="M60 470h440M60 462v16M500 462v16M200 40h160M200 32v16M360 32v16" strokeWidth="1" />
            <path className="bp bp4" d="M520 80v360M512 80h16M512 440h16" strokeWidth="1" />
          </g>
          <g fontFamily="Jost, sans-serif" fontSize="12" fill="#80705F" letterSpacing="1">
            <text x="280" y="492" textAnchor="middle">4.40 m</text>
            <text x="280" y="26" textAnchor="middle">ARCH 1.60</text>
            <text x="540" y="264" textAnchor="middle" transform="rotate(90 540 264)">3.60 m</text>
          </g>
        </svg>
        <div style={{ position: 'absolute', bottom: 14, insetInlineStart: 14, background: 'var(--ivory)', border: '1px solid var(--line)', padding: '10px 14px', fontSize: 13, color: 'var(--body)' }} className="col">
          <span className="latin muted ltr" style={{ letterSpacing: 2, fontSize: 11 }}>MAJLIS ELEVATION · 01</span>
          <span>{d.badge}</span>
        </div>
      </div>
    </section>
  );
}
