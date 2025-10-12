import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: 'https://digidocs.com/sitemap.xml',
  }
}
