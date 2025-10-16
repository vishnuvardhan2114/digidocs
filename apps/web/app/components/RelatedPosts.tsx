'use client'

import Link from 'next/link'
import BlogPostCard from './BlogPostCard'

interface RelatedPostsProps {
  posts: Array<{
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt: string
    mainImage: any
    estimatedReadingTime?: number
    author: {
      name: string
      slug: { current: string }
      image?: any
    }
    categories: Array<{
      title: string
      slug: { current: string }
      color: string
    }>
  }>
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Posts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
