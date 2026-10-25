/**
 * Sanity Studio lives at /studio — the client's team manages projects, articles,
 * testimonials, prices and all SEO fields from here.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
