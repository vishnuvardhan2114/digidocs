export interface ServiceOption {
  id: string
  name: string
  description: string
  type: 'standard'
  price: number
  currency: string
  deliveryDays: number
  processingType: string
  stayPeriod: string
  validity: string
  isPopular?: boolean
  features: string[]
  requirements: string[]
  estimatedDelivery: string
}

export interface ServiceDetails {
  id: string
  name: string
  description: string
  category: string
  imageUrl: string
  flagIcon?: string
  rating: number
  reviewCount: number
  options: ServiceOption[]
  overview: {
    title: string
    content: string
  }
  benefits: string[]
  requirements: string[]
  process: {
    step: number
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

// Service options data
export const SERVICE_OPTIONS: Record<string, ServiceOption[]> = {
  'pan-card': [
    {
      id: 'pan-new',
      name: 'New PAN Card',
      description: 'Apply for a new PAN card (never issued before)',
      type: 'standard',
      price: 999,
      currency: 'INR',
      deliveryDays: 15,
      processingType: 'E-Card',
      stayPeriod: 'Lifetime',
      validity: 'Lifetime',
      isPopular: true,
      features: [
        'Online new application',
        'Digital verification',
        'Email & SMS updates',
        'Secure document handling'
      ],
      requirements: [
        'Identity proof (Aadhaar/Driving License)',
        'Address proof',
        'Date of birth proof',
        'Passport size photograph',
        'Mobile number for OTP'
      ],
      estimatedDelivery: '15-20 business days'
    },
    {
      id: 'pan-update',
      name: 'Update Existing PAN',
      description: 'Update or correct details on your existing PAN card',
      type: 'standard',
      price: 999,
      currency: 'INR',
      deliveryDays: 15,
      processingType: 'E-Card',
      stayPeriod: 'Lifetime',
      validity: 'Lifetime',
      features: [
        'Online update/correction process',
        'Digital verification',
        'Email & SMS notifications',
        'Secure document handling'
      ],
      requirements: [
        'Existing PAN card copy',
        'Proof of change/correction',
        'Supporting identity proof',
        'Supporting address proof',
        'Passport size photograph',
        'Mobile number for OTP'
      ],
      estimatedDelivery: '15-20 business days'
    }
  ],
  'aadhaar': [
    {
      id: 'aadhaar-standard',
      name: 'Aadhaar Card - Standard',
      description: 'Get your Aadhaar card or update details',
      type: 'standard',
      price: 799,
      currency: 'INR',
      deliveryDays: 21,
      processingType: 'E-Card',
      stayPeriod: 'Lifetime',
      validity: 'Lifetime',
      isPopular: true,
      features: [
        'Biometric verification',
        'Address update facility',
        'Mobile number update',
        'Email updates'
      ],
      requirements: [
        'Valid identity proof',
        'Address proof',
        'Biometric data',
        'Mobile number for OTP'
      ],
      estimatedDelivery: '21-25 business days'
    },
    {
      id: 'aadhaar-express',
      name: 'Aadhaar Card - Express',
      description: 'Fast track Aadhaar card processing',
      type: 'standard',
      price: 1999,
      currency: 'INR',
      deliveryDays: 10,
      processingType: 'E-Card',
      stayPeriod: 'Lifetime',
      validity: 'Lifetime',
      features: [
        'Priority biometric verification',
        'Express processing',
        'Dedicated support',
        'Real-time updates'
      ],
      requirements: [
        'Valid identity proof',
        'Address proof',
        'Biometric data',
        'Mobile number for OTP'
      ],
      estimatedDelivery: '10-12 business days'
    }
  ],
  'passport': [
    {
      id: 'passport-standard',
      name: 'Passport - Standard',
      description: 'Apply for new passport or renew existing one',
      type: 'standard',
      price: 2499,
      currency: 'INR',
      deliveryDays: 30,
      processingType: 'E-Passport',
      stayPeriod: '10 Years',
      validity: '10 Years',
      isPopular: true,
      features: [
        'Online application',
        'Document verification',
        'Police verification',
        'Email notifications'
      ],
      requirements: [
        'Birth certificate',
        'Identity proof',
        'Address proof',
        'Passport size photographs'
      ],
      estimatedDelivery: '30-35 business days'
    },
    {
      id: 'passport-express',
      name: 'Passport - Express',
      description: 'Fast track passport processing',
      type: 'standard',
      price: 4999,
      currency: 'INR',
      deliveryDays: 15,
      processingType: 'E-Passport',
      stayPeriod: '10 Years',
      validity: '10 Years',
      features: [
        'Priority processing',
        'Fast track verification',
        'Express delivery',
        'Dedicated support'
      ],
      requirements: [
        'Birth certificate',
        'Identity proof',
        'Address proof',
        'Passport size photographs'
      ],
      estimatedDelivery: '15-20 business days'
    },
    {
      id: 'passport-premium',
      name: 'Passport - Premium',
      description: 'Premium passport service with concierge support',
      type: 'standard',
      price: 7999,
      currency: 'INR',
      deliveryDays: 7,
      processingType: 'E-Passport',
      stayPeriod: '10 Years',
      validity: '10 Years',
      features: [
        'Premium concierge service',
        'Fastest processing',
        'Home pickup of documents',
        'Priority support'
      ],
      requirements: [
        'Birth certificate',
        'Identity proof',
        'Address proof',
        'Passport size photographs'
      ],
      estimatedDelivery: '7-10 business days'
    }
  ],
  'voter-id': [
    {
      id: 'voter-standard',
      name: 'Voter ID - Standard',
      description: 'Register for voter ID or update your address',
      type: 'standard',
      price: 599,
      currency: 'INR',
      deliveryDays: 21,
      processingType: 'E-Card',
      stayPeriod: 'Lifetime',
      validity: 'Lifetime',
      isPopular: true,
      features: [
        'Online registration',
        'Address update',
        'Digital verification',
        'Email updates'
      ],
      requirements: [
        'Identity proof',
        'Address proof',
        'Age proof',
        'Passport size photograph'
      ],
      estimatedDelivery: '21-25 business days'
    },
    {
      id: 'voter-express',
      name: 'Voter ID - Express',
      description: 'Fast track voter ID processing',
      type: 'standard',
      price: 1499,
      currency: 'INR',
      deliveryDays: 10,
      processingType: 'E-Card',
      stayPeriod: 'Lifetime',
      validity: 'Lifetime',
      features: [
        'Priority processing',
        'Express verification',
        'Fast delivery',
        'Dedicated support'
      ],
      requirements: [
        'Identity proof',
        'Address proof',
        'Age proof',
        'Passport size photograph'
      ],
      estimatedDelivery: '10-12 business days'
    }
  ]
}

// Service details data
export const SERVICE_DETAILS: Record<string, ServiceDetails> = {
  'pan-card': {
    id: 'pan-card',
    name: 'PAN Card Application',
    description: 'Apply for new PAN card or update existing one online with complete support and guidance.',
    category: 'personal',
    imageUrl: '/assets/images/pan-card.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
    rating: 4.8,
    reviewCount: 1247,
    options: SERVICE_OPTIONS['pan-card']!,
    overview: {
      title: 'About PAN Card',
      content: 'A Permanent Account Number (PAN) is a unique 10-character alphanumeric identifier issued by the Income Tax Department of India. It is mandatory for various financial transactions, tax filing, and identity verification purposes.'
    },
    benefits: [
      'Required for income tax filing',
      'Mandatory for high-value transactions',
      'Identity verification for banking',
      'Required for mutual fund investments',
      'Needed for property transactions'
    ],
    requirements: [
      'Identity proof (Aadhaar/Driving License)',
      'Address proof',
      'Passport size photograph',
      'Mobile number for OTP verification'
    ],
    process: [
      {
        step: 1,
        title: 'Document Upload',
        description: 'Upload required documents and fill the application form online.'
      },
      {
        step: 2,
        title: 'Verification',
        description: 'Our team verifies your documents and submits to IT Department.'
      },
      {
        step: 3,
        title: 'Processing',
        description: 'Income Tax Department processes your application.'
      },
      {
        step: 4,
        title: 'Delivery',
        description: 'Receive your PAN card at your registered address.'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to get a PAN card?',
        answer: 'Standard processing takes 15-20 business days, while express processing takes 7-10 business days.'
      },
      {
        question: 'What documents are required for PAN card?',
        answer: 'You need identity proof, address proof, and a passport size photograph along with your mobile number for OTP verification.'
      },
      {
        question: 'Can I update my PAN card details?',
        answer: 'Yes, you can update your PAN card details including name, address, and other information through our service.'
      }
    ]
  },
  'aadhaar': {
    id: 'aadhaar',
    name: 'Aadhaar Card Services',
    description: 'Get your Aadhaar card or update details quickly with our expert assistance.',
    category: 'personal',
    imageUrl: '/assets/images/aadhaar.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
    rating: 4.6,
    reviewCount: 2156,
    options: SERVICE_OPTIONS['aadhaar']!,
    overview: {
      title: 'About Aadhaar Card',
      content: 'Aadhaar is a 12-digit unique identity number issued by the Unique Identification Authority of India (UIDAI) to residents of India. It serves as proof of identity and address for various services.'
    },
    benefits: [
      'Universal identity proof',
      'Required for government schemes',
      'Banking and financial services',
      'Mobile number and address updates',
      'Biometric authentication'
    ],
    requirements: [
      'Valid identity proof',
      'Address proof',
      'Biometric data (fingerprints and iris)',
      'Mobile number for OTP verification'
    ],
    process: [
      {
        step: 1,
        title: 'Document Collection',
        description: 'Submit required documents and personal information.'
      },
      {
        step: 2,
        title: 'Biometric Capture',
        description: 'Visit our center for biometric data capture (fingerprints and iris scan).'
      },
      {
        step: 3,
        title: 'Verification',
        description: 'UIDAI verifies your information and processes the application.'
      },
      {
        step: 4,
        title: 'Card Generation',
        description: 'Your Aadhaar card is generated and delivered to your address.'
      }
    ],
    faqs: [
      {
        question: 'How long does Aadhaar card processing take?',
        answer: 'Standard processing takes 21-25 business days, while express processing takes 10-12 business days.'
      },
      {
        question: 'Can I update my Aadhaar details online?',
        answer: 'Yes, you can update your name, address, mobile number, and other details through our online service.'
      },
      {
        question: 'What if my biometric data is not clear?',
        answer: 'If biometric data is not clear, you may need to visit our center again for re-capture.'
      }
    ]
  },
  'passport': {
    id: 'passport',
    name: 'Passport Application',
    description: 'Apply for new passport or renew existing one with complete assistance and guidance.',
    category: 'personal',
    imageUrl: '/assets/images/passport.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
    rating: 4.7,
    reviewCount: 3421,
    options: SERVICE_OPTIONS['passport']!,
    overview: {
      title: 'About Passport',
      content: 'A passport is an official travel document issued by the government that certifies the identity and nationality of its holder for international travel purposes.'
    },
    benefits: [
      'International travel document',
      'Identity verification abroad',
      'Required for visa applications',
      'Emergency travel assistance',
      'Diplomatic support when needed'
    ],
    requirements: [
      'Birth certificate',
      'Identity proof (Aadhaar/PAN)',
      'Address proof',
      'Passport size photographs',
      'Educational certificates'
    ],
    process: [
      {
        step: 1,
        title: 'Application Form',
        description: 'Fill the passport application form with accurate details.'
      },
      {
        step: 2,
        title: 'Document Verification',
        description: 'Submit and verify all required documents.'
      },
      {
        step: 3,
        title: 'Police Verification',
        description: 'Police verification is conducted at your address.'
      },
      {
        step: 4,
        title: 'Passport Issue',
        description: 'Your passport is printed and delivered to your address.'
      }
    ],
    faqs: [
      {
        question: 'How long does passport processing take?',
        answer: 'Standard processing takes 30-35 business days, express takes 15-20 days, and premium takes 7-10 days.'
      },
      {
        question: 'What is the validity of a passport?',
        answer: 'Adult passports are valid for 10 years from the date of issue.'
      },
      {
        question: 'Can I track my passport application status?',
        answer: 'Yes, you can track your application status online using the application reference number.'
      }
    ]
  },
  'voter-id': {
    id: 'voter-id',
    name: 'Voter ID Registration',
    description: 'Register for voter ID or update your address with our expert assistance.',
    category: 'personal',
    imageUrl: '/assets/images/voter-id.jpg',
    flagIcon: '/assets/icons/india-flag.svg',
    rating: 4.4,
    reviewCount: 1876,
    options: SERVICE_OPTIONS['voter-id']!,
    overview: {
      title: 'About Voter ID',
      content: 'Voter ID or Electoral Photo Identity Card (EPIC) is an identity document issued by the Election Commission of India to eligible voters for voting in elections.'
    },
    benefits: [
      'Voting in elections',
      'Identity verification',
      'Address proof for various services',
      'Required for government benefits',
      'Participate in democratic process'
    ],
    requirements: [
      'Identity proof',
      'Address proof',
      'Age proof (birth certificate)',
      'Passport size photograph',
      'Mobile number for OTP'
    ],
    process: [
      {
        step: 1,
        title: 'Registration Form',
        description: 'Fill the voter registration form with personal details.'
      },
      {
        step: 2,
        title: 'Document Submission',
        description: 'Submit required documents for verification.'
      },
      {
        step: 3,
        title: 'Verification Process',
        description: 'Election Commission verifies your details and address.'
      },
      {
        step: 4,
        title: 'Card Generation',
        description: 'Your voter ID card is generated and delivered.'
      }
    ],
    faqs: [
      {
        question: 'How long does voter ID processing take?',
        answer: 'Standard processing takes 21-25 business days, while express processing takes 10-12 business days.'
      },
      {
        question: 'Can I update my address on voter ID?',
        answer: 'Yes, you can update your address on the voter ID through our service.'
      },
      {
        question: 'What is the minimum age for voter ID?',
        answer: 'You must be 18 years or above to be eligible for voter ID registration.'
      }
    ]
  }
}

// Helper function to get service details by ID
export const getServiceDetails = (serviceId: string): ServiceDetails | null => {
  return SERVICE_DETAILS[serviceId] || null
}

// Helper function to get service options by service ID
export const getServiceOptions = (serviceId: string): ServiceOption[] => {
  return SERVICE_OPTIONS[serviceId] || []
}

// Helper function to calculate estimated delivery date
export const getEstimatedDeliveryDate = (deliveryDays: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + deliveryDays + 2) // Add 2 days for processing
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}
