const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/contact-page",
        permanent: true,
      },
      { source: "/admin", destination: "/keystatic", permanent: false },
      { source: "/admin/:path*", destination: "/keystatic/:path*", permanent: false },
    ];
  },
};

module.exports = nextConfig;
