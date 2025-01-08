/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  images: {
    domains: ['thanhsonnguyen.io.vn', 'minio.thanhsonnguyen.io.vn', 'dev.thanhsonnguyen.io.vn'],
    remotePatterns: [
      // TODO: REMOVE THIS
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'minio.thanhsonnguyen.io.vn',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'thanhsonnguyen.io.vn',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: process.env.NODE_ENV !== 'production',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // pwa: {
  //   dest: 'public',
  //   swDest: 'public/sw.js',
  // },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
}

export default nextConfig
