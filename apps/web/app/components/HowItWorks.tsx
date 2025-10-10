"use client"

import React from 'react'
import { ProcessStepItem } from './ProcessStepItem'
import { PROCESS_STEPS, WHY_CHOOSE_US_CONTENT } from '@/constants'

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Introduction */}
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="text-gray-900">
                  {WHY_CHOOSE_US_CONTENT.heading.main}
                </span>
                <br />
                <span className="text-blue-600 italic">
                  {WHY_CHOOSE_US_CONTENT.heading.highlight}
                </span>
              </h2>
              
              <p className="text-lg leading-relaxed text-gray-700">
                {WHY_CHOOSE_US_CONTENT.description}
              </p>
            </div>
          </div>

          {/* Right Column - Process Steps */}
          <div className="space-y-6">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStepItem
                key={step.id}
                step={step}
                isLast={index === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
