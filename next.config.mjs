/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig

// ✅ Add this to enable middleware on all pages except static files and API routes
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // exclude API, _next, and static assets
}
