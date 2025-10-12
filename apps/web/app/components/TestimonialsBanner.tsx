"use client"

import React from 'react'
import { AvatarCircles } from '@ui/components/ui/avatar-circles'
import { Button } from '@ui/components/ui/button'

interface TestimonialsBannerProps {
  className?: string
}

const TestimonialsBanner: React.FC<TestimonialsBannerProps> = ({ className = '' }) => {
  const handleCTAClick = () => {
    console.log('Join our family clicked')
    // TODO: Implement navigation or modal logic
  }

  // Client avatar data for AvatarCircles component
  const clientAvatars = [
    { 
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      profileUrl: '#'
    },
    { 
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      profileUrl: '#'
    },
    { 
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      profileUrl: '#'
    },
    { 
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      profileUrl: '#'
    },
    { 
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      profileUrl: '#'
    },
  ]

  return (
    <section className={`py-10 md:py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#131315] rounded-2xl p-6 md:p-10 relative overflow-hidden md:h-40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-6 h-full">
            {/* Client Avatars */}
            <div className="flex justify-center md:justify-start md:flex-shrink-0 pl-2 pr-6">
              <AvatarCircles 
                avatarUrls={clientAvatars}
                numPeople={0}
                className="scale-110 md:scale-150"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left md:flex md:flex-col md:justify-center">
              <h2 className="text-lg md:text-2xl font-medium text-[#f9f9f9] mb-2 md:mb-3 leading-tight">
                Trusted by 10,000+ families nationwide
              </h2>
              <p className="text-sm font-normal text-[#eff0f2] leading-relaxed max-w-lg mx-auto md:mx-0">
                Experience seamless document processing from the comfort of your home. Join thousands of satisfied families who trust us with their important paperwork.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center md:justify-end md:items-center md:flex-shrink-0">
              <Button
                onClick={handleCTAClick}
                className="bg-[#eff0f2] text-[#1d2425] font-medium rounded-xl text-sm hover:bg-[#e5e7eb]"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsBanner