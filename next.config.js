/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.BUILD_STATIC === 'true' ? 'export' : 'standalone',
  trailingSlash: true,
  images: {
    domains: ['images.stockcake.com'],
    unoptimized: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  // Disable server-side features for static export
  ...(process.env.BUILD_STATIC === 'true' && {
    images: {
      unoptimized: true
    }
  })
}

module.exports = nextConfig