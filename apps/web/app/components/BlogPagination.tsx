'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@ui/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages?: number
  hasMore: boolean
  searchParams: Record<string, string | undefined>
}

export default function BlogPagination({ 
  currentPage, 
  totalPages, 
  hasMore, 
  searchParams 
}: BlogPaginationProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    
    if (page === 0) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    const newUrl = params.toString() 
      ? `/blog?${params.toString()}`
      : '/blog'
    
    router.push(newUrl)
  }

  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    
    if (!totalPages || totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 0; i < (totalPages || 0); i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      const start = Math.max(0, currentPage - 2)
      const end = Math.min(totalPages - 1, start + maxVisible - 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  if (visiblePages.length <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center space-x-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => navigateToPage(page)}
            className="w-10 h-10 p-0"
          >
            {page + 1}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasMore}
        className="flex items-center space-x-1"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
