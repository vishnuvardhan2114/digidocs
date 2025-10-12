'use client'


import { Checkbox } from '@ui/components/ui/checkbox'
import { Label } from '@ui/components/ui/label'
import { Spinner } from '@ui/components/ui/spinner'
import Link from 'next/link'
import React, { useState } from 'react'

interface ServiceOption {
  name: string
  price: number
  estimatedDelivery: string
  type: string
}

interface OrderSummaryProps {
  selectedOption: ServiceOption
  onProceedToPayment: () => void
  isProcessing?: boolean
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedOption,
  onProceedToPayment,
  isProcessing = false
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  
  // Calculate fees - only government fee and service fee
  const governmentFee = Math.round(selectedOption.price * 0.8) // 80% government fee
  const serviceFee = Math.round(selectedOption.price * 0.2) // 20% service fee
  
  const total =  governmentFee + serviceFee

  const estimatedDeliveryDays = selectedOption.estimatedDelivery
    ? parseInt(selectedOption.estimatedDelivery.split(' ')[0] ?? '0', 10)
    : 0
  const estimatedDeliveryDate = new Date()
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + estimatedDeliveryDays)

  return (
    <div className="bg-[#f5f5f5] rounded-xl p-6 sticky top-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-center text-[#222222]">Make payment</h3>
      </div>
            
      
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Government fee</span>
          <span className="text-gray-900">₹{governmentFee.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service fee</span>
          <span className="text-gray-900">₹{serviceFee.toLocaleString()}</span>
        </div>
        
        <hr className="border-gray-200 my-3" />
        
        <div className="flex justify-between">
          <span className="font-semibold text-[#222222]">Total</span>
          <span className="font-semibold text-[#222222]">₹{total.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Terms Checkbox */}
      <div className="flex items-start gap-3 mb-2">
        <Checkbox
          id="terms-2"
          className="text-[#222222]"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
        />
        <div className="grid gap-2">
          <Label htmlFor="terms-2">Accept terms and conditions</Label>
          <p className="text-[#848589] text-sm">
            By clicking this checkbox, you agree to the 
            <Link href="/terms-of-use" className="text-[#222222] underline ml-1">terms and conditions</Link>.
          </p>
        </div>
      </div>
      
      {/* Payment Button */}
      <button
        onClick={onProceedToPayment}
        disabled={!termsAccepted || isProcessing}
        className={`w-full py-3 px-4 rounded-full font-medium transition-all duration-200 ${
          termsAccepted && !isProcessing
            ? 'bg-[#222222] text-white hover:bg-gray-800'
            : 'bg-gray-200 text-[#848589] cursor-not-allowed'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner className='size-6 text-green-500' />
            Processing...
          </div>
        ) : (
          'Confirm and pay'
        )}
      </button>
      
      {/* Security Notice */}
      <p className="text-xs text-[#848589] text-center mt-3">
        You won't be charged yet
      </p>
    </div>
  )
}

export default OrderSummary
