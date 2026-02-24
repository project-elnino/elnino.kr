'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

export default function TermsOfServicePage() {
  const { t } = useTranslation()

  // Section 2 definitions
  const definitions = Array.from({ length: 6 }, (_, i) => ({
    term: t(`policy.terms.sections.1.definitions.${i}.term`),
    definition: t(`policy.terms.sections.1.definitions.${i}.definition`),
  }))

  // Sections with items (sections 4-8)
  const section4Items = [
    t('policy.terms.sections.3.items.0'),
    t('policy.terms.sections.3.items.1'),
  ]
  const section5Items = [
    t('policy.terms.sections.4.items.0'),
    t('policy.terms.sections.4.items.1'),
  ]
  const section6Items = [
    t('policy.terms.sections.5.items.0'),
    t('policy.terms.sections.5.items.1'),
  ]
  const section7Items = [
    t('policy.terms.sections.6.items.0'),
    t('policy.terms.sections.6.items.1'),
  ]
  const section8Items = [
    t('policy.terms.sections.7.items.0'),
    t('policy.terms.sections.7.items.1'),
    t('policy.terms.sections.7.items.2'),
    t('policy.terms.sections.7.items.3'),
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
              {t('policy.terms.title')}
            </h1>
            <p className="text-sm text-[#64748B]">
              {t('policy.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Section 1 - Purpose */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                {t('policy.terms.sections.0.title')}
              </h2>
              <p className="text-[#334155] leading-relaxed">
                {t('policy.terms.sections.0.content')}
              </p>
            </section>

            {/* Section 2 - Definitions */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                {t('policy.terms.sections.1.title')}
              </h2>
              <p className="text-[#334155] leading-relaxed mb-4">{t('policy.terms.sections.1.description')}</p>
              <div className="bg-[#FFFFFF] p-6 rounded-lg border border-[#E2E8F0] space-y-3">
                {definitions.map((def, index) => (
                  <p key={index} className="text-[#334155]">
                    <span className="font-semibold text-[#0F172A]">① {def.term}</span> {def.definition}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 3 - Rules Outside Terms */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                {t('policy.terms.sections.2.title')}
              </h2>
              <p className="text-[#334155] leading-relaxed">
                {t('policy.terms.sections.2.content')}
              </p>
            </section>

            {/* Section 4 - Formation of Agreement */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                {t('policy.terms.sections.3.title')}
              </h2>
              <div className="space-y-3 text-[#334155] leading-relaxed">
                {section4Items.map((item, index) => (
                  <p key={index}>① {item}</p>
                ))}
              </div>
            </section>

            {/* Section 5 - Service Application */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                {t('policy.terms.sections.4.title')}
              </h2>
              <div className="space-y-3 text-[#334155] leading-relaxed">
                {section5Items.map((item, index) => (
                  <p key={index}>① {item}</p>
                ))}
              </div>
            </section>

            {/* Section 6 - Privacy Policy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                {t('policy.terms.sections.5.title')}
              </h2>
              <div className="space-y-3 text-[#334155] leading-relaxed">
                {section6Items.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </section>

            {/* Section 7 - Operator's Obligations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">7</span>
                {t('policy.terms.sections.6.title')}
              </h2>
              <div className="space-y-3 text-[#334155] leading-relaxed">
                {section7Items.map((item, index) => (
                  <p key={index}>① {item}</p>
                ))}
              </div>
            </section>

            {/* Section 8 - Member's Obligations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A] font-['Manrope'] mb-4 flex items-center">
                <span className="bg-[#0F172A] text-[#FFFFFF] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">8</span>
                {t('policy.terms.sections.7.title')}
              </h2>
              <div className="space-y-3 text-[#334155] leading-relaxed">
                {section8Items.map((item, index) => (
                  <p key={index}>① {item}</p>
                ))}
              </div>
            </section>

            {/* Supplementary Provisions */}
            <section className="mb-10">
              <div className="bg-[#E0F2FE] p-6 rounded-lg border border-[#BAE6FD]">
                <p className="text-[#0C4A6E] font-semibold font-['Manrope']">
                  {t('policy.terms.effectiveNotice')}
                </p>
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
