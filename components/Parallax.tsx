'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Moves its child slower than the page for a depth effect (off for reduced motion). */
export default function Parallax({ children, speed = 0.15, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.parentElement!.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      const lim = r.height * 0.05;
      const y = Math.max(-lim, Math.min(lim, -mid * speed));
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1.12)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={className} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>{children}</div>;
}
