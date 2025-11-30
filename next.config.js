/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/car-rental-task/**',
      },
      {
        protocol: 'https',
        hostname: 'car-rental-api.goit.global',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;