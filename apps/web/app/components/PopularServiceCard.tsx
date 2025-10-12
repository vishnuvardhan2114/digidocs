import React from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { ServiceImage } from './ServiceImage'
import type { Service } from '@/constants/popular-services.constants'

interface PopularServiceCardProps {
  service: Service
  onClick?: (serviceId: string) => void
  priority?: boolean
}

export const PopularServiceCard = ({ service, onClick, priority = false }: PopularServiceCardProps) => {
  const handleClick = () => {
    onClick?.(service.id)
  }


  return (
    <div className="cursor-pointer group" onClick={handleClick}>
      {/* Image Card */}
      <div className="relative h-60 overflow-hidden rounded-xl hover:shadow-md transition-all duration-300">
        <ServiceImage
          src={service.imageUrl}
          alt={service.name}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={priority}
        />
        
        {/* Flag Icon Overlay */}
        {service.flagIcon && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
            <Image
              src={service.flagIcon}
              alt={`${service.name} flag`}
              width={24}
              height={24}
              className="object-cover rounded-full"
            />
            <span className="text-lg hidden">{service.flagIcon}</span>
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div className="mt-3">
        {/* Title and Rating Row */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-gray-900">
            {service.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-black text-black" />
            <span className="text-sm font-medium text-gray-700">
              {service.rating}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600">
          {service.description}
        </p>
      </div>
    </div>
  )
}

export type { PopularServiceCardProps }
