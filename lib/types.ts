export type Locale = 'ar' | 'en';
export type L = { ar: string; en?: string };

export type Img = { src: string; alt: L; space?: string; stage?: 'render' | 'before' | 'progress' | 'after' };

export type Project = {
  slug: string;
  name: L;
  sector: 'residential' | 'commercial' | 'medical';
  kind: L;
  scope: L;
  executed: boolean;
  featured?: boolean;
  location?: L;
  area?: number;
  duration?: L;
  brief?: L;
  challenge?: L;
  concept?: L;
  result?: L;
  cover: Img;
  gallery: Img[];
  seo?: Seo;
};

export type Space = { slug: string; name: L; intro?: L; cover?: string; images: (Img & { project: string; projectName: L })[] };

export type BeforeAfter = { project: string; projectName: L; label: L; before: string; after: string };

export type Testimonial = { screenshot: string; quote?: L; who: L; featured: boolean };

export type Seo = { metaTitle?: L; metaDescription?: L; focusKeyword?: string; keywords?: string[]; ogImage?: string; noIndex?: boolean };

export type Post = {
  slug: string;
  title: L;
  category: L;
  excerpt: L;
  image: Img;
  publishedAt: string;
  author: string;
  // Portable Text blocks (Sanity) or our simple seed blocks
  body: { ar: Block[]; en?: Block[] };
  faq?: { q: L; a: L }[];
  seo?: Seo;
};

export type Block =
  | { _type: 'block'; style: 'normal' | 'h2' | 'h3' | 'blockquote'; text: string }
  | { _type: string; [k: string]: unknown };

export type Settings = {
  phone: string;
  whatsapp: string;
  email?: string;
  address: L;
  social: { label: string; url: string }[];
  rates: { design: number; fitout: number; turnkey: number };
};

export const t = (v: L | undefined, locale: Locale): string => (v ? (locale === 'en' ? v.en || v.ar : v.ar) : '');
