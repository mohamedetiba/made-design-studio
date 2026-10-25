import { localeBlock, localeString, localeText } from './locale';
import { seo } from './seo';
import { beforeAfter, category, post, project, service, siteSettings, space, testimonial } from './documents';

export const schemaTypes = [
  localeString, localeText, localeBlock, seo,
  project, space, beforeAfter, testimonial, post, category, service, siteSettings,
];
