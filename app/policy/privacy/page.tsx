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
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark mb-6 text-sm font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('policy.backToHome')}
            </Link>
            <h1 className="text-4xl font-extrabold text-foreground font-heading mb-4">
              {t('policy.privacy.title')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('policy.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground font-heading mb-4 flex items-center">
                <span className="bg-foreground text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                {t('policy.privacy.section1.title')}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {t('policy.privacy.section1.description')}
              </p>
              <div className="bg-white p-6 rounded-lg border border-border">
                <p className="text-foreground mb-2 font-semibold font-heading">{t('policy.privacy.section1.itemsLabel')}</p>
                <p className="text-slate-700 leading-relaxed mb-4">{t('policy.privacy.section1.items')}</p>
                <p className="text-foreground mb-2 font-semibold font-heading">{t('policy.privacy.section1.methodLabel')}</p>
                <p className="text-slate-700 leading-relaxed">{t('policy.privacy.section1.method')}</p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground font-heading mb-4 flex items-center">
                <span className="bg-foreground text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                {t('policy.privacy.section2.title')}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {t('policy.privacy.section2.description')}
              </p>
              <div className="bg-white p-6 rounded-lg border border-border">
                <ul className="space-y-3 text-slate-700">
                  {purposes.map((purpose, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground font-heading mb-4 flex items-center">
                <span className="bg-foreground text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                {t('policy.privacy.section3.title')}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {t('policy.privacy.section3.description')}
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground font-heading">{t('policy.privacy.section3.internal.title')}</p>
                  <ul className="mt-2 text-slate-700 space-y-1">
                    <li><span className="font-medium">{t('policy.privacy.section3.internal.itemLabel')}</span> {t('policy.privacy.section3.internal.item')}</li>
                    <li><span className="font-medium">{t('policy.privacy.section3.internal.reasonLabel')}</span> {t('policy.privacy.section3.internal.reason')}</li>
                    <li><span className="font-medium">{t('policy.privacy.section3.internal.periodLabel')}</span> {t('policy.privacy.section3.internal.period')}</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground font-heading">{t('policy.privacy.section3.legal.title')}</p>
                  <p className="text-sm text-muted-foreground mb-3">{t('policy.privacy.section3.legal.description')}</p>
                  <ul className="mt-2 text-slate-700 space-y-1">
                    {legalItems.map((item, index) => (
                      <li key={index}><span className="font-medium">{item.label}</span> {item.period}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-md shadow-sm text-base font-bold text-foreground bg-white hover:bg-slate-50 transition-colors font-heading"
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
