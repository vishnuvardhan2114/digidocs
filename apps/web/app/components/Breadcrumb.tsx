'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
  isLast?: boolean
}

interface BreadcrumbProps {
  className?: string
  showHome?: boolean
}

// Breadcrumb configuration for different routes
const getBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
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
    
    // Determine label based on segment and context
    let label = segment
    
    // Handle specific route patterns
    if (segment === 'services') {
      label = 'Services'
    } else if (segment === 'sign-in') {
      label = 'Sign In'
    } else if (segment === 'sign-up') {
      label = 'Sign Up'
    } else if (segment === 'cookie-policy') {
      label = 'Cookie Policy'
    } else if (segment === 'privacy-policy') {
      label = 'Privacy Policy'
    } else if (segment === 'terms-of-use') {
      label = 'Terms of Use'
    } else if (segment === 'document-service') {
      label = 'Application'
    } else {
      if (i === 1 && segments[0] === 'services') {
        label = getServiceNameFromId(segment)
      } else if (i === 3 && segments[2] === 'document-service' && segments[1]) {
        label = getServiceOptionNameFromId(segments[1], segment)
      } else {
        label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
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
}

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
  
  return serviceNames[serviceId] || serviceId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  className = '', 
  showHome = true 
}) => {
  const pathname = usePathname()
  
  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null
  }

  const items = getBreadcrumbItems(pathname)

  // Filter out home if showHome is false
  const displayItems = showHome ? items : items.slice(1)

  return (
    <nav 
      className={`flex items-center bg-gray-50 space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {displayItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
          
          {item.isLast ? (
            <span 
              className="text-gray-900 font-medium truncate"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors truncate"
            >
              {index === 0 && showHome ? (
                <div className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>{item.label}</span>
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

export default Breadcrumb
