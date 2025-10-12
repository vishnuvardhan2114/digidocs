'use client'

import React from 'react'
import { X, FileText, CheckCircle2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@ui/components/ui/dialog'
import { Button } from '@ui/components/ui/button'

interface RequiredDocumentsModalProps {
    isOpen: boolean
    onClose: () => void
    documents: string[]
    serviceName: string
}

const RequiredDocumentsModal: React.FC<RequiredDocumentsModalProps> = ({
    isOpen,
    onClose,
    documents,
    serviceName
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[540px] h-[80vh] p-0 gap-0 rounded-2xl flex flex-col">
                {/* Fixed Header */}
                <DialogHeader className="px-6 py-5 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-xl font-semibold text-[#222222] mb-1">
                                Required Documents
                            </DialogTitle>
                            <p className="text-sm font-normal text-[#717171] mt-1">
                                {serviceName}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="mb-4">
                        <p className="text-sm text-[#717171] leading-relaxed">
                            Ensure all documents are ready and legible.
                        </p>
                    </div>

                    {/* Documents List */}
                    <div className="space-y-2">
                        {documents.map((document, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg bg-[#f7f7f7] hover:bg-[#f0f0f0] transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    <FileText className="w-4 h-4 text-[#222222]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[#222222]">
                                        {document}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="flex gap-2">
                            <div className="flex-shrink-0">
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">i</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-[#222222] leading-relaxed">
                                    <span className="font-semibold">Note:</span> Valid documents only. Clear scans or photos accepted.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="px-6 py-4 border-t border-gray-200  flex-shrink-0 justify-center md:justify-end flex">
                    <Button
                        onClick={onClose}
                        className="w-full md:w-[40%] h-11 bg-[#222222] hover:bg-[#000000] text-white rounded-full font-normal transition-colors"
                    >
                        Got it
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RequiredDocumentsModal

