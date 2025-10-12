'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { getServiceDetails, getServiceOptions } from '@/constants/service-details.constants'

interface BreadcrumbItem {
  label: string
  href: string
  isLast?: boolean
}

interface DynamicBreadcrumbProps {
  className?: string
  showHome?: boolean
  serviceName?: string
  optionName?: string
}

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({ 
  className = '', 
  showHome = true,
  serviceName,
  optionName
}) => {
  const pathname = usePathname()
  
  const breadcrumbItems = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = []

    // Always start with home
    if (showHome) {
      items.push({
        label: 'Home',
        href: '/',
        isLast: false
      })
    }

    let currentPath = ''
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      currentPath += `/${segment}`
      
      let label = segment
      
      // Handle specific route patterns
      switch (segment) {
        case 'services':
          label = 'Services'
          break
        case 'sign-in':
          label = 'Sign In'
          break
        case 'sign-up':
          label = 'Sign Up'
          break
        case 'cookie-policy':
          label = 'Cookie Policy'
          break
        case 'privacy-policy':
          label = 'Privacy Policy'
          break
        case 'terms-of-use':
          label = 'Terms of Use'
          break
        case 'document-service':
          label = 'Application'
          break
        default:
          // Handle dynamic segments
          if (i === 1 && segments[0] === 'services') {
            // Service ID segment
            label = serviceName || getServiceNameFromId(segment)
          } else if (i === 3 && segments[2] === 'document-service') {
            // Service option ID segment
            label = optionName || getServiceOptionNameFromId(segments[1], segment)
          } else {
            // Default formatting
            label = formatSegmentLabel(segment)
          }
      }

      const isLast = i === segments.length - 1
      
      items.push({
        label,
        href: currentPath,
        isLast
      })
    }

    return items
  }, [pathname, showHome, serviceName, optionName])

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null
  }

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={`${item.href}-${index}`}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
          
          {item.isLast ? (
            <span 
              className="text-gray-900 font-medium truncate max-w-[200px]"
              aria-current="page"
              title={item.label}
            >
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors truncate max-w-[200px]"
              title={item.label}
            >
              {index === 0 && showHome ? (
                <div className="flex items-center gap-1">
                  <Home className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              ) : (
                item.label
              )}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

// Helper function to get service name from ID
const getServiceNameFromId = (serviceId: string): string => {
  try {
    const serviceDetails = getServiceDetails(serviceId)
    return serviceDetails?.name || formatSegmentLabel(serviceId)
  } catch {
    return formatSegmentLabel(serviceId)
  }
}

// Helper function to get service option name from IDs
const getServiceOptionNameFromId = (serviceId: string, optionId: string): string => {
  try {
    const serviceOptions = getServiceOptions(serviceId)
    const option = serviceOptions.find(opt => opt.id === optionId)
    return option?.name || 'Application Form'
  } catch {
    return 'Application Form'
  }
}

// Helper function to format segment labels
const formatSegmentLabel = (segment: string): string => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default DynamicBreadcrumb
