"use client"

import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { Button } from '@ui/components/ui/button'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import gsap from 'gsap'

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(1) // Start with second item expanded
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const faqs = [
    {
      id: "01",
      question: "What document processing services does DigiDocs offer?",
      answer: "DigiDocs offers comprehensive document processing services including digital verification, biometric authentication, real-time tracking, and secure document storage for all your official document needs."
    },
    {
      id: "02", 
      question: "How does DigiDocs improve document processing efficiency?",
      answer: "DigiDocs boosts efficiency by automating document workflows, streamlining verification processes, and providing real-time tracking that supports faster, smarter document management decisions."
    },
    {
      id: "03",
      question: "What kind of support is provided for document processing?",
      answer: "We provide 24/7 customer support, comprehensive documentation, step-by-step tutorials, and dedicated account managers to ensure smooth document processing experiences."
    },
    {
      id: "04",
      question: "How secure is the data managed by DigiDocs?",
      answer: "DigiDocs uses enterprise-grade encryption, secure cloud storage, and follows strict compliance standards including GDPR and SOC 2 to ensure your documents and personal data remain completely secure."
    },
    {
      id: "05",
      question: "Can DigiDocs integrate with existing document management systems?",
      answer: "Yes, DigiDocs offers flexible API integration and can seamlessly connect with most existing document management systems, CRMs, and business applications."
    }
  ]

  // Initialize refs array
  useLayoutEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, faqs.length)
    iconRefs.current = iconRefs.current.slice(0, faqs.length)
    cardRefs.current = cardRefs.current.slice(0, faqs.length)
  }, [faqs.length])

  // Animate on mount for initially expanded item
  useLayoutEffect(() => {
    faqs.forEach((_, index) => {
      const answerEl = answerRefs.current[index]
      const iconEl = iconRefs.current[index]
      
      if (!answerEl || !iconEl) return

      if (index === expandedIndex) {
        // Set initial expanded state
        gsap.set(answerEl, {
          height: 'auto',
          opacity: 1,
          y: 0
        })
      } else {
        // Set initial collapsed state
        gsap.set(answerEl, {
          height: 0,
          opacity: 0,
          y: -10
        })
      }
    })
  }, [])

  // Handle animations when expandedIndex changes
  useEffect(() => {
    faqs.forEach((_, index) => {
      const answerEl = answerRefs.current[index]
      const iconEl = iconRefs.current[index]
      const cardEl = cardRefs.current[index]
      
      if (!answerEl || !iconEl || !cardEl) return

      const isExpanding = index === expandedIndex
      
      if (isExpanding) {
        // Expanding animation
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" }
        })

        timeline
          .to(cardEl, {
            backgroundColor: "#EFF6FF",
            borderColor: "#BFDBFE",
            duration: 0.3
          }, 0)
          .to(iconEl, {
            rotation: 180,
            duration: 0.4,
            ease: "back.out(1.7)"
          }, 0)
          .fromTo(answerEl,
            {
              height: 0,
              opacity: 0,
              y: -10
            },
            {
              height: 'auto',
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            }, 0.1)
      } else {
        // Collapsing animation
        const timeline = gsap.timeline({
          defaults: { ease: "power3.in" }
        })

        timeline
          .to(answerEl, {
            height: 0,
            opacity: 0,
            y: -10,
            duration: 0.3
          }, 0)
          .to(iconEl, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.in"
          }, 0)
          .to(cardEl, {
            backgroundColor: "#F9FAFB",
            borderColor: "transparent",
            duration: 0.2
          }, 0.1)
      }
    })
  }, [expandedIndex, faqs.length])

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          
          {/* Left Column - Introduction */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-[#212121] uppercase tracking-wide">
                FAQs
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
                Frequently ask<br />questions
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Experience intelligent, efficient, and sustainable document processing designed to drive progress.
              </p>
            </div>
            <Button className="bg-[#141414] hover:bg-gray-800 text-white rounded-lg px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium w-full sm:w-fit flex items-center gap-2 transition-colors">
              Know more
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => {
              const isExpanded = expandedIndex === index
              return (
                <div 
                  key={faq.id}
                  ref={(el) => { cardRefs.current[index] = el }}
                  className={`bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 shadow-sm ${
                    isExpanded 
                      ? 'border-2 border-blue-200' 
                      : 'border-2 border-transparent hover:bg-gray-100'
                  }`}
                  style={{ willChange: 'background-color, border-color' }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start sm:items-center justify-between text-left gap-3"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                      <span className="text-gray-400 text-xs sm:text-sm font-medium min-w-[2rem] sm:min-w-[2.5rem] md:min-w-[3rem] flex-shrink-0 pt-0.5 sm:pt-0">
                        {faq.id}
                      </span>
                      <h3 className="text-gray-900 font-semibold text-base sm:text-lg md:text-lg leading-snug sm:leading-normal pr-2">
                        {faq.question}
                      </h3>
                    </div>
                    <div 
                      className="flex-shrink-0"
                      ref={(el) => { iconRefs.current[index] = el }}
                      style={{ willChange: 'transform' }}
                    >
                      {isExpanded ? (
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    id={`faq-answer-${index}`}
                    ref={(el) => { answerRefs.current[index] = el }}
                    className="overflow-hidden"
                    style={{ willChange: 'height, opacity, transform' }}
                  >
                    <div className="mt-3 sm:mt-4 pl-8 sm:pl-10 md:pl-16 pr-2">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
