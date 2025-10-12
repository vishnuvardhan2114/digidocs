import React from 'react'
import type { ProcessStep } from '@/constants'

interface ProcessStepItemProps {
  step: ProcessStep
  isLast?: boolean
}

export const ProcessStepItem = ({ step, isLast = false }: ProcessStepItemProps) => {
  return (
    <div className="relative">
      <div className="flex gap-4">
        {/* Step Number */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 border-2 border-blue-600 rounded-md">
            <span className="text-sm font-semibold text-blue-600">
              {step.id}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            {step.description}
          </p>
        </div>
      </div>

      {/* Divider Line */}
      {!isLast && (
        <div className="absolute left-5 top-10 w-px h-full bg-gray-400"></div>
      )}
    </div>
  )
}

export type { ProcessStepItemProps }
