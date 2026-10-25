'use client';

import { useState } from 'react';

export default function BeforeAfterSlider({ before, after, labels, aria }: { before: string; after: string; labels: [string, string]; aria: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="ba" dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt={labels[0]} loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={labels[1]} loading="lazy" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
      <div className="line" style={{ left: `${pos}%` }} aria-hidden="true"><span className="knob">⟷</span></div>
      <span className="tag" style={{ left: 16, background: 'rgba(244,240,234,.92)' }}>{labels[0]}</span>
      <span className="tag" style={{ right: 16, background: 'var(--ink)', color: 'var(--ivory)' }}>{labels[1]}</span>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={aria} />
    </div>
  );
}
