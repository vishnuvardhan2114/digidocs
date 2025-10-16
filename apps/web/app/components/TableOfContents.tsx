'use client'

import { useState, useEffect } from 'react'

interface TableOfContentsProps {
  content: any[]
}

interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from content
  useEffect(() => {
    const headings: TocItem[] = []
    
    const extractHeadings = (blocks: any[]) => {
      blocks.forEach((block) => {
        if (block._type === 'block' && block.style && block.style.startsWith('h')) {
          const level = parseInt(block.style.substring(1))
          if (level >= 1 && level <= 4) {
            const text = block.children
              ?.map((child: any) => child.text)
              .join('') || ''
            
            if (text.trim()) {
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
              
              headings.push({
                id,
                title: text,
                level,
              })
            }
          }
        }
      })
    }

    extractHeadings(content)
    setToc(headings)
  }, [content])

  // Handle scroll to update active heading
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc.map(item => document.getElementById(item.id)).filter(Boolean)
      
      if (headingElements.length === 0) return

      const scrollPosition = window.scrollY + 100

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(element.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (toc.length === 0) {
    return null
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#212325]">Table of Contents</h3>
      </div>
      
      <div className="border-b border-gray-200 mb-4"></div>

      <nav className="space-y-1">
        {toc.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(item.id)}
            className={`block w-full text-left text-sm transition-colors ${
              activeId === item.id
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
          >
            {item.level > 1 && <span className="text-gray-400 mr-2">•</span>}
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  )
}
