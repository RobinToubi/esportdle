/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "static.lolesports.com",
        port: "",
        pathname: "/players/**.png",
      },
    ],
  },
  basePath: '/.next'
};

module.exports = nextConfig;
