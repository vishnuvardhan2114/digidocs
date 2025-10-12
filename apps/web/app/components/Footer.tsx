"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from '@ui/components/ui/button'
import { MessageCircle } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-center">
                            <Image
                                src="/assets/logo/digidocs.png"
                                alt="DigiDocs Logo"
                                width={1000}
                                height={1000}
                                className="w-32 h-12"
                            />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            From document processing to digital verification and everything in between. DigiDocs helps you manage all your document needs efficiently.
                        </p>
                        <Button className="bg-gray-800 text-white hover:bg-gray-700 rounded-lg px-6 py-2 text-sm font-medium">
                            Get Started!
                        </Button>
                    </div>

                    {/* Services Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Services</h3>
                        <ul className="space-y-3">
                            {[
                                "E-Stamp Document",
                                "Rental Agreement",
                                "Pan Card",
                                "Voter ID",
                                "Passport",
                            ].map((service) => (
                                <li key={service}>
                                    <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 underline transition-colors">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Resources</h3>
                        <ul className="space-y-3">
                            {[
                                "Help Center",
                                "Support"
                            ].map((resource) => (
                                <li key={resource}>
                                    <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 underline transition-colors">
                                        {resource}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Company</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", href: "#" },
                                { name: "Contact Us", href: "#" },
                                { name: "Privacy Policy", href: "/privacy-policy" },
                                { name: "Terms of Service", href: "/terms-of-use" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-600 text-sm hover:text-gray-900 underline transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Follow us</h3>
                        <ul className="space-y-3">
                            {[
                                "LinkedIn",
                                "Twitter",
                                "Facebook",
                                "Instagram"
                            ].map((social) => (
                                <li key={social}>
                                    <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 underline transition-colors">
                                        {social}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-500 text-sm">
                            Copyright © 2025 DigiDocs. All rights reserved.
                        </div>
                        <div className="flex flex-wrap items-center space-x-6 text-sm">
                            <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-use" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Terms of Use
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Disclaimer
                            </Link>
                            <Link href="/cookie-policy" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
