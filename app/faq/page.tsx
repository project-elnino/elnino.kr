'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left group hover:bg-slate-50/50 -mx-2 px-2 rounded-lg transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-foreground pr-4 group-hover:text-primary transition-colors">{item.question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-muted-foreground group-hover:bg-primary-light group-hover:text-primary'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-5 pl-0">
          <p className="text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4">{item.answer}</p>
        </div>
      </motion.div>
    </div>
  )
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

export default function FAQPage() {
  const { t } = useTranslation()

  // 카테고리별 FAQ 가져오기
  const categories: FAQCategory[] = [0, 1, 2].map((catIdx) => {
    const name = t(`faq.categories.${catIdx}.name`)
    const items: FAQItem[] = []
    for (let i = 0; i < 10; i++) {
      const q = t(`faq.categories.${catIdx}.items.${i}.question`)
      if (q === `faq.categories.${catIdx}.items.${i}.question`) break
      items.push({
        question: q,
        answer: t(`faq.categories.${catIdx}.items.${i}.answer`),
      })
    }
    return { name, items }
  }).filter(cat => cat.items.length > 0)

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      <Topbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-36 pb-16 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[10%] right-[-8%] w-[350px] h-[350px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[40%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading mb-4">{t('faq.title')}</h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              {t('faq.description')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section — Categorized */}
      <section className="bg-white py-12 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {categories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: catIdx * 0.12 }}
              >
                <h2 className="text-lg font-bold text-foreground font-heading mb-4">{category.name}</h2>
                <div className="bg-white rounded-2xl border border-border px-6 sm:px-8 py-2">
                  {category.items.map((item, idx) => (
                    <FAQAccordion key={idx} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading">{t('faq.ctaBanner.title')}</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                {t('faq.ctaBanner.description')}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark hover:scale-[1.02] transition-all font-heading"
              >
                {t('faq.ctaBanner.button')}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
