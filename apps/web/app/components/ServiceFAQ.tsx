import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion"

interface FAQ {
    question: string
    answer: string
}

interface ServiceFAQProps {
    faqs: FAQ[]
    title?: string
}

const ServiceFAQ: React.FC<ServiceFAQProps> = ({
    faqs,
    title = "Frequently Asked Questions"
}) => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-600">
                        Find answers to common questions about our services
                    </p>
                </div>

                {/* FAQ Accordion */}
                <Accordion 
                    type="single" 
                    collapsible 
                    className="space-y-4"
                    defaultValue="item-0"
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-gray-200 rounded-xl px-6 hover:border-gray-300 transition-colors data-[state=open]:border-gray-900 data-[state=open]:shadow-sm"
                        >
                            <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-medium text-gray-900 [&[data-state=open]]:text-gray-900">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Still have questions?
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center justify-center text-gray-900 font-medium hover:text-gray-700 transition-colors"
                    >
                        Contact our support team
                        <svg 
                            className="ml-2 w-4 h-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default ServiceFAQ

