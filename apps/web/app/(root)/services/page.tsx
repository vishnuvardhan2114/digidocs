import { Metadata } from 'next'
import { SERVICES, SERVICES_PAGE_CONTENT } from '@/constants/popular-services.constants'
import { ServicesPageClient } from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Digital Documents & Remote Services | DigiDocs',
  description: 'Browse all digital document services available to you with complete support and guidance. Manage your important documents online with convenience and security.',
  keywords: [
    'digital documents',
    'remote services',
    'online document management',
    'PAN card',
    'Aadhaar card',
    'passport',
    'voter ID',
    'driving license',
    'birth certificate',
    'marriage certificate',
    'bank account',
    'credit card',
    'insurance',
    'legal documents',
    'power of attorney',
    'will document',
    'rental agreement',
    'property deed'
  ],
  authors: [{ name: 'DigiDocs' }],
  creator: 'DigiDocs',
  publisher: 'DigiDocs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digidocs.com/services',
    title: 'Digital Documents & Remote Services | DigiDocs',
    description: 'Browse all digital document services available to you with complete support and guidance. Manage your important documents online with convenience and security.',
    siteName: 'DigiDocs',
    images: [
      {
        url: '/assets/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'DigiDocs Services - Digital Documents & Remote Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Documents & Remote Services | DigiDocs',
    description: 'Browse all digital document services available to you with complete support and guidance.',
    images: ['/assets/images/services-og.jpg'],
  },
  alternates: {
    canonical: 'https://digidocs.com/services',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Generate structured data for SEO
const generateStructuredData = () => {
  const services = SERVICES.map(service => ({
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'DigiDocs',
      url: 'https://digidocs.com'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: service.rating.toString(),
      ratingCount: '100',
      bestRating: '5',
      worstRating: '1'
    },
    image: `https://digidocs.com${service.imageUrl}`,
    url: `https://digidocs.com/services/${service.id}`
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Digital Documents & Remote Services',
    description: SERVICES_PAGE_CONTENT.description,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: service
    }))
  }
}

export default function ServicesPage() {
  const structuredData = generateStructuredData()

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <ServicesPageClient />
    </>
  )
}