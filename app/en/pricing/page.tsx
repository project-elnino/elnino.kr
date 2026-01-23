'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/en/Topbar'
import Footer from '@/components/en/Footer'
import { Check, Zap, Building2, ArrowRight, HelpCircle } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string;
  answer: string;
}

// General Pricing
const generalPlan = {
  name: 'Pay-As-You-Go',
  description: 'Pay only for what you use',
  price: '$2.50',
  priceUnit: '/hour',
  priceDescription: 'Billed after usage',
  icon: <Zap className="w-6 h-6" />,
  cta: 'Get Started',
  ctaLink: 'https://cloud.elnino.kr/dashboard/team',
  sections: [
    {
      title: "What's Included",
      items: [
        '101 languages supported',
        'Real-time translation',
        'Auto language detection & switching',
        'Dashboard access',
      ]
    },
    {
      title: 'Service Scope',
      items: [
        'Max 10 participants per room',
        'Up to 3 concurrent rooms',
        'Data usage: service improvement',
      ]
    },
    {
      title: 'Recommended For',
      items: [
        'Small meetings (up to 10 people)',
        'Online meetings',
        'Quick tests',
      ]
    }
  ]
}

// Contract Pricing
const contractPlan = {
  name: 'Contract',
  description: 'Premium service with custom agreements',
  price: 'Custom',
  priceDescription: 'Based on scale and duration',
  icon: <Building2 className="w-6 h-6" />,
  includesFrom: 'Pay-As-You-Go',
  cta: 'Contact Us',
  ctaLink: '/en/contact',
  types: [
    { name: 'Short-Term Contract', description: 'One-time events: conferences, workshops, seminars' },
    { name: 'Monthly Subscription', description: 'Regular usage: institutions, enterprises, universities' },
  ],
  sections: [
    {
      title: "What's Included",
      items: [
        'Custom pricing',
        'Field-specific boosting model',
        'Translation subtitle screen',
      ]
    },
    {
      title: 'Service Scope',
      items: [
        'Max 1,000 participants per room',
        'Unlimited concurrent rooms',
        'Data not stored or used',
      ]
    },
    {
      title: 'Recommended For',
      items: [
        'Conferences · Seminars · Workshops (100+)',
        'Institutions · Enterprises · Universities',
        'Regular large-scale events',
      ]
    }
  ]
}

const faqs: FAQItem[] = [
  {
    question: 'What is the difference between Pay-As-You-Go and contract plans?',
    answer: 'Pay-As-You-Go is a post-paid plan where you only pay for the hours you use. Short-term contracts and monthly subscriptions require a pre-negotiated agreement and are suitable for large events or regular usage.'
  },
  {
    question: 'Is there a minimum usage time?',
    answer: 'There is no minimum usage time for the Pay-As-You-Go plan. Short-term contracts and monthly subscriptions have terms that are negotiated during the consultation process.'
  },
  {
    question: 'How does payment work?',
    answer: 'Pay-As-You-Go is billed after usage (post-paid). Short-term contracts and monthly subscriptions are paid upfront based on the agreed terms.'
  },
  {
    question: 'Which plan should I choose?',
    answer: 'For small meetings or simple tests, we recommend Pay-As-You-Go. For conferences or workshops, choose Short-Term Contract. For institutions or enterprises with ongoing needs, Monthly Subscription is the best choice.'
  },
  {
    question: 'What is auto language detection & switching?',
    answer: 'The speaker\'s language is automatically detected regardless of what language they speak. Participants can select their preferred language in the subtitle room to view translations in their own language. This enables multilingual communication without prior language surveys.'
  },
  {
    question: 'What is the field-specific boosting model?',
    answer: 'It is an AI model optimized for accurately translating specialized terminology in specific fields such as medicine, law, IT, and finance. This feature is available with Short-Term Contracts and Monthly Subscriptions.'
  }
]

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <HelpCircle className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
      </motion.div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900 pt-28 sm:pt-32 pb-20 relative overflow-hidden">
        {/* Background elements - static */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-[120px] opacity-20" />
        </div>

        {/* Title content */}
        <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-blue-200 font-medium text-sm mb-6 backdrop-blur-sm border border-white/10">
              Transparent Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Pricing</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="bg-gray-50 py-20 flex-grow">
        <div className="container max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-20">

            {/* General Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-600">General Pricing</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                    {generalPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{generalPlan.name}</h3>
                    <p className="text-sm text-gray-500">{generalPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{generalPlan.price}</span>
                    <span className="text-lg text-gray-600">{generalPlan.priceUnit}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{generalPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={generalPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 mb-6"
                >
                  {generalPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Divider */}
                <div className="border-b border-gray-200 mb-6"></div>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {generalPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 text-green-600">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contract Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-600">Contract Pricing</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                    {contractPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{contractPlan.name}</h3>
                    <p className="text-sm text-gray-500">{contractPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{contractPlan.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{contractPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={contractPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 mb-6"
                >
                  {contractPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Divider */}
                <div className="border-b border-gray-200 mb-6"></div>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {contractPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {/* Show "Everything in Pay-As-You-Go" in What's Included section */}
                        {section.title === "What's Included" && (
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">
                              Everything in <span className="text-blue-600 font-medium">{contractPlan.includesFrom}</span>
                            </span>
                          </div>
                        )}
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 text-green-600">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {faqs.map((faq, index) => (
                <FAQAccordion key={index} item={faq} />
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full filter blur-2xl"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a Custom Quote?</h3>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                For large-scale events or special requirements, please contact us.
                <br />We&apos;ll provide the optimal solution for your needs.
              </p>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
      `}</style>

      <Footer />
    </div>
  )
}
