"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import OrderSuccess, { Order } from "./OrderSuccess";

interface OrderProcessingClientProps {
  sessionId: string;
}

export default function OrderProcessingClient({ sessionId }: OrderProcessingClientProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 10;

  useEffect(() => {
    const checkOrder = async () => {
      try {
        // TODO: Implement actual order fetching
        // const result = await getOrderByStripeSession(sessionId);
        // if (result.success && result.order) {
        //   setOrder(result.order as Order);
        //   setLoading(false);
        //   return;
        // }
        
        // Mock success after 3 attempts for demo purposes
        if (attempts >= 2) {
          const mockOrder: Order = {
            id: sessionId,
            status: "confirmed",
            totalAmount: 2500,
            createdAt: new Date(),
            items: [
              {
                id: "1",
                serviceName: "Aadhaar Card Application",
                documentType: "New Aadhaar Card",
                quantity: 1,
                price: 2500,
                processingTime: "7-10 business days",
              },
            ],
            payment: {
              id: "pay_123",
              method: "card",
              status: "success",
              transactionId: sessionId,
            },
            userDetails: {
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "+91 98765 43210",
            },
          };
          setOrder(mockOrder);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error checking order:", error);
      }

      setAttempts((prev) => prev + 1);

      if (attempts >= maxAttempts) {
        setLoading(false);
        return;
      }

      // Wait 2 seconds before next attempt
      setTimeout(checkOrder, 2000);
    };

    checkOrder();
  }, [sessionId, attempts]);

  if (order) {
    return <OrderSuccess order={order} />;
  }

  if (!loading && attempts >= maxAttempts) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Processing Delayed
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Your payment was successful, but we&apos;re still processing your order.
          </p>
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
            Session ID: {sessionId.slice(0, 12)}...
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-base text-gray-700 mb-4">
            Please check back in a few minutes or contact support if you don&apos;t see your order.
          </p>
          <p className="text-sm text-gray-600">
            You can also check your email for order confirmation.
          </p>
          
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#6C63FF] text-white py-2 px-6 rounded-lg hover:bg-[#5850E6] transition-colors text-base font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Processing Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Processing Your Order...
        </h1>
        <p className="text-base text-gray-600 mb-4">
          Please wait while we confirm your payment and create your order.
        </p>

        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          Session ID: {sessionId.slice(0, 12)}...
        </div>
      </div>

      {/* Processing Message */}
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-base text-gray-700 mb-4">
          Your payment has been processed successfully. We&apos;re now creating your order.
        </p>
        <p className="text-sm text-gray-600">
          Attempt {attempts + 1} of {maxAttempts} - This page will automatically
          refresh to show your order details.
        </p>

        {/* Processing Animation */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

