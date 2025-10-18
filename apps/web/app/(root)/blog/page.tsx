import { Metadata } from 'next'
import { getPosts } from '@/lib/actions/blog'
import BlogPostCard from '@/app/components/BlogPostCard'
import BlogSearchWrapper from '@/app/components/BlogSearchWrapper'
import BlogPagination from '@/app/components/BlogPagination'

export const metadata: Metadata = {
  title: 'Blog | DigiDocs',
  description: 'Read our latest insights on digital document management, industry trends, and best practices.',
  openGraph: {
    title: 'Blog | DigiDocs',
    description: 'Read our latest insights on digital document management, industry trends, and best practices.',
    type: 'website',
  },
}

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    q?: string
    category?: string
    tag?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '0')
  const searchQuery = params.q

  // Fetch initial data with error handling
  let postsData
  
  try {
    postsData = await getPosts(page)
  } catch (error) {
    console.error('Error fetching blog data:', error)
    // Fallback data structure
    postsData = {
      posts: [],
      currentPage: 0,
      totalPages: 0,
      hasMore: false
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-[#212325] mb-6 tracking-tight">
            Blog & Latest News
          </h1>
          <p className="text-lg text-[#3f3e3d] max-w-3xl mx-auto leading-relaxed font-light">
            Stay updated with the latest insights on digital document management and best practices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            <div className="w-full lg:w-[50%] max-w-2xl">
              <BlogSearchWrapper initialQuery={searchQuery} />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {searchQuery && (
          <div className="mb-8">
            <div className="bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100">
              <p className="text-gray-700 font-medium">
                {postsData.posts.length > 0 
                  ? `Found ${postsData.posts.length} post${postsData.posts.length === 1 ? '' : 's'} for "${searchQuery}"`
                  : `No posts found for "${searchQuery}"`
                }
              </p>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {postsData.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
              {postsData.posts.map((post: any) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {postsData.totalPages > 1 && (
              <div className="flex justify-center">
                <BlogPagination
                  currentPage={postsData.currentPage}
                  totalPages={postsData.totalPages}
                  hasMore={postsData.hasMore}
                  searchParams={params}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-50 rounded-3xl p-12 max-w-md mx-auto border border-gray-100">
              <div className="text-gray-400 mb-6">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {postsData.posts.length === 0 && !searchQuery ? 'Unable to load posts' : 'No posts found'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {searchQuery 
                  ? 'Try adjusting your search terms or filters.'
                  : postsData.posts.length === 0 && !searchQuery
                  ? 'There was an issue loading the blog posts. Please try refreshing the page.'
                  : 'Check back soon for new content!'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}