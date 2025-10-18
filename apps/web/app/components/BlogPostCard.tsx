'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { User } from 'lucide-react'

interface BlogPostCardProps {
    post: {
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
        tags?: Array<{
            title: string
            slug: { current: string }
        }>
    }
}


export default function BlogPostCard({ post }: BlogPostCardProps) {
    const imageUrl = post.mainImage
        ? urlFor(post.mainImage).width(400).height(280).url()
        : null

    return (
        <article >
            <Link href={`/blog/${post.slug.current}`} className="block">
                {/* Image as Card */}
                {imageUrl && (
                    <div className="relative h-60 w-full rounded-3xl overflow-hidden mb-4 group">
                        <Image
                            src={imageUrl}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover"
                        />
                        {/* Fade white overlay on hover */}
                        <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none rounded-3xl" />
                    </div>
                )}

                {/* Content Below */}
                <div className="space-y-3 p-2">
                    {/* Author and Tag Row */}
                    <div className="flex items-center justify-between">
                        {/* Author */}
                        <div className="flex items-center gap-2.5">
                            {post.author.image ? (
                                <div className="relative h-9 w-9 rounded-full overflow-hidden">
                                    <Image
                                        src={urlFor(post.author.image).width(36).height(36).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-4 w-4 text-gray-500" />
                                </div>
                            )}
                            <span className="text-[15px] text-[#212325] font-normal">{post.author.name}</span>
                        </div>

                        {/* Blog Tag */}
                        <span className="text-sm font-light bg-[#f3f1ff] text-[#7b64bc] px-2.5 py-1 rounded-full">
                            Blog
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-medium text-[#212325] line-clamp-2 leading-snug">
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-[#636669] line-clamp-2 leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
            </Link>
        </article>
    )
}