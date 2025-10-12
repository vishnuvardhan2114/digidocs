import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 md:pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-[#212121] mb-12 leading-tight">
          DigiDocs Privacy Policy
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              At DigiDocs, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital document processing and verification platform.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
            </p>
          </div>
        </section>

        {/* Section 1: Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            1. Information We Collect
          </h2>
          
          {/* Subsection 1.1: Personal Information */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#212121] mb-4">
              1.1 Personal Information
            </h3>
            <p className="text-base text-[#212121] leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Create an account or profile</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Upload documents for processing</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Contact us for support or inquiries</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Subscribe to our newsletters or updates</span>
              </div>
            </div>
            <p className="text-base text-[#212121] leading-relaxed mt-4">
              This information may include your name, email address, phone number, mailing address, and any other information you choose to provide.
            </p>
          </div>

          {/* Subsection 1.2: Document Information */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#212121] mb-4">
              1.2 Document Information
            </h3>
            <div className="space-y-4">
              <p className="text-base text-[#212121] leading-relaxed">
                We process and store documents you upload to our platform, including but not limited to:
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Identity documents (PAN card, Aadhaar, Passport, etc.)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Legal documents (agreements, contracts, certificates)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Financial documents (bank statements, tax documents)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#212121]">Educational certificates and transcripts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subsection 1.3: Usage Information */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#212121] mb-4">
              1.3 Usage Information
            </h3>
            <div className="space-y-4">
              <p className="text-base text-[#212121] leading-relaxed">
                We automatically collect certain information about your use of our Service, including:
              </p>
              <div className="ml-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#5F6368]">Device information (IP address, browser type, operating system)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#5F6368]">Usage patterns and preferences</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#5F6368]">Log data and analytics information</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#212121] mr-3 mt-1">•</span>
                  <span className="text-[#5F6368]">Cookies and similar tracking technologies</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            2. How We Use Your Information
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We use the information we collect for various purposes, including:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Providing, maintaining, and improving our Service</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Processing and verifying your documents</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Communicating with you about your account and our Service</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Sending you technical notices, updates, and support messages</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Detecting, preventing, and addressing technical issues and security threats</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Complying with legal obligations and regulatory requirements</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Information Sharing and Disclosure */}
        <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            3. Information Sharing and Disclosure
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">With your explicit consent</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To service providers who assist us in operating our Service (under strict confidentiality agreements)</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">When required by law or to comply with legal processes</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">To protect our rights, property, or safety, or that of our users or the public</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">In connection with a business transfer, merger, or acquisition</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Data Security */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            4. Data Security
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">End-to-end encryption for data transmission and storage</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Secure servers and data centers with restricted access</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Regular security audits and vulnerability assessments</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Employee training on data protection and privacy practices</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Multi-factor authentication and access controls</span>
              </div>
            </div>
            <p className="text-base text-[#212121] leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* Section 5: Data Retention */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            5. Data Retention
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Account information is retained while your account is active</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Processed documents are retained for the duration specified in your service agreement</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Usage data and analytics are retained for up to 3 years for service improvement</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Legal and regulatory requirements may extend retention periods</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Your Rights and Choices */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            6. Your Rights and Choices
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              You have certain rights regarding your personal information, including:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Access: Request access to your personal information we hold</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Correction: Request correction of inaccurate or incomplete information</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Deletion: Request deletion of your personal information</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Portability: Request a copy of your data in a structured format</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Objection: Object to certain processing of your information</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Withdrawal: Withdraw consent where processing is based on consent</span>
              </div>
            </div>
            <p className="text-base text-[#212121] leading-relaxed mt-4">
              To exercise these rights, please contact us using the information provided in the Contact Us section below.
            </p>
          </div>
        </section>

        {/* Section 7: Cookies and Tracking Technologies */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            7. Cookies and Tracking Technologies
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our Service. Cookies are small data files that are stored on your device. We use cookies for:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Authentication and session management</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Remembering your preferences and settings</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Analyzing usage patterns and improving our Service</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Security and fraud prevention</span>
              </div>
            </div>
             <p className="text-base text-[#212121] leading-relaxed mt-4">
              You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our Service.
            </p>
          </div>
        </section>

        {/* Section 8: Third-Party Services */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            8. Third-Party Services
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              Our Service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              We may use third-party service providers for:
            </p>
            <div className="ml-6 space-y-2">
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Cloud hosting and data storage</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Analytics and performance monitoring</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Payment processing</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#212121] mr-3 mt-1">•</span>
                <span className="text-[#212121]">Customer support and communication</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: International Data Transfers */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            9. International Data Transfers
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your personal information.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              When we transfer personal information internationally, we use standard contractual clauses and other legal mechanisms to ensure adequate protection of your data.
            </p>
          </div>
        </section>

        {/* Section 10: Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            10. Children's Privacy
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </div>
        </section>

        {/* Section 11: Changes to This Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            11. Changes to This Privacy Policy
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date below.
            </p>
            <p className="text-base text-[#212121] leading-relaxed">
              We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>
        </section>

        {/* Section 12: Contact Us */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#212121] mb-6">
            12. Contact Us
          </h2>
          <div className="space-y-4">
            <p className="text-base text-[#212121] leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="ml-6 space-y-1">
              <p className="text-base text-[#212121]">Email: privacy@digidocs.com</p>
              <p className="text-base text-[#212121]">Phone: +1 (555) 123-4567</p>
              <p className="text-base text-[#212121]">Address: DigiDocs Privacy Department</p>
              <p className="text-base text-[#212121]">123 Digital Street, Tech City, TC 12345</p>
            </div>
            <p className="text-base text-[#212121] leading-relaxed mt-4">
              We will respond to your inquiry within 30 days of receipt.
            </p>
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

export default PrivacyPolicyPage