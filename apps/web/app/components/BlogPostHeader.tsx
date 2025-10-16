'use client'

import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { urlFor } from '@/lib/sanity/image'

interface BlogPostHeaderProps {
  post: {
    title: string
    publishedAt: string
    mainImage: any
    author: {
      name: string
      image?: any
    }
    categories: Array<{
      title: string
      slug: { current: string }
      color: string
    }>
    estimatedReadingTime?: number
  }
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null

  return (
    <header className="mb-10 w-full">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#212325] mb-6 leading-tight w-full">
        {post.title}
      </h1>

      {/* Author Info and Date */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {/* Author Image */}
          {post.author.image && (
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={urlFor(post.author.image).width(48).height(48).url()}
                alt={post.author.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          )}
          
          {/* Author Info */}
          <div>
            <p className="font-medium text-[#212325]">{post.author.name}</p>
            <p className="text-sm font-light text-[#636669]">Content Writer</p>
          </div>
        </div>

        {/* Last Update Date */}
        <div className="text-right">
          <p className="text-sm font-medium text-[#212325]">Last update</p>
          <p className="text-sm font-light text-[#636669]">
            {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: false })}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={imageUrl}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  )
}
