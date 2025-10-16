'use client'

import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface BlogPostContentProps {
  content: any[]
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value).width(800).height(400).url()
      return (
        <div className="my-8">
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-500 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <div className="my-6">
          <SyntaxHighlighter
            language={value.language || 'javascript'}
            style={oneDark}
            className="rounded-lg text-sm"
            showLineNumbers
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => {
      const text = children?.toString() || ''
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      
      return (
        <h1 
          id={id}
          className="text-3xl font-bold text-[#1f2227] mt-8 mb-4 first:mt-0 scroll-mt-20"
        >
          {children}
        </h1>
      )
    },
    h2: ({ children }: any) => {
      const text = children?.toString() || ''
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      
      return (
        <h2 
          id={id}
          className="text-2xl font-bold text-[#1f2227] mt-6 mb-3 scroll-mt-20"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }: any) => {
      const text = children?.toString() || ''
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      
      return (
        <h3 
          id={id}
          className="text-xl font-bold text-[#1f2227] mt-5 mb-2 scroll-mt-20"
        >
          {children}
        </h3>
      )
    },
    h4: ({ children }: any) => {
      const text = children?.toString() || ''
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      
      return (
        <h4 
          id={id}
          className="text-lg font-bold text-[#1f2227] mt-4 mb-2 scroll-mt-20"
        >
          {children}
        </h4>
      )
    },
    normal: ({ children }: any) => (
      <p className="text-[#212325] leading-relaxed mb-4 font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-3 mb-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside space-y-2 mb-4 text-gray-700 ml-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start bg-gray-100 p-3 rounded-lg">
        <span className="w-[6px] h-[6px] bg-gray-800 rounded-full mt-3 mr-3 flex-shrink-0"></span>
        <span className="text-[#212325] leading-relaxed font-light">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-[#212325] leading-relaxed font-light">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  )
}
