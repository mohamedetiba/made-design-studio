import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { t, type Locale, type Settings } from '@/lib/types';

export default function Footer({ locale, settings }: { locale: Locale; settings: Settings }) {
  const d = getDict(locale).footer;
  return (
    <footer className="footer">
      <div className="wrap col g56" style={{ padding: '80px 24px 40px' }}>
        <div className="row between g40">
          <div className="col g20" style={{ maxWidth: 380 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/made-logo-light.svg" alt="MADE Design Studio" width={180} height={80} style={{ width: 180, height: 'auto' }} />
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9 }}>Thoughtfully Designed. Beautifully Crafted.<br />{d.tagline}</p>
          </div>
          <div className="col g8" style={{ fontSize: 15 }}>
            <strong style={{ color: 'var(--ivory)' }}>{d.studio}</strong>
            <span>{t(settings.address, locale)}</span>
            <a href={`tel:+${settings.whatsapp}`} className="ltr">{settings.phone}</a>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
            {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
          </div>
          <div className="col g8" style={{ fontSize: 15 }}>
            <strong style={{ color: 'var(--ivory)' }}>{d.follow}</strong>
            {settings.social.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener">{s.label}</a>
            ))}
          </div>
          <div className="col g8" style={{ fontSize: 15 }}>
            <Link href={`/${locale}/projects`}>{getDict(locale).nav.projects}</Link>
            <Link href={`/${locale}/blog`}>{getDict(locale).nav.blog}</Link>
          </div>
        </div>
        <div className="row between small" style={{ borderTop: '1px solid var(--wood)', paddingTop: 24, color: '#9C8F80' }}>
          <span>© {new Date().getFullYear()} MADE Design Studio</span>
          <span>{d.bottom}</span>
        </div>
      </div>
    </footer>
  );
}
