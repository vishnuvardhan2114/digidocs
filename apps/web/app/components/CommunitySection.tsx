"use client"

import { Button } from '@ui/components/ui/button'
import { Users, MessageCircle, Wifi, BookOpen, Calendar, Fingerprint } from 'lucide-react'
import Image from 'next/image'

const CommunitySection = () => {
    const features = [
        {
            icon: Users,
            title: "Social",
            description: "Join groups and connect with other document professionals around the world.",
            status: null
        },
        {
            icon: MessageCircle,
            title: "Messaging",
            description: "Start a DM or create a group chat between your professional network.",
            status: null
        },
        {
            icon: Wifi,
            title: "Connectivity",
            description: "Opt-in to see what other professionals are near you and make new connections!",
            status: null
        },
        {
            icon: BookOpen,
            title: "Application Tracking",
            description: "Track your document processing journey and collect achievements as you grow.",
            status: null
        },
        {
            icon: Fingerprint,
            title: "Biometric",
            description: "Advanced biometric verification and correction tools for enhanced document security.",
            status: "coming soon"
        },
        {
            icon: Calendar,
            title: "Realtime Tracker",
            description: "Track your document processing status and updates in real-time for better transparency.",
            status: "coming soon"
        }
    ]

    return (
        <section className="w-full bg-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-start md:text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#212121] mb-4">
                        Our Community Drives it all
                    </h2>
                    <p className="text-lg text-[#5F6368] max-w-2xl mx-auto mb-8">
                        Connecting with other document professionals is at the core of DigiDocs. Come say hi!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="px-8 py-3 rounded-lg bg-[#212121] text-white font-semibold hover:bg-gray-800 h-11 transition-colors">
                            Get Started
                        </Button>
                        <Button className="px-8 py-3 rounded-lg h-11 bg-white text-[#212121] border border-[#212121] font-semibold hover:bg-gray-50 transition-colors">
                            Learn more
                        </Button>
                    </div>
                </div>

                {/* Mobile App Showcase - Desktop */}
                <div className="hidden md:block relative mb-16">
                    <div className="flex justify-center items-center relative">
                        <Image
                            src="/assets/images/communitysection_large.webp"
                            alt="Community Section - Desktop"
                            width={1000}
                            height={800}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Mobile App Showcase - Mobile */}
                <div className="md:hidden mb-12">
                    <div className="flex justify-center">
                        <Image
                            src="/assets/images/communitysection_mobile.webp"
                            alt="Community Section - Mobile"
                            width={400}
                            height={600}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {features.map((feature: any, index: any) => {
                        const IconComponent = feature.icon
                        return (
                            <div key={index} className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className='flex items-start gap-3'>
                                            <div className="flex-shrink-0">
                                                <IconComponent className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
                                            </div>
                                            <div className='flex flex-col space-y-1'>
                                                <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default CommunitySection
