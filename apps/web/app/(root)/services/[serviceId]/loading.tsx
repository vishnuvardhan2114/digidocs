export default function ServiceDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
            
            <div className="flex-1">
              <div className="w-96 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options Skeleton */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-96 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="w-64 h-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                    </div>
                  </div>
                  <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="w-48 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="flex justify-end">
                  <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section Skeleton */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
