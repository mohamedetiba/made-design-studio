import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getSettings } from '@/lib/content';
import { POSTS } from '@/lib/seed';
import { getDict, locales, siteUrl } from '@/lib/i18n';
import { t, type Locale } from '@/lib/types';
import JsonLd from '@/components/JsonLd';
import RichText, { headings, normalize } from '@/components/RichText';

export async function generateStaticParams() {
  return locales.flatMap((locale) => POSTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  const title = t(p.seo?.metaTitle, locale) || t(p.title, locale);
  const description = t(p.seo?.metaDescription, locale) || t(p.excerpt, locale);
  return {
    title: { absolute: title },
    description,
    keywords: [p.seo?.focusKeyword, ...(p.seo?.keywords || [])].filter(Boolean) as string[],
    robots: p.seo?.noIndex ? { index: false } : undefined,
    alternates: { canonical: `/${locale}/blog/${slug}`, languages: { ar: `/ar/blog/${slug}`, en: `/en/blog/${slug}` } },
    openGraph: { type: 'article', title, description, publishedTime: p.publishedAt, images: [p.seo?.ogImage || p.image.src] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const [p, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!p) notFound();
  const d = getDict(locale);
  const blocks = normalize((locale === 'en' && p.body.en?.length ? p.body.en : p.body.ar) || []);
  const toc = headings(blocks);
  const title = t(p.title, locale);
  const abs = (s: string) => (s.startsWith('http') ? s : siteUrl + s);

  return (
    <article>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Article', headline: title, description: t(p.excerpt, locale),
        image: [abs(p.image.src)], datePublished: p.publishedAt, inLanguage: locale,
        author: { '@type': 'Organization', name: p.author || 'MADE Design Studio' },
        publisher: { '@type': 'Organization', name: 'MADE Design Studio', logo: { '@type': 'ImageObject', url: `${siteUrl}/made-logo-dark.svg` } },
        mainEntityOfPage: `${siteUrl}/${locale}/blog/${slug}`,
      }} />
      {p.faq?.length ? (
        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: t(f.q, locale), acceptedAnswer: { '@type': 'Answer', text: t(f.a, locale) } })),
        }} />
      ) : null}

      <header className="wrap col g20 rise" style={{ padding: '48px 24px 32px', maxWidth: 960 }}>
        <Link href={`/${locale}/blog`} className="muted small">{d.blog.back}</Link>
        <span className="muted small">{t(p.category, locale)} · <time dateTime={p.publishedAt}>{p.publishedAt.slice(0, 10)}</time></span>
        <h1 className="h1" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>{title}</h1>
        <p className="lead">{t(p.excerpt, locale)}</p>
      </header>
      <div className="wrap rise2" style={{ padding: '0 24px' }}>
        <div className="zoom" style={{ height: 'min(60vh,560px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image.src} alt={t(p.image.alt, locale)} />
        </div>
      </div>

      <div className="wrap row g56" style={{ padding: '56px 24px 80px', alignItems: 'flex-start' }}>
        {toc.length > 1 && (
          <nav className="toc" aria-label={d.blog.toc} style={{ flex: '0 1 260px', position: 'sticky', top: 100 }}>
            <strong style={{ display: 'block', marginBottom: 10 }}>{d.blog.toc}</strong>
            {toc.map((h) => <a key={h.id} href={`#${h.id}`} style={{ paddingInlineStart: h.level === 'h3' ? 16 : 0 }}>{h.text}</a>)}
          </nav>
        )}
        <div style={{ flex: '1 1 560px', minWidth: 0, maxWidth: 760 }}>
          <RichText blocks={blocks} />
          {p.faq?.length ? (
            <section style={{ marginTop: 56 }}>
              <h2 className="h2" style={{ fontSize: 30, marginBottom: 16 }}>{d.blog.faq}</h2>
              {p.faq.map((f, i) => (
                <details key={i} style={{ borderBottom: '1px solid var(--line)', padding: '16px 0' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 18 }}>{t(f.q, locale)}</summary>
                  <p style={{ margin: '12px 0 0', lineHeight: 1.9, color: 'var(--body)' }}>{t(f.a, locale)}</p>
                </details>
              ))}
            </section>
          ) : null}
          <aside className="bg-ink col g14" style={{ marginTop: 56, padding: 32 }}>
            <strong style={{ fontSize: 22 }}>{d.blog.cta}</strong>
            <span style={{ color: 'var(--line)' }}>{d.blog.ctaBody}</span>
            <div className="row" style={{ gap: 12 }}>
              <Link className="btn btn-light" href={`/${locale}#estimate`}>{d.hero.cta1}</Link>
              <a className="btn btn-line" style={{ color: 'var(--ivory)', borderColor: 'var(--ivory)' }} href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">{d.est.cta}</a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
