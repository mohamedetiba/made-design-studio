import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localeString',
      description: 'يظهر في نتائج جوجل. الأفضل 50–60 حرف ويحتوي الكلمة المفتاحية.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localeText',
      description: 'وصف النتيجة في جوجل. الأفضل 140–160 حرف.',
    }),
    defineField({ name: 'focusKeyword', title: 'الكلمة المفتاحية الأساسية', type: 'string' }),
    defineField({ name: 'keywords', title: 'كلمات مرتبطة', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'ogImage', title: 'صورة المشاركة (Open Graph)', type: 'image', description: '1200×630 مثالي' }),
    defineField({ name: 'canonical', title: 'Canonical URL (اختياري)', type: 'url' }),
    defineField({ name: 'noIndex', title: 'إخفاء من محركات البحث', type: 'boolean', initialValue: false }),
  ],
});
