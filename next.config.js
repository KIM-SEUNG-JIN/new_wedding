/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-domain.vercel.app'],
    formats: ['image/webp'],
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
  },
}

module.exports = nextConfig
