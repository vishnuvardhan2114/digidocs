'use client'

import React from 'react'
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../packages/ui/src/components/ui/accordion'

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  dateOfBirth: string
  gender: string
  fatherName: string
  motherName: string
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

interface ServiceOption {
  name: string
  price: number
  estimatedDelivery: string
  type: string
}

interface ReviewSectionProps {
  personalInfo: PersonalInfo
  documents: DocumentRequirement[]
  selectedOption: ServiceOption
  onBack?: () => void
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  personalInfo,
  documents,
  selectedOption,
  onBack
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUploadedDocumentsCount = () => {
    return documents.filter(doc => doc.uploadedFile).length
  }

  const getTotalDocumentsCount = () => {
    return documents.filter(doc => doc.required).length
  }

  return (
    <div className="space-y-4">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Documents</span>
        </button>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Review Your Application</h3>
        <p className="text-gray-600 mt-1">Please review all information before proceeding to payment</p>
      </div>
      
      <Accordion type="multiple" defaultValue={["documents"]} className="w-full">
        {/* Service Details */}
        <AccordionItem value="service" className="border border-gray-200 rounded-lg mb-4">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900">Service Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Service</span>
                <span className="font-medium text-gray-900">{selectedOption.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Processing Time</span>
                <span className="font-medium text-gray-900">{selectedOption.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Type</span>
                <span className="font-medium text-gray-900 capitalize">{selectedOption.type}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Personal Information */}
        <AccordionItem value="personal" className="border border-gray-200 rounded-lg mb-4">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900">Personal Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Full Name</span>
                <span className="font-medium text-gray-900 text-right">
                  {personalInfo.firstName} {personalInfo.lastName}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{personalInfo.email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-gray-900">{personalInfo.phone}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Date of Birth</span>
                <span className="font-medium text-gray-900">{formatDate(personalInfo.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between items-start py-2">
                <span className="text-gray-600">Address</span>
                <span className="font-medium text-gray-900 text-right max-w-xs">
                  {personalInfo.address}, {personalInfo.city}, {personalInfo.state} - {personalInfo.pincode}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Documents */}
        <AccordionItem value="documents" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="text-left">
                <span className="font-medium text-gray-900">Documents</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({getUploadedDocumentsCount()}/{getTotalDocumentsCount()})
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{doc.name}</span>
                  <div className="flex items-center gap-2">
                    {doc.uploadedFile ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Uploaded</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600 font-medium">Missing</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ReviewSection
