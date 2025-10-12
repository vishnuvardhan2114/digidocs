'use client'

import React, { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { gsap } from 'gsap'

interface Step {
  id: number
  label: string
}

interface StepIndicatorProps {
  currentStep: number
  steps: Step[]
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Animate step circles
    stepRefs.current.forEach((stepEl, index) => {
      if (!stepEl) return

      const step = index + 1
      const isCompleted = currentStep > step
      const isCurrent = currentStep === step

      if (isCompleted) {
        // Completed step animation
        gsap.to(stepEl, {
          scale: 1,
          backgroundColor: '#0d9488',
          borderColor: '#0d9488',
          duration: 0.4,
          ease: 'back.out(1.7)',
        })
      } else if (isCurrent) {
        // Current step animation - pulse effect
        gsap.to(stepEl, {
          scale: 1.1,
          backgroundColor: '#0d9488',
          borderColor: '#0d9488',
          duration: 0.4,
          ease: 'back.out(1.7)',
        })
        
        // Pulse animation for current step
        gsap.to(stepEl, {
          keyframes: [
            { scale: 1.1 },
            { scale: 1.15 },
            { scale: 1.1 },
          ],
          duration: 1.5,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 0.4,
        })
      } else {
        // Inactive step
        gsap.to(stepEl, {
          scale: 1,
          backgroundColor: '#e5e7eb',
          borderColor: '#e5e7eb',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    })

    // Animate connecting lines
    lineRefs.current.forEach((lineEl, index) => {
      if (!lineEl) return

      const step = index + 1
      const isCompleted = currentStep > step

      gsap.to(lineEl, {
        scaleX: isCompleted ? 1 : 0,
        transformOrigin: 'left',
        backgroundColor: isCompleted ? '#0d9488' : '#e5e7eb',
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      })
    })

    // Animate labels
    labelRefs.current.forEach((labelEl, index) => {
      if (!labelEl) return

      const step = index + 1
      const isActive = currentStep >= step

      gsap.to(labelEl, {
        color: isActive ? '#0d9488' : '#6b7280',
        fontWeight: currentStep === step ? '600' : '500',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  }, [currentStep])

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div className="relative mb-3">
                <div
                  ref={(el) => {
                    stepRefs.current[step.id - 1] = el
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm border-4 border-transparent shadow-lg relative z-10 transition-all"
                  style={{
                    backgroundColor: currentStep >= step.id ? '#0d9488' : '#e5e7eb',
                  }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <span className={currentStep === step.id ? 'text-white' : 'text-gray-600'}>
                      {step.id}
                    </span>
                  )}
                </div>
                
                {/* Glow effect for current step */}
                {currentStep === step.id && (
                  <div className="absolute inset-0 rounded-full bg-teal-400 opacity-30 blur-md animate-pulse" />
                )}
              </div>

              {/* Step Label */}
              <span
                ref={(el) => {
                  labelRefs.current[step.id - 1] = el
                }}
                className="text-sm font-light text-center transition-all max-w-[100px] md:max-w-none"
                style={{
                  color: currentStep >= step.id ? '#0d9488' : '#6b7280',
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mb-8 mx-2 relative h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={(el) => {
                    lineRefs.current[index] = el
                  }}
                  className="absolute inset-0 bg-teal-600 rounded-full"
                  style={{
                    transform: currentStep > step.id ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default StepIndicator

