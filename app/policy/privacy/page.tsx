'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation()

  // Parse nested arrays from translation
  const purposes = [
    t('policy.privacy.section2.purposes.0'),
    t('policy.privacy.section2.purposes.1'),
    t('policy.privacy.section2.purposes.2'),
    t('policy.privacy.section2.purposes.3'),
  ]

  const legalItems = [
    { label: t('policy.privacy.section3.legal.items.0.label'), period: t('policy.privacy.section3.legal.items.0.period') },
    { label: t('policy.privacy.section3.legal.items.1.label'), period: t('policy.privacy.section3.legal.items.1.period') },
    { label: t('policy.privacy.section3.legal.items.2.label'), period: t('policy.privacy.section3.legal.items.2.period') },
    { label: t('policy.privacy.section3.legal.items.3.label'), period: t('policy.privacy.section3.legal.items.3.period') },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Noto_Sans'] text-[#0F172A]">
      <Topbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Header */}
          <div className="mb-10 border-b border-[#E2E8F0] pb-8">
            <Link href="/" className="inline-flex items-center text-[#0EA5E9] hover:text-[#0284C7] mb-6 text-sm font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('policy.backToHome')}
            </Link>
            <h1 className="text-4xl font-extrabold text-[#0F172A] font-['Manrope'] mb-4">
              {t('policy.privacy.title')}
            </h1>
            <p className="text-sm text-[#64748B]">
              {t('policy.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                {t('policy.privacy.section1.title')}
              </h2>
              <p className="text-[#334155] leading-relaxed mb-4">
                {t('policy.privacy.section1.description')}
              </p>
              <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0]">
                <p className="text-[#0F172A] mb-2 font-semibold font-['Manrope']">{t('policy.privacy.section1.itemsLabel')}</p>
                <p className="text-[#334155] leading-relaxed mb-4">{t('policy.privacy.section1.items')}</p>
                <p className="text-[#0F172A] mb-2 font-semibold font-['Manrope']">{t('policy.privacy.section1.methodLabel')}</p>
                <p className="text-[#334155] leading-relaxed">{t('policy.privacy.section1.method')}</p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                {t('policy.privacy.section2.title')}
              </h2>
              <p className="text-[#334155] leading-relaxed mb-4">
                {t('policy.privacy.section2.description')}
              </p>
              <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0]">
                <ul className="space-y-3 text-[#334155]">
                  {purposes.map((purpose, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#0EA5E9] mr-2">•</span>
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                {t('policy.privacy.section3.title')}
              </h2>
              <p className="text-[#334155] leading-relaxed mb-4">
                {t('policy.privacy.section3.description')}
              </p>
              <div className="space-y-4">
                <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#E2E8F0]">
                  <p className="font-semibold text-[#0F172A] font-['Manrope']">{t('policy.privacy.section3.internal.title')}</p>
                  <ul className="mt-2 text-[#334155] space-y-1">
                    <li><span className="font-medium">{t('policy.privacy.section3.internal.itemLabel')}</span> {t('policy.privacy.section3.internal.item')}</li>
                    <li><span className="font-medium">{t('policy.privacy.section3.internal.reasonLabel')}</span> {t('policy.privacy.section3.internal.reason')}</li>
                    <li><span className="font-medium">{t('policy.privacy.section3.internal.periodLabel')}</span> {t('policy.privacy.section3.internal.period')}</li>
                  </ul>
                </div>
                <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#E2E8F0]">
                  <p className="font-semibold text-[#0F172A] font-['Manrope']">{t('policy.privacy.section3.legal.title')}</p>
                  <p className="text-sm text-[#64748B] mb-3">{t('policy.privacy.section3.legal.description')}</p>
                  <ul className="mt-2 text-[#334155] space-y-1">
                    {legalItems.map((item, index) => (
                      <li key={index}><span className="font-medium">{item.label}</span> {item.period}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#E2E8F0] rounded-md shadow-sm text-base font-bold text-[#0F172A] bg-[#FFFFFF] hover:bg-[#F1F5F9] transition-colors font-['Manrope']"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t('policy.backToHome')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
