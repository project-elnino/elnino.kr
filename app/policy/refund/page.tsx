'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

export default function RefundPolicyPage() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(0)

  const sections: { type: 'content' | 'descItems' | 'contact'; itemCount?: number }[] = [
    { type: 'content' },
    { type: 'descItems', itemCount: 3 },
    { type: 'descItems', itemCount: 3 },
    { type: 'descItems', itemCount: 4 },
    { type: 'descItems', itemCount: 3 },
    { type: 'contact' },
  ]

  const sectionTitles = sections.map((_, i) => t(`policy.refund.sections.${i}.title`))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-section'))
            if (!isNaN(idx)) setActiveSection(idx)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Topbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-foreground mb-8 text-sm transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              {t('policy.backToHome')}
            </Link>
            <h1 className="text-3xl font-bold text-foreground font-heading mb-2">
              {t('policy.refund.title')}
            </h1>
            <p className="text-sm text-slate-400">
              {t('policy.effectiveDate')}
            </p>
          </div>

          <div className="flex gap-16">
            {/* TOC Sidebar */}
            <nav className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-32">
                <ul className="space-y-1 text-sm border-l border-slate-200">
                  {sectionTitles.map((title, idx) => (
                    <li key={idx}>
                      <a
                        href={`#refund-${idx}`}
                        className={`block pl-4 py-1.5 -ml-px border-l-2 transition-colors ${
                          activeSection === idx
                            ? 'border-primary text-primary font-medium'
                            : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <section id={`refund-${idx}`} data-section={idx} className="mb-14 scroll-mt-32">
                    <h2 className="text-lg font-semibold text-foreground mb-3">{sectionTitles[idx]}</h2>

                    {section.type === 'content' && (
                      <p className="text-slate-600 text-[15px] leading-7">
                        {t(`policy.refund.sections.${idx}.content`)}
                      </p>
                    )}

                    {section.type === 'descItems' && (
                      <>
                        <p className="text-slate-600 text-[15px] leading-7 mb-4">
                          {t(`policy.refund.sections.${idx}.description`)}
                        </p>
                        <ul className="space-y-2">
                          {Array.from({ length: section.itemCount! }, (_, i) => (
                            <li key={i} className="flex items-start text-slate-600 text-sm leading-6">
                              <span className="text-slate-300 mr-3 mt-0.5 select-none">—</span>
                              <span>{t(`policy.refund.sections.${idx}.items.${i}`)}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {section.type === 'contact' && (
                      <>
                        <p className="text-slate-600 text-[15px] leading-7 mb-4">
                          {t(`policy.refund.sections.${idx}.content`)}
                        </p>
                        <p className="text-sm text-slate-600 mb-4">
                          E-mail: <a href={`mailto:${t(`policy.refund.sections.${idx}.contactInfo.email`)}`} className="text-primary hover:underline">{t(`policy.refund.sections.${idx}.contactInfo.email`)}</a>
                        </p>
                        <p className="text-slate-400 text-xs leading-5">
                          {t(`policy.refund.sections.${idx}.notice`)}
                        </p>
                      </>
                    )}
                  </section>
                  {idx < sections.length - 1 && <hr className="border-slate-100 mb-14" />}
                </div>
              ))}

              {/* Effective Notice */}
              <div className="mt-8 py-4 px-5 bg-slate-50 rounded-lg text-sm text-slate-600">
                {t('policy.refund.effectiveNotice')}
              </div>

              {/* Back */}
              <div className="pt-8 mt-8 border-t border-slate-100">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  {t('policy.backToHome')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
