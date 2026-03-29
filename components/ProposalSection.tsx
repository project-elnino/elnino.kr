'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, Zap, Star, Smartphone, Monitor, AudioLines, Languages, Timer, ScanSearch, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"
import { useTranslation } from "@/lib/i18n"

const USE_CASES = [
  { key: 'meeting', icon: Smartphone },
  { key: 'conference', icon: AudioLines },
  { key: 'lecture', icon: Monitor },
  { key: 'seminar', icon: Globe },
] as const;

const CLIENT_LOGOS = [
  { src: '/logos/konkuk.webp', alt: '건국대학교' },
  { src: '/logos/ksrit.svg', alt: '대한영상의학기술학회' },
] as const;

const HERO_KEYWORDS = ['hero.keyword.meeting', 'hero.keyword.conference', 'hero.keyword.lecture', 'hero.keyword.seminar'] as const;

const TESTIMONIAL_COLORS = ['from-primary/6 to-cyan-50/80', 'from-violet-50/80 to-indigo-50/60'] as const;

export default function ProposalSection() {
  const { t } = useTranslation()
  const [currentKeyword, setCurrentKeyword] = useState(0)

  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => { document.documentElement.style.overflowX = ''; document.body.style.overflowX = ''; };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentKeyword(prev => (prev + 1) % HERO_KEYWORDS.length), 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Topbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/8 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
                {t('hero.title')}
                {t('hero.titleHighlight') && <span className="block text-primary">{t('hero.titleHighlight')}</span>}
                <span className="block text-primary mt-2">
                  <span className="keyword-rotate-wrapper">
                    {HERO_KEYWORDS.map((key, i) => (
                      <span key={key} className={i === currentKeyword ? 'active' : ''}>{t(key)}</span>
                    ))}
                  </span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 mb-12 mt-8 leading-relaxed max-w-2xl mx-auto">{t('hero.description')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl text-primary-foreground bg-primary hover:bg-primary-dark transition-all shadow-md hover:shadow-lg font-heading">
                  {t('hero.cta')} <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
                <Link href="/serviceintro" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl text-foreground bg-white border border-slate-200 hover:bg-slate-50 transition-colors font-heading">
                  {t('hero.brochure')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Client Logos ── */}
        <section className="py-8">
          <p className="text-center text-xs font-semibold text-slate-400 tracking-widest uppercase font-heading mb-6">{t('clients.title')}</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-16 items-center px-8 shrink-0">
                  {CLIENT_LOGOS.map((logo) => (
                    <div key={logo.alt} className="w-[180px] h-[50px] flex items-center justify-center opacity-40 hover:opacity-80 transition-all duration-300">
                      <Image src={logo.src} alt={logo.alt} width={180} height={50} className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>
              ))}
              {[...Array(5)].map((_, i) => (
                <div key={`clone-${i}`} className="flex gap-16 items-center px-8 shrink-0">
                  {CLIENT_LOGOS.map((logo) => (
                    <div key={logo.alt} className="w-[180px] h-[50px] flex items-center justify-center opacity-40 hover:opacity-80 transition-all duration-300">
                      <Image src={logo.src} alt={logo.alt} width={180} height={50} className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Block 1: 기술력 — 상단 가로 사진 + 아래 제목/카드 ── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 제목 + 설명 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                {t('strengths.blocks.technology.title')}
              </h2>
              <p className="text-slate-500 leading-relaxed text-base lg:text-lg max-w-3xl">
                {t('strengths.blocks.technology.description')}
              </p>
            </motion.div>

            {/* 가로형 스크린샷 풀 와이드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Image src="/screenshots/overlay-subtitle-white.png" alt="Knoc Overlay Subtitle" width={1142} height={314} className="rounded-2xl border border-border shadow-lg w-full h-auto" />
            </motion.div>

            {/* 카드 3열 */}
            <div className="grid md:grid-cols-3 gap-4">
              {([
                { icon: Zap, titleKey: 'strengths.blocks.technology.boost.title', descKey: 'strengths.blocks.technology.boost.description' },
                { icon: Timer, titleKey: 'strengths.blocks.technology.speed.title', descKey: 'strengths.blocks.technology.speed.description' },
                { icon: ScanSearch, titleKey: 'strengths.blocks.technology.autoDetect.title', descKey: 'strengths.blocks.technology.autoDetect.description' },
              ] as const).map(({ icon: Icon, titleKey, descKey }, index) => (
                <motion.div
                  key={titleKey}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-2">{t(titleKey)}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t(descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Block 2: 범위 — 교차 (왼쪽 제목/카드 + 오른쪽 사진) ── */}
        <section className="py-24 bg-slate-50/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 왼쪽 제목 + 카드 */}
              <div className="order-2 lg:order-1">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                    {t('strengths.blocks.coverage.title')}
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-base lg:text-lg">
                    {t('strengths.blocks.coverage.description')}
                  </p>
                </motion.div>
                <div className="flex flex-col gap-4">
                  {([
                    { icon: Languages, titleKey: 'strengths.blocks.coverage.languages.title', descKey: 'strengths.blocks.coverage.languages.description' },
                    { icon: MessageCircle, titleKey: 'strengths.blocks.coverage.scale.title', descKey: 'strengths.blocks.coverage.scale.description' },
                  ] as const).map(({ icon: Icon, titleKey, descKey }, index) => (
                    <motion.div
                      key={titleKey}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-1">{t(titleKey)}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{t(descKey)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 오른쪽 사진 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-1 lg:order-2"
              >
                <Image src="/screenshots/overlay.png" alt="Knoc Overlay Language Select" width={600} height={400} className="rounded-2xl border border-border shadow-lg w-full h-auto" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Block 3: 접근성 — 왼쪽 사진 + 오른쪽 텍스트/수치 ── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 왼쪽 사진 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/screenshots/webclient.png" alt="Knoc Web Client" width={600} height={400} className="rounded-2xl border border-border shadow-lg w-full h-auto" />
              </motion.div>

              {/* 오른쪽 텍스트 + 수치 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                  {t('strengths.blocks.accessibility.title')}
                </h2>
                <p className="text-slate-500 leading-relaxed text-base lg:text-lg mb-10">
                  {t('strengths.blocks.accessibility.description')}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[0, 1, 2, 3].map((index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
                      <p className="text-3xl lg:text-4xl font-bold text-primary font-heading tracking-tight">{t(`strengths.blocks.accessibility.stats.${index}.value`)}</p>
                      <p className="text-sm text-slate-500 mt-1">{t(`strengths.blocks.accessibility.stats.${index}.label`)}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5 }}>
              <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl mb-5">{t('useCases.title')}</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">{t('useCases.description')}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {USE_CASES.map(({ key, icon: Icon }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{t(`useCases.items.${key}.title`)}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t(`useCases.items.${key}.description`)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 bg-slate-50/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t('testimonials.title')}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1].map((i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-3xl p-9 lg:p-10 bg-gradient-to-br ${TESTIMONIAL_COLORS[i]} border border-border flex flex-col min-h-[280px]`}
                >
                  <div className="flex text-primary mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 mb-8 text-base leading-relaxed flex-1">
                    &ldquo;{t(`testimonials.items.${i}.text`)}&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-white/80 rounded-full flex items-center justify-center text-foreground font-bold font-heading text-sm shadow-sm">
                      {t(`testimonials.items.${i}.name`).charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-bold text-foreground">{t(`testimonials.items.${i}.name`)}</p>
                      <p className="text-xs text-slate-500">{t(`testimonials.items.${i}.role`)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/15 rounded-full filter blur-[120px]" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/8 rounded-full filter blur-[120px]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('cta.title')}</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all font-heading text-lg">
                {t('cta.button')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/faq" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-slate-700 text-white hover:bg-slate-800 transition-all font-heading text-lg">
                {t('faqLink.cta')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
