'use client';

import { useEffect, useState } from 'react';

type Slide = { wide: string; tall: string; alt: string };

/** Cross-fading full-screen stills with a slow push-in; pauses for reduced motion. */
export default function HeroSlides({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % slides.length), 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);
  return (
    <>
      <div className="slides">
        {slides.map((s, k) => (
          <picture key={s.wide} className={`slide${k === i ? ' on' : ''}`}>
            <source media="(max-width: 720px)" srcSet={s.tall} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.wide} alt={s.alt} fetchPriority={k === 0 ? 'high' : 'low'} loading={k === 0 ? 'eager' : 'lazy'} />
          </picture>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="slide-bars" aria-hidden="true">
          {slides.map((s, k) => <span key={s.wide} className={k === i ? 'on' : ''}><i /></span>)}
        </div>
      )}
    </>
  );
}
