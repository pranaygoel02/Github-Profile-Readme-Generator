/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webp: {
    preset: "default",
    quality: 100,
  },
  images: {
    domains: ['avatars.githubusercontent.com',"img.shields.io"],
  }
}

module.exports = nextConfig
