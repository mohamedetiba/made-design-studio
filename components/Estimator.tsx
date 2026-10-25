'use client';

import { useMemo, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Settings } from '@/lib/types';

export default function Estimator({ d, settings }: { d: Dict['est']; settings: Settings }) {
  const [type, setType] = useState('villa');
  const [service, setService] = useState('turnkey');
  const [tier, setTier] = useState('signature');
  const [area, setArea] = useState(300);
  const rates: Record<string, number> = { design: settings.rates.design, fitout: settings.rates.fitout, turnkey: settings.rates.turnkey };

  const r = useMemo(() => {
    const tf = Number(d.types.find((x) => x[0] === type)?.[2] ?? 1);
    const tm = Number(d.tiers.find((x) => x[0] === tier)?.[2] ?? 1);
    const perM = Math.round((rates[service] * tf * tm) / 10) * 10;
    const total = perM * area;
    const fmt = (v: number) => (Math.round(v / 1000) * 1000).toLocaleString('en-US');
    const low = fmt(total * 0.88), high = fmt(total * 1.12);
    const name = (list: (string | number)[][], id: string) => String(list.find((x) => x[0] === id)?.[1] ?? '');
    const m = d.msg;
    const text = `${m[0]}\n${m[1]}: ${name(d.types, type)}\n${m[2]}: ${name(d.services, service)}\n${m[3]}: ${name(d.tiers, tier)}\n${m[4]}: ${area} ${m[7]}\n${m[5]}: ${low} – ${high} ${m[6]}`;
    return { perM, low, high, wa: `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}` };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, service, tier, area, d, settings.whatsapp]);

  const group = (legend: string, list: (string | number)[][], value: string, set: (v: string) => void) => (
    <fieldset>
      <legend>{legend}</legend>
      <div className="row" style={{ gap: 10 }}>
        {list.map((o) => (
          <button key={String(o[0])} type="button" className="chip" aria-pressed={value === o[0]} onClick={() => set(String(o[0]))}>{o[1]}</button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <section id="estimate" className="wrap sec row g56">
      <div className="col g20" style={{ flex: '1 1 360px', minWidth: 0 }}>
        <span className="eyebrow">{d.eyebrow}</span>
        <h2 className="h2">{d.title1}<br />{d.title2}</h2>
        <p className="lead">{d.body}</p>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>{d.note}</p>
      </div>
      <div className="est" style={{ flex: '1.4 1 520px', minWidth: 0 }}>
        {group(d.type, d.types, type, setType)}
        {group(d.service, d.services, service, setService)}
        {group(d.tier, d.tiers, tier, setTier)}
        <div className="col g14">
          <div className="row between">
            <label htmlFor="area" style={{ fontWeight: 600 }}>{d.area}</label>
            <span className="latin ltr" style={{ fontSize: 22 }}>{area} m²</span>
          </div>
          <input id="area" type="range" min={30} max={2000} step={10} value={area} onChange={(e) => setArea(Number(e.target.value))} />
        </div>
        <div className="est-result">
          <div className="col g8">
            <span style={{ fontSize: 14, color: 'var(--taupe)' }}>{d.result}</span>
            <span className="latin ltr est-price" style={{ fontWeight: 300 }}>{r.low} – {r.high} SAR</span>
            <span style={{ fontSize: 13, color: 'var(--taupe)' }}>≈ {r.perM.toLocaleString('en-US')} {d.perM}</span>
          </div>
          <a className="btn btn-light" href={r.wa} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>{d.cta}</a>
        </div>
      </div>
    </section>
  );
}
