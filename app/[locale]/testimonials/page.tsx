import type { Metadata } from 'next';
import { getTestimonials } from '@/lib/content';
import { getDict } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import Testimonials from '@/components/Testimonials';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  return { title: d.reviews.title, description: d.reviews.body, alternates: { canonical: `/${locale}/testimonials`, languages: { ar: '/ar/testimonials', en: '/en/testimonials' } } };
}

export default async function TestimonialsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const items = await getTestimonials();
  return <Testimonials items={items} locale={locale} d={d.wa} />;
}
