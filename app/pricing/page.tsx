'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { Check, X as XIcon, ArrowRight, Users, DoorOpen, Monitor } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

const PLANS = [
  {
    key: 'starter',
    price: 0,
    includedHours: 0,
    unitPrice: '$5.59',
    overage: '$5.59',
    maxParticipants: 10,
    rooms: 1,
    subtitleScreen: false,
    ctaLink: 'https://cloud.elnino.kr/dashboard/team',
    popular: false,
  },
  {
    key: 'pro',
    price: 150,
    includedHours: 30,
    unitPrice: '$5.00',
    overage: '$5.59',
    maxParticipants: 150,
    rooms: 5,
    subtitleScreen: true,
    ctaLink: 'https://cloud.elnino.kr/dashboard/team',
    popular: true,
  },
  {
    key: 'team',
    price: 429,
    includedHours: 100,
    unitPrice: '$4.29',
    overage: '$4.99',
    maxParticipants: 300,
    rooms: 10,
    subtitleScreen: true,
    ctaLink: 'https://cloud.elnino.kr/dashboard/team',
    popular: false,
  },
  {
    key: 'business',
    price: 1077,
    includedHours: 300,
    unitPrice: '$3.59',
    overage: '$4.29',
    maxParticipants: 500,
    rooms: 30,
    subtitleScreen: true,
    ctaLink: '/contact',
    popular: false,
  },
] as const

export default function PricingPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Topbar />

      {/* Hero */}
      <section className="bg-background pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-background py-12 flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative bg-white rounded-2xl flex flex-col border transition-shadow duration-300 hover:shadow-lg ${
                  plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Plan name & description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {t(`pricing.plans.${plan.key}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`pricing.plans.${plan.key}.description`)}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-border">
                    {plan.price === 0 ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-foreground font-heading">$5.59</span>
                          <span className="text-sm text-muted-foreground">{t('pricing.perHour')}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{t('pricing.payAsYouGo')}</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-foreground font-heading">${plan.price.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">/{t('pricing.monthly')}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {plan.includedHours}{t('pricing.hour')} · {plan.unitPrice}{t('pricing.perHour')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Specs */}
                  <div className="space-y-3 mb-6 text-sm">
                    {plan.includedHours > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          {t('pricing.includedHours')}
                        </span>
                        <span className="font-semibold text-foreground">{plan.includedHours}{t('pricing.hour')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('pricing.overage')}</span>
                      <span className="font-semibold text-foreground">{plan.overage}{t('pricing.perHour')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {t('pricing.maxParticipants')}
                      </span>
                      <span className="font-semibold text-foreground">{plan.maxParticipants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <DoorOpen className="w-3.5 h-3.5" />
                        {t('pricing.simultaneousRooms')}
                      </span>
                      <span className="font-semibold text-foreground">{plan.rooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5" />
                        {t('pricing.subtitleScreen')}
                      </span>
                      {plan.subtitleScreen ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <XIcon className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      {t('pricing.features')}
                    </p>
                    <div className="space-y-2">
                      {[0, 1, 2, 3].map((idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          {t(`pricing.featureList.${idx}`)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      href={plan.ctaLink}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all font-heading ${
                        plan.popular
                          ? 'bg-primary text-primary-foreground hover:bg-primary-dark'
                          : 'bg-background text-foreground border border-border hover:bg-white hover:border-primary/30'
                      }`}
                    >
                      {plan.key === 'business' ? t('pricing.ctaContact') : t('pricing.cta')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      {t(`pricing.plans.${plan.key}.recommend`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary-light font-medium text-sm mb-6">
                {t('pricing.ctaBanner.badge')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('pricing.ctaBanner.title')}</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                {t('pricing.ctaBanner.description')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all font-heading"
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
