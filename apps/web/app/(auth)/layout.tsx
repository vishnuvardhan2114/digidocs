import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    // const session = await auth.api.getSession({ headers: await headers() })

    // if(session?.user) redirect('/')

    return (
        <main className="flex flex-col justify-between lg:flex-row h-screen relative overflow-hidden bg-gray-50">
            <section className="w-full lg:w-[45%] lg:h-screen px-6 lg:px-16 flex flex-col overflow-y-auto scrollbar-hide-default">
                <Link href="/" className="pt-6 lg:pt-8 mb-8 lg:mb-12 flex items-center gap-1">
                   <Image src="/assets/logo/digidocs.png" alt="Logo" width={140} height={32} className='h-8 w-auto' />
                </Link>
                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>

            <section className="w-full max-lg:border-t max-lg:border-gray-600 lg:w-[55%] lg:h-screen bg-gradient-to-br from-[#b1ff0a]/60 to-white px-6 py-4 md:p-6 lg:py-12 lg:px-16 flex flex-col justify-start">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <p className="text-sm md:text-xl lg:text-4xl font-medium text-gray-900 mb-1 md:mb-6 lg:mb-8">Automate your Document
                        <span className="font-caveat px-2 font-bold  text-xl  md:text-2xl lg:text-5xl text-[#a54df1]">
                            Workflows
                        </span>
                    </p>
                    <blockquote className="text-sm md:text-lg lg:text-xl font-medium text-gray-900 mb-1 md:mb-6 lg:mb-8">
                        Simplify data collection and deliver exceptional digital experiences with intelligent forms, document workflows, e-stamping, and digital signatures, all in one
                        comprehensive
                        suite.
                    </blockquote>
                </div>

                <div className="flex-1 relative">
                    <Image src="https://cdn.dribbble.com/userupload/43464882/file/original-ea8ff46993de03bb55086611845418a7.png?resize=1600x1200&vertical=center" alt="Dashboard Preview" width={1440} height={1150} className="border-6 border-gray-800 left-0 hidden w-[1024px] h-auto max-w-none lg:block rounded-xl shadow-2xl absolute top-0" />
                </div>
            </section>
        </main>
    )
}
export default Layout