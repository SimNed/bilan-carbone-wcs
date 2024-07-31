/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://back-end:4000/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
