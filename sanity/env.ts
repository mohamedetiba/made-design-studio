/**
 * Sanity project "made" (organization: mohamed etiba). The project ID is public —
 * it is safe to commit. Override with NEXT_PUBLIC_SANITY_PROJECT_ID if needed;
 * set it to "none" to run on the built-in seed content only.
 */
const raw = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'd5a0q2ye';
export const projectId = raw === 'none' ? '' : raw;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const sanityEnabled = Boolean(projectId);
