'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/types';

type Item = { href: string; label: string };

/** Hamburger + full-screen menu, shown below 900px. */
export default function MobileMenu({ items, locale, langLabel, cta, wa }: { items: Item[]; locale: Locale; langLabel: string; cta: string; wa: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname() || `/${locale}`;
  const other = locale === 'ar' ? 'en' : 'ar';
  const langHref = path.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.documentElement.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button type="button" className="burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={locale === 'ar' ? 'القائمة' : 'Menu'} onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
      <div id="mobile-menu" className={`mmenu${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav className="col">
          {items.map((it, i) => (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }} tabIndex={open ? 0 : -1}>
              <span className="latin muted" style={{ fontSize: 13, marginInlineEnd: 14 }}>0{i + 1}</span>{it.label}
            </Link>
          ))}
        </nav>
        <div className="col g14" style={{ marginTop: 'auto' }}>
          <a className="btn btn-dark" href={`https://wa.me/${wa}`} target="_blank" rel="noopener" style={{ justifyContent: 'center' }} tabIndex={open ? 0 : -1}>{cta}</a>
          <Link href={langHref} hrefLang={other} className="btn btn-line latin" style={{ justifyContent: 'center' }} tabIndex={open ? 0 : -1}>{langLabel}</Link>
        </div>
      </div>
    </>
  );
}
