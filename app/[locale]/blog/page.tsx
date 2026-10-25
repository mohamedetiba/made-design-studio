import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import Reveal from '@/components/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'مدونة التصميم الداخلي' : 'Interior design journal',
    description: locale === 'ar' ? 'مقالات عن تكاليف التشطيب، تصميم المجالس، والمساحات التجارية في الخبر والدمام.' : 'Articles on fit-out costs, majlis design and commercial interiors in Khobar and Dammam.',
    alternates: { canonical: `/${locale}/blog`, languages: { ar: '/ar/blog', en: '/en/blog' } },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const posts = await getPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <section className="wrap col g20 rise" style={{ padding: '72px 24px 40px' }}>
        <span className="eyebrow">{d.blog.eyebrow}</span>
        <h1 className="h1" style={{ fontSize: 'clamp(36px,4.6vw,62px)' }}>{d.blog.title}</h1>
      </section>
      {first && (
        <section className="wrap" style={{ padding: '0 24px 56px' }}>
          <Link href={`/${locale}/blog/${first.slug}`} className="row g40 center" style={{ textDecoration: 'none' }}>
            <div className="zoom" style={{ flex: '1.4 1 480px', height: 440 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={first.image.src} alt={t(first.image.alt, locale)} />
            </div>
            <div className="col g14" style={{ flex: '1 1 320px' }}>
              <span className="muted small">{t(first.category, locale)} · <time dateTime={first.publishedAt}>{first.publishedAt.slice(0, 10)}</time></span>
              <h2 className="h2" style={{ fontSize: 34 }}>{t(first.title, locale)}</h2>
              <p className="lead" style={{ fontSize: 16 }}>{t(first.excerpt, locale)}</p>
            </div>
          </Link>
        </section>
      )}
      <section className="bg-sand">
        <div className="wrap grid" style={{ padding: '72px 24px', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 28 }}>
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <Link href={`/${locale}/blog/${p.slug}`} className="card">
                <div className="zoom" style={{ height: 230 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image.src} alt={t(p.image.alt, locale)} loading="lazy" />
                </div>
                <span className="muted" style={{ fontSize: 13 }}>{t(p.category, locale)}</span>
                <span style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.6 }}>{t(p.title, locale)}</span>
                <span className="small" style={{ color: 'var(--body)', lineHeight: 1.8 }}>{t(p.excerpt, locale)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
