'use client'

import ContactForm from '@/components/ContactForm'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Topbar />

      <main className="flex-1">
        {/* Hero with gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-[10%] right-[-8%] w-[350px] h-[350px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[40%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-12 relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading tracking-tight mb-4">
                {t('contact.title')}
              </h1>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                {t('contact.description')}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
