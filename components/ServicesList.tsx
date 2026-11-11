'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const PEEKS = ['/media/misk-villa/misk-villa-01.jpg', '/media/hero/hero-wide.jpg', '/media/misk-villa/misk-villa-04.jpg', '/media/suda/suda-01.jpg'];

/** Big service rows; on desktop a project photo follows the cursor over each row. */
export default function ServicesList({ items, href }: { items: string[][]; href: string }) {
  const [on, setOn] = useState<number | null>(null);
  const peek = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (peek.current) peek.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <ul className="svc-list">
        {items.map(([title, body], i) => (
          <li key={title}>
            <Link href={href} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)} onFocus={() => setOn(i)} onBlur={() => setOn(null)}>
              <span className="latin num">0{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="thumb" aria-hidden="true"><img src={PEEKS[i % PEEKS.length]} alt="" loading="lazy" /></span>
              <span className="nm">{title}</span>
              <span className="ds">{body}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={peek} className={`svc-peek${on !== null ? ' on' : ''}`} aria-hidden="true">
        {PEEKS.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" loading="lazy" style={{ opacity: on === i ? 1 : 0 }} />
        ))}
      </div>
    </>
  );
}
