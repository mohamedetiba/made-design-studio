export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

/** True once a Sanity project is connected. Until then the site renders the built-in seed content. */
export const sanityEnabled = Boolean(projectId);
