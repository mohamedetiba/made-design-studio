'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/types';

export default function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname() || `/${locale}`;
  const other = locale === 'ar' ? 'en' : 'ar';
  const href = path.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`);
  return (
    <Link href={href} hrefLang={other} className="latin muted" style={{ letterSpacing: 1 }}>
      {label}
    </Link>
  );
}
