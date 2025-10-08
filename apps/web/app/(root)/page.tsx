import UserButton from "@/app/components/UserButton";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">DigiDocs</h1>
            </div>
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Automate your Document{" "}
            <span className="font-caveat text-purple-600">Workflows</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Simplify data collection and deliver exceptional digital experiences
            with intelligent forms, document workflows, e-stamping, and digital
            signatures.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/services"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
