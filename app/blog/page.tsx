'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { FileText, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export default function BlogPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-['Noto_Sans'] text-[#0F172A]">
      <Topbar />

      {/* Hero Section */}
      <section className="bg-[#F8F9FA] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-medium text-sm mb-6 font-['Noto_Sans']">
              {t('blog.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] font-['Manrope'] mb-4">{t('blog.title')}</h1>
            <p className="text-lg text-[#334155] max-w-2xl mx-auto font-['Noto_Sans']">
              {t('blog.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Empty State Section */}
      <section className="bg-[#F8F9FA] py-12 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-12 text-center"
          >
            <div className="w-20 h-20 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-10 w-10 text-[#94A3B8]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-3">
              {t('blog.empty.title')}
            </h2>
            <p className="text-[#64748B] font-['Noto_Sans'] mb-8 max-w-md mx-auto">
              {t('blog.empty.description')}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#FFFFFF] px-6 py-3 rounded-lg font-semibold hover:bg-[#0284C7] transition-all font-['Manrope']"
            >
              {t('blog.empty.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
