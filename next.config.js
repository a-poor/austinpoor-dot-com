/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  experimental: {
    mdxRs: true,
  },
}

module.exports = nextConfig
