import { FileText, Shield, Home, Users, Lock, Building2, BadgeCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
}

export interface BadgeData {
  text: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  position: string
}

export const SERVICES: Service[] = [
  {
    title: 'PAN Card',
    description: 'Apply or update your PAN card online.',
    icon: FileText,
    iconColor: 'text-blue-600',
    iconBgColor: 'bg-blue-100',
  },
  {
    title: 'E-Stamp',
    description: 'Electronic document stamping service.',
    icon: Shield,
    iconColor: 'text-green-600',
    iconBgColor: 'bg-green-100',
  },
  {
    title: 'Rental Agreement',
    description: 'Create legal rental agreements.',
    icon: Home,
    iconColor: 'text-orange-600',
    iconBgColor: 'bg-orange-100',
  },
  {
    title: 'Support',
    description: 'Expert help for your documents.',
    icon: Users,
    iconColor: 'text-purple-600',
    iconBgColor: 'bg-purple-100',
  },
]

export const BADGES: BadgeData[] = [
  {
    text: '100% Secure',
    icon: Lock,
    iconColor: 'text-green-600',
    iconBgColor: 'bg-green-50',
    position: 'top-28 left-12 xl:left-20',
  },
  {
    text: 'Govt-Linked Services',
    icon: Building2,
    iconColor: 'text-blue-600',
    iconBgColor: 'bg-blue-50',
    position: 'top-20 right-12 xl:right-20',
  },
  {
    text: 'Trusted by 10,000+ Users',
    icon: BadgeCheck,
    iconColor: 'text-purple-600',
    iconBgColor: 'bg-purple-50',
    position: 'top-56 left-8 xl:left-16',
  },
]

export const HERO_CONTENT = {
  title: 'Your Government Documents, Done Seamlessly Online.',
  description: 'Apply, renew, or update official documents like PAN Card, E-Stamp, or Rental Agreements, all from the comfort of your home.',
  cta: 'Get Started',
} as const

export const IMAGES = {
  mobile: {
    src: '/assets/images/herosectionImageMobile.webp',
    alt: 'Hero Section Background Mobile',
    width: 1200,
    height: 600,
  },
  desktop: {
    src: '/assets/images/herosectionImage.png',
    alt: 'Hero Section Background Desktop',
    width: 1000,
    height: 600,
  },
} as const

