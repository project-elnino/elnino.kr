'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { Check, Zap, Building2, ArrowRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

// 파티클 데이터 (고정 값으로 hydration 오류 방지)
const particleData = [
  { left: 8, top: 15, duration: 4.2, delay: 0.3 },
  { left: 22, top: 45, duration: 5.1, delay: 1.1 },
  { left: 35, top: 75, duration: 3.8, delay: 0.7 },
  { left: 48, top: 25, duration: 5.5, delay: 1.5 },
  { left: 62, top: 55, duration: 4.0, delay: 0.5 },
  { left: 75, top: 85, duration: 4.8, delay: 1.2 },
  { left: 88, top: 35, duration: 5.3, delay: 0.9 },
  { left: 15, top: 65, duration: 3.5, delay: 1.8 },
  { left: 55, top: 10, duration: 4.5, delay: 0.4 },
  { left: 82, top: 70, duration: 5.0, delay: 1.0 },
];

// 파티클 컴포넌트
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

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

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-gray-100 last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        className="w-full py-5 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">{item.question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
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
          <p className="text-gray-600 leading-relaxed bg-blue-50/50 rounded-xl p-4">{item.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* 애니메이션 그라데이션 배경 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-cyan-900/20"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Background animation elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <FloatingParticles />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-30"
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-25"
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 30, -30, 0],
              scale: [1, 0.9, 1.15, 1]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 3 }}
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
            <motion.div
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-blue-200 font-medium text-sm mb-6 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              투명한 가격 정책
            </motion.div>
            <h1 className="text-5xl font-extrabold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                가격 정책
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-10 rounded-full"></div>
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
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col border border-gray-100 transition-shadow duration-300"
            >
              {/* 카드 헤더 */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-600">일반 요금</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-sm">
                    {generalPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{generalPlan.name}</h3>
                    <p className="text-sm text-gray-500">{generalPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{generalPlan.price}</span>
                    <span className="text-lg text-gray-500">{generalPlan.priceUnit}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{generalPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={generalPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all bg-gray-900 text-white hover:bg-gray-800 mb-8 shadow-sm hover:shadow-md"
                >
                  {generalPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {generalPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2.5">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 text-gray-600">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-gray-600 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 계약 요금 카드 - Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col border-2 border-blue-500 transition-shadow duration-300"
            >
              {/* 카드 헤더 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                <h2 className="text-lg font-semibold text-white">계약 요금</h2>
              </div>

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    {contractPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{contractPlan.name}</h3>
                    <p className="text-sm text-gray-500">{contractPlan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{contractPlan.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{contractPlan.priceDescription}</p>
                </div>

                {/* CTA Button */}
                <Link
                  href={contractPlan.ctaLink}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 mb-8 shadow-lg hover:shadow-xl"
                >
                  {contractPlan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Feature Sections */}
                <div className="space-y-6">
                  {contractPlan.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2.5">
                        {/* 포함된 기능 섹션에서 종량제의 모든 기능 포함 표시 */}
                        {section.title === '포함된 기능' && (
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">
                              <span className="text-blue-600 font-semibold">{contractPlan.includesFrom}</span>의 모든 기능 포함
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
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">FAQ</span>
              <h2 className="text-3xl font-bold text-gray-900">자주 묻는 질문</h2>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
              {faqs.map((faq, index) => (
                <FAQAccordion key={index} item={faq} index={index} />
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full filter blur-3xl"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/20 rounded-full filter blur-3xl"
                animate={{
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 backdrop-blur-sm">
                맞춤 상담
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">맞춤 견적이 필요하신가요?</h3>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
                대규모 행사나 특별한 요구사항이 있으시다면 언제든지 문의해 주세요.
                <br />최적의 솔루션을 제안해 드립니다.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
                >
                  문의하기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
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
