'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Smartphone, Monitor, AudioLines, Languages, Timer, ScanSearch, QrCode, ShieldCheck } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"
import { useTranslation } from "@/lib/i18n"

const USE_CASES = [
  { key: 'smallOffline', icon: Smartphone },
  { key: 'largeOffline', icon: AudioLines },
  { key: 'online', icon: Monitor },
] as const;

const ACCESSIBILITY_CARDS = [
  { key: 'autoDetect', icon: ScanSearch },
  { key: 'qr', icon: QrCode },
  { key: 'smartphone', icon: Smartphone },
  { key: 'languages', icon: Languages },
] as const;

const CLIENT_LOGOS = [
  { src: '/logos/konkuk.webp', alt: '건국대학교' },
  { src: '/logos/ksrit.svg', alt: '대한영상의학기술학회' },
] as const;

const HERO_KEYWORDS = ['hero.keyword.meeting', 'hero.keyword.conference', 'hero.keyword.lecture', 'hero.keyword.seminar'] as const;


function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card rounded-3xl p-8 shadow-[0_12px_34px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-primary/10 border border-transparent transition-all duration-300 flex flex-col"
    >
      <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
        <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-white" />
      </div>
      <h4 className="text-lg font-bold text-foreground mb-2">{title}</h4>
      <p className="text-[15px] text-slate-500 leading-relaxed flex-1">{description}</p>
    </motion.div>
  )
}

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px]">
      <div className="rounded-[2.2rem] overflow-hidden border-[5px] border-[#1a1a1a] shadow-2xl bg-black">
        <div className="bg-black pt-2.5 pb-1 flex justify-center">
          <div className="w-[60px] h-[18px] bg-[#0a0a0a] rounded-full" />
        </div>
        {children}
        <div className="bg-black py-2 flex justify-center">
          <div className="w-[80px] h-[4px] bg-white/25 rounded-full" />
        </div>
      </div>
      {/* Physical buttons */}
      <div className="absolute top-[18%] -right-[3px] w-[3px] h-[32px] bg-[#1a1a1a] rounded-r" />
      <div className="absolute top-[15%] -left-[3px] w-[3px] h-[20px] bg-[#1a1a1a] rounded-l" />
      <div className="absolute top-[24%] -left-[3px] w-[3px] h-[32px] bg-[#1a1a1a] rounded-l" />
      <div className="absolute top-[32%] -left-[3px] w-[3px] h-[32px] bg-[#1a1a1a] rounded-l" />
    </div>
  )
}

