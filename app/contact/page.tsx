'use client'

import ContactForm from '@/components/ContactForm'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { useTranslation } from '@/lib/i18n'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-foreground font-heading mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
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
