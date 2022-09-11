/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '.',
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    }
  },
}

module.exports = nextConfig
