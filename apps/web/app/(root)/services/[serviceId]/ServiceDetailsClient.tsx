'use client'

import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { ServiceDetails, ServiceOption } from '@/constants/service-details.constants'
import { useServiceBreadcrumb } from '@/app/components/BreadcrumbProvider'
import DocumentServiceCard from '@/app/components/DocumentServiceCard'
import ServiceFAQ from '@/app/components/ServiceFAQ'

interface ServiceDetailsClientProps {
    serviceDetails: ServiceDetails
    serviceOptions: ServiceOption[]
}

const ServiceDetailsClient: React.FC<ServiceDetailsClientProps> = ({
  serviceDetails,
  serviceOptions
}) => {
  const router = useRouter()
  const { setServiceBreadcrumbs } = useServiceBreadcrumb()
  const [, setSelectedOption] = useState<string | null>(null)

  // Set custom breadcrumbs for this service
  useEffect(() => {
    setServiceBreadcrumbs(serviceDetails.name, serviceDetails.id)
  }, [serviceDetails, setServiceBreadcrumbs])

    const handleSelectService = (optionId: string) => {
        setSelectedOption(optionId)
        // Navigate to document service selection page
        router.push(`/services/${serviceDetails.id}/document-service/${optionId}`)
    }   

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Service Options Section */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Which {serviceDetails.name} service do you wish to apply?
                        </h2>
                        <p className="text-gray-600">
                            Choose the service level that best fits your needs and timeline
                        </p>
                    </div>

                    {/* Service Options Cards */}
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {serviceOptions.map((option) => (
                            <DocumentServiceCard
                                key={option.id}
                                option={option}
                                serviceName={serviceDetails.name}
                                onSelect={handleSelectService}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="w-full mx-auto">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                            How It Works
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {serviceDetails.process.map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4">
                                        {step.step}
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-2">{step.title}</h4>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <ServiceFAQ faqs={serviceDetails.faqs} />
        </div>
    )
}

export default ServiceDetailsClient
