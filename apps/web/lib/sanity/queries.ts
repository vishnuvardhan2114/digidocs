import { groq } from 'next-sanity'

// Get all published posts with pagination
export const postsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    estimatedReadingTime,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get total count of published posts
export const postsCountQuery = groq`
  count(*[_type == "post" && !(_id in path("drafts.**"))])
`

// Get single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    estimatedReadingTime,
    seo,
    author->{
      name,
      slug,
      image,
      bio,
      socialLinks
    },
    categories[]->{
      title,
      slug,
      color,
      description
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get related posts (same categories, excluding current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && references($categories) && _id != $currentId && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    estimatedReadingTime,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Search posts by query
export const searchPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && (
    title match $query + "*" ||
    excerpt match $query + "*" ||
    body[].children[].text match $query + "*"
  )] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    estimatedReadingTime,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && references($categoryId) && !(_id in path("drafts.**"))] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    estimatedReadingTime,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get posts by tag
export const postsByTagQuery = groq`
  *[_type == "post" && references($tagId) && !(_id in path("drafts.**"))] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    estimatedReadingTime,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

// Get all tags
export const tagsQuery = groq`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`

// Get category by slug
export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color
  }
`

// Get tag by slug
export const tagBySlugQuery = groq`
  *[_type == "tag" && slug.current == $slug][0] {
    _id,
    title,
    slug
  }
`

// Get recent posts (for homepage)
export const recentPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    estimatedReadingTime,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Get all post slugs for static generation
export const allPostSlugsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] {
    "slug": slug.current
  }
`

// Get all category slugs for static generation
export const allCategorySlugsQuery = groq`
  *[_type == "category"] {
    "slug": slug.current
  }
`

// Get all tag slugs for static generation
export const allTagSlugsQuery = groq`
  *[_type == "tag"] {
    "slug": slug.current
  }
`
