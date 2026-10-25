import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'd5a0q2ye',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
