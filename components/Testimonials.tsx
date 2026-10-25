'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { t, type Locale, type Testimonial } from '@/lib/types';
import type { Dict } from '@/lib/i18n';

export default function Testimonials({ items, locale, d }: { items: Testimonial[]; locale: Locale; d: Dict['wa'] }) {
  const featured = items.filter((x) => x.featured && x.quote);
  const n = featured.length;
  const [a, setA] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const hold = useRef(0);

  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => { if (Date.now() > hold.current) setA((x) => (x + 1) % n); }, 6000);
    return () => clearInterval(id);
  }, [n]);

  const go = (i: number) => { hold.current = Date.now() + 15000; setA(i); };

  const pose = (k: number) => {
    if (k === 0) return { transform: 'translate(-50%,-50%) scale(1)', zIndex: 5, opacity: 1 };
    if (k === 1) return { transform: 'translate(-50%,-50%) translateX(-150px) rotate(-8deg) scale(.84)', zIndex: 4, opacity: 0.92 };
    if (k === n - 1) return { transform: 'translate(-50%,-50%) translateX(150px) rotate(8deg) scale(.84)', zIndex: 4, opacity: 0.92 };
    if (k === 2) return { transform: 'translate(-50%,-50%) translateX(-80px) translateY(-30px) rotate(-4deg) scale(.72)', zIndex: 2, opacity: 0.5, filter: 'blur(1.5px)' };
    if (k === n - 2) return { transform: 'translate(-50%,-50%) translateX(80px) translateY(-30px) rotate(4deg) scale(.72)', zIndex: 2, opacity: 0.5, filter: 'blur(1.5px)' };
    return { transform: 'translate(-50%,-50%) translateY(-40px) scale(.6)', zIndex: 1, opacity: 0, pointerEvents: 'none' as const };
  };

  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  const step = useCallback((dlt: number) => setLb((x) => (x === null ? x : (x + dlt + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLb(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb]);

  return (
    <section id="testimonials" className="bg-sand" style={{ overflow: 'hidden' }} aria-label={d.eyebrow}>
      <div className="wrap row center g56" style={{ padding: '100px 24px' }}>
        <div className="f1 col g28" style={{ flexBasis: 440 }}>
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="h2" style={{ lineHeight: 1.4 }}>{d.title1}<br />{d.title2}</h2>
          <div aria-live="polite" style={{ position: 'relative', minHeight: 230, borderTop: '1px solid var(--taupe)', paddingTop: 30 }}>
            {featured.map((q, i) => (
              <figure key={i} style={i === a ? { margin: 0, position: 'relative', opacity: 1, transition: 'opacity .7s' } : { margin: 0, position: 'absolute', top: 30, insetInline: 0, opacity: 0, transform: 'translateY(14px)', pointerEvents: 'none', transition: 'opacity .5s, transform .5s' }}>
                <blockquote style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(22px,2.3vw,30px)', lineHeight: 1.75 }}>{t(q.quote, locale)}</blockquote>
                <figcaption className="muted small" style={{ marginTop: 18 }}>{t(q.who, locale)}</figcaption>
              </figure>
            ))}
          </div>
          <div className="row center" style={{ gap: 4 }} role="group">
            {featured.map((_, i) => (
              <button key={i} type="button" onClick={() => go(i)} aria-label={`${i + 1}`} aria-pressed={i === a}
                style={{ width: 44, height: 44, border: 0, cursor: 'pointer', background: `linear-gradient(${i === a ? '#1C1A17,#1C1A17' : '#B9A994,#B9A994'}) center/${i === a ? '30px' : '10px'} 8px no-repeat`, transition: 'background-size .4s' }} />
            ))}
            <span className="latin muted small ltr" style={{ marginInlineStart: 'auto' }}>{a + 1} / {n}</span>
          </div>
          <p className="muted small" style={{ margin: 0, lineHeight: 1.8 }}>{d.note}</p>
        </div>
        <div className="f1 phones" style={{ flexBasis: 460 }}>
          {featured.map((q, i) => (
            <button key={i} type="button" className="phone" onClick={() => go(i)} aria-label={t(q.who, locale)} style={pose((i - a + n) % n)}>
              <span className="phone-bar"><span>{t(q.who, locale)}</span><span aria-hidden="true">◦</span></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.screenshot} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </button>
          ))}
        </div>
      </div>

      <div className="col g20" style={{ paddingBottom: 100 }}>
        <div className="wrap row between" style={{ width: '100%' }}>
          <strong style={{ fontSize: 18 }}>{items.length} {d.count}</strong>
          <span className="muted small">{d.hint}</span>
        </div>
        {rows.map((row, r) => (
          <div key={r} className="wall" dir="ltr">
            <div className={`track${r ? ' rev' : ''}`}>
              {[...row, ...row].map((x, i) => {
                const idx = (r ? half : 0) + (i % row.length);
                return (
                  <button key={i} type="button" className="wacard" onClick={() => setLb(idx)} aria-label={`${d.count} ${idx + 1}`} tabIndex={i >= row.length ? -1 : 0}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={x.screenshot} alt="" loading="lazy" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {lb !== null && (
        <div className="dialog" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setLb(null); }}>
          <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="prev">›</button>
          <div style={{ maxHeight: '100%', width: 'min(380px,100%)', overflowY: 'auto', borderRadius: 26, boxShadow: '0 0 0 8px #1C1A17', background: '#fff' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[lb].screenshot} alt="" style={{ width: '100%', display: 'block' }} />
          </div>
          <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="next">‹</button>
          <button type="button" className="icon-btn" onClick={() => setLb(null)} aria-label="close" style={{ position: 'absolute', top: 20, right: 20 }}>✕</button>
        </div>
      )}
    </section>
  );
}
