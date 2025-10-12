'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PopularServiceCard } from '@/app/components/PopularServiceCard'
import { ServiceCategoryChip } from '@/app/components/ServiceCategoryChip'
import SearchBar from '@/app/components/SearchBar'
import {
    SERVICES,
    SERVICE_CATEGORIES,
    SERVICES_PAGE_CONTENT,
    type Service,
    type ServiceCategory
} from '@/constants/popular-services.constants'
import TestimonialsBanner from '@/app/components/TestimonialsBanner'

interface ServicesPageClientProps { }

export const ServicesPageClient: React.FC<ServicesPageClientProps> = () => {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [categories, setCategories] = useState<ServiceCategory[]>(SERVICE_CATEGORIES)
    const [searchQuery, setSearchQuery] = useState<string>('')

    // Memoize filtered services for performance
    const filteredServices = useMemo(() => {
        let services = SERVICES

        // Filter by category
        if (selectedCategory !== 'all') {
            services = services.filter(service => service.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim()
            services = services.filter(service =>
                service?.name?.toLowerCase().includes(query) ||
                service.description.toLowerCase().includes(query) ||
                service.category.toLowerCase().includes(query)
            )
        }

        return services
    }, [selectedCategory, searchQuery])

    const handleCategoryClick = useCallback((categoryId: string) => {
        // Update categories with new active state
        setCategories(prev =>
            prev.map(cat => ({
                ...cat,
                isActive: cat.id === categoryId
            }))
        )
        setSelectedCategory(categoryId)
    }, [])

    const handleServiceClick = useCallback((serviceId: string) => {
        router.push(`/services/${serviceId}`)
    }, [router])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-4 px-4 lg:pb-10 lg:pt-32">
                <div className="max-w-7xl md:mx-auto text-start md:text-center">
                    <h1 className="text-4xl md:text-4xl font-semibold text-[#212121] mb-6">
                        {SERVICES_PAGE_CONTENT.heading}
                    </h1>
                    <p className="text-base font-light text-[#5F6368] max-w-3xl mx-auto leading-relaxed">
                        {SERVICES_PAGE_CONTENT.description}
                    </p>
                </div>
            </section>

            {/* Search Bar */}
            <section className="py-4 px-4 lg:pb-6 pb-4">
                <div className="max-w-2xl mx-auto">
                    <SearchBar
                        placeholder="Search services, categories, or descriptions..."
                        onSearch={handleSearch}
                        className="w-full"
                        debounceMs={300}
                    />
                </div>
            </section>

            {/* Filter Categories */}
            <section className="py-4 px-4 lg:pb-10 pb-8">
                <div className="max-w-7xl md:mx-auto">
                    <div className="flex flex-wrap justify-start md:justify-center gap-3">
                        {categories.map((category) => (
                            <ServiceCategoryChip
                                key={category.id}
                                category={category}
                                onClick={handleCategoryClick}
                            />
                        ))}
                    </div>
                </div>
            </section>



            {/* Services Grid */}
            <section className="px-4 lg:pb-10 pb-8">
                <div className="max-w-7xl mx-auto">
                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredServices.map((service, index) => (
                            <PopularServiceCard
                                key={service.id}
                                service={service}
                                onClick={handleServiceClick}
                                priority={index < 8}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredServices.length === 0 && (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 mx-auto mb-6 bg-[#F0F0F0] rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-[#5F6368]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-[#212121] mb-2">
                                    {searchQuery ? 'No matching services found' : 'No services found'}
                                </h3>
                                <p className="text-[#5F6368] mb-6">
                                    {searchQuery
                                        ? `No services match "${searchQuery}". Try different keywords or browse all services.`
                                        : 'Try selecting a different category or browse all services.'
                                    }
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleCategoryClick('all')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Browse All Services
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <section >
                        <TestimonialsBanner />
                    </section>
                </div>
            </section>

        </div>
    )
}
