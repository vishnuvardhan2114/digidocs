'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@ui/components/ui/input'
import { Button } from '@ui/components/ui/button'

interface BlogSearchProps {
  initialQuery?: string
}

export default function BlogSearch({ initialQuery = '' }: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialQuery) {
        const params = new URLSearchParams(searchParams.toString())
        
        if (query.trim()) {
          params.set('q', query.trim())
        } else {
          params.delete('q')
        }
        
        // Reset to first page when searching
        params.delete('page')
        
        const newUrl = params.toString() 
          ? `/blog?${params.toString()}`
          : '/blog'
        
        router.push(newUrl)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, router, searchParams, initialQuery])

  const clearSearch = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    params.delete('page')
    
    const newUrl = params.toString() 
      ? `/blog?${params.toString()}`
      : '/blog'
    
    router.push(newUrl)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
