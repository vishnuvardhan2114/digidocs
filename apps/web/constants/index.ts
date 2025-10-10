// Hero Section Constants
export * from './hero-section.constants'

// Why Choose Us Constants
export * from './why-choose-us.constants'

// Popular Services Constants - rename conflicting exports
export { 
  SERVICE_CATEGORIES, 
  POPULAR_SERVICES_CONTENT,
  SERVICES as POPULAR_SERVICES 
} from './popular-services.constants'

// Export types
export type { Service, BadgeData } from './hero-section.constants'
export type { ProcessStep } from './why-choose-us.constants'
export type { ServiceCategory, Service as PopularService } from './popular-services.constants'

