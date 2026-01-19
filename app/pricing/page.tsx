'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { Check, Zap, Building2, ArrowRight, HelpCircle } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string;
  answer: string;
}

// 일반 요금
const generalPlan = {
  name: '종량제',
  description: '사용한 만큼만 후불 결제',
  price: '3,900',
  priceUnit: '원/시간',
  priceDescription: '사용 후 청구',
  icon: <Zap className="w-6 h-6" />,
  cta: '시작하기',
  ctaLink: 'https://cloud.elnino.kr/dashboard/team',
  sections: [
    {
      title: '포함된 기능',
      items: [
        '101개 언어 지원',
        '실시간 번역',
        '자동 언어 인식 및 스위칭',
        '대시보드 접근',
      ]
    },
    {
      title: '서비스 범위',
      items: [
        '방별 최대 인원 10명',
        '동시 운영 가능 방 3개',
        '번역 데이터 활용: 서비스 개선 목적',
      ]
    },
    {
      title: '이런 상황에 추천해요',
      items: [
        '소규모 회의 (10명 이하)',
        '온라인 미팅',
        '간단한 테스트',
      ]
    }
  ]
}

// 계약 요금
const contractPlan = {
  name: '계약',
  description: '맞춤형 계약으로 프리미엄 서비스',
  price: '협의',
  priceDescription: '규모와 기간에 따라 책정',
  icon: <Building2 className="w-6 h-6" />,
  includesFrom: '종량제',
  cta: '문의하기',
  ctaLink: '/contact',
  types: [
    { name: '단기 계약', description: '컨퍼런스 · 워크샵 · 윈터스쿨 등 단발성 행사' },
    { name: '월정액', description: '기관 · 기업 · 대학교 등 정기적인 사용' },
  ],
  sections: [
    {
      title: '포함된 기능',
      items: [
        '맞춤형 견적',
        '분야별 부스팅 모델',
        '번역 자막 스크린 제공',
      ]
    },
    {
      title: '서비스 범위',
      items: [
        '방별 최대 인원 1,000명',
        '동시 운영 가능 방 무제한',
        '번역 데이터 비저장 및 미활용 보장',
      ]
    },
    {
      title: '이런 상황에 추천해요',
      items: [
        '컨퍼런스 · 학회 · 세미나 (100명 이상)',
        '기관 · 기업 · 대학교',
        '정기적인 대규모 행사',
      ]
    }
  ]
}

const faqs: FAQItem[] = [
  {
    question: '종량제와 계약 방식의 차이는 무엇인가요?',
    answer: '종량제는 사용한 시간만큼만 후불로 결제하는 방식입니다. 단기 계약과 월정액은 사전에 협의 후 계약을 체결하며, 대규모 행사나 정기적인 사용에 적합합니다.'
  },
  {
    question: '최소 이용 시간이 있나요?',
    answer: '종량제의 경우 최소 이용 시간 제한이 없습니다. 단기 계약과 월정액은 협의를 통해 조건을 조율합니다.'
  },
  {
    question: '결제 방식은 어떻게 되나요?',
    answer: '종량제는 사용 후 청구되는 후불 방식이며, 단기 계약과 월정액은 계약 시 협의된 조건에 따라 선불로 결제됩니다.'
  },
  {
    question: '어떤 요금제를 선택해야 하나요?',
    answer: '소규모 회의나 간단한 테스트는 종량제를, 컨퍼런스나 워크샵 같은 단기 행사는 단기 계약을, 기관이나 기업에서 지속적으로 사용하신다면 월정액을 추천드립니다.'
  },
  {
    question: '자동 언어 인식 및 스위칭이란 무엇인가요?',
    answer: '발화자가 어떤 언어로 말해도 자동으로 인식되며, 참가자는 자막 방에서 원하는 언어를 선택하면 자신의 언어로 번역된 내용을 볼 수 있습니다. 사전 언어 조사 없이도 다국어 소통이 가능합니다.'
  },
  {
    question: '분야별 부스팅 모델이란 무엇인가요?',
    answer: '의학, 법률, IT, 금융 등 특정 분야의 전문 용어를 더욱 정확하게 번역하기 위해 최적화된 AI 모델입니다. 단기 계약과 월정액에서 제공됩니다.'
  }
]

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <HelpCircle className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
      </motion.div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 py-32 relative overflow-hidden">
        {/* Background animation elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-blue-800 rounded-full filter blur-3xl opacity-20"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -20, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Title content */}
        <div className="container max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-extrabold text-white mb-6">가격 정책</h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-10"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              사용 목적에 맞는 최적의 요금제를 선택하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="bg-gray-50 py-20 flex-grow">
        <div className="container max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-20">

            {/* 일반 요금 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* 카드 헤더 */}
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-600">일반 요금</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                    {generalPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{generalPlan.name}</h3>
                    <p className="text-sm text-gray-500">{generalPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{generalPlan.price}</span>
                    <span className="text-lg text-gray-600">{generalPlan.priceUnit}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{generalPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={generalPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 mb-6"
                >
                  {generalPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Divider */}
                <div className="border-b border-gray-200 mb-6"></div>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {generalPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 text-green-600">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 계약 요금 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* 카드 헤더 */}
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-600">계약 요금</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                    {contractPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{contractPlan.name}</h3>
                    <p className="text-sm text-gray-500">{contractPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{contractPlan.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{contractPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={contractPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 mb-6"
                >
                  {contractPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Divider */}
                <div className="border-b border-gray-200 mb-6"></div>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {contractPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {/* 포함된 기능 섹션에서 종량제의 모든 기능 포함 표시 */}
                        {section.title === '포함된 기능' && (
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">
                              <span className="text-blue-600 font-medium">{contractPlan.includesFrom}</span>의 모든 기능 포함
                            </span>
                          </div>
                        )}
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 text-green-600">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">자주 묻는 질문</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {faqs.map((faq, index) => (
                <FAQAccordion key={index} item={faq} />
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full filter blur-2xl"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">맞춤 견적이 필요하신가요?</h3>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                대규모 행사나 특별한 요구사항이 있으시다면 언제든지 문의해 주세요.
                <br />최적의 솔루션을 제안해 드립니다.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                문의하기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
      `}</style>

      <Footer />
    </div>
  )
}
