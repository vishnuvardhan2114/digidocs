"use client";

import { CheckCircle, FileText, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id?: string;
  serviceName: string;
  documentType: string;
  quantity: number;
  price: number;
  processingTime?: string;
}

export interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
  items: OrderItem[];
  payment?: {
    id: string;
    method: string;
    status: string;
    transactionId?: string | null;
  } | null;
  userDetails?: {
    name: string;
    email: string;
    phone: string;
  };
}

interface OrderSuccessProps {
  order: Order;
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "processing":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      paid: "Paid",
      confirmed: "Confirmed",
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
    };
    return labels[status] || status;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-base text-gray-600 mb-4">
          Your order has been confirmed and our team will start processing your documents soon.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <FileText className="w-4 h-4" />
          Order #{order.id.slice(0, 8).toUpperCase()}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Service Details
          </h2>
          
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={item.id || index}
                className="flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                {/* Service Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    {item.serviceName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Document Type: {item.documentType}
                  </p>
                  {item.processingTime && (
                    <p className="text-sm text-gray-600 mb-2">
                      Processing Time: {item.processingTime}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </span>
                    <span className="text-base text-gray-900 font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Order Date</span>
              <span className="text-gray-900 font-medium">
                {formatDate(order.createdAt)}
              </span>
            </div>
            
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Order Status</span>
              <span className={`font-medium ${getOrderStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-900 font-medium capitalize">
                {order.payment?.method || "Online Payment"}
              </span>
            </div>
            
            {order.payment?.transactionId && (
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Transaction ID</span>
                <span className="text-gray-900 font-medium text-sm">
                  {order.payment.transactionId.slice(0, 12)}...
                </span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-base">
                <span className="text-gray-900 font-semibold">Total Amount</span>
                <span className="text-gray-900 font-semibold">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* User Details */}
          {order.userDetails && (
            <div className="mt-6 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-base text-gray-900 font-medium mb-4">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Name:</span> {order.userDetails.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Email:</span> {order.userDetails.email}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Phone:</span> {order.userDetails.phone}
                </p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-6 bg-green-50 p-6 rounded-lg">
            <h3 className="text-base text-gray-900 font-medium mb-4">
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    You&apos;ll receive an email confirmation with your order details and receipt
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    Our team will review your documents and start processing within 24 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    You&apos;ll receive updates via email and can track your order status in your dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => router.push("/services")}
              className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg hover:bg-[#5850E6] transition-colors text-base font-medium flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Browse More Services
            </button>
            
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors text-base font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

