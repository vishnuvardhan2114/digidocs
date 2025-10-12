'use client'

import React, { useState, useEffect } from 'react'
import {
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ServiceDetails, ServiceOption } from '@/constants/service-details.constants'
import { useServiceBreadcrumb } from '@/app/components/BreadcrumbProvider'
import ReviewSection from '@/app/components/ReviewSection'
import OrderSummary from '@/app/components/OrderSummary'
import DocumentUploadCard from '@/app/components/DocumentUploadCard'
import StepIndicator from '@/app/components/StepIndicator'
import { Button } from '@ui/components/ui/button'

interface DocumentServiceClientProps {
  serviceDetails: ServiceDetails
  selectedOption: ServiceOption
}

interface DocumentRequirement {
  id: string
  name: string
  description: string
  required: boolean
  acceptedFormats: string[]
  maxSize: string
  uploadedFile?: File
  preview?: string
}

const DocumentServiceClient: React.FC<DocumentServiceClientProps> = ({
  serviceDetails,
  selectedOption
}) => {
  const router = useRouter()
  const { setServiceBreadcrumbs } = useServiceBreadcrumb()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: ''
  })
  const [documents, setDocuments] = useState<DocumentRequirement[]>([
    {
      id: 'identity-proof',
      name: 'Identity Proof',
      description: 'Aadhaar Card, Driving License, or Passport',
      required: true,
      acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
      maxSize: '5MB'
    },
    {
      id: 'address-proof',
      name: 'Address Proof',
      description: 'Utility Bill, Bank Statement, or Rental Agreement',
      required: true,
      acceptedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
      maxSize: '5MB'
    },
    {
      id: 'photo',
      name: 'Passport Size Photo',
      description: 'Recent passport size photograph',
      required: true,
      acceptedFormats: ['jpg', 'jpeg', 'png'],
      maxSize: '2MB'
    },
    {
      id: 'signature',
      name: 'Digital Signature',
      description: 'Your signature on white paper',
      required: true,
      acceptedFormats: ['jpg', 'jpeg', 'png'],
      maxSize: '2MB'
    }
  ])

  // Set custom breadcrumbs for this document service
  useEffect(() => {
    setServiceBreadcrumbs(
      serviceDetails.name,
      serviceDetails.id,
      selectedOption.name,
      selectedOption.id
    )
  }, [serviceDetails, selectedOption, setServiceBreadcrumbs])


  const handleDocumentUpload = (docId: string, file: File) => {
    setDocuments(prev => prev.map(doc =>
      doc.id === docId
        ? {
          ...doc,
          uploadedFile: file,
          preview: URL.createObjectURL(file)
        }
        : doc
    ))
  }

  const handleRemoveDocument = (docId: string) => {
    setDocuments(prev => prev.map(doc =>
      doc.id === docId
        ? {
          ...doc,
          uploadedFile: undefined,
          preview: undefined
        }
        : doc
    ))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitApplication = async () => {
    console.log('Submitting application...', { personalInfo, documents, selectedOption })
  }

  const handleProceedToPayment = async () => {
    setIsProcessingPayment(true)
    try {
      // TODO: Implement actual payment processing with payment gateway
      console.log('Processing payment...', { personalInfo, documents, selectedOption })

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // After successful payment, submit the application
      await handleSubmitApplication()


      const mockSessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Redirect to success page with session_id
      router.push(`/checkout/success?session_id=${mockSessionId}`)

    } catch (error) {
      console.error('Payment processing failed:', error)
      // Handle payment error
      // TODO: Show error message to user
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return Object.values(personalInfo).every(value => value.trim() !== '')
      case 2:
        return documents.every(doc => doc.required ? doc.uploadedFile : true)
      case 3:
        return true
      default:
        return false
    }
  }

  const steps = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Documents' },
    { id: 3, label: 'Review & Payment' }
  ]

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-[#222222] mb-6">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            value={personalInfo.address}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            rows={3}
            placeholder="Enter your complete address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            value={personalInfo.state}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, state: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your state"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode *
          </label>
          <input
            type="text"
            value={personalInfo.pincode}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, pincode: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your pincode"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={personalInfo.gender}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father's Name *
          </label>
          <input
            type="text"
            value={personalInfo.fatherName}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, fatherName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter father's name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother's Name *
          </label>
          <input
            type="text"
            value={personalInfo.motherName}
            onChange={(e) => setPersonalInfo(prev => ({ ...prev, motherName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter mother's name"
          />
        </div>
      </div>
    </div>
  )

  const renderDocumentsStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-[#222222] mb-6">Upload Documents</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        {documents.map((doc) => (
          <DocumentUploadCard
            key={doc.id}
            id={doc.id}
            name={doc.name}
            description={doc.description}
            required={doc.required}
            acceptedFormats={doc.acceptedFormats}
            maxSize={doc.maxSize}
            uploadedFile={doc.uploadedFile}
            preview={doc.preview}
            onUpload={handleDocumentUpload}
            onRemove={handleRemoveDocument}
          />
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Document Requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>All documents must be clear and readable</li>
              <li>File size should not exceed the specified limit</li>
              <li>Only original documents are accepted</li>
              <li>Color scans are preferred for better clarity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side - Review Section */}
      <div className="lg:col-span-2">
        <ReviewSection
          personalInfo={personalInfo}
          documents={documents}
          selectedOption={selectedOption}
          onBack={() => setCurrentStep(2)}
        />
      </div>

      {/* Right side - Order Summary */}
      <div className="lg:col-span-1">
        <OrderSummary
          selectedOption={selectedOption}
          onProceedToPayment={handleProceedToPayment}
          isProcessing={isProcessingPayment}
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gray-50 ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="md:text-2xl text-2xl font-medium text-[#222222] mb-2">
              {selectedOption.name} Application
            </h1>
            <p className="text-[#848589] text-sm md:text-base font-normal">
              Complete your application by providing personal information and uploading required documents
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className={`mx-auto px-4 ${currentStep === 3 ? 'max-w-7xl' : 'max-w-4xl'}`}>
          <StepIndicator currentStep={currentStep} steps={steps} />

          <div className="border rounded-2xl md:p-6 p-4">
            {currentStep === 1 && renderPersonalInfoStep()}
            {currentStep === 2 && renderDocumentsStep()}
            {currentStep === 3 && renderReviewStep()}

            {/* Navigation Buttons - Hide on step 3 */}
            {currentStep < 3 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="link"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className={`font-normal transition-colors ${currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-gray-900'
                    }`}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Step {currentStep} of 3
                  </div>

                  <Button
                    onClick={handleNextStep}
                    disabled={!isStepComplete(currentStep)}
                    className={`px-6 py-2 rounded-full font-normal transition-colors ${isStepComplete(currentStep)
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DocumentServiceClient
