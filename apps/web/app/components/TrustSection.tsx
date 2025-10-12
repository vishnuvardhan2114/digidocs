"use client"

import { Button } from '@ui/components/ui/button'
import { Globe, MessageCircle, Scale } from 'lucide-react'
import Image from 'next/image'

const TrustSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Explore Documents",
      description: "Discover which document services you need and get instant quotes tailored to your requirements."
    },
    {
      icon: MessageCircle,
      title: "Expert Consultation",
      description: "Connect with our document specialists for personalized guidance on your specific needs."
    },
    {
      icon: Scale,
      title: "Professional Services",
      description: "Work with certified professionals through our streamlined document processing platform."
    }
  ]

  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Mobile Image - Shows on top for smaller devices */}
          <div className="lg:hidden order-1">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/assets/images/trustsection.webp"
                alt="Happy customer with approved documents"
                width={400}
                height={500}
                className="w-full h-auto rounded-lg object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-3xl font-semibold text-[#141414] leading-tight">
                Take The Stress Out Of The Document Application Process
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Making document processing smoother than ever, DigiDocs offers specialized tools and services tailored to your needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-8 py-3 bg-[#141414] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Get Started
              </Button>
              <Button variant="outline" className="px-8 py-3 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </Button>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                      <IconComponent className="md:w-6 md:h-6 w-5 h-5 text-[#141414]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-[#141414]">{feature.title}</h3>
                      <p className="text-gray-600 md:text-base text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop Image - Shows on right for larger devices */}
          <div className="hidden lg:block order-2">
            <div className="relative w-full max-w-lg mx-auto">
              <Image
                src="/assets/images/trustsection.webp"
                alt="Happy customer with approved documents"
                width={500}
                height={600}
                className="w-full h-auto rounded-lg object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TrustSection
