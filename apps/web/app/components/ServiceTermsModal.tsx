import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@ui/components/ui/dialog'
import { Button } from '@ui/components/ui/button'
import { File } from 'lucide-react';

const ServiceTermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md w-full mx-4 border-0 shadow-lg p-0">
                <DialogHeader className="space-y-0 p-6 pb-4 border-b border-gray-200">
                    <DialogTitle className="text-lg font-semibold text-gray-900">Service Terms</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <File className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-900">Business Days: Monday to Friday</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <File className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-900">Prices are subject to change without notice</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <File className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-900">Additional Documents may be required in some cases</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-200 flex justify-end">
                    <Button
                        onClick={onClose}
                        className="bg-teal-600 mt-2 hover:bg-teal-700 text-white font-medium rounded-full transition-colors px-6"
                    >
                        Okay, got it!
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceTermsModal