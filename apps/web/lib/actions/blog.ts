'use server'

import { client } from '@/lib/sanity/client'
import {
  postsQuery,
  postsCountQuery,
  postBySlugQuery,
  relatedPostsQuery,
  searchPostsQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  categoriesQuery,
  tagsQuery,
  categoryBySlugQuery,
  tagBySlugQuery,
  recentPostsQuery,
  allPostSlugsQuery,
  allCategorySlugsQuery,
  allTagSlugsQuery,
} from '@/lib/sanity/queries'

const POSTS_PER_PAGE = 12

export async function getPosts(page: number = 0) {
  const start = page * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [posts, totalCount] = await Promise.all([
    client.fetch(postsQuery, { start, end }),
    client.fetch(postsCountQuery),
  ])

  return {
    posts,
    totalCount,
    hasMore: end < totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / POSTS_PER_PAGE),
  }
}

export async function getPostBySlug(slug: string) {
  const post = await client.fetch(postBySlugQuery, { slug })
  
  if (!post) {
    return null
  }

  // Get related posts
  const categoryIds = post.categories?.map((cat: any) => cat._id) || []
  const relatedPosts = categoryIds.length > 0 
    ? await client.fetch(relatedPostsQuery, { 
        categories: categoryIds, 
        currentId: post._id 
      })
    : []

  return {
    ...post,
    relatedPosts,
  }
}

export async function searchPosts(query: string, page: number = 0) {
  const start = page * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const posts = await client.fetch(searchPostsQuery, { 
    query: query.toLowerCase(), 
    start, 
    end 
  })

  return {
    posts,
    hasMore: posts.length === POSTS_PER_PAGE,
    currentPage: page,
    query,
  }
}

export async function getPostsByCategory(categorySlug: string, page: number = 0) {
  const category = await client.fetch(categoryBySlugQuery, { slug: categorySlug })
  
  if (!category) {
    return null
  }

  const start = page * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const posts = await client.fetch(postsByCategoryQuery, { 
    categoryId: category._id, 
    start, 
    end 
  })

  return {
    category,
    posts,
    hasMore: posts.length === POSTS_PER_PAGE,
    currentPage: page,
  }
}

export async function getPostsByTag(tagSlug: string, page: number = 0) {
  const tag = await client.fetch(tagBySlugQuery, { slug: tagSlug })
  
  if (!tag) {
    return null
  }

  const start = page * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const posts = await client.fetch(postsByTagQuery, { 
    tagId: tag._id, 
    start, 
    end 
  })

  return {
    tag,
    posts,
    hasMore: posts.length === POSTS_PER_PAGE,
    currentPage: page,
  }
}

export async function getCategories() {
  return client.fetch(categoriesQuery)
}

export async function getTags() {
  return client.fetch(tagsQuery)
}

export async function getRecentPosts() {
  return client.fetch(recentPostsQuery)
}

export async function getAllPostSlugs() {
  return client.fetch(allPostSlugsQuery)
}

export async function getAllCategorySlugs() {
  return client.fetch(allCategorySlugsQuery)
}

export async function getAllTagSlugs() {
  return client.fetch(allTagSlugsQuery)
}
