import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/actions/blog'
import BlogPostHeader from '@/app/components/BlogPostHeader'
import BlogPostContent from '@/app/components/BlogPostContent'
import TableOfContents from '@/app/components/TableOfContents'
import BlogCTACard from '@/app/components/BlogCTACard'
import RelatedPosts from '@/app/components/RelatedPosts'
import ShareButtons from '@/app/components/ShareButtons'
import AuthorBio from '@/app/components/AuthorBio'
import GetInTouch from '@/app/components/GetInTouch'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs()
    return slugs.map((post: any) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    const imageUrl = post.mainImage
        ? urlFor(post.mainImage).width(1200).height(630).url()
        : undefined

    return {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        openGraph: {
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDescription || post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            images: imageUrl ? [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.mainImage.alt || post.title,
                }
            ] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDescription || post.excerpt,
            images: imageUrl ? [imageUrl] : undefined,
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="text-sm text-gray-500">
                    <Link href="/">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/blog">Blog & Latest News</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#212325]">{post.title}</span>
                </nav>
            </div>

            <article className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                        {/* Left Sidebar - Table of Contents */}
                        <aside className="lg:col-span-3 order-2 lg:order-1">
                            <div className="lg:sticky lg:top-8 lg:self-start">
                                <TableOfContents content={post.body} />
                            </div>
                        </aside>

                        {/* Center Content */}
                        <main className="lg:col-span-6 order-1 lg:order-2">
                            {/* Post Header */}
                            <BlogPostHeader post={post} />

                            <div className="mb-10">
                                <BlogPostContent content={post.body} />
                            </div>
        
                            <hr className="border-gray-300 mb-8" />

                            {/* Get in Touch Section */}
                            <div className="mb-8">
                                <GetInTouch />
                            </div>

                            {/* Separator Line */}
                            <hr className="border-gray-300 mb-8" />

                            {/* Author Section */}
                            <div className="mb-8">
                                <h3 className="text-xl md:text-3xl font-bold text-[#212325]/90 mb-6">Author</h3>
                                <AuthorBio author={post.author} />
                            </div>

                            {/* Related Posts */}
                            {post.relatedPosts && post.relatedPosts.length > 0 && (
                                <RelatedPosts posts={post.relatedPosts} />
                            )}
                        </main>

                        {/* Right Sidebar */}
                        <aside className="lg:col-span-3 order-3">
                            <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
                                <BlogCTACard />
                                <div className="py-2">
                                    <h3 className="font-medium text-[#212325] mb-4">Share with friends</h3>
                                    <ShareButtons
                                        title={post.title}
                                        url={`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3001'}/blog/${post.slug.current}`}
                                    />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </div>
    )
}