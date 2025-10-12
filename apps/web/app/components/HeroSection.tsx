"use client"

import { Button } from '@ui/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import ServiceCard from './ServiceCard'
import { useFloatingBadgeAnimation } from '@/hooks/useFloatingBadgeAnimation'
import { SERVICES, HERO_CONTENT, IMAGES } from '@/constants/hero-section.constants'

const HeroSection = () => {
  const badgeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useFloatingBadgeAnimation(badgeRefs)

  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Service clicked: ${serviceTitle}`)
    // TODO: Implement navigation or modal logic
  }

  return (
    <section className="relative w-full min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-4 pb-8">
        <div className="text-left md:text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-semibold max-w-4xl mx-auto text-[#212121] mb-6">
            {HERO_CONTENT.title}
          </h1>
          <p className="text-lg text-[#5F6368] leading-relaxed max-w-3xl mx-auto">
            {HERO_CONTENT.description}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-center">
          <Button className="w-full md:w-auto px-8 rounded-2xl h-11 md:rounded-full bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            {HERO_CONTENT.cta} <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="relative z-10 md:absolute md:bottom-14 mt-6 md:mt-0 md:left-0 md:right-0 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pb-8 md:pb-0">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              iconColor={service.iconColor}
              iconBgColor={service.iconBgColor}
              onClick={() => handleServiceClick(service.title)}
            />
          ))}
        </div>
      </div>

      {/* Background Images */}
      <div className="absolute bottom-0 left-0 w-full h-auto z-0">
        <div className="flex justify-center">
          <Image
            src={IMAGES.mobile.src}
            alt={IMAGES.mobile.alt}
            width={IMAGES.mobile.width}
            height={IMAGES.mobile.height}
            className="w-full h-auto object-cover object-center md:hidden"
            priority
          />
          <Image
            src={IMAGES.desktop.src}
            alt={IMAGES.desktop.alt}
            width={IMAGES.desktop.width}
            height={IMAGES.desktop.height}
            className="w-full h-auto object-cover object-center hidden md:block"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection