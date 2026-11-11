'use client';

import { useEffect, useRef } from 'react';

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el?.classList.add('lit-all'); return; }
    const words = Array.from(el.querySelectorAll<HTMLElement>('.sw'));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * words.length);
      words.forEach((w, k) => w.classList.toggle('on', k < n));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <p ref={ref} className={`scroll-words ${className ?? ''}`}>
      {text.split(' ').map((w, k) => <span key={k} className="sw">{w} </span>)}
    </p>
  );
}
