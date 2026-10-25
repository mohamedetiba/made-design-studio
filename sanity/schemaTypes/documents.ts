import { defineArrayMember, defineField, defineType } from 'sanity';

const altField = defineField({ name: 'alt', title: 'النص البديل (Alt)', type: 'localeString', description: 'وصف الصورة — مهم للسيو وإمكانية الوصول' });

/* ---------------- Project ---------------- */
export const project = defineType({
  name: 'project',
  title: 'المشاريع',
  type: 'document',
  groups: [
    { name: 'main', title: 'الأساسي', default: true },
    { name: 'story', title: 'قصة المشروع' },
    { name: 'media', title: 'الصور' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'اسم المشروع', type: 'localeString', group: 'main', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'الرابط (slug)', type: 'slug', group: 'main', options: { source: 'name.en', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({
      name: 'sector', title: 'القطاع', type: 'string', group: 'main',
      options: { list: [ { title: 'سكني', value: 'residential' }, { title: 'تجاري وضيافة', value: 'commercial' }, { title: 'طبي', value: 'medical' } ], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'kind', title: 'نوع المشروع', type: 'localeString', group: 'main', description: 'مثال: فيلا سكنية، منشأة طبية' }),
    defineField({ name: 'scope', title: 'نطاق العمل', type: 'localeText', group: 'main' }),
    defineField({ name: 'location', title: 'الموقع', type: 'localeString', group: 'main' }),
    defineField({ name: 'area', title: 'المساحة (م²)', type: 'number', group: 'main' }),
    defineField({ name: 'duration', title: 'مدة التنفيذ', type: 'localeString', group: 'main' }),
    defineField({ name: 'executed', title: 'منفّذ (صور حقيقية من الموقع)', type: 'boolean', group: 'main', initialValue: false }),
    defineField({ name: 'featured', title: 'يظهر في الصفحة الرئيسية', type: 'boolean', group: 'main', initialValue: false }),
    defineField({ name: 'order', title: 'الترتيب', type: 'number', group: 'main' }),
    defineField({ name: 'brief', title: 'الطلب', type: 'localeText', group: 'story' }),
    defineField({ name: 'challenge', title: 'التحدي', type: 'localeText', group: 'story' }),
    defineField({ name: 'concept', title: 'الفكرة والخامات', type: 'localeText', group: 'story' }),
    defineField({ name: 'result', title: 'النتيجة', type: 'localeText', group: 'story' }),
    defineField({ name: 'cover', title: 'صورة الغلاف', type: 'image', group: 'media', options: { hotspot: true }, fields: [altField], validation: (r) => r.required() }),
    defineField({
      name: 'gallery', title: 'معرض الصور', type: 'array', group: 'media',
      of: [defineArrayMember({
        type: 'image', options: { hotspot: true },
        fields: [
          altField,
          defineField({ name: 'space', title: 'المساحة', type: 'reference', to: [{ type: 'space' }] }),
          defineField({ name: 'stage', title: 'المرحلة', type: 'string', options: { list: [ { title: 'تصميم 3D', value: 'render' }, { title: 'قبل', value: 'before' }, { title: 'أثناء التنفيذ', value: 'progress' }, { title: 'بعد التسليم', value: 'after' } ] } }),
        ],
      })],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'الترتيب', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name.ar', subtitle: 'kind.ar', media: 'cover' } },
});

/* ---------------- Space (majlis, dining …) ---------------- */
export const space = defineType({
  name: 'space',
  title: 'المساحات',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'اسم المساحة', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'الرابط', type: 'slug', options: { source: 'name.en' }, validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'مقدمة', type: 'localeText' }),
    defineField({ name: 'cover', title: 'صورة', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'الترتيب', type: 'number' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'name.ar', media: 'cover' } },
});

/* ---------------- Before / After ---------------- */
export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'قبل وبعد',
  type: 'document',
  fields: [
    defineField({ name: 'project', title: 'المشروع', type: 'reference', to: [{ type: 'project' }], validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'المساحة', type: 'localeString' }),
    defineField({ name: 'before', title: 'قبل', type: 'image', validation: (r) => r.required() }),
    defineField({ name: 'after', title: 'بعد', type: 'image', validation: (r) => r.required() }),
    defineField({ name: 'featured', title: 'يظهر في الرئيسية', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'الترتيب', type: 'number' }),
  ],
  preview: { select: { title: 'project.name.ar', subtitle: 'label.ar', media: 'after' } },
});

/* ---------------- Testimonial (WhatsApp) ---------------- */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'آراء العملاء (واتساب)',
  type: 'document',
  fields: [
    defineField({ name: 'screenshot', title: 'لقطة المحادثة (بعد إخفاء الأسماء)', type: 'image', validation: (r) => r.required() }),
    defineField({ name: 'quote', title: 'الجملة المقتبسة', type: 'localeText' }),
    defineField({ name: 'who', title: 'الوصف (بدون اسم)', type: 'localeString', description: 'مثال: عميلة · فيلا سكنية' }),
    defineField({ name: 'featured', title: 'يظهر في الكروت المتحركة', type: 'boolean', initialValue: false }),
    defineField({ name: 'consent', title: 'العميل وافق على النشر', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'الترتيب', type: 'number' }),
  ],
  preview: { select: { title: 'who.ar', subtitle: 'quote.ar', media: 'screenshot' } },
});

