import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceDetails, getServiceOptions } from '@/constants/service-details.constants'
import { SERVICES } from '@/constants/popular-services.constants'
import ServiceDetailsClient from './ServiceDetailsClient'

interface ServiceDetailsPageProps {
  params: Promise<{
    serviceId: string
  }>
}

// Generate static params for all services
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    serviceId: service.id,
  }))
}

// Generate metadata for each service
export async function generateMetadata({ params }: ServiceDetailsPageProps): Promise<Metadata> {
  const { serviceId } = await params
  const serviceDetails = getServiceDetails(serviceId)
  
  if (!serviceDetails) {
    return {
      title: 'Service Not Found | DigiDocs',
      description: 'The requested service could not be found.',
    }
  }

  const serviceOptions = getServiceOptions(serviceId)
  const minPrice = Math.min(...serviceOptions.map(option => option.price))
  const maxPrice = Math.max(...serviceOptions.map(option => option.price))

  return {
    title: `${serviceDetails.name} - Online Application & Processing | DigiDocs`,
    description: `${serviceDetails.description} Starting from ₹${minPrice}. Get your ${serviceDetails.name.toLowerCase()} with our expert assistance. Fast processing, secure handling, and complete support.`,
    keywords: [
      serviceDetails.name.toLowerCase(),
      'online application',
      'document processing',
      'digital services',
      'government documents',
      'fast processing',
      'secure handling',
      'expert assistance',
      serviceDetails.category,
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
      url: `https://digidocs.com/services/${serviceId}`,
      title: `${serviceDetails.name} - Online Application & Processing | DigiDocs`,
      description: `${serviceDetails.description} Starting from ₹${minPrice}. Fast processing with complete support.`,
      siteName: 'DigiDocs',
      images: [
        {
          url: `https://digidocs.com${serviceDetails.imageUrl}`,
          width: 1200,
          height: 630,
          alt: `${serviceDetails.name} - DigiDocs Service`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceDetails.name} - Online Application | DigiDocs`,
      description: `${serviceDetails.description} Starting from ₹${minPrice}.`,
      images: [`https://digidocs.com${serviceDetails.imageUrl}`],
    },
    alternates: {
      canonical: `https://digidocs.com/services/${serviceId}`,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

// Generate structured data for SEO
const generateStructuredData = (serviceDetails: any, serviceOptions: any[]) => {
  const offers = serviceOptions.map(option => ({
    '@type': 'Offer',
    name: option.name,
    description: option.description,
    price: option.price.toString(),
    priceCurrency: option.currency,
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
    deliveryLeadTime: {
      '@type': 'QuantitativeValue',
      minValue: option.deliveryDays,
      maxValue: option.deliveryDays + 5,
      unitCode: 'DAY'
    }
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceDetails.name,
    description: serviceDetails.description,
    provider: {
      '@type': 'Organization',
      name: 'DigiDocs',
      url: 'https://digidocs.com',
      logo: 'https://digidocs.com/assets/logo/digidocs.png'
    },
    offers: offers,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: serviceDetails.rating.toString(),
      ratingCount: serviceDetails.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    image: `https://digidocs.com${serviceDetails.imageUrl}`,
    url: `https://digidocs.com/services/${serviceDetails.id}`,
    serviceType: serviceDetails.category,
    category: serviceDetails.category,
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://digidocs.com/services/${serviceDetails.id}`,
      serviceSmsNumber: '+91-XXXXX-XXXXX',
      servicePhone: '+91-XXXXX-XXXXX'
    }
  }
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  const { serviceId } = await params
  const serviceDetails = getServiceDetails(serviceId)
  const serviceOptions = getServiceOptions(serviceId)

  if (!serviceDetails || serviceOptions.length === 0) {
    notFound()
  }

  const structuredData = generateStructuredData(serviceDetails, serviceOptions)

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <ServiceDetailsClient 
        serviceDetails={serviceDetails}
        serviceOptions={serviceOptions}
      />
    </>
  )
}
