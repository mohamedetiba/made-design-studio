import Link from 'next/link';
import { t, type Locale, type Project } from '@/lib/types';

export default function ProjectCard({ p, locale, executedLabel, photosLabel, height = 280 }: { p: Project; locale: Locale; executedLabel: string; photosLabel: string; height?: number }) {
  return (
    <Link href={`/${locale}/projects/${p.slug}`} className="card">
      <div className="zoom" style={{ height }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover.src} alt={t(p.cover.alt, locale)} loading="lazy" />
        <span className="badge">{t(p.kind, locale)}</span>
        {p.executed && <span className="badge-dark">{executedLabel}</span>}
        <span className="latin" style={{ position: 'absolute', bottom: 14, insetInlineEnd: 14, background: 'rgba(28,26,23,.75)', color: 'var(--ivory)', padding: '4px 10px', fontSize: 12 }}>{p.gallery.length} {photosLabel}</span>
      </div>
      <span className="card-title">{t(p.name, locale)}</span>
      <span className="small" style={{ color: 'var(--body)', lineHeight: 1.8 }}>{t(p.scope, locale)}</span>
    </Link>
  );
}
