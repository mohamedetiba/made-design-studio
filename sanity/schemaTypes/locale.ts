import { defineField, defineType } from 'sanity';

const langs = [
  { id: 'ar', title: 'العربية', isDefault: true },
  { id: 'en', title: 'English' },
];

export const localeString = defineType({
  name: 'localeString',
  title: 'نص (عربي / English)',
  type: 'object',
  fieldsets: [{ name: 'translations', title: 'English', options: { collapsible: true, collapsed: false } }],
  fields: langs.map((l) =>
    defineField({ name: l.id, title: l.title, type: 'string', fieldset: l.isDefault ? undefined : 'translations' }),
  ),
});

export const localeText = defineType({
  name: 'localeText',
  title: 'فقرة (عربي / English)',
  type: 'object',
  fieldsets: [{ name: 'translations', title: 'English', options: { collapsible: true, collapsed: false } }],
  fields: langs.map((l) =>
    defineField({ name: l.id, title: l.title, type: 'text', rows: 3, fieldset: l.isDefault ? undefined : 'translations' }),
  ),
});

const blockContent = {
  type: 'array' as const,
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'رابط',
            fields: [
              { name: 'href', type: 'url', title: 'URL', validation: (r: any) => r.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'النص البديل (Alt) — مهم للسيو', validation: (r: any) => r.required() },
        { name: 'caption', type: 'string', title: 'تعليق' },
      ],
    },
    {
      name: 'table',
      title: 'جدول',
      type: 'object',
      fields: [
        {
          name: 'rows',
          title: 'الصفوف',
          type: 'array',
          of: [{ type: 'object', name: 'row', fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }] }] }],
        },
      ],
      preview: { prepare: () => ({ title: 'جدول' }) },
    },
  ],
};

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'محتوى (عربي / English)',
  type: 'object',
  fields: [
    defineField({ name: 'ar', title: 'العربية', ...blockContent }),
    defineField({ name: 'en', title: 'English', ...blockContent }),
  ],
});
