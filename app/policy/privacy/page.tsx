'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(0)

  const sectionTitles = Array.from({ length: 8 }, (_, i) => t(`policy.privacy.sections.${i}.title`))

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-foreground mb-8 text-sm transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              {t('policy.backToHome')}
            </Link>
            <h1 className="text-3xl font-bold text-foreground font-heading mb-2">
              {t('policy.privacy.title')}
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
                        href={`#privacy-${idx}`}
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
              {/* Section 1 - 수집 항목 */}
              <section id="privacy-0" data-section="0" className="mb-14 scroll-mt-32">
                <h2 className="text-lg font-semibold text-foreground mb-3">{sectionTitles[0]}</h2>
                <p className="text-slate-600 text-[15px] leading-7 mb-5">
                  {t('policy.privacy.sections.0.description')}
                </p>
                <div className="space-y-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        {t(`policy.privacy.sections.0.subsections.${i}.subtitle`)}
                      </h3>
                      <p className="text-slate-500 text-sm leading-6">
                        {t(`policy.privacy.sections.0.subsections.${i}.content`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-slate-100 mb-14" />

              {/* Sections 2-6 */}
              {[1, 2, 3, 4, 5, 6].map((sectionIdx) => {
                const itemCounts = [5, 4, 4, 4, 2, 4]
                const count = itemCounts[sectionIdx - 1]
                return (
                  <div key={sectionIdx}>
                    <section id={`privacy-${sectionIdx}`} data-section={sectionIdx} className="mb-14 scroll-mt-32">
                      <h2 className="text-lg font-semibold text-foreground mb-3">{sectionTitles[sectionIdx]}</h2>
                      <p className="text-slate-600 text-[15px] leading-7 mb-4">
                        {t(`policy.privacy.sections.${sectionIdx}.description`)}
                      </p>
                      <ul className="space-y-2">
                        {Array.from({ length: count }, (_, i) => (
                          <li key={i} className="flex items-start text-slate-600 text-sm leading-6">
                            <span className="text-slate-300 mr-3 mt-0.5 select-none">—</span>
                            <span>{t(`policy.privacy.sections.${sectionIdx}.items.${i}`)}</span>
                          </li>
                        ))}
                      </ul>
                      {sectionIdx === 2 && (
                        <p className="text-slate-500 text-sm leading-6 mt-4">
                          {t('policy.privacy.sections.2.withdrawal')}
                        </p>
                      )}
                      {sectionIdx === 4 && (
                        <p className="text-slate-500 text-sm leading-6 mt-4">
                          {t('policy.privacy.sections.4.contact')}
                        </p>
                      )}
                    </section>
                    {sectionIdx < 6 && <hr className="border-slate-100 mb-14" />}
                  </div>
                )
              })}

              <hr className="border-slate-100 mb-14" />

              {/* Section 8 - 개인정보보호책임자 */}
              <section id="privacy-7" data-section="7" className="mb-14 scroll-mt-32">
                <h2 className="text-lg font-semibold text-foreground mb-3">{sectionTitles[7]}</h2>
                <p className="text-slate-600 text-[15px] leading-7 mb-4">
                  {t('policy.privacy.sections.7.description')}
                </p>
                <div className="text-sm text-slate-600 space-y-1 mb-4">
                  <p><span className="font-medium text-foreground">{t('policy.privacy.sections.7.contactInfo.name')}</span></p>
                  <p>E-mail: <a href={`mailto:${t('policy.privacy.sections.7.contactInfo.email')}`} className="text-primary hover:underline">{t('policy.privacy.sections.7.contactInfo.email')}</a></p>
                </div>
                <p className="text-slate-400 text-xs leading-5">
                  {t('policy.privacy.sections.7.notice')}
                </p>
              </section>

              {/* Back */}
              <div className="pt-8 border-t border-slate-100">
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
