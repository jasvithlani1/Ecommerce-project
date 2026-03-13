/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chaukhambhabooks.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // Keep any other existing settings like experimental or swcMinify here
};

export default nextConfig;