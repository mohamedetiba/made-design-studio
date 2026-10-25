'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Fades + lifts its children in when they scroll into view. */
export default function Reveal({ children, className = '', style, as: Tag = 'div', delay = 0 }: { children: ReactNode; className?: string; style?: CSSProperties; as?: 'div' | 'section' | 'article' | 'li'; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}
