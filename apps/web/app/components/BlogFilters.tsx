'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/components/ui/select'

interface BlogFiltersProps {
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
    color: string
  }>
  tags: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
  selectedCategory?: string
  selectedTag?: string
}

export default function BlogFilters({ 
  categories, 
  tags, 
  selectedCategory, 
  selectedTag 
}: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    
    // Remove tag filter when category is selected
    params.delete('tag')
    params.delete('page')
    
    const newUrl = params.toString() 
      ? `/blog?${params.toString()}`
      : '/blog'
    
    router.push(newUrl)
  }

  const handleTagChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === 'all') {
      params.delete('tag')
    } else {
      params.set('tag', value)
    }
    
    // Remove category filter when tag is selected
    params.delete('category')
    params.delete('page')
    
    const newUrl = params.toString() 
      ? `/blog?${params.toString()}`
      : '/blog'
    
    router.push(newUrl)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Category Filter */}
      <div className="flex-1">
        <Select
          value={selectedCategory || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug.current}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tag Filter */}
      <div className="flex-1">
        <Select
          value={selectedTag || 'all'}
          onValueChange={handleTagChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag._id} value={tag.slug.current}>
                #{tag.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
