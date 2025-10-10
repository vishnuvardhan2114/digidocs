export interface ProcessStep {
  id: number
  title: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Choose Your Service',
    description: 'Select the type of document you need — from PAN to E-Stamp and more.',
  },
  {
    id: 2,
    title: 'Upload Documents',
    description: 'Upload your scanned ID proofs or required details securely.',
  },
  {
    id: 3,
    title: 'Make Payment',
    description: 'Pay safely through our encrypted payment gateway.',
  },
  {
    id: 4,
    title: 'Receive Your Document',
    description: 'Get your verified document delivered digitally or by courier.',
  },
]

export const WHY_CHOOSE_US_CONTENT = {
  heading: {
    main: 'How DigiDocs',
    highlight: 'Works.',
  },
  description: 'Discover why businesses trust DigiDocs for innovative, reliable, and tailored document solutions. From exceptional quality to timely delivery and lasting partnerships, we deliver measurable results that drive success.',
} as const
