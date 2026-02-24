'use client'

import ContactForm from '@/components/ContactForm'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Noto_Sans'] text-[#0F172A]">
      <Topbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Page Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-medium text-sm mb-6 font-['Noto_Sans']">
              {t('contact.badge')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#0F172A] font-['Manrope'] mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-[#334155] font-['Noto_Sans'] max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
