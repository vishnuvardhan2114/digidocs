export interface ServiceCategory {
  id: string
  name: string
  isActive?: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  rating: number
  imageUrl: string
  flagIcon?: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'all', name: 'Show all', isActive: true },
  { id: 'personal', name: 'Personal Docs', isActive: false },
  { id: 'general', name: 'General Docs', isActive: false },
  { id: 'financial', name: 'Financial Docs', isActive: false },
  { id: 'legal', name: 'Legal Docs', isActive: false },
]

export const SERVICES: Service[] = [
  // Personal Documents
  {
    id: 'pan-card',
    name: 'PAN Card',
    description: 'Apply for new PAN card or update existing one online',
    category: 'personal',
    rating: 4.8,
    imageUrl: '/assets/images/pan-card.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar Card',
    description: 'Get your Aadhaar card or update details quickly',
    category: 'personal',
    rating: 4.6,
    imageUrl: '/assets/images/aadhaar.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'voter-id',
    name: 'Voter ID',
    description: 'Register for voter ID or update your address',
    category: 'personal',
    rating: 4.4,
    imageUrl: '/assets/images/voter-id.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'passport',
    name: 'Passport',
    description: 'Apply for new passport or renew existing one',
    category: 'personal',
    rating: 4.7,
    imageUrl: '/assets/images/passport.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },

  // General Documents
  {
    id: 'driving-license',
    name: 'Driving License',
    description: 'Get your driving license or renew it online',
    category: 'general',
    rating: 4.5,
    imageUrl: '/assets/images/driving-license.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    description: 'Obtain birth certificate for various purposes',
    category: 'general',
    rating: 4.3,
    imageUrl: '/assets/images/birth-certificate.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'marriage-certificate',
    name: 'Marriage Certificate',
    description: 'Get marriage certificate for official purposes',
    category: 'general',
    rating: 4.6,
    imageUrl: '/assets/images/marriage-certificate.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'death-certificate',
    name: 'Death Certificate',
    description: 'Obtain death certificate for legal formalities',
    category: 'general',
    rating: 4.2,
    imageUrl: '/assets/images/death-certificate.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },

  // Financial Documents
  {
    id: 'bank-account',
    name: 'Bank Account Opening',
    description: 'Open new bank account with digital verification',
    category: 'financial',
    rating: 4.7,
    imageUrl: '/assets/images/bank-account.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Apply for credit card with instant approval',
    category: 'financial',
    rating: 4.4,
    imageUrl: '/assets/images/credit-card.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'loan-application',
    name: 'Loan Application',
    description: 'Apply for personal or business loans online',
    category: 'financial',
    rating: 4.3,
    imageUrl: '/assets/images/loan-application.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Get life, health, or vehicle insurance',
    category: 'financial',
    rating: 4.5,
    imageUrl: '/assets/images/insurance.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },

  // Legal Documents
  {
    id: 'power-of-attorney',
    name: 'Power of Attorney',
    description: 'Create power of attorney documents legally',
    category: 'legal',
    rating: 4.6,
    imageUrl: '/assets/images/power-of-attorney.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'will-document',
    name: 'Will Document',
    description: 'Create legally binding will documents',
    category: 'legal',
    rating: 4.4,
    imageUrl: '/assets/images/will-document.jpg',
            flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'rental-agreement',
    name: 'Rental Agreement',
    description: 'Create rental agreements for property',
    category: 'legal',
    rating: 4.5,
    imageUrl: '/assets/images/rental-agreement.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
  {
    id: 'property-deed',
    name: 'Property Deed',
    description: 'Transfer property deeds and registrations',
    category: 'legal',
    rating: 4.7,
    imageUrl: '/assets/images/property-deed.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
  },
]

export const POPULAR_SERVICES_CONTENT = {
  heading: 'Digital Documents & Remote Services',
  description: 'Digital Documents & Remote Services allow you to manage your important documents and services online with complete support and guidance. These services are designed to save your time and provide convenience. Browse all document services available to you!',
  ctaButton: 'Browse All Services',
} as const

export const SERVICES_PAGE_CONTENT = {
  heading: 'Digital Documents & Remote Services',
  description: 'Manage your important documents and services online with complete support and guidance. These services are designed to save your time and provide convenience. Browse all document services available to you around the world!',
} as const
