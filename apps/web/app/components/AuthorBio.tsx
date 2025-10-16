'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { PortableText } from '@portabletext/react'

interface AuthorBioProps {
  author: {
    name: string
    slug: { current: string }
    image?: any
    bio?: any[]
    socialLinks?: {
      twitter?: string
      linkedin?: string
      github?: string
      website?: string
    }
  }
}

const bioComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-gray-600 leading-relaxed">
        {children}
      </p>
    ),
  },
}

export default function AuthorBio({ author }: AuthorBioProps) {
  const imageUrl = author.image 
    ? urlFor(author.image).width(80).height(80).url()
    : null

  return (
    <div className="">
      <div className="flex items-start space-x-4">
        {/* Author Image */}
        {imageUrl && (
          <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-[#212325]">
                {author.name}
              </h3>
              <p className="text-sm text-[#636669] font-light">
                Content Writer
              </p>
            </div>
            <Link
              href={`/blog/author/${author.slug.current}`}
              className="px-4 py-3 border border-gray-300 rounded-lg text-[#212325] text-sm hover:bg-gray-50 transition-colors"
            >
              View author
            </Link>
          </div>

          {/* Bio */}
          {author.bio && (
            <div className="mb-4 text-[#212325] font-light">
              <PortableText value={author.bio} components={bioComponents} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
