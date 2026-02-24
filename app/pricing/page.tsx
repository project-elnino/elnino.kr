'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { Check, Zap, Building2, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export default function PricingPage() {
  const { t } = useTranslation()

  // 일반 요금
  const generalPlan = {
    name: t('pricing.general.name'),
    description: t('pricing.general.description'),
    price: t('pricing.general.price'),
    priceUnit: t('pricing.general.unit'),
    priceDescription: t('pricing.general.priceNote'),
    icon: <Zap className="w-6 h-6" />,
    cta: t('pricing.general.cta'),
    ctaLink: 'https://cloud.elnino.kr/dashboard/team',
    sections: [
      {
        title: t('pricing.general.sections.features'),
        items: [
          t('pricing.general.items.features.0'),
          t('pricing.general.items.features.1'),
          t('pricing.general.items.features.2'),
          t('pricing.general.items.features.3'),
        ]
      },
      {
        title: t('pricing.general.sections.scope'),
        items: [
          t('pricing.general.items.scope.0'),
          t('pricing.general.items.scope.1'),
          t('pricing.general.items.scope.2'),
        ]
      },
      {
        title: t('pricing.general.sections.recommend'),
        items: [
          t('pricing.general.items.recommend.0'),
          t('pricing.general.items.recommend.1'),
          t('pricing.general.items.recommend.2'),
        ]
      }
    ]
  }

  // 계약 요금
  const contractPlan = {
    name: t('pricing.contract.name'),
    description: t('pricing.contract.description'),
    price: t('pricing.contract.price'),
    priceDescription: t('pricing.contract.priceNote'),
    icon: <Building2 className="w-6 h-6" />,
    includesAll: t('pricing.contract.includesAll'),
    cta: t('pricing.contract.cta'),
    ctaLink: '/contact',
    sections: [
      {
        title: t('pricing.general.sections.features'),
        items: [
          t('pricing.contract.items.features.0'),
          t('pricing.contract.items.features.1'),
          t('pricing.contract.items.features.2'),
        ]
      },
      {
        title: t('pricing.general.sections.scope'),
        items: [
          t('pricing.contract.items.scope.0'),
          t('pricing.contract.items.scope.1'),
          t('pricing.contract.items.scope.2'),
        ]
      },
      {
        title: t('pricing.general.sections.recommend'),
        items: [
          t('pricing.contract.items.recommend.0'),
          t('pricing.contract.items.recommend.1'),
          t('pricing.contract.items.recommend.2'),
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-['Noto_Sans'] text-[#0F172A]">
      <Topbar />

      {/* Hero Section */}
      <section className="bg-[#F8F9FA] pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-medium text-sm mb-6 font-['Noto_Sans']">
              {t('pricing.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] font-['Manrope'] mb-4">{t('pricing.title')}</h1>
            <p className="text-lg text-[#334155] max-w-2xl mx-auto font-['Noto_Sans']">
              {t('pricing.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="bg-[#F8F9FA] py-12 flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-20">

            {/* 일반 요금 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#FFFFFF] rounded-2xl overflow-hidden flex flex-col border border-[#E2E8F0] transition-shadow duration-300 hover:shadow-lg"
            >
              {/* 카드 헤더 */}
              <div className="bg-[#F8F9FA] px-8 py-4 border-b border-[#E2E8F0]">
                <h2 className="text-lg font-semibold text-[#64748B] font-['Manrope']">{t('pricing.general.header')}</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#E0F2FE] text-[#0EA5E9]">
                    {generalPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] font-['Manrope']">{generalPlan.name}</h3>
                    <p className="text-sm text-[#64748B] font-['Noto_Sans']">{generalPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 pb-6 border-b border-[#E2E8F0]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#0F172A] font-['Manrope']">{generalPlan.price}</span>
                    <span className="text-lg text-[#64748B] font-['Noto_Sans']">{generalPlan.priceUnit}</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] mt-2 font-['Noto_Sans']">{generalPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={generalPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold transition-all bg-[#0EA5E9] text-[#FFFFFF] hover:bg-[#0284C7] mb-8 font-['Manrope']"
                >
                  {generalPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {generalPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3 font-['Manrope']">
                        {section.title}
                      </h4>
                      <div className="space-y-2.5">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#E0F2FE] text-[#0EA5E9]">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-[#334155] text-sm font-['Noto_Sans']">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 계약 요금 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-[#FFFFFF] rounded-2xl overflow-hidden flex flex-col border border-[#E2E8F0] transition-shadow duration-300 hover:shadow-lg"
            >
              {/* 카드 헤더 */}
              <div className="bg-[#F8F9FA] px-8 py-4 border-b border-[#E2E8F0]">
                <h2 className="text-lg font-semibold text-[#64748B] font-['Manrope']">{t('pricing.contract.header')}</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#E0F2FE] text-[#0EA5E9]">
                    {contractPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] font-['Manrope']">{contractPlan.name}</h3>
                    <p className="text-sm text-[#64748B] font-['Noto_Sans']">{contractPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 pb-6 border-b border-[#E2E8F0]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#0F172A] font-['Manrope']">{contractPlan.price}</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] mt-2 font-['Noto_Sans']">{contractPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={contractPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold transition-all bg-[#0EA5E9] text-[#FFFFFF] hover:bg-[#0284C7] mb-8 font-['Manrope']"
                >
                  {contractPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {contractPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3 font-['Manrope']">
                        {section.title}
                      </h4>
                      <div className="space-y-2.5">
                        {/* 포함된 기능 섹션에서 종량제의 모든 기능 포함 표시 */}
                        {sectionIndex === 0 && (
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[#0EA5E9]" />
                            </div>
                            <span className="text-[#334155] text-sm font-['Noto_Sans']">
                              {contractPlan.includesAll}
                            </span>
                          </div>
                        )}
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#E0F2FE] text-[#0EA5E9]">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-[#334155] text-sm font-['Noto_Sans']">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-center text-[#FFFFFF] relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#0EA5E9]/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#0EA5E9]/10 rounded-full filter blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFFFFF]/10 text-[#E0F2FE] font-medium text-sm mb-6 font-['Noto_Sans']">
                {t('pricing.ctaBanner.badge')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['Manrope']">{t('pricing.ctaBanner.title')}</h3>
              <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto leading-relaxed font-['Noto_Sans']">
                {t('pricing.ctaBanner.description')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#FFFFFF] px-8 py-4 rounded-lg font-semibold hover:bg-[#0284C7] transition-all font-['Manrope']"
              >
                {t('pricing.ctaBanner.button')}
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
