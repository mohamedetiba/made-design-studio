import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import type { Locale, Settings } from '@/lib/types';
import LangSwitch from './LangSwitch';

export default function Header({ locale, settings }: { locale: Locale; settings: Settings }) {
  const d = getDict(locale).nav;
  const l = `/${locale}`;
  return (
    <header className="header">
      <nav className="wrap nav" aria-label={locale === 'ar' ? 'القائمة الرئيسية' : 'Main navigation'}>
        <Link href={l} aria-label="MADE Design Studio" style={{ display: 'flex' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/made-logo-dark.svg" alt="MADE Design Studio" width={124} height={55} style={{ width: 124, height: 'auto' }} />
        </Link>
        <div className="nav-links">
          <Link href={`${l}#services`}>{d.services}</Link>
          <Link href={`${l}/projects`}>{d.projects}</Link>
          <Link href={`${l}#journey`}>{d.journey}</Link>
          <Link href={`${l}#studio`}>{d.studio}</Link>
          <Link href={`${l}/blog`}>{d.blog}</Link>
          <LangSwitch locale={locale} label={d.other} />
          <a className="btn btn-dark" style={{ minHeight: 44, padding: '10px 20px', fontSize: 15 }} href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">{d.start}</a>
        </div>
      </nav>
    </header>
  );
}
