'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface BreadcrumbContextType {
  customBreadcrumbs: BreadcrumbItem[]
  setCustomBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  clearCustomBreadcrumbs: () => void
}

interface BreadcrumbItem {
  label: string
  href: string
  isLast?: boolean
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined)

interface BreadcrumbProviderProps {
  children: ReactNode
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [customBreadcrumbs, setCustomBreadcrumbs] = useState<BreadcrumbItem[]>([])

  const clearCustomBreadcrumbs = () => {
    setCustomBreadcrumbs([])
  }

  return (
    <BreadcrumbContext.Provider
      value={{
        customBreadcrumbs,
        setCustomBreadcrumbs,
        clearCustomBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  )
}

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext)
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider')
  }
  return context
}

// Hook for setting breadcrumbs with service context
export const useServiceBreadcrumb = () => {
  const { setCustomBreadcrumbs, clearCustomBreadcrumbs } = useBreadcrumb()

  const setServiceBreadcrumbs = useCallback(
    (
      serviceName: string,
      serviceId: string,
      optionName?: string,
      optionId?: string
    ) => {
      const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: serviceName, href: `/services/${serviceId}` },
      ]

      if (optionName && optionId) {
        breadcrumbs.push({
          label: optionName,
          href: `/services/${serviceId}/document-service/${optionId}`,
          isLast: true,
        })
      } else {
        breadcrumbs[breadcrumbs.length - 1]!.isLast = true
      }

      setCustomBreadcrumbs(breadcrumbs)
    },
    [setCustomBreadcrumbs]
  )

  return {
    setServiceBreadcrumbs,
    clearCustomBreadcrumbs,
  }
}
