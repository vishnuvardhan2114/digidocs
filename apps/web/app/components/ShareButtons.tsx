'use client'

import { Twitter, Facebook, Linkedin, Mail } from 'lucide-react'

interface ShareButtonsProps {
  title?: string
  url?: string
  className?: string
}

export default function ShareButtons({ 
  title = '', 
  url = '', 
  className = '' 
}: ShareButtonsProps) {
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedinUrl, '_blank', 'width=600,height=400')
  }

  const shareToPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`
    window.open(pinterestUrl, '_blank', 'width=600,height=400')
  }

  const shareViaEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    window.open(emailUrl)
  }

  return (
    <div className={`flex space-x-3 ${className}`}>
      {/* Twitter */}
      <button 
        onClick={shareToTwitter}
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </button>

      {/* Facebook */}
      <button 
        onClick={shareToFacebook}
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </button>

      {/* Pinterest */}
      <button 
        onClick={shareToPinterest}
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
        title="Share on Pinterest"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.372 0 12 0 17.084 3.163 21.426 7.627 23.174c-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.562-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.001 12 24.001c6.624 0 11.999-5.373 11.999-12C24.001 5.372 18.626.001 12.001.001z"/>
        </svg>
      </button>

      {/* LinkedIn */}
      <button 
        onClick={shareToLinkedIn}
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-700 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </button>

      {/* Email */}
      <button 
        onClick={shareViaEmail}
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        title="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </button>
    </div>
  )
}