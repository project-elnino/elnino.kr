'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-[#E2E8F0] last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        className="w-full py-5 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-[#0F172A] font-['Noto_Sans'] pr-4 group-hover:text-[#0EA5E9] transition-colors">{item.question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#0EA5E9] text-[#FFFFFF] rotate-180' : 'bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#E0F2FE] group-hover:text-[#0EA5E9]'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-5 pl-0">
          <p className="text-[#334155] font-['Noto_Sans'] leading-relaxed bg-[#F1F5F9] rounded-xl p-4">{item.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AboutPage() {
  const { t } = useTranslation()

  // FAQ 항목들을 번역에서 가져오기
  const faqs: FAQItem[] = Array.from({ length: 10 }, (_, i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-['Noto_Sans'] text-[#0F172A]">
      <Topbar />

      {/* Hero Section */}
      <section className="bg-[#F8F9FA] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-medium text-sm mb-6 font-['Noto_Sans']">
              {t('faq.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] font-['Manrope'] mb-4">{t('faq.title')}</h1>
            <p className="text-lg text-[#334155] max-w-2xl mx-auto font-['Noto_Sans']">
              {t('faq.description')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F8F9FA] py-12 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} item={faq} index={index} />
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-center text-[#FFFFFF] relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#0EA5E9]/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#0EA5E9]/10 rounded-full filter blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['Manrope']">{t('faq.ctaBanner.title')}</h3>
              <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto leading-relaxed font-['Noto_Sans']">
                {t('faq.ctaBanner.description')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#FFFFFF] px-8 py-4 rounded-lg font-semibold hover:bg-[#0284C7] transition-all font-['Manrope']"
              >
                {t('faq.ctaBanner.button')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
