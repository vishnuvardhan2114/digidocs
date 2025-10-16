'use client'

import Link from 'next/link'

export default function GetInTouch() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[#212325]/90 mb-4">
        I Want to Ask Another Question
      </h2>
      <p className="text-[#212325] font-light mb-6">
        Do you still have questions?
      </p>
      <Link
        href="/contact"
        className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-[#212325] text-sm hover:bg-gray-50 transition-colors"
      >
        Get in touch!
      </Link>
    </div>
  )
}
