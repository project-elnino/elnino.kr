'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Globe, Zap, MessageCircle, ChevronRight, X, Star } from "lucide-react"
import { motion } from "framer-motion"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"
import { useTranslation } from "@/lib/i18n"

// 서비스 소개서 URL (언어별)
const SERVICE_INTRODUCTION_URLS: Record<string, string> = {
  ko: "/Knoc설명서_국문.pdf",
  en: "/Knoc설명서_영문.pdf",
  ja: "/Knoc설명서_국문.pdf",
};

const SERVICES = [
  { key: 'easy', icon: Globe },
  { key: 'boost', icon: Zap },
  { key: 'scale', icon: MessageCircle },
] as const;

const FEATURES = ['autoDetect', 'speed', 'languages', 'pricing'] as const;

const STATS = [
  { value: '99%', key: 'accuracy' },
  { value: '101', key: 'languages' },
  { value: '1,000+', key: 'concurrent' },
  { value: '24/7', key: 'uptime' },
] as const;

const CLIENT_LOGOS = [
  { src: '/logos/konkuk.webp', alt: '건국대학교' },
  { src: '/logos/ksrit.svg', alt: '대한영상의학기술학회' },
] as const;

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;
}

export default function ProposalSection() {
  const { t, locale } = useTranslation()
  const [showIntroduction, setShowIntroduction] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)

  const SERVICE_INTRODUCTION_URL = SERVICE_INTRODUCTION_URLS[locale] || SERVICE_INTRODUCTION_URLS.ko;

  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    if (showIntroduction) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowIntroduction(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [showIntroduction]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Content */}
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light text-primary-dark text-xs font-semibold tracking-wide uppercase font-heading mb-6">
                  {t('hero.badge')}
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
                  {t('hero.title')}
                  <span className="block text-primary">{t('hero.titleHighlight')}</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed">
                  {t('hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-md text-primary-foreground bg-primary hover:bg-primary-dark transition-all shadow-md hover:shadow-lg font-heading"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => {
                      if (isMobileDevice()) {
                        window.open(SERVICE_INTRODUCTION_URL, '_blank');
                      } else {
                        setShowIntroduction(true);
                        setIframeLoading(true);
                      }
                    }}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-base font-bold rounded-md text-foreground bg-white hover:bg-slate-50 transition-colors font-heading"
                  >
                    {t('hero.brochure')}
                  </button>
                </div>
              </motion.div>

              {/* Right Image - hidden on mobile */}
              <motion.div
                className="relative hidden lg:flex w-full justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="relative w-full max-w-full aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src="/hero-conference.jpg"
                    alt="국제 비즈니스 컨퍼런스"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <div className="bg-background pt-6 pb-3">
          <p className="text-center text-sm font-semibold text-slate-400 tracking-wide uppercase font-heading">
            {t('clients.title')}
          </p>
        </div>
        <section className="py-4 bg-white border-y border-border">
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-16 items-center px-8 shrink-0">
                  {CLIENT_LOGOS.map((logo) => (
                    <div key={logo.alt} className="w-[180px] h-[50px] flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                      <Image src={logo.src} alt={logo.alt} width={180} height={50} className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>
              ))}
              {[...Array(5)].map((_, i) => (
                <div key={`clone-${i}`} className="flex gap-16 items-center px-8 shrink-0">
                  {CLIENT_LOGOS.map((logo) => (
                    <div key={logo.alt} className="w-[180px] h-[50px] flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                      <Image src={logo.src} alt={logo.alt} width={180} height={50} className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <div className="w-12 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-slate-700">
                {t('services.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map(({ key, icon: Icon }) => (
                <div key={key} className="group bg-white border border-border rounded-xl p-8 hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t(`services.${key}.description`)}
                  </p>
                  <span className="text-primary font-bold text-sm font-heading flex items-center group-hover:translate-x-1 transition-transform">
                    {t(`services.${key}.cta`)} <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="about" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-1 bg-primary rounded-full mb-4" />
                <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-6">
                  {t('why.title')}
                </h2>
                <p className="text-lg text-slate-700 mb-10">
                  {t('why.description')}
                </p>

                <div className="space-y-6">
                  {FEATURES.map((feature) => (
                    <div key={feature} className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-light">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-foreground">{t(`why.features.${feature}.title`)}</h4>
                        <p className="mt-1 text-slate-700">{t(`why.features.${feature}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div>
                <div className="bg-background rounded-2xl p-8 border border-border">
                  <div className="grid grid-cols-2 gap-6">
                    {STATS.map(({ value, key }) => (
                      <div key={key} className="text-center p-6 bg-white rounded-xl border border-border">
                        <p className="text-4xl font-bold text-primary font-heading">{value}</p>
                        <p className="text-sm text-muted-foreground mt-2">{t(`why.stats.${key}`)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <div className="w-12 h-1 bg-primary rounded-full mb-4" />
              <h2 className="text-3xl font-extrabold text-foreground">
                {t('testimonials.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[0, 1].map((i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                  <div className="flex text-primary mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="text-slate-700 italic mb-6 text-lg leading-relaxed">
                    &ldquo;{t(`testimonials.items.${i}.text`)}&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-border rounded-full flex items-center justify-center text-foreground font-bold font-heading">
                      {t(`testimonials.items.${i}.name`).charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-bold text-foreground">{t(`testimonials.items.${i}.name`)}</p>
                      <p className="text-xs text-muted-foreground">{t(`testimonials.items.${i}.role`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary-light font-medium text-sm mb-6">
              {t('cta.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all font-heading"
            >
              {t('cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Service Introduction Modal */}
      {showIntroduction && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowIntroduction(false)}
            ></div>

            <div className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full max-w-6xl h-[90vh] relative">
              <div className="bg-white border-b border-border px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-foreground">{t('modal.brochureTitle')}</h3>
                <button
                  onClick={() => setShowIntroduction(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                  aria-label={t('modal.close')}
                >
                  <X className="h-5 w-5 text-slate-700" />
                </button>
              </div>

              <div className="h-[calc(90vh-72px)]">
                {iframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white pt-16">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      <p className="mt-4 text-slate-700">{t('modal.loading')}</p>
                    </div>
                  </div>
                )}
                <iframe
                  src={SERVICE_INTRODUCTION_URL}
                  className="w-full h-full border-0"
                  title={t('modal.brochureTitle')}
                  allowFullScreen
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
