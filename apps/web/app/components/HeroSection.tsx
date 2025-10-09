import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-t from-blue-200 via-blue-100 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Your hero content goes here */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to DigiDocs
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Your digital document solution
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection