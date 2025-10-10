import React from 'react'
import type { ServiceCategory } from '@/constants'

interface ServiceCategoryChipProps {
  category: ServiceCategory
  onClick: (categoryId: string) => void
}

export const ServiceCategoryChip = ({ category, onClick }: ServiceCategoryChipProps) => {
  const isActive = category.isActive

  return (
    <button
      onClick={() => onClick(category.id)}
      className={`
        px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'bg-[#141414] text-white shadow-md' 
          : 'bg-[#f2f2f4] text-[#1d2425] hover:bg-gray-100 hover:shadow-sm'
        }
      `}
    >
      {category.name}
    </button>
  )
}

export type { ServiceCategoryChipProps }
