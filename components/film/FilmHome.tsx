'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Estimator from '@/components/Estimator';
import type { Dict } from '@/lib/i18n';
import type { Locale, Settings } from '@/lib/types';

const M = '/media';
const COPY = {
  ar: {
    credit: 'Design Studio · Khobar',
    h1: 'الفن في التفاصيل.',
    lead: 'نصمّم المساحة، ونصنع أثاثها في ورشتنا، ونسلّمها كما رُسمت. تصميم داخلي وتنفيذ تسليم مفتاح.',
    cue: 'انزل لمشاهدة الأعمال',
    studio: 'The studio',
    stmt: 'استوديو تصميم داخلي في الخبر. نبدأ بخط على الورق، ونختار كل خامة بأيدينا، ونصنع الأثاث على مقاس المساحة، ونسلّمك مكانًا يُعاش، لا مجرد رسومات.',
    people: [['م. ريم رسلان', 'المصممة الرئيسية'], ['م. نادر', 'المدير العام'], ['نعمل في', 'الخبر · الظهران · الدمام · الأحساء · الرياض · جدة']],
    work: 'أعمال مختارة', all: 'كل المشاريع',
    frames: [
      ['sada-project', `${M}/suda/suda-01.jpg`, 'مشروع سدى', 'سكني · تأثيث وتنسيق', 'صالة مشروع سدى', false],
      ['misk-villa', `${M}/misk-villa/misk-villa-02.jpg`, 'فيلا مسك', 'سكني · تسليم مفتاح · الخبر', 'صالة فيلا مسك', false],
      ['warm-rattan-home', `${M}/ba/ba-02.jpg`, 'شقة الراتان', 'سكني · أثاث مفصّل', 'صالة شقة الراتان', true],
      ['chandelier-villa', '/images/0038.jpg', 'فيلا الثريا', 'سكني · تصميم وتنفيذ', 'مجلس فيلا الثريا', false],
      ['classic-view-villa', '/images/0028.jpg', 'فيلا الإطلالة', 'سكني · تجديد كامل', 'مجلس فيلا الإطلالة الكلاسيكية', true],
      ['almoosa-north-tower', `${M}/hero/s1-wide.jpg`, 'مستشفى الموسى', 'طبي · تصميم داخلي · الأحساء', 'صالة انتظار بجدار نباتي', false],
    ] as [string, string, string, string, string, boolean][],
    macroSide: ['مطبخ فيلا مسك', 'رخام، خشب مطلي، إضاءة مخفية'],
    macro: 'كل وصلة محسوبة. كل خامة مختارة.',
    cmpCredit: 'Drawn → Built', cmpTitle: 'ما نرسمه، هو ما تستلمه.',
    cmpBody: 'اسحب الخط: التصميم ثلاثي الأبعاد على اليمين، والمساحة بعد التنفيذ على اليسار.',
    cmpDesign: 'التصميم 3D', cmpReal: 'بعد التنفيذ', cmpLabel: 'مقارنة التصميم بالتنفيذ', cmpMore: 'كل مقارنات التصميم والتنفيذ',
    svcTitle: 'ما نصنعه',
    services: [
      ['التصميم الداخلي', 'المخطط، لوحات الخامات، والتصميم ثلاثي الأبعاد لكل غرفة.', `${M}/misk-villa/misk-villa-01.jpg`],
      ['التشطيب والتنفيذ', 'فريق موقع وإشراف هندسي حتى آخر تفصيلة.', `${M}/hero/s1-wide.jpg`],
      ['الأثاث والخشبيات', 'مطابخ وخزائن ومجالس تُصنع في ورشتنا على المقاس.', `${M}/film/detail.jpg`],
      ['تسليم مفتاح', 'نستلم من العظم، وتستلم مساحة جاهزة للحياة.', `${M}/suda/suda-01.jpg`],
    ],
    sectorsFor: 'نصمّم', sectors: ['فلل ومنازل', 'شقق فاخرة', 'مكاتب', 'مطاعم ومقاهٍ', 'معارض ومتاجر', 'منشآت طبية'],
    band: 'مكاتب تُصمَّم حول طريقة عمل أصحابها.', bandCredit: 'Sahsah Co. — workplace', bandAlt: 'فيديو من مشروع شركة صحصح',
    marq: 'لنصنع مساحتك',
    close: 'أرسل تفاصيل مشروعك، ويتواصل معك مهندس مختص لتجهيز عرض سعر يناسبه.',
    quote: 'اطلب عرض سعر', talk: 'تحدث مع مهندس مختص',
    sudaAlt: 'صالة معيشة في مشروع سدى',
  },
  en: {
    credit: 'Design Studio · Khobar',
    h1: 'Art in the details.',
    lead: 'We design the space, craft its furniture in our workshop and hand it over exactly as drawn. Interior design and turnkey fit-out.',
    cue: 'Scroll to see the work',
    studio: 'The studio',
    stmt: 'An interior design studio in Khobar. We start with a line on paper, choose every material by hand, make the furniture to fit the room, and hand you a place to live in — not just drawings.',
    people: [['Eng. Reem Reslan', 'Lead Designer'], ['Eng. Nader', 'General Manager'], ['We work in', 'Khobar · Dhahran · Dammam · Al-Ahsa · Riyadh · Jeddah']],
    work: 'Selected work', all: 'All projects',
    frames: [
      ['sada-project', `${M}/suda/suda-01.jpg`, 'Suda Project', 'Residential · Furnishing & styling', 'Living room in the Suda project', false],
      ['misk-villa', `${M}/misk-villa/misk-villa-02.jpg`, 'Misk Villa', 'Residential · Turnkey · Khobar', 'Living room in Misk Villa', false],
      ['warm-rattan-home', `${M}/ba/ba-02.jpg`, 'The Rattan Home', 'Residential · Custom furniture', 'Living room of the Rattan Home', true],
      ['chandelier-villa', '/images/0038.jpg', 'The Chandelier Villa', 'Residential · Design & build', 'Majlis of the Chandelier Villa', false],
      ['classic-view-villa', '/images/0028.jpg', 'The Classic View Villa', 'Residential · Full renovation', 'Majlis of the Classic View Villa', true],
      ['almoosa-north-tower', `${M}/hero/s1-wide.jpg`, 'Al Moosa Hospital', 'Healthcare · Interior design · Al-Ahsa', 'Waiting lounge with a moss wall', false],
    ] as [string, string, string, string, string, boolean][],
    macroSide: ['Misk Villa kitchen', 'Marble, lacquered wood, hidden light'],
    macro: 'Every joint measured. Every material chosen.',
    cmpCredit: 'Drawn → Built', cmpTitle: 'What we draw is what you get.',
    cmpBody: 'Drag the line: the 3D design on one side, the finished space on the other.',
    cmpDesign: '3D design', cmpReal: 'Built', cmpLabel: 'Compare design and reality', cmpMore: 'All design vs. reality comparisons',
    svcTitle: 'What we make',
    services: [
      ['Interior Design', 'Plans, material boards and 3D design for every room.', `${M}/misk-villa/misk-villa-01.jpg`],
      ['Fit-Out & Execution', 'A site team and engineering supervision to the last detail.', `${M}/hero/s1-wide.jpg`],
      ['Furniture & Joinery', 'Kitchens, wardrobes and majlis seating made to measure in our workshop.', `${M}/film/detail.jpg`],
      ['Turnkey', 'We take the shell; you receive a space ready for life.', `${M}/suda/suda-01.jpg`],
    ],
    sectorsFor: 'We design', sectors: ['Villas & homes', 'Luxury apartments', 'Offices', 'Restaurants & cafés', 'Retail & showrooms', 'Healthcare'],
    band: 'Offices designed around the way their owners work.', bandCredit: 'Sahsah Co. — workplace', bandAlt: 'Video from the Sahsah Co. office',
    marq: 'Let’s make your space',
    close: 'Send your project details and a specialist engineer will reach you to prepare a tailored quote.',
    quote: 'Request a quote', talk: 'Talk to an engineer',
    sudaAlt: 'Living room in the Suda project',
  },
};

