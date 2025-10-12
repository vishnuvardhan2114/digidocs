import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceDetails, getServiceOptions } from '@/constants/service-details.constants'
import DocumentServiceClient from './DocumentServiceClient'

interface DocumentServicePageProps {
  params: Promise<{
    serviceId: string
    optionId: string
  }>
}

// Generate static params for all service options
export async function generateStaticParams() {
  const serviceIds = ['pan-card', 'aadhaar', 'passport', 'voter-id']
  const params = []
  
  for (const serviceId of serviceIds) {
    const options = getServiceOptions(serviceId)
    for (const option of options) {
      params.push({
        serviceId,
        optionId: option.id,
      })
    }
  }
  
  return params
}

// Generate metadata for each document service option
export async function generateMetadata({ params }: DocumentServicePageProps): Promise<Metadata> {
  const { serviceId, optionId } = await params
  const serviceDetails = getServiceDetails(serviceId)
  const serviceOptions = getServiceOptions(serviceId)
  const selectedOption = serviceOptions.find(option => option.id === optionId)
  
  if (!serviceDetails || !selectedOption) {
    return {
      title: 'Service Option Not Found | DigiDocs',
      description: 'The requested service option could not be found.',
    }
  }

  return {
    title: `${selectedOption.name} - Document Upload & Application | DigiDocs`,
    description: `Apply for ${selectedOption.name} online. Upload documents, fill application form, and track your ${serviceDetails.name.toLowerCase()} application. Starting from ₹${selectedOption.price}.`,
    keywords: [
      selectedOption.name.toLowerCase(),
      serviceDetails.name.toLowerCase(),
      'document upload',
      'online application',
      'form filling',
      'document verification',
      'track application',
      selectedOption.type,
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
      url: `https://digidocs.com/services/${serviceId}/document-service/${optionId}`,
      title: `${selectedOption.name} - Document Upload & Application | DigiDocs`,
      description: `Apply for ${selectedOption.name} online. Upload documents and fill application form with our expert assistance.`,
      siteName: 'DigiDocs',
      images: [
        {
          url: `https://digidocs.com${serviceDetails.imageUrl}`,
          width: 1200,
          height: 630,
          alt: `${selectedOption.name} - DigiDocs Service`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${selectedOption.name} - Document Upload | DigiDocs`,
      description: `Apply for ${selectedOption.name} online with document upload and form filling.`,
      images: [`https://digidocs.com${serviceDetails.imageUrl}`],
    },
    alternates: {
      canonical: `https://digidocs.com/services/${serviceId}/document-service/${optionId}`,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

// Generate structured data for SEO
const generateStructuredData = (serviceDetails: any, selectedOption: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${selectedOption.name} - Document Upload Application`,
    description: `Online application for ${selectedOption.name} with document upload and form filling.`,
    url: `https://digidocs.com/services/${serviceDetails.id}/document-service/${selectedOption.id}`,
    applicationCategory: 'DocumentApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      name: selectedOption.name,
      price: selectedOption.price.toString(),
      priceCurrency: selectedOption.currency,
      availability: 'https://schema.org/InStock'
    },
    provider: {
      '@type': 'Organization',
      name: 'DigiDocs',
      url: 'https://digidocs.com'
    },
    featureList: [
      'Document Upload',
      'Form Filling',
      'Document Verification',
      'Application Tracking',
      'Secure Processing'
    ]
  }
}

export default async function DocumentServicePage({ params }: DocumentServicePageProps) {
  const { serviceId, optionId } = await params
  const serviceDetails = getServiceDetails(serviceId)
  const serviceOptions = getServiceOptions(serviceId)
  const selectedOption = serviceOptions.find(option => option.id === optionId)

  if (!serviceDetails || !selectedOption) {
    notFound()
  }

  const structuredData = generateStructuredData(serviceDetails, selectedOption)

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <DocumentServiceClient 
        serviceDetails={serviceDetails}
        selectedOption={selectedOption}
      />
    </>
  )
}
