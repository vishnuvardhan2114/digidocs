import React from 'react'
import { Marquee } from "@ui/components/ui/marquee"
import Image, { StaticImageData } from 'next/image'
import logo from '@/public/assets/logo/digidocs.png'


const ExpertiseCard = ({
    img,
    name,
}: {
    img: string | StaticImageData
    name: string
}) => {
    return (
        <div>
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                    <Image 
                        src={img}
                        alt={name}
                        width={120}
                        height={62}
                        className="rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}


const Expertise = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 py-14 relative flex w-full flex-col items-center justify-center overflow-hidden'>
            <Marquee pauseOnHover className="[--duration:20s] [--gap:2rem]">
                {[...Array(6)].map((_, i) => (
                    <ExpertiseCard key={i} img={logo} name={`Expertise ${i + 1}`} />
                ))}
            </Marquee>
            <div className="from-white pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-white pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}

export default Expertise