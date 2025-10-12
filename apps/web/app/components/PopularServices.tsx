"use client"

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ServiceCategoryChip } from './ServiceCategoryChip'
import { PopularServiceCard } from './PopularServiceCard'
import {
  SERVICE_CATEGORIES,
  POPULAR_SERVICES as SERVICES,
  POPULAR_SERVICES_CONTENT,
  type ServiceCategory,
} from '@/constants'
import { Button } from '@ui/components/ui/button'
import { Skeleton } from '@ui/components/ui/skeleton'
import { useRouter } from 'next/navigation'

const useServiceAnimations = (isVisible: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!isVisible || !containerRef.current) return
    const cards = cardsRef.current.filter(Boolean)

    // Initial state
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      scale: 0.95
    })

    // Animate in
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    })

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [isVisible])

  return { containerRef, cardsRef }
}

// Skeleton component for loading state
const ServiceCardSkeleton = () => (
  <div className="cursor-pointer group">
    {/* Image Card */}
    <div className="relative h-60 overflow-hidden rounded-xl">
      <Skeleton className="w-full h-full" />

      {/* Flag Icon Overlay Skeleton */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    </div>

    {/* Content Below Image */}
    <div className="mt-3">
      {/* Title and Rating Row */}
      <div className="flex items-center justify-between mb-1">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-1">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-6" />
        </div>
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
)

const useCarousel = (items: any[], itemsPerView: number) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const maxIndex = Math.max(0, items.length - itemsPerView)

  const nextSlide = () => {
    if (isAnimating || currentIndex >= maxIndex) return
    setIsAnimating(true)
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevSlide = () => {
    if (isAnimating || currentIndex <= 0) return
    setIsAnimating(true)
    setCurrentIndex(prev => Math.max(prev - 1, 0))
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Touch handlers with improved UX
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0]?.clientX || null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX || null)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 75 // Swipe left to go next
    const isRightSwipe = distance < -75 // Swipe right to go previous

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide()
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide()
    }
  }

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView)

  return {
    currentIndex,
    maxIndex,
    visibleItems,
    nextSlide,
    prevSlide,
    isAnimating,
    setCurrentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}

interface PopularServicesProps {
  showAllChip?: boolean
}

const PopularServices = ({ showAllChip = false }: PopularServicesProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    const filteredCategories = showAllChip ? SERVICE_CATEGORIES : SERVICE_CATEGORIES.filter(cat => cat.id !== 'all')
    return filteredCategories.map((cat, index) => ({
      ...cat,
      isActive: index === 0
    }))
  })
  const [selectedCategory, setSelectedCategory] = useState('personal')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()
  // Get filtered services based on selected category
  const filteredServices = SERVICES.filter(service => service.category === selectedCategory)

  // Carousel hook for mobile - show one card at a time
  const {
    currentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useCarousel(filteredServices, 1)

  // GSAP animations
  const { containerRef, cardsRef } = useServiceAnimations(isVisible)

  // Simulate loading state (you can replace this with actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simulate 1 second loading time

    return () => clearTimeout(timer)
  }, [selectedCategory])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    // Set loading state when changing category
    setIsLoading(true)
    // Update categories with new active state
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        isActive: cat.id === categoryId
      }))
    )
    setSelectedCategory(categoryId)
  }

  const handleServiceClick = (serviceId: string) => {
    console.log(`Service clicked: ${serviceId}`)
    router.push(`/services/${serviceId}`)
  }

  const handleBrowseAllClick = () => {
    console.log('Browse all services clicked')
    // TODO: Navigate to services page
  }

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
            {POPULAR_SERVICES_CONTENT.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {POPULAR_SERVICES_CONTENT.description}
          </p>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-start md:justify-center gap-3 mb-8 md:mb-12">
          {categories.map((category) => (
            <ServiceCategoryChip
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {/* Services Grid/Carousel */}
        <div ref={containerRef} className="relative">
          {isLoading ? (
            <>
              {/* Desktop Skeleton Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <ServiceCardSkeleton key={`skeleton-desktop-${index}`} />
                ))}
              </div>

              {/* Mobile Skeleton */}
              <div className="md:hidden">
                <div className="flex gap-4 overflow-hidden">
                  <div className="w-[85%] flex-shrink-0">
                    <ServiceCardSkeleton />
                  </div>
                  <div className="w-[85%] flex-shrink-0">
                    <ServiceCardSkeleton />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredServices.slice(0, 8).map((service, index) => (
                  <div
                    key={service.id}
                    ref={el => {
                      if (el) cardsRef.current[index] = el
                    }}
                  >
                    <PopularServiceCard
                      service={service}
                      onClick={handleServiceClick}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Carousel - Show current card with peek of next card */}
              <div className="md:hidden">
                <div
                  className="relative overflow-hidden "
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex * 85}%)`,
                    }}
                  >
                    {filteredServices.map((service, index) => (
                      <div key={service.id} className="w-[85%] flex-shrink-0 pr-4">
                        <div
                          ref={el => {
                            if (el) cardsRef.current[index] = el
                          }}
                        >
                          <PopularServiceCard
                            service={service}
                            onClick={handleServiceClick}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleBrowseAllClick}
            className="bg-gray-50 border hover:bg-gray-100 border-gray-300 text-gray-700 rounded-2xl text-sm font-medium hover:border-gray-400 hover:shadow-md transition-all duration-300"
          >
            {POPULAR_SERVICES_CONTENT.ctaButton}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PopularServices
