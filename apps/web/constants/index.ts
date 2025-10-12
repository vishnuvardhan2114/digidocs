// Hero Section Constants
export * from './hero-section.constants'

// Why Choose Us Constants
export * from './why-choose-us.constants'

// Popular Services Constants - rename conflicting exports
export { 
  SERVICE_CATEGORIES, 
  POPULAR_SERVICES_CONTENT,
  SERVICES_PAGE_CONTENT,
  SERVICES as POPULAR_SERVICES,
  SERVICES
} from './popular-services.constants'

// Service Details Constants
export {
  SERVICE_OPTIONS,
  SERVICE_DETAILS,
  getServiceDetails,
  getServiceOptions,
  getEstimatedDeliveryDate
} from './service-details.constants'

// Export types
export type { Service as HeroService, BadgeData } from './hero-section.constants'
export type { ProcessStep } from './why-choose-us.constants'
export type { ServiceCategory, Service as PopularService } from './popular-services.constants'
export type { ServiceDetails, ServiceOption } from './service-details.constants'

