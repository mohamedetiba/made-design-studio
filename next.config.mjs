/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [{ source: '/', destination: '/ar', permanent: false }];
  },
};

export default nextConfig;
