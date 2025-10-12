import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Not Found | DigiDocs',
  description: 'The requested service could not be found. Browse our available document services.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Service Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          The service you're looking for doesn't exist or may have been moved. 
          Please check the URL or browse our available services.
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
