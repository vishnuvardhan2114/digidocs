import React from 'react'
import type { BadgeData } from '@/constants'

interface FloatingBadgeProps {
  badge: BadgeData
  badgeRef: React.RefObject<HTMLDivElement | null>
}

export const FloatingBadge = ({ badge, badgeRef }: FloatingBadgeProps) => {
  const Icon = badge.icon

  return (
    <div ref={badgeRef} className={`absolute z-20 ${badge.position}`}>
      <div className="group bg-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${badge.iconBgColor}`}>
          <Icon className={`w-4 h-4 ${badge.iconColor}`} />
        </div>
        <span className="text-sm font-medium text-gray-700">{badge.text}</span>
      </div>
    </div>
  )
}

export type { FloatingBadgeProps }

