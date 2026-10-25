import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId, sanityEnabled } from './env';

export const client = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

const builder = sanityEnabled ? imageUrlBuilder({ projectId, dataset }) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any, width = 1600): string {
  if (!builder || !source?.asset) return '';
  return builder.image(source).width(width).auto('format').quality(80).url();
}

/** Fetch with Next.js cache tags so the /api/revalidate webhook can refresh exactly what changed. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 3600, tags } });
  } catch (err) {
    // Never take the site down if Sanity is unreachable — content.ts falls back to the built-in seed.
    console.warn('[sanity] fetch failed, using built-in content:', (err as Error).message);
    return null;
  }
}
