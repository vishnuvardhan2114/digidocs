'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { useBreadcrumb } from './BreadcrumbProvider'

interface BreadcrumbItem {
  label: string
  href: string
  isLast?: boolean
}

const AppBreadcrumb: React.FC<{ className?: string }> = ({ className = '' }) => {
  const pathname = usePathname()
  const { customBreadcrumbs } = useBreadcrumb()

  // Only show breadcrumb on service details pages
  const isServiceDetailsPage = pathname.startsWith('/services/') && 
    (pathname.includes('/document-service/') || 
     pathname.match(/\/services\/[^/]+$/)) // matches /services/[serviceId] but not /services

  const breadcrumbItems = useMemo(() => {
    // Use custom breadcrumbs if available
    if (customBreadcrumbs.length > 0) {
      return customBreadcrumbs
    }

    // Generate default breadcrumbs based on pathname
    return generateBreadcrumbs(pathname)
  }, [pathname, customBreadcrumbs])

  // Early returns after all hooks have been called
  if (!isServiceDetailsPage) {
    return null
  }

  // Don't show breadcrumb if no items
  if (breadcrumbItems.length === 0) {
    return null
  }

  return (
    <div className={`py-3 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <nav 
          className="flex items-center space-x-1 text-sm"
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
                  {index === 0 ? (
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
      </div>
    </div>
  )
}

// Generate breadcrumbs based on pathname
const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []

  // Always start with home
  items.push({
    label: 'Home',
    href: '/',
    isLast: false
  })

  let currentPath = ''
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (!segment) continue
    
    currentPath += `/${segment}`
    
    let label = getSegmentLabel(segment, segments, i)
    const isLast = i === segments.length - 1
    
    items.push({
      label,
      href: currentPath,
      isLast
    })
  }

  return items
}

// Get label for a path segment
const getSegmentLabel = (segment: string, segments: string[], index: number): string => {
  // Handle specific route patterns
  const routeLabels: Record<string, string> = {
    'services': 'Services',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    'cookie-policy': 'Cookie Policy',
    'privacy-policy': 'Privacy Policy',
    'terms-of-use': 'Terms of Use',
    'document-service': 'Application',
  }

  if (routeLabels[segment]) {
    return routeLabels[segment]
  }

  // Handle dynamic segments
  if (index === 1 && segments[0] === 'services') {
    // Service ID segment
    return getServiceNameFromId(segment)
  } else if (index === 3 && segments[2] === 'document-service' && segments[1]) {
    // Service option ID segment
    return getServiceOptionNameFromId(segments[1], segment)
  }

  // Default formatting
  return formatSegmentLabel(segment)
}

// Helper function to get service name from ID
const getServiceNameFromId = (serviceId: string): string => {
  const serviceNames: Record<string, string> = {
    'pan-card': 'PAN Card',
    'aadhaar': 'Aadhaar Card',
    'passport': 'Passport',
    'voter-id': 'Voter ID',
    'driving-license': 'Driving License',
    'birth-certificate': 'Birth Certificate',
    'marriage-certificate': 'Marriage Certificate',
    'death-certificate': 'Death Certificate',
    'bank-account': 'Bank Account',
    'credit-card': 'Credit Card',
    'loan-application': 'Loan Application',
    'insurance': 'Insurance',
    'power-of-attorney': 'Power of Attorney',
    'will-document': 'Will Document',
    'rental-agreement': 'Rental Agreement',
    'property-deed': 'Property Deed'
  }
  
  return serviceNames[serviceId] || formatSegmentLabel(serviceId)
}

// Helper function to get service option name from IDs
const getServiceOptionNameFromId = (serviceId: string, optionId: string): string => {
  const optionNames: Record<string, Record<string, string>> = {
    'pan-card': {
      'pan-standard': 'Standard Processing',
      'pan-express': 'Express Processing'
    },
    'aadhaar': {
      'aadhaar-standard': 'Standard Processing',
      'aadhaar-express': 'Express Processing'
    },
    'passport': {
      'passport-standard': 'Standard Processing',
      'passport-express': 'Express Processing',
      'passport-premium': 'Premium Processing'
    },
    'voter-id': {
      'voter-standard': 'Standard Processing',
      'voter-express': 'Express Processing'
    }
  }
  
  return optionNames[serviceId]?.[optionId] || 'Application Form'
}

// Helper function to format segment labels
const formatSegmentLabel = (segment: string): string => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default AppBreadcrumb
