'use client'

import React from 'react'
import { Upload, CheckCircle, Eye, X } from 'lucide-react'

interface DocumentUploadCardProps {
  id: string
  name: string
  description: string
  required: boolean
  acceptedFormats: string[]
  maxSize: string
  uploadedFile?: File
  preview?: string
  onUpload: (id: string, file: File) => void
  onRemove: (id: string) => void
}

const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  id,
  name,
  description,
  required,
  acceptedFormats,
  maxSize,
  uploadedFile,
  preview,
  onUpload,
  onRemove
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(id, file)
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-2 md:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">
            {name} {required && <span className="text-red-500">*</span>}
          </h4>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Accepted: {acceptedFormats.join(', ')}</span>
            <span>Max size: {maxSize}</span>
          </div>
        </div>
        
        {uploadedFile && (
          <button
            onClick={() => onRemove(id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove document"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {uploadedFile ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm font-medium text-green-800 truncate">
              {uploadedFile.name}
            </span>
          </div>
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt={`${name} preview`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button 
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="View document"
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-3">Click to upload or drag and drop</p>
          <input
            type="file"
            accept={acceptedFormats.map(format => `.${format}`).join(',')}
            onChange={handleFileChange}
            className="hidden"
            id={`upload-${id}`}
          />
          <label
            htmlFor={`upload-${id}`}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </label>
        </div>
      )}
    </div>
  )
}

export default DocumentUploadCard

