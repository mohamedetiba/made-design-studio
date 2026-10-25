'use client';

import { useEffect, useState } from 'react';
import { t, type BeforeAfter, type Locale, type Project, type Space } from '@/lib/types';
import type { Dict } from '@/lib/i18n';
import ProjectCard from './ProjectCard';
import BeforeAfterSlider from './BeforeAfterSlider';
import Link from 'next/link';

type Tab = 'projects' | 'spaces' | 'ba';
const SECTORS = ['all', 'residential', 'commercial', 'medical'] as const;

export default function ProjectsBrowser({ projects, spaces, ba, locale, d, dp, dba, initialTab = 'projects', initialSpace }: {
  projects: Project[]; spaces: Space[]; ba: BeforeAfter[]; locale: Locale; d: Dict['pj']; dp: Dict['projects']; dba: Dict['ba']; initialTab?: Tab; initialSpace?: string;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [sector, setSector] = useState<(typeof SECTORS)[number]>('all');
  const [space, setSpace] = useState(initialSpace && spaces.some((s) => s.slug === initialSpace) ? initialSpace : spaces[0]?.slug);
  const [lb, setLb] = useState<number | null>(null);

  const list = sector === 'all' ? projects : projects.filter((p) => p.sector === sector);
  const cur = spaces.find((s) => s.slug === space);
  const imgs = cur?.images || [];

  // read ?tab= / ?space= on the client too, so links work on the statically generated page
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get('space');
    if (s && spaces.some((x) => x.slug === s)) { setSpace(s); setTab('spaces'); }
    else if (q.get('tab') === 'ba' || q.get('tab') === 'spaces') setTab(q.get('tab') as Tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('tab', tab);
    if (tab === 'spaces' && space) u.searchParams.set('space', space); else u.searchParams.delete('space');
    window.history.replaceState(null, '', u);
  }, [tab, space]);

  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft') setLb((x) => (x === null ? x : (x + 1) % imgs.length));
      if (e.key === 'ArrowRight') setLb((x) => (x === null ? x : (x - 1 + imgs.length) % imgs.length));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [lb, imgs.length]);

  const tabs: Tab[] = ['projects', 'spaces', 'ba'];
  const photos = projects.reduce((n, p) => n + p.gallery.length, 0);

  return (
    <>
      <div className="wrap row stats" style={{ gap: 40, paddingBottom: 32 }}>
        {[[projects.length, d.stats[0]], [photos, d.stats[1]], [projects.filter((p) => p.executed).length, d.stats[2]]].map(([n, l]) => (
          <div key={String(l)} className="col g8"><span className="latin" style={{ fontSize: 40, fontWeight: 300 }}>{n}</span><span className="muted small">{l}</span></div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', position: 'sticky', top: 'var(--hdr)', zIndex: 20, background: 'rgba(244,240,234,.95)', backdropFilter: 'blur(8px)' }}>
        <div className="wrap row tabs" role="tablist" style={{ gap: 0 }}>
          {tabs.map((k, i) => (
            <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)}
              style={{ minHeight: 56, padding: '0 22px', border: 0, background: 'none', cursor: 'pointer', fontSize: 16, fontWeight: tab === k ? 600 : 400, color: 'var(--ink)', boxShadow: tab === k ? 'inset 0 -2px 0 var(--ink)' : 'none' }}>
              {d.tabs[i]}
            </button>
          ))}
        </div>
      </div>

      {tab === 'projects' && (
        <section className="wrap col g28" style={{ padding: '48px 24px 100px' }}>
          <div className="row between center">
            <div className="row chips" style={{ gap: 10 }}>
              {SECTORS.map((s, i) => <button key={s} type="button" className="chip" aria-pressed={sector === s} onClick={() => setSector(s)}>{d.filters[i]}</button>)}
            </div>
            <span className="muted small">{d.hint}</span>
          </div>
          <div className="grid grid-fill-300" style={{ gap: '40px 24px' }}>
            {list.map((p) => <ProjectCard key={p.slug} p={p} locale={locale} executedLabel={dp.executed} photosLabel={dp.photos} />)}
          </div>
        </section>
      )}

      {tab === 'spaces' && cur && (
        <section className="wrap col g28" style={{ padding: '48px 24px 100px' }}>
          <div className="row chips" style={{ gap: 10 }}>
            {spaces.map((s) => <button key={s.slug} type="button" className="chip" aria-pressed={space === s.slug} onClick={() => setSpace(s.slug)}>{t(s.name, locale)} <span className="latin" style={{ opacity: 0.6 }}>{s.images.length}</span></button>)}
          </div>
          <div className="col g8">
            <h2 className="h2" style={{ fontSize: 36 }}>{t(cur.name, locale)}</h2>
            <p className="lead" style={{ fontSize: 16 }}>{t(cur.intro, locale)} — {imgs.length} {d.from} {new Set(imgs.map((x) => x.project)).size} {d.projects}</p>
          </div>
          <div style={{ columns: '3 280px', columnGap: 16 }}>
            {imgs.map((g, i) => (
              <button key={g.src + i} type="button" onClick={() => setLb(i)} className="zoom" style={{ display: 'block', width: '100%', padding: 0, border: 0, marginBottom: 16, breakInside: 'avoid', cursor: 'zoom-in' }} aria-label={t(g.alt, locale)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={t(g.alt, locale)} loading="lazy" style={{ height: 'auto' }} />
              </button>
            ))}
          </div>
        </section>
      )}

      {tab === 'ba' && (
        <section className="wrap col g56" style={{ padding: '48px 24px 100px' }}>
          <p className="lead" style={{ fontSize: 16 }}>{d.drag}</p>
          {ba.map((b) => (
            <div key={b.before} className="col g14">
              <BeforeAfterSlider before={b.before} after={b.after} labels={[dba.before, dba.after]} aria={`${t(b.projectName, locale)} ${dba.before} / ${dba.after}`} />
              <div className="row between center">
                <span style={{ fontWeight: 600 }}>{t(b.projectName, locale)} — <span className="muted" style={{ fontWeight: 400 }}>{t(b.label, locale)}</span></span>
                <Link href={`/${locale}/projects/${b.project}`}>{d.open}</Link>
              </div>
            </div>
          ))}
        </section>
      )}

      {lb !== null && imgs[lb] && (
        <div className="dialog" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setLb(null); }}>
          <button type="button" className="icon-btn" onClick={() => setLb((lb - 1 + imgs.length) % imgs.length)} aria-label="prev">‹</button>
          <figure style={{ margin: 0, maxWidth: 'min(1100px,100%)', maxHeight: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgs[lb].src} alt={t(imgs[lb].alt, locale)} style={{ maxHeight: '78vh', objectFit: 'contain' }} />
            <figcaption style={{ color: 'var(--line)', fontSize: 14 }}>
              <Link href={`/${locale}/projects/${imgs[lb].project}`} style={{ color: 'var(--ivory)' }}>{t(imgs[lb].projectName, locale)}</Link> · {lb + 1}/{imgs.length}
            </figcaption>
          </figure>
          <button type="button" className="icon-btn" onClick={() => setLb((lb + 1) % imgs.length)} aria-label="next">›</button>
          <button type="button" className="icon-btn" onClick={() => setLb(null)} aria-label="close" style={{ position: 'absolute', top: 20, right: 20 }}>✕</button>
        </div>
      )}
    </>
  );
}
