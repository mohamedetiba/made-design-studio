import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import type { Locale, Settings } from '@/lib/types';
import LangSwitch from './LangSwitch';
import MobileMenu from './MobileMenu';

export default function Header({ locale, settings }: { locale: Locale; settings: Settings }) {
  const d = getDict(locale).nav;
  const l = `/${locale}`;
  const items = [
    { href: `${l}#services`, label: d.services },
    { href: `${l}/projects`, label: d.projects },
    { href: `${l}#journey`, label: d.journey },
    { href: `${l}#studio`, label: d.studio },
    { href: `${l}/blog`, label: d.blog },
  ];
  return (
    <>
      <header className="header">
        <nav className="wrap nav" aria-label={locale === 'ar' ? 'القائمة الرئيسية' : 'Main navigation'}>
          <Link href={l} aria-label="MADE Design Studio" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/made-logo-dark.svg" alt="MADE Design Studio" width={124} height={55} />
          </Link>
          <div className="nav-links">
            {items.map((it) => <Link key={it.href} href={it.href}>{it.label}</Link>)}
            <LangSwitch locale={locale} label={d.other} />
            <a className="btn btn-dark" style={{ minHeight: 44, padding: '10px 20px', fontSize: 15 }} href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">{d.start}</a>
          </div>
          <MobileMenu items={items} locale={locale} langLabel={d.other} cta={d.start} wa={settings.whatsapp} />
        </nav>
      </header>
      <a className="wa-fab" href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8 1 3.9.8a3.3 3.3 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4Z"/></svg>
      </a>
    </>
  );
}
