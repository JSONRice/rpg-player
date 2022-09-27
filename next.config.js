/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  reactStrictMode: true,
  swcMinify: true,
  // This is just coming from a global public domain so change it once test images are no longer needed:
  images: {
    domains: ['www.rd.com'],
  },
};

module.exports = nextConfig;
