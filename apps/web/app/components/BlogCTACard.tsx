'use client'

import { Button } from '@ui/components/ui/button'
import { ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function BlogCTACard() {
  return (
    <div className="space-y-6">
      {/* Main CTA Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl p-6 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
          <p className="text-blue-100 mb-6 text-sm leading-relaxed">
            Transform your document management with DigiDocs
          </p>
          <Link href="/services" target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm"
              size="lg"
            >
              Get Started Now
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-center text-sm text-gray-700">
          <span className="font-semibold">4.9/5</span> from 500+ customers
        </p>
      </div>
    </div>
  )
}
