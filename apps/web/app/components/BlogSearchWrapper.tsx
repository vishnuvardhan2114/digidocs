'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import SearchBar from './SearchBar'

interface BlogSearchWrapperProps {
  initialQuery?: string
}

export default function BlogSearchWrapper({ initialQuery = '' }: BlogSearchWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (query: string) => {
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

  return (
    <SearchBar
      placeholder="Search blog posts..."
      onSearch={handleSearch}
      className="w-full"
    />
  )
}
