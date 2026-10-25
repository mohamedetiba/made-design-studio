'use client';

import { useEffect, useState } from 'react';
import { t, type Img, type Locale } from '@/lib/types';

export default function Gallery({ images, locale }: { images: Img[]; locale: Locale }) {
  const [lb, setLb] = useState<number | null>(null);
  const n = images.length;
  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft') setLb((x) => (x === null ? x : (x + 1) % n));
      if (e.key === 'ArrowRight') setLb((x) => (x === null ? x : (x - 1 + n) % n));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [lb, n]);

  return (
    <>
      <div style={{ columns: '3 300px', columnGap: 16 }}>
        {images.map((g, i) => (
          <button key={g.src + i} type="button" className="zoom" onClick={() => setLb(i)} aria-label={t(g.alt, locale)}
            style={{ display: 'block', width: '100%', padding: 0, border: 0, marginBottom: 16, breakInside: 'avoid', cursor: 'zoom-in' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={t(g.alt, locale)} loading={i < 3 ? 'eager' : 'lazy'} style={{ height: 'auto' }} />
          </button>
        ))}
      </div>
      {lb !== null && (
        <div className="dialog" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setLb(null); }}>
          <button type="button" className="icon-btn" onClick={() => setLb((lb - 1 + n) % n)} aria-label="prev">‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[lb].src} alt={t(images[lb].alt, locale)} style={{ maxWidth: 'min(1100px,100%)', maxHeight: '86vh', objectFit: 'contain' }} />
          <button type="button" className="icon-btn" onClick={() => setLb((lb + 1) % n)} aria-label="next">›</button>
          <button type="button" className="icon-btn" onClick={() => setLb(null)} aria-label="close" style={{ position: 'absolute', top: 20, right: 20 }}>✕</button>
          <span className="latin" style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'var(--line)' }}>{lb + 1} / {n}</span>
        </div>
      )}
    </>
  );
}
