'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Globe, Zap, MessageCircle, ChevronRight, X, Star } from "lucide-react"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"
import { useTranslation } from "@/lib/i18n"

// 서비스 소개서 URL (언어별)
const SERVICE_INTRODUCTION_URLS: Record<string, string> = {
  ko: "/Knoc설명서_국문.pdf",
  en: "/Knoc설명서_영문.pdf",
  ja: "/Knoc설명서_국문.pdf", // 일본어 버전 없으면 국문 사용
};

// Mobile detection helper
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

  // 가로 스크롤 방지
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // 모달 ESC 키 핸들러
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
    <div className="min-h-screen bg-[#F8F9FA] font-['Noto_Sans'] text-[#0F172A]">
      <Topbar />

      <main>
        {/* Hero Section - 2 Column Layout */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-semibold tracking-wide uppercase font-['Manrope'] mb-6">
                  {t('hero.badge')}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight font-['Manrope'] mb-6">
                  {t('hero.title')}<br /><span className="text-[#0EA5E9]">{t('hero.titleHighlight')}</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#334155] font-['Noto_Sans'] mb-8 leading-relaxed">
                  {t('hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-md text-[#FFFFFF] bg-[#0EA5E9] hover:bg-[#0284C7] transition-all shadow-md hover:shadow-lg font-['Manrope']"
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
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-[#E2E8F0] text-base font-bold rounded-md text-[#0F172A] bg-[#FFFFFF] hover:bg-[#F1F5F9] transition-colors font-['Manrope']"
                  >
                    {t('hero.brochure')}
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative lg:h-[600px] w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg lg:max-w-full aspect-[4/5] lg:aspect-[4/3]">
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#0EA5E9] rounded-3xl opacity-20 transform rotate-3"></div>
                  <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-[#0F172A] rounded-3xl opacity-10 transform -rotate-2"></div>
                  <img
                    src="/hero-conference.jpg"
                    alt="국제 비즈니스 컨퍼런스"
                    className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section className="py-10 bg-[#FFFFFF] border-y border-[#E2E8F0] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-[#94A3B8] tracking-wide uppercase font-['Manrope'] mb-8">
              {t('clients.title')}
            </p>
            <div className="relative">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

              {/* Infinite scroll - needs 2 copies for seamless loop */}
              <div className="flex animate-marquee">
                <div className="flex gap-16 items-center px-8 shrink-0">
                  <div className="w-[180px] h-[50px] flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/konkuk.webp" alt="건국대학교" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="w-[180px] h-[50px] flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/ksrit.svg" alt="대한영상의학기술학회" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
                <div className="flex gap-16 items-center px-8 shrink-0">
                  <div className="w-[180px] h-[50px] flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/konkuk.webp" alt="건국대학교" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="w-[180px] h-[50px] flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/ksrit.svg" alt="대한영상의학기술학회" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - 3 Cards */}
        <section id="services" className="py-24 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl font-['Manrope'] mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-[#334155] font-['Noto_Sans']">
                {t('services.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: 간편한 사용 */}
              <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 hover:border-[#0EA5E9] transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-12 h-12 bg-[#E0F2FE] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <Globe className="h-6 w-6 text-[#0EA5E9] group-hover:text-[#FFFFFF] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-['Manrope'] mb-3">
                  {t('services.easy.title')}
                </h3>
                <p className="text-[#334155] font-['Noto_Sans'] leading-relaxed mb-4">
                  {t('services.easy.description')}
                </p>
                <span className="text-[#0EA5E9] font-bold text-sm font-['Manrope'] flex items-center group-hover:translate-x-1 transition-transform">
                  {t('services.easy.cta')} <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>

              {/* Card 2: 부스팅 모델 */}
              <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 hover:border-[#0EA5E9] transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-12 h-12 bg-[#E0F2FE] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <Zap className="h-6 w-6 text-[#0EA5E9] group-hover:text-[#FFFFFF] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-['Manrope'] mb-3">
                  {t('services.boost.title')}
                </h3>
                <p className="text-[#334155] font-['Noto_Sans'] leading-relaxed mb-4">
                  {t('services.boost.description')}
                </p>
                <span className="text-[#0EA5E9] font-bold text-sm font-['Manrope'] flex items-center group-hover:translate-x-1 transition-transform">
                  {t('services.boost.cta')} <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>

              {/* Card 3: 다양한 규모 */}
              <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 hover:border-[#0EA5E9] transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-12 h-12 bg-[#E0F2FE] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9] transition-colors">
                  <MessageCircle className="h-6 w-6 text-[#0EA5E9] group-hover:text-[#FFFFFF] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-['Manrope'] mb-3">
                  {t('services.scale.title')}
                </h3>
                <p className="text-[#334155] font-['Noto_Sans'] leading-relaxed mb-4">
                  {t('services.scale.description')}
                </p>
                <span className="text-[#0EA5E9] font-bold text-sm font-['Manrope'] flex items-center group-hover:translate-x-1 transition-transform">
                  {t('services.scale.cta')} <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section - 2 Column */}
        <section id="about" className="py-24 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl font-['Manrope'] mb-6">
                  {t('why.title')}
                </h2>
                <p className="text-lg text-[#334155] font-['Noto_Sans'] mb-10">
                  {t('why.description')}
                </p>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#E0F2FE]">
                        <Check className="h-5 w-5 text-[#0EA5E9]" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[#0F172A] font-['Manrope']">{t('why.features.autoDetect.title')}</h4>
                      <p className="mt-1 text-[#334155] font-['Noto_Sans']">{t('why.features.autoDetect.description')}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#E0F2FE]">
                        <Check className="h-5 w-5 text-[#0EA5E9]" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[#0F172A] font-['Manrope']">{t('why.features.speed.title')}</h4>
                      <p className="mt-1 text-[#334155] font-['Noto_Sans']">{t('why.features.speed.description')}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#E0F2FE]">
                        <Check className="h-5 w-5 text-[#0EA5E9]" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[#0F172A] font-['Manrope']">{t('why.features.languages.title')}</h4>
                      <p className="mt-1 text-[#334155] font-['Noto_Sans']">{t('why.features.languages.description')}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#E0F2FE]">
                        <Check className="h-5 w-5 text-[#0EA5E9]" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-[#0F172A] font-['Manrope']">{t('why.features.pricing.title')}</h4>
                      <p className="mt-1 text-[#334155] font-['Noto_Sans']">{t('why.features.pricing.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Stats Box */}
              <div className="relative">
                <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-[#E2E8F0]">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0]">
                      <p className="text-4xl font-bold text-[#0EA5E9] font-['Manrope']">99%</p>
                      <p className="text-sm text-[#64748B] font-['Noto_Sans'] mt-2">{t('why.stats.accuracy')}</p>
                    </div>
                    <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0]">
                      <p className="text-4xl font-bold text-[#0EA5E9] font-['Manrope']">101</p>
                      <p className="text-sm text-[#64748B] font-['Noto_Sans'] mt-2">{t('why.stats.languages')}</p>
                    </div>
                    <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0]">
                      <p className="text-4xl font-bold text-[#0EA5E9] font-['Manrope']">1,000+</p>
                      <p className="text-sm text-[#64748B] font-['Noto_Sans'] mt-2">{t('why.stats.concurrent')}</p>
                    </div>
                    <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0]">
                      <p className="text-4xl font-bold text-[#0EA5E9] font-['Manrope']">24/7</p>
                      <p className="text-sm text-[#64748B] font-['Noto_Sans'] mt-2">{t('why.stats.uptime')}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#0F172A] p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                  <p className="text-3xl font-bold text-[#0EA5E9] font-['Manrope']">10+</p>
                  <p className="text-sm text-[#E2E8F0] font-['Noto_Sans'] mt-1">{t('why.stats.fields')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] text-center font-['Manrope'] mb-16">
              {t('testimonials.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E2E8F0]">
                <div className="flex text-[#0EA5E9] mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-[#334155] italic font-['Noto_Sans'] mb-6 text-lg leading-relaxed">
                  &ldquo;{t('testimonials.items.0.text')}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-[#0F172A] font-bold font-['Manrope']">
                    {t('testimonials.items.0.name').charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-[#0F172A] font-['Manrope']">{t('testimonials.items.0.name')}</p>
                    <p className="text-xs text-[#64748B] font-['Noto_Sans']">{t('testimonials.items.0.role')}</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E2E8F0]">
                <div className="flex text-[#0EA5E9] mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-[#334155] italic font-['Noto_Sans'] mb-6 text-lg leading-relaxed">
                  &ldquo;{t('testimonials.items.1.text')}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-[#0F172A] font-bold font-['Manrope']">
                    {t('testimonials.items.1.name').charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-[#0F172A] font-['Manrope']">{t('testimonials.items.1.name')}</p>
                    <p className="text-xs text-[#64748B] font-['Noto_Sans']">{t('testimonials.items.1.role')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section id="contact" className="py-24 bg-[#0F172A] relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#0EA5E9]/20 rounded-full filter blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#0EA5E9]/10 rounded-full filter blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFFFFF]/10 text-[#E0F2FE] font-medium text-sm mb-6 font-['Noto_Sans']">
              {t('cta.button')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#FFFFFF] font-['Manrope'] mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-[#94A3B8] font-['Noto_Sans'] mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] text-[#FFFFFF] px-8 py-4 rounded-lg font-semibold hover:bg-[#0284C7] transition-all font-['Manrope']"
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
              className="fixed inset-0 bg-[#0F172A] bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowIntroduction(false)}
            ></div>

            <div className="inline-block bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full max-w-6xl h-[90vh] relative">
              {/* Header */}
              <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#0F172A] font-['Manrope']">{t('modal.brochureTitle')}</h3>
                <button
                  onClick={() => setShowIntroduction(false)}
                  className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
                  aria-label={t('modal.close')}
                >
                  <X className="h-5 w-5 text-[#334155]" />
                </button>
              </div>

              {/* Content */}
              <div className="h-[calc(90vh-72px)]">
                {iframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white pt-16">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EA5E9]"></div>
                      <p className="mt-4 text-[#334155] font-['Noto_Sans']">{t('modal.loading')}</p>
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
