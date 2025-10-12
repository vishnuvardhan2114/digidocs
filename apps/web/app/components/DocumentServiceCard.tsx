'use client'

import React, { useState } from 'react'
import { ChevronDown, ArrowRight, CreditCard, Truck } from 'lucide-react'
import { ServiceOption, getEstimatedDeliveryDate } from '@/constants/service-details.constants'
import ServiceTermsModal from './ServiceTermsModal'
import RequiredDocumentsModal from './RequiredDocumentsModal'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@ui/components/ui/dropdown-menu'
import { Button } from '@ui/components/ui/button'

interface DocumentServiceCardProps {
    option: ServiceOption
    serviceName: string
    onSelect: (optionId: string) => void
}

const DocumentServiceCard: React.FC<DocumentServiceCardProps> = ({ option, serviceName, onSelect }) => {
    const [showServiceTermsModal, setShowServiceTermsModal] = useState(false)
    const [showRequiredDocumentsModal, setShowRequiredDocumentsModal] = useState(false)

    const governmentFee = Math.round(option.price * 0.6)
    const serviceFee = option.price - governmentFee

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-300 p-4 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#222222] mb-1">
                            {option.name}
                        </h3>
                        <p className="text-sm font-light text-[#848589]">
                            {option.description}
                        </p>

                    </div>

                    {/* Price Dropdown */}
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setShowServiceTermsModal(true)}
                            className="text-red-600 hover:text-red-700 text-sm underline font-medium"
                        >
                            Service Terms
                        </button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-colors font-medium">
                                    <span className="text-lg font-semibold text-gray-900">
                                        ₹ {option.price.toLocaleString()}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="flex justify-between cursor-default hover:bg-transparent focus:bg-transparent">
                                    <span className="text-gray-600 font-medium">Government Fee:</span>
                                    <span className="font-medium">₹ {governmentFee.toLocaleString()}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex justify-between cursor-default hover:bg-transparent focus:bg-transparent">
                                    <span className="text-gray-600 font-medium">Service Fee:</span>
                                    <span className="font-medium">₹ {serviceFee.toLocaleString()}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <div className="bg-[#f2f2f4] text-[#1d2425] px-3 py-1 rounded-full text-sm font-medium">
                        Get by: {getEstimatedDeliveryDate(option.deliveryDays)}
                    </div>
                    <div className="bg-[#f2f2f4] text-[#1d2425] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#222222]" />
                        {option?.processingType}
                    </div>
                    <div className="bg-[#f2f2f4] text-[#1d2425] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#222222]" />
                        Courier
                    </div>
                </div>

                {/* Select Button */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setShowRequiredDocumentsModal(true)}
                        className="text-sm font-normal text-green-700 underline hover:text-green-800 transition-colors"
                    >
                        Required Documents
                    </button>
                    <Button
                        onClick={() => onSelect(option.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full font-light transition-colors flex items-center gap-2"
                    >
                        Select <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Service Terms Modal */}
            <ServiceTermsModal
                isOpen={showServiceTermsModal}
                onClose={() => setShowServiceTermsModal(false)}
            />

            {/* Required Documents Modal */}
            <RequiredDocumentsModal
                isOpen={showRequiredDocumentsModal}
                onClose={() => setShowRequiredDocumentsModal(false)}
                documents={option.requirements}
                serviceName={option.name}
            />
        </>
    )
}

export default DocumentServiceCard
