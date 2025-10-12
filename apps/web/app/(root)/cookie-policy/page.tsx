import React from 'react'

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 md:pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-[#212121] mb-12 leading-tight">
          DigiDocs Cookie Policy
        </h1>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-base text-[#212121] leading-relaxed mb-4">
            DigiDocs LLC ("DigiDocs," "we," "our," or "us") uses cookies and similar technologies to enhance your experience on our website at https://digidocs.com/ (the "Website"). This <strong>Cookie Policy</strong> explains how we use cookies, what types of cookies we use, and how you can manage your preferences. This cookie policy is part of DigiDocs' privacy policy.
          </p>
          <p className="text-base text-[#212121] leading-relaxed">
            By continuing to use our Website, you agree to our use of cookies as described in this policy.
          </p>
        </div>

        {/* Separator */}
        <hr className="border-gray-300 mb-8" />

        {/* Section 1: What Are Cookies? */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            1. What Are Cookies?
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              Cookies are <strong>small text files</strong> stored on your device (computer, smartphone, or tablet) when you visit a website. They serve various functions, such as:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Enabling essential website features</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Improving performance and analytics</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Storing user preferences (e.g., language, time zone)</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Personalizing content and advertisements</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Types of Cookies We Use */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            2. Types of Cookies We Use
          </h2>
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-4">
                2.1 Essential Cookies
              </h3>
              <p className="text-base text-[#212121] leading-relaxed mb-4">
                These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Authentication cookies to keep you logged in</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Security cookies to protect against fraud</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Session cookies to maintain your session</span>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-4">
                2.2 Analytics Cookies
              </h3>
              <p className="text-base text-[#212121] leading-relaxed mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Google Analytics cookies</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Performance monitoring cookies</span>
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-4">
                2.3 Functional Cookies
              </h3>
              <p className="text-base text-[#212121] leading-relaxed mb-4">
                These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Language preference cookies</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Theme preference cookies</span>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="mb-6">
                <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-4">
                2.4 Marketing Cookies
              </h3>
              <p className="text-base text-[#212121] leading-relaxed mb-4">
                These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Social media cookies</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Advertising platform cookies</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How We Use Cookies */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            3. How We Use Cookies
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We use cookies for several purposes:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To provide and maintain our services</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To improve user experience and website functionality</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To analyze website traffic and user behavior</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To personalize content and advertisements</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To ensure security and prevent fraud</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Managing Your Cookie Preferences */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            4. Managing Your Cookie Preferences
          </h2>
          <div className="space-y-4">
                <p className="text-base text-[#212121] leading-relaxed">
              You have several options for managing cookies:
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-4">
                4.1 Browser Settings
              </h3>
              <p className="text-base text-[#212121] leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience on our website.
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Chrome: Settings &gt; Privacy and security &gt; Cookies and other site data</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Firefox: Options &gt; Privacy & Security &gt; Cookies and Site Data</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Safari: Preferences &gt; Privacy &gt; Manage Website Data</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Edge: Settings &gt; Cookies and site permissions</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-4">
                4.2 Cookie Consent Management
              </h3>
              <p className="text-base text-[#212121] leading-relaxed">
                You can manage your cookie preferences through our cookie consent banner that appears when you first visit our website. You can also access these settings at any time by clicking the "Cookie Settings" link in our footer.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Third-Party Cookies */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            5. Third-Party Cookies
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              Some cookies on our site are set by third parties. We use several third-party services that may set their own cookies:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Google Analytics for website analytics</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Social media platforms for sharing functionality</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Payment processors for secure transactions</span>
              </div>
            </div>
            <p className="text-base text-[#212121] leading-relaxed">
              These third parties have their own privacy policies and cookie policies. We recommend reviewing their policies to understand how they use cookies.
            </p>
          </div>
        </section>

        {/* Section 6: Updates to This Policy */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            6. Updates to This Policy
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              Your continued use of our website after any changes indicates your acceptance of the updated Cookie Policy.
            </p>
          </div>
        </section>

        {/* Section 7: Contact Information */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            7. Contact Information
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us at:
            </p>
            <div className="ml-6 space-y-1">
              <p className="text-base text-[#212121]">Email: privacy@digidocs.com</p>
              <p className="text-base text-[#212121]">Address: DigiDocs Privacy Department</p>
              <p className="text-base text-[#212121]">Website: https://digidocs.com/</p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-[#5F6368]">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicyPage