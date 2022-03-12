/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PRODUCTION_URI: process.env.PRODUCTION_URI
  }
}

module.exports = nextConfig
