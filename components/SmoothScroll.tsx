'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/** Inertial smooth scrolling (skipped for reduced-motion users and in the Studio). */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.scrollBehavior = 'auto';
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 } });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}