export default function ProposalSection() {
  const { t } = useTranslation()
  const [currentKeyword, setCurrentKeyword] = useState(0)
  const [activeUseCase, setActiveUseCase] = useState(0)
  const { scrollY } = useScroll()
  const blobY1 = useTransform(scrollY, [0, 500], [0, -80])
  const blobY2 = useTransform(scrollY, [0, 500], [0, -50])
  const blobY3 = useTransform(scrollY, [0, 500], [0, -120])

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
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />

      <main>
        {/* ── Hero — left text + right product screenshot ── */}
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <motion.div style={{ y: blobY1 }} className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-400/12 blur-[140px] pointer-events-none" />
          <motion.div style={{ y: blobY2 }} className="absolute top-[15%] right-[-15%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
          <motion.div style={{ y: blobY3 }} className="absolute bottom-[-15%] left-[25%] w-[700px] h-[700px] rounded-full bg-primary/6 blur-[160px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
                  <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">{t('hero.title')}</span>
                  <span className="block text-primary mt-2">
                    <span className="keyword-rotate-wrapper">
                      {HERO_KEYWORDS.map((key, i) => (
                        <span key={key} className={i === currentKeyword ? 'active' : ''}>{t(key)}</span>
                      ))}
                    </span>
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">{t('hero.description')}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl text-primary-foreground bg-primary hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] font-heading">
                    {t('hero.cta')} <ArrowRight className="ml-2 -mr-1 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/serviceintro" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl text-foreground bg-card/80 backdrop-blur-sm border border-border hover:bg-card hover:scale-[1.02] transition-all font-heading">
                    {t('hero.brochure')}
                  </Link>
                </div>
                <p className="text-sm text-slate-400 mt-4">{t('hero.ctaSub')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/96_w6KmshdY?start=55&autoplay=1&mute=1&loop=1&playlist=96_w6KmshdY&rel=0&modestbranding=1"
                    title="엘니뇨 서비스 소개"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Client Logos ── */}
        <section className="py-8">
          <p className="text-center text-xs font-semibold text-slate-400 tracking-widest uppercase font-heading mb-6">{t('clients.title')}</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
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

        {/* ── Technology — 2 feature cards ── */}
        <section className="py-24 bg-muted/40 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-5 leading-tight">{t('technology.title')}</h2>
              <p className="text-slate-500 leading-relaxed text-base lg:text-lg max-w-3xl mx-auto">{t('technology.description')}</p>
            </motion.div>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5 items-stretch">
              {([
                { key: 'instant', icon: Timer },
                { key: 'boost', icon: Zap },
              ] as const).map(({ key, icon }) => (
                <FeatureCard
                  key={key}
                  icon={icon}
                  title={t(`technology.cards.${key}.title`)}
                  description={t(`technology.cards.${key}.desc`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Accessibility — centered title + phone + 4 feature cards ── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-5 leading-tight">{t('accessibility.title')}</h2>
              <p className="text-slate-500 leading-relaxed text-base lg:text-lg max-w-3xl mx-auto">{t('accessibility.description')}</p>
            </motion.div>

            {/* Phone mockup + Webclient side by side */}
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
                {/* Phone mockup — subtitle room */}
                <div style={{ perspective: '1200px' }}>
                  <div style={{ transform: 'rotateY(6deg) rotateX(3deg)' }}>
                    <PhoneMockup>
                      <Image src="/images/subtitleroom.png" alt="Knoc Subtitle Room" width={1080} height={1813} className="w-full h-auto block" />
                    </PhoneMockup>
                  </div>
                </div>

                {/* Webclient screenshot */}
                <div className="max-w-[630px] w-full" style={{ perspective: '1200px' }}>
                  <div style={{ transform: 'rotateY(-4deg) rotateX(2deg)' }}>
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                      <Image src="/images/webclient.png" alt="Knoc Web Client" width={700} height={440} className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4 feature cards */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5 items-stretch">
              {ACCESSIBILITY_CARDS.map(({ key, icon }) => (
                <FeatureCard
                  key={key}
                  icon={icon}
                  title={t(`accessibility.cards.${key}.title`)}
                  description={t(`accessibility.cards.${key}.desc`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Overlay — right text + left real video screenshot ── */}
        <section className="py-24 bg-muted/40 relative overflow-hidden">
          <div className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/4 blur-[140px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ perspective: '1200px' }}
              >
                <div className="relative" style={{ transform: 'rotateY(6deg) rotateX(3deg)' }}>
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                    <Image src="/images/overlay-with-real-video.png" alt="실제 영상 위 자막 오버레이" width={960} height={540} className="w-full h-auto" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-[240px] rounded-xl overflow-hidden shadow-xl shadow-black/15 border-2 border-white/80">
                    <Image src="/images/overlay-lang-select.png" alt="오버레이 언어 선택" width={400} height={600} className="w-full h-auto" />
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight whitespace-pre-line">{t('overlaySection.title')}</h2>
                <p className="text-slate-500 leading-relaxed text-base lg:text-lg">{t('overlaySection.description')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Dashboard — left text + right screenshot ── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight whitespace-pre-line">{t('dashboard.title')}</h2>
                <p className="text-slate-500 leading-relaxed text-base lg:text-lg">{t('dashboard.description')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ perspective: '1200px' }}
              >
                <div style={{ transform: 'rotateY(-6deg) rotateX(3deg)' }}>
                  <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/10">
                    <Image src="/images/dashboard.png" alt="Knoc Dashboard" width={2664} height={1582} className="w-full h-auto" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Use Cases — audio capture guide ── */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl mb-5">{t('useCases.title')}</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">{t('howToUse.description')}</p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {USE_CASES.map(({ key, icon: Icon }, index) => (
                <button
                  key={key}
                  onClick={() => setActiveUseCase(index)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeUseCase === index
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-slate-500 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(`howToUse.tabs.${key}.label`)}
                </button>
              ))}
            </div>

            {/* Active use case — audio guide */}
            <motion.div
              key={activeUseCase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                {/* Guide card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm mb-6">
                  <div className="flex items-start gap-4">
                    {(() => { const Icon = USE_CASES[activeUseCase].icon; return <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div> })()}
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {t(`howToUse.tabs.${USE_CASES[activeUseCase].key}.guideTitle`)}
                      </h3>
                      <p className="text-slate-500 leading-relaxed">
                        {t(`howToUse.tabs.${USE_CASES[activeUseCase].key}.guideDesc`)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {t(`howToUse.tabs.${USE_CASES[activeUseCase].key}.examples`).split(',').map((ex: string, i: number) => (
                    <span key={i} className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                      {ex.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Security Banner ── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex items-center justify-center gap-4 py-5 px-8 rounded-2xl bg-primary/5 border border-primary/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-primary tracking-wider uppercase">{t('security.label')}</span>
                <p className="text-sm text-slate-500 mt-0.5">{t('security.description')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 bg-muted/40 relative overflow-hidden">
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-400/4 blur-[140px] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl mb-4">{t('testimonials.title')}</h2>
              <p className="text-lg text-slate-500">{t('testimonials.subtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="rounded-2xl p-8 lg:p-10 bg-gradient-to-br from-primary/[0.03] to-card border border-primary/10 flex flex-col hover:shadow-lg transition-all duration-300 relative"
                >
                  <span className="text-6xl leading-none text-primary/20 font-serif absolute top-6 left-8">&ldquo;</span>
                  <p className="text-slate-700 text-lg leading-relaxed flex-1 mt-6">
                    {t(`testimonials.items.${i}.text`)}
                  </p>
                  <div className="flex items-center mt-8 pt-6 border-t border-border/50">
                    <div className="h-11 w-11 bg-primary/8 rounded-full flex items-center justify-center text-primary font-bold text-sm">
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

        {/* ── CTA (light tone) ── */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary/5 via-blue-50/80 to-white rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden border border-border">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/8 rounded-full filter blur-[140px]"
                  animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/4 rounded-full filter blur-[140px]"
                  animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">{t('cta.title')}</h2>
                <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">{t('cta.description')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contact" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark hover:scale-[1.02] transition-all font-heading text-lg">
                    {t('cta.button')} <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/faq" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white text-foreground hover:bg-slate-50 hover:scale-[1.02] transition-all font-heading text-lg shadow-sm">
                    {t('faqLink.cta')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
