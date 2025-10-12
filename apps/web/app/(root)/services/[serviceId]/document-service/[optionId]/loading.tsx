export default function DocumentServiceLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="text-center">
            <div className="w-80 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div className="w-96 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Step Indicator Skeleton */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse ml-2"></div>
            </div>
            <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse ml-2"></div>
            </div>
            <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse ml-2"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i}>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons Skeleton */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
