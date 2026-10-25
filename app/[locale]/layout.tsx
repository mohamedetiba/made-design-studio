import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../globals.css';
import { fontVars } from '@/lib/fonts';
import { getDict, isLocale, locales, siteUrl } from '@/lib/i18n';
import { getSettings } from '@/lib/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : 'ar') as Locale;
  const d = getDict(l);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: d.meta.title, template: '%s | MADE Design Studio' },
    description: d.meta.description,
    alternates: { canonical: `/${l}`, languages: { ar: '/ar', en: '/en', 'x-default': '/ar' } },
    openGraph: { type: 'website', siteName: 'MADE Design Studio', locale: l === 'ar' ? 'ar_SA' : 'en_US', images: ['/images/0254.jpg'] },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/made-logo-dark.svg' },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const settings = await getSettings();
  const d = getDict(locale);
  const org = {
    '@context': 'https://schema.org',
    '@type': 'InteriorDesigner',
    name: 'MADE Design Studio',
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/made-logo-dark.svg`,
    image: `${siteUrl}/images/0254.jpg`,
    telephone: settings.phone,
    description: d.meta.description,
    address: { '@type': 'PostalAddress', addressLocality: 'Khobar', addressRegion: 'Eastern Province', addressCountry: 'SA', streetAddress: 'Al Rakah Al Janubiyah' },
    areaServed: ['Khobar', 'Dammam', 'Dhahran', 'Eastern Province'],
    sameAs: settings.social.map((s) => s.url),
  };
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={fontVars}>
      <body>
        <JsonLd data={org} />
        <Header locale={locale} settings={settings} />
        <main>{children}</main>
        <Footer locale={locale} settings={settings} />
      </body>
    </html>
  );
}