export default function FilmHome({ locale, settings, est }: { locale: Locale; settings: Settings; est: Dict['est'] }) {
  const c = COPY[locale];
  const ar = locale === 'ar';
  const root = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [peek, setPeek] = useState<number | null>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const L = `/${locale}`;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const top = () => html.classList.toggle('film-top', window.scrollY < 40);
    html.classList.add('film-page');
    top();
    window.addEventListener('scroll', top, { passive: true });
    const move = (e: MouseEvent) => {
      if (peekRef.current) { peekRef.current.style.left = e.clientX + 'px'; peekRef.current.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', move);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;
    const curtain = el.querySelector<HTMLElement>('.f-curtain');
    if (reduce) {
      curtain?.remove();
    } else {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.to('.f-curtain img', { opacity: 0, scale: 0.9, duration: 0.6, delay: 0.4, ease: 'power2.in' })
          .to('.f-curtain', { yPercent: -100, duration: 1.3, ease: 'expo.inOut' }, '-=.1')
          .from('.f-trip .p', { scale: 1.25, duration: 2.2, stagger: 0.12 }, '-=1')
          .from('.f-h1 .w > span', { yPercent: 110, duration: 1.4, stagger: 0.1 }, '-=1.9')
          .from('.f-opener .credit, .f-opener .row', { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, '-=1.1')
          .add(() => { curtain?.remove(); });

        gsap.to('.f-trip', { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.f-opener', start: 'top top', end: 'bottom top', scrub: true } });

        gsap.fromTo('.f-stmt .sw', { color: '#B9C3C7' }, { color: '#0A1011', stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.f-stmt', start: 'top 80%', end: 'bottom 45%', scrub: true } });

        ScrollTrigger.create({ trigger: '.f-cmp', start: 'top 70%', once: true, onEnter: () => {
          const o = { v: 85 };
          gsap.to(o, { v: 50, duration: 1.8, ease: 'expo.out', onUpdate: () => setPos(o.v) });
        } });

        gsap.utils.toArray<HTMLElement>('.f-reel-head h2, .f-compare h2, .f-services h2, .f-band h2, .f-macro .cap h2').forEach((h) => {
          gsap.from(h, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
        });
        gsap.utils.toArray<HTMLElement>('.f-svc li').forEach((li, i) => {
          gsap.from(li, { y: 40, opacity: 0, duration: 1, delay: i * 0.06, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 92%' } });
        });
        gsap.from('.f-band video', { scale: 1.2, ease: 'none', scrollTrigger: { trigger: '.f-band', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.utils.toArray<HTMLElement>('.f-reel .frame').forEach((f) => {
          gsap.from(f, { y: 50, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 92%' } });
        });
      }, el);

      mm = gsap.matchMedia();
      mm.add('(min-width: 821px)', () => {
        const track = el.querySelector<HTMLElement>('.f-track')!;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        // Arabic: first project sits on the right and the reel travels right-to-left
        const from = () => (ar ? -dist() : 0);
        const to = () => (ar ? 0 : -dist());
        const st = { trigger: '.f-reel', start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true };
        gsap.fromTo(track, { x: from }, { x: to, ease: 'none', scrollTrigger: { ...st, pin: true, scrub: 1 } });
        gsap.utils.toArray<HTMLElement>('.f-track .img img').forEach((img) => {
          gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { ...st, scrub: true } });
        });
        gsap.to('.f-lens', { width: '100%', height: '100%', ease: 'none', scrollTrigger: { trigger: '.f-stage', start: 'top 70%', end: 'center center', scrub: true } });
        gsap.from('.f-lens img', { scale: 1.5, ease: 'none', scrollTrigger: { trigger: '.f-stage', start: 'top 80%', end: 'center center', scrub: true } });
      }, el);
      // fonts and images change heights; re-measure once things settle
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      const t = setTimeout(refresh, 1200);
      return () => {
        clearTimeout(t);
        window.removeEventListener('load', refresh);
        window.removeEventListener('scroll', top);
        window.removeEventListener('mousemove', move);
        html.classList.remove('film-page', 'film-top');
        mm?.revert();
        ctx?.revert();
      };
    }
    return () => {
      window.removeEventListener('scroll', top);
      window.removeEventListener('mousemove', move);
      html.classList.remove('film-page', 'film-top');
    };
  }, [ar]);

  const words = c.h1.split(' ');
  // DOM order: in Arabic the strip is laid out LTR and reversed so project 01 is at the right edge
  const frames = c.frames.map((f, i) => ({ f, n: i + 1 }));
  const ordered = ar ? [...frames].reverse() : frames;

  return (
    <div ref={root} className="film">
      {/* OPENER */}
      <section className="f-opener" aria-label="MADE Design Studio">
        <div className="f-trip">
          <div className="p"><video src={`${M}/film/misk-1.mp4`} poster={`${M}/film/misk-1.jpg`} autoPlay muted loop playsInline preload="auto" /></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="p"><img src={`${M}/suda/suda-01.jpg`} alt={c.sudaAlt} /></div>
          <div className="p"><video src={`${M}/film/misk-2.mp4`} poster={`${M}/film/misk-2.jpg`} autoPlay muted loop playsInline preload="auto" /></div>
        </div>
        <div className="title wrap">
          <span className="credit">{c.credit}</span>
          <h1 className="f-h1">
            {words.map((w, i) => <Fragment key={i}><span className="w"><span>{w}</span></span>{i < words.length - 1 ? ' ' : ''}</Fragment>)}
          </h1>
          <div className="row">
            <p>{c.lead}</p>
            <div className="cue"><i /><span>{c.cue}</span></div>
          </div>
        </div>
        <div className="f-curtain" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/made-logo-light.svg" alt="" />
        </div>
      </section>

      {/* STATEMENT */}
      <section className="f-statement" id="studio">
        <div className="wrap grid">
          <span className="credit big">{c.studio}</span>
          <div>
            <p className="f-stmt">{c.stmt.split(' ').map((w, i) => <Fragment key={i}><span className="sw">{w}</span> </Fragment>)}</p>
            <div className="people">
              {c.people.map(([b, s]) => <span key={b}><b>{b}</b>{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* REEL */}
      <section className="f-reel" id="projects">
        <div className="wrap f-reel-head">
          <h2>{c.work}</h2>
          <Link href={`${L}/projects`} className="kicker">{c.all} · 0{c.frames.length} →</Link>
        </div>
        <div className="f-track">
          {ordered.map(({ f: [slug, src, name, tag, alt, tall], n }) => (
            <Link key={slug} className={`frame${tall ? ' tall' : ''}`} href={`${L}/projects/${slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="img"><img src={src} alt={alt} /></div>
              <div className="meta"><h3>{name}</h3><span className="num">0{n}</span></div>
              <span className="tag">{tag}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* MACRO */}
      <section className="f-macro" aria-label={c.macro}>
        <div className="f-stage">
          <span className="side r">{c.macroSide[0]}<br />{c.macroSide[1]}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="f-lens"><img src={`${M}/misk-villa/misk-villa-04.jpg`} alt={c.macroSide[0]} loading="lazy" /></div>
          <span className="side l credit">Detail 01</span>
          <div className="cap"><h2>{c.macro}</h2></div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="f-compare">
        <div className="wrap">
          <div className="head">
            <span className="credit big">{c.cmpCredit}</span>
            <div>
              <h2>{c.cmpTitle}</h2>
              <p>{c.cmpBody}</p>
            </div>
          </div>
          <div className="f-cmp" style={{ '--pos': `${pos}%` } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${M}/ba/ba-02.jpg`} alt={c.cmpReal} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="top"><img src={`${M}/ba/ba-01.jpg`} alt={c.cmpDesign} loading="lazy" /></div>
            <div className="handle" />
            <div className="knob" aria-hidden="true">drag</div>
            <span className="lab r">{ar ? c.cmpDesign : c.cmpReal}</span>
            <span className="lab l">{ar ? c.cmpReal : c.cmpDesign}</span>
            <input type="range" min={0} max={100} step={0.5} value={pos} aria-label={c.cmpLabel} onChange={(e) => setPos(Number(e.target.value))} />
          </div>
          <Link href={`${L}/projects?tab=ba`} className="f-more">{c.cmpMore} →</Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="f-services" id="services">
        <div className="wrap">
          <div className="head"><h2>{c.svcTitle}</h2><span className="kicker">SERVICES</span></div>
          <ul className="f-svc">
            {c.services.map(([nm, ds, img], i) => (
              <li key={nm}>
                <Link href={`${L}#estimate`} onMouseEnter={() => setPeek(i)} onMouseLeave={() => setPeek(null)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <span className="th" aria-hidden="true"><img src={img} alt="" loading="lazy" /></span>
                  <span className="nm">{nm}</span>
                  <span className="ds">{ds}</span>
                  <span className="ar">{ar ? '←' : '→'}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="sectors"><span>{c.sectorsFor}</span>{c.sectors.map((s) => <span key={s} className="pill">{s}</span>)}</div>
        </div>
      </section>
      <div ref={peekRef} className={`f-peek${peek !== null ? ' on' : ''}`} aria-hidden="true">
        {c.services.map(([, , img], i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={img} src={img} alt="" loading="lazy" style={{ opacity: peek === i ? 1 : 0 }} />
        ))}
      </div>

      {/* FILM BAND */}
      <section className="f-band" aria-label={c.bandAlt}>
        <video src={`${M}/film/sahsah.mp4`} poster={`${M}/film/sahsah.jpg`} autoPlay muted loop playsInline preload="metadata" />
        <div className="cap wrap">
          <h2>{c.band}</h2>
          <Link href={`${L}/projects/youthful-workspace`} className="credit big">{c.bandCredit}</Link>
        </div>
      </section>

      {/* CLOSE + QUOTE */}
      <section className="f-close est-band" id="contact">
        <div className="f-marq" aria-hidden="true">
          <span className="solid">{c.marq}</span><span>{c.marq}</span><span className="solid">{c.marq}</span><span>{c.marq}</span>
        </div>
        <div className="wrap act">
          <p>{c.close}</p>
          <div className="btns">
            <a className="fbtn solid" href="#estimate">{c.quote}</a>
            <a className="fbtn" href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">{c.talk}</a>
          </div>
        </div>
        <Estimator d={est} settings={settings} />
      </section>
    </div>
  );
}