/* ---------------- Blog ---------------- */
export const category = defineType({
  name: 'category',
  title: 'تصنيفات المدونة',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'الاسم', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'الرابط', type: 'slug', options: { source: 'title.en' }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title.ar' } },
});

export const post = defineType({
  name: 'post',
  title: 'المقالات',
  type: 'document',
  groups: [
    { name: 'content', title: 'المحتوى', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'عنوان المقال', type: 'localeString', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'الرابط (slug)', type: 'slug', group: 'content', options: { source: 'title.en', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'التصنيف', type: 'reference', to: [{ type: 'category' }], group: 'content' }),
    defineField({ name: 'mainImage', title: 'الصورة البارزة', type: 'image', group: 'content', options: { hotspot: true }, fields: [altField] }),
    defineField({ name: 'excerpt', title: 'مقدمة قصيرة', type: 'localeText', group: 'content' }),
    defineField({ name: 'body', title: 'محتوى المقال', type: 'localeBlock', group: 'content', description: 'استخدم H2 وH3 للعناوين — جدول المحتويات يتولّد منها تلقائيًا' }),
    defineField({
      name: 'faq', title: 'أسئلة شائعة (FAQ Schema)', type: 'array', group: 'content',
      of: [defineArrayMember({ type: 'object', name: 'faqItem', fields: [
        defineField({ name: 'q', title: 'السؤال', type: 'localeString' }),
        defineField({ name: 'a', title: 'الإجابة', type: 'localeText' }),
      ], preview: { select: { title: 'q.ar' } } })],
    }),
    defineField({ name: 'relatedProjects', title: 'مشاريع مرتبطة', type: 'array', group: 'content', of: [{ type: 'reference', to: [{ type: 'project' }] }] }),
    defineField({ name: 'author', title: 'الكاتب', type: 'string', group: 'content', initialValue: 'MADE Design Studio' }),
    defineField({ name: 'publishedAt', title: 'تاريخ النشر', type: 'datetime', group: 'content', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'الأحدث', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title.ar', subtitle: 'seo.focusKeyword', media: 'mainImage' } },
});

/* ---------------- Services ---------------- */
export const service = defineType({
  name: 'service',
  title: 'الخدمات',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'اسم الخدمة', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'الرابط', type: 'slug', options: { source: 'title.en' }, validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'وصف مختصر', type: 'localeText' }),
    defineField({ name: 'body', title: 'صفحة الخدمة', type: 'localeBlock' }),
    defineField({ name: 'image', title: 'صورة', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'الترتيب', type: 'number' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'title.ar', media: 'image' } },
});

/* ---------------- Site settings (singleton) ---------------- */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  groups: [
    { name: 'contact', title: 'التواصل', default: true },
    { name: 'estimator', title: 'حاسبة التكلفة' },
    { name: 'seo', title: 'SEO الافتراضي' },
  ],
  fields: [
    defineField({ name: 'phone', title: 'رقم الهاتف', type: 'string', group: 'contact', initialValue: '+966 56 843 4230' }),
    defineField({ name: 'whatsapp', title: 'رقم الواتساب (بدون +)', type: 'string', group: 'contact', initialValue: '966568434230' }),
    defineField({ name: 'email', title: 'البريد', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'العنوان', type: 'localeString', group: 'contact' }),
    defineField({ name: 'mapUrl', title: 'رابط خرائط جوجل', type: 'url', group: 'contact' }),
    defineField({ name: 'social', title: 'حسابات التواصل', type: 'array', group: 'contact', of: [{ type: 'object', fields: [ { name: 'label', type: 'string', title: 'المنصة' }, { name: 'url', type: 'url', title: 'الرابط' } ] }] }),
    defineField({ name: 'rateDesign', title: 'سعر المتر — تصميم فقط (ريال)', type: 'number', group: 'estimator', initialValue: 250 }),
    defineField({ name: 'rateFitout', title: 'سعر المتر — تشطيب وتنفيذ (ريال)', type: 'number', group: 'estimator', initialValue: 1800 }),
    defineField({ name: 'rateTurnkey', title: 'سعر المتر — تسليم مفتاح (ريال)', type: 'number', group: 'estimator', initialValue: 3200 }),
    defineField({ name: 'estimatorNote', title: 'ملاحظة تحت الحاسبة', type: 'localeString', group: 'estimator' }),
    defineField({ name: 'seo', title: 'SEO الافتراضي للموقع', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'إعدادات الموقع' }) },
});
