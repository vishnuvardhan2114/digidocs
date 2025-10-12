import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Option Not Found | DigiDocs',
  description: 'The requested service option could not be found. Please select a valid service option.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ServiceOptionNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Service Option Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          The service option you're looking for doesn't exist or may have been moved. 
          Please select a valid service option from our available services.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Browse All Services
          </Link>
          
          <div>
            <Link
              href="/"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
