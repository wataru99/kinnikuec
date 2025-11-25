/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: '/Users/wataru/Desktop/kinniku/online-shop'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
