import React, { useState } from 'react'
import Image from 'next/image'

interface ServiceImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  priority?: boolean
}

export const ServiceImage = ({ src, alt, className, fill = true, priority = false }: ServiceImageProps) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Image
        src="https://a-us.storyblok.com/f/1018409/1120x500/2c919b18d2/cover.webp/m/1400x800/filters:quality(90)"
        alt={alt}
        fill={fill}
        className={className}
        style={{ objectFit: 'cover' }}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setHasError(true)}
      priority={priority}
    />
  )
}

export type { ServiceImageProps }
