import React from 'react'

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="py-16 px-4 lg:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-16 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg max-w-4xl mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Filter Categories Skeleton */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-24 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-60 bg-gray-200 rounded-xl mb-3"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
