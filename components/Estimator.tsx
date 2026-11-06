'use client';

import { useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Settings } from '@/lib/types';

/** Project quote request — no prices; sends the client's details to WhatsApp. */
export default function Estimator({ d, settings }: { d: Dict['est']; settings: Settings }) {
  const [f, setF] = useState({ name: '', phone: '', city: d.cities[0], type: d.types[0], service: d.services[2], area: '', stage: '', time: '', notes: '' });
  const [err, setErr] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF((x) => ({ ...x, [k]: v }));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim()) { setErr(true); return; }
    const lines = [
      d.msg,
      `${d.name}: ${f.name}`,
      `${d.phone}: ${f.phone}`,
      `${d.city}: ${f.city}`,
      `${d.type}: ${f.type}`,
      `${d.service}: ${f.service}`,
      f.area && `${d.area}: ${f.area}`,
      f.stage && `${d.stage}: ${f.stage}`,
      f.time && `${d.time}: ${f.time}`,
      f.notes && `${d.notes}: ${f.notes}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  const chips = (legend: string, list: string[], value: string, on: (v: string) => void) => (
    <fieldset>
      <legend>{legend}</legend>
      <div className="row" style={{ gap: 10 }}>
        {list.map((o) => <button key={o} type="button" className="chip" aria-pressed={value === o} onClick={() => on(value === o && legend !== d.type && legend !== d.service ? '' : o)}>{o}</button>)}
      </div>
    </fieldset>
  );

  return (
    <section id="estimate" className="wrap sec row g56">
      <div className="col g20" style={{ flex: '1 1 340px', minWidth: 0 }}>
        <span className="eyebrow">{d.eyebrow}</span>
        <h2 className="h2">{d.title1}<br />{d.title2}</h2>
        <p className="lead">{d.body}</p>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>{d.note}</p>
      </div>
      <form className="est" style={{ flex: '1.4 1 520px', minWidth: 0 }} onSubmit={send} noValidate>
        <div className="est-2">
          <label className="field"><span>{d.name} *</span><input value={f.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" required /></label>
          <label className="field"><span>{d.phone} *</span><input value={f.phone} onChange={(e) => set('phone')(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required /></label>
          <label className="field"><span>{d.city}</span>
            <select value={f.city} onChange={(e) => set('city')(e.target.value)}>{d.cities.map((c) => <option key={c}>{c}</option>)}</select>
          </label>
          <label className="field"><span>{d.area}</span><input value={f.area} onChange={(e) => set('area')(e.target.value)} inputMode="numeric" dir="ltr" placeholder="300" /></label>
        </div>
        {chips(d.type, d.types, f.type, set('type'))}
        {chips(d.service, d.services, f.service, set('service'))}
        {chips(d.stage, d.stages, f.stage, set('stage'))}
        {chips(d.time, d.times, f.time, set('time'))}
        <label className="field"><span>{d.notes}</span><textarea rows={3} value={f.notes} onChange={(e) => set('notes')(e.target.value)} placeholder={d.notesPh} /></label>
        {err && (!f.name.trim() || !f.phone.trim()) && <p role="alert" style={{ margin: 0, color: '#A0402A', fontSize: 14 }}>{d.required}</p>}
        <button type="submit" className="btn btn-dark" style={{ justifyContent: 'center', fontWeight: 600 }}>{d.cta}</button>
      </form>
    </section>
  );
}
