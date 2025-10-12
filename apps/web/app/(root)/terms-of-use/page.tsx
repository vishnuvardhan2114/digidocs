import React from 'react'

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-0 md:pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-[#212121] mb-12 leading-tight">
          DigiDocs Terms of Use
        </h1>

        {/* Section 1: Interpretation and Definitions */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            1. Interpretation and Definitions
          </h2>
          
          {/* Subsection 1.1: Interpretation */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#212121] mb-4">
              1.1 Interpretation
            </h3>
            <p className="text-base text-[#212121] leading-relaxed">
              Capitalized terms used in these Terms have the meanings defined below. The same definitions apply whether the terms are used in singular or plural form.
            </p>
          </div>

          {/* Subsection 1.2: Definitions */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#212121] mb-4">
              1.2 Definitions
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <div>
                  <span className="font-bold text-[#212121]">Account</span>
                  <span className="text-[#212121]"> - A unique profile created by you to access and use the DigiDocs platform or specific features within it. Your Account may include personal information, preferences, and usage data, and is used to authenticate your identity and provide access to services, tools, or content available through the platform.</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <div>
                  <span className="font-bold text-[#212121]">Service</span>
                  <span className="text-[#212121]"> - The DigiDocs digital document processing and verification platform, including all features, tools, content, and related services accessible through our website or mobile applications.</span>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <div>
                  <span className="font-bold text-[#212121]">User Content</span>
                  <span className="text-[#212121]"> - Any documents, information, data, or materials uploaded, submitted, or provided by you through the Service, including but not limited to identification documents, certificates, and personal information.</span>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <div>
                  <span className="font-bold text-[#212121]">Platform</span>
                  <span className="text-[#212121]"> - The DigiDocs website, mobile applications, and all associated technology infrastructure used to deliver the Service.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Acceptance of Terms */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            2. Acceptance of Terms
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              By accessing or using the DigiDocs Service, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Service.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Service. Your continued use of the Service constitutes acceptance of any modifications to these Terms.
            </p>
          </div>
        </section>

        {/* Section 3: Description of Service */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            3. Description of Service
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              DigiDocs provides a digital platform for document processing, verification, and management services. Our Service includes but is not limited to:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Digital document verification and authentication</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Secure document storage and management</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Identity verification services</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Digital signature capabilities</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: User Responsibilities */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            4. User Responsibilities
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              As a user of the DigiDocs Service, you agree to:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Provide accurate and complete information when creating your Account</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Maintain the security of your Account credentials</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Use the Service only for lawful purposes</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Not upload fraudulent, illegal, or harmful content</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Respect the intellectual property rights of others</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Privacy and Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            5. Privacy and Data Protection
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              We implement appropriate security measures to protect your data, including encryption and secure transmission protocols. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </section>

        {/* Section 6: Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            6. Intellectual Property Rights
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              The DigiDocs Service and its original content, features, and functionality are and will remain the exclusive property of DigiDocs and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              You retain ownership of your User Content, but grant us a license to use, store, and process your content as necessary to provide the Service.
            </p>
          </div>
        </section>

        {/* Section 7: Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            7. Limitation of Liability
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              In no event shall DigiDocs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              Our total liability to you for any damages arising from or related to these Terms or the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
            </p>
          </div>
        </section>

        {/* Section 8: Termination */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            8. Termination
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We may terminate or suspend your Account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive termination.
            </p>
          </div>
        </section>

        {/* Section 9: Changes to Terms */}
        <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            9. Changes to Terms
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              Your continued use of the Service after any modifications to the Terms constitutes acceptance of those modifications.
            </p>
          </div>
        </section>

        {/* Section 10: Contact Information */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            10. Contact Information
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="ml-6 space-y-1">
              <p className="text-base text-[#212121]">Email: legal@digidocs.com</p>
              <p className="text-base text-[#212121]">Address: DigiDocs Legal Department</p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
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

export default TermsOfUsePage