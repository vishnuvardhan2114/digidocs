
import { ChevronRight, LucideIcon } from 'lucide-react'
import React from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  onClick?: () => void
  className?: string
}

// Color mapping to ensure classes are always applied
const colorMap = {
  'bg-blue-100': 'bg-blue-100',
  'bg-green-100': 'bg-green-100',
  'bg-orange-100': 'bg-orange-100',
  'bg-purple-100': 'bg-purple-100',
  'text-blue-600': 'text-blue-600',
  'text-green-600': 'text-green-600',
  'text-orange-600': 'text-orange-600',
  'text-purple-600': 'text-purple-600',
} as const

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-5 
        hover:shadow-xl transition-all duration-300 
        cursor-pointer hover:-translate-y-1
        border border-gray-100
        ${className}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div 
          className={`w-10 h-10 ${colorMap[iconBgColor as keyof typeof colorMap] || iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
          data-bg-color={iconBgColor}
          data-icon-color={iconColor}
        >
          <Icon className={`w-5 h-5 ${colorMap[iconColor as keyof typeof colorMap] || iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-700 truncate">
            {title}
          </h3>
          <p className="text-sm font-light text-gray-600 mt-1 leading-tight">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>
    </div>
  )
}

export default ServiceCard
