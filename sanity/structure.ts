import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MADE Design Studio')
    .items([
      S.listItem().title('إعدادات الموقع').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('project').title('المشاريع'),
      S.documentTypeListItem('space').title('المساحات'),
      S.documentTypeListItem('beforeAfter').title('قبل وبعد'),
      S.documentTypeListItem('testimonial').title('آراء العملاء'),
      S.divider(),
      S.documentTypeListItem('post').title('المقالات'),
      S.documentTypeListItem('category').title('تصنيفات المدونة'),
      S.documentTypeListItem('service').title('الخدمات'),
    ]);
