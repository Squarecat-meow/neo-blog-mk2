import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [new URL(`${process.env.APP_URL}/**`)],
  },
  rewrites: async () => [
    {
      source: '/api/media/:path*',
      destination:
        'https://yunomina-blog.s3.us-east-005.backblazeb2.com/:path*',
    },
    {
      source: '/api/emojis/:path*',
      destination:
        'https://yunomina-blog.s3.us-east-005.backblazeb2.com/emojis/:path*',
    },
  ],
};

export default nextConfig;
