'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRightIcon, CheckCircle, ChevronDown, Globe, X, Languages, Zap, MessageCircle, Coins, Sparkles } from "lucide-react"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"

// 서비스 소개서 URL - 로컬 PDF 파일 사용
const SERVICE_INTRODUCTION_URL = "/Knoc설명서_국문.pdf";

// 데이터 타입 정의
interface Stat {
  label: string;
  value: string;
}

// 차별화 포인트 데이터 타입에서 imageUrl 제거
interface Differentiator {
  id: string;
  title: string;
  description: string;
  highlight: string;
  stats: Stat[];
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

// 차별화 포인트 데이터에서 imageUrl 제거
const differentiators: Differentiator[] = [
  {
    id: "easy-setup",
    title: "간편한 사용",
    description: "별도 설치나 언어 설정 없이 크롬 브라우저에서 바로 사용할 수 있습니다. 참가자는 자신의 언어로 말하기만 하면 자동으로 인식되어 다른 언어로 번역됩니다. 모바일, 노트북 상관없이 모든 기기에서 이용 가능합니다.",
    highlight: "크롬 브라우저만 있으면 OK",
    stats: [
      { label: "설치", value: "불필요" },
      { label: "언어 설정", value: "불필요" },
      { label: "언어 인식", value: "자동" }
    ]
  },
  {
    id: "boosting-model",
    title: "단어 & 맥락 부스팅 모델",
    description: "특정 산업과 분야에 특화된 AI 모델로 키워드와 문맥을 동시에 부스팅합니다. 의학, 법률, IT, 금융 등 전문 분야에서 최대 99%의 정확도를 보장합니다.",
    highlight: "타사 대비 향상된 정확도",
    stats: [
      { label: "정확도", value: "99%" },
      { label: "지원 분야", value: "10+" },
      { label: "커스텀 가능", value: "Yes" }
    ]
  },
  {
    id: "scalable-solution",
    title: "다양한 규모 지원",
    description: "5인 소규모 회의부터 1,000명 이상의 대규모 컨퍼런스까지 모든 환경에서 안정적인 성능을 제공합니다. 네트워크 상태에 따라 자동으로 최적화됩니다.",
    highlight: "최대 1,000명 동시 접속 지원",
    stats: [
      { label: "최대 참가자", value: "1,000" },
      { label: "최소 참가자", value: "1명" },
      { label: "네트워크 자동 최적화", value: "Yes" }
    ]
  }
]

// 일반 특성 데이터
const commonFeatures: Feature[] = [
  {
    icon: <Languages className="w-6 h-6" />,
    title: "언어 조사 불필요",
    description: "발화자 언어는 자동 인식, 참가자는 원하는 언어로 번역 수신",
    details: "발화자의 언어는 자동으로 인식되고, 참가자는 원하는 언어를 직접 선택하여 번역을 받습니다. 회의 중에도 언어를 자유롭게 전환할 수 있어 사전 언어 조사가 필요 없습니다."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "빠른 속도",
    description: "발화 직후 즉시 번역되어 자연스러운 대화 흐름 유지하며 번역 제공",
    details: "AI 최적화 알고리즘으로 최소한의 지연으로 번역합니다. 전후 맥락을 고려한 매끄러운 대화를 경험하세요."
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "101개 언어 지원",
    description: "전 세계 주요 언어는 물론 소수 언어까지 폭넓게 지원",
    details: "영어와 중국어를 비롯한 언어부터 희소 언어까지 지원합니다. 모든 언어는 양방향 번역이 가능하며 지속적으로 업데이트됩니다."
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "합리적 가격",
    description: "합리적 요금제로 비용 효율성 극대화",
    details: "월 구독제로 합리적이고 투명한 과금 체계를 제공합니다. 기업 규모나 사용자 수에 따른 다양한 요금제를 선택할 수 있습니다."
  }
]

// 컴포넌트 Props 타입 정의
interface DifferentiatorItemProps {
  item: Differentiator;
  index: number;
}

interface FeatureItemProps {
  feature: Feature;
}

// 차별화 포인트 아이템 컴포넌트
function DifferentiatorItem({ item, index }: DifferentiatorItemProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8 md:p-12 overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
        {/* 배경 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-60"></div>

        {/* 배경에 큰 숫자 */}
        <div className="absolute top-4 right-6 sm:right-8 text-7xl sm:text-8xl md:text-9xl font-black text-gray-100 select-none z-0">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* 배경 블러 효과 - 정적 */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-200 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-200 rounded-full filter blur-3xl opacity-20" />

        {/* 텍스트 컨텐츠 영역 */}
        <div className="relative z-10">
          {/* 인덱스 배지 */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm mb-5 shadow-lg">
            {index + 1}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl">
            {item.description}
          </p>

          {/* 통계 정보 - 그리드 레이아웃 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-xl">
            {item.stats.map((stat, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-3 sm:p-5 text-center shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200"
              >
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xl sm:text-2xl mb-1 whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 하이라이트 정보 */}
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg">
            <CheckCircle className="inline-block h-5 w-5 mr-2" />
            {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
}

// 특성 아이템 컴포넌트
function FeatureItem({ feature }: FeatureItemProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full flex flex-col border border-gray-100 transition-shadow duration-200">
      {/* 상단 컨텐츠 영역 */}
      <div className="p-6 flex-1">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-5 shadow-lg">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
      </div>

      {/* 구분선 */}
      <div className="px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* 상세 내용 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-5">
        <p className="text-gray-700 text-sm leading-relaxed">{feature.details}</p>
      </div>
    </div>
  );
}

// Mobile detection helper
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;
}

export default function ProposalSection() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [showIntroduction, setShowIntroduction] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)
  
  // 섹션 참조 생성
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const commonRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  // 스크롤 프로그레스 - Framer Motion으로 변경
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 가로 스크롤 방지를 위한 useEffect 추가
  useEffect(() => {
    // 페이지 로드 시 가로 스크롤 방지
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      // 컴포넌트 언마운트 시 복원
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // 모달이 열렸을 때 스크롤 방지 및 ESC 키 핸들러
  useEffect(() => {
    if (showIntroduction) {
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // ESC 키 핸들러
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowIntroduction(false);
        }
      };
      
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [showIntroduction]);

  // 활성 섹션 결정 - CTA 섹션 인식 개선
  useEffect(() => {
    const handleScroll = () => {      
      const scrollPosition = window.scrollY + 100
      const windowHeight = window.innerHeight
      const bodyHeight = document.body.scrollHeight
      
      // 페이지 끝 근처에 도달하면 CTA 섹션으로 간주
      if (window.scrollY + windowHeight >= bodyHeight - 100) {
        setActiveSection("cta")
      } else if (ctaRef.current && scrollPosition >= ctaRef.current.offsetTop) {
        setActiveSection("cta")
      } else if (commonRef.current && scrollPosition >= commonRef.current.offsetTop) {
        setActiveSection("common")
      } else if (featuresRef.current && scrollPosition >= featuresRef.current.offsetTop) {
        setActiveSection("features")
      } else {
        setActiveSection("hero")
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 특정 섹션으로 스크롤 - 타입 오류 수정
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Topbar />
      {/* 스크롤 프로그레스 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 origin-left"
          style={{ scaleX }}
        />
      </div>
      
      {/* 사이드 네비게이션 */}
      <div className="fixed right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          {[
            { ref: heroRef, section: 'hero' },
            { ref: featuresRef, section: 'features' },
            { ref: commonRef, section: 'common' },
            { ref: ctaRef, section: 'cta' },
          ].map(({ ref, section }) => (
            <button
              key={section}
              onClick={() => scrollToSection(ref)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                activeSection === section ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400 hover:bg-gray-300'
              }`}
              aria-label={`${section} 섹션으로 이동`}
            />
          ))}
        </div>
      </div>

      {/* 히어로 섹션 */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center text-white overflow-hidden"
      >
        {/* 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900" />

        {/* 배경 요소 - 정적 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <div className="absolute top-20 left-5 w-48 h-48 lg:w-72 lg:h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-20" />
          <div className="absolute bottom-20 right-5 w-60 h-60 lg:w-96 lg:h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-16 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 mt-16 sm:mt-8 backdrop-blur-sm">
              AI 실시간 번역 서비스
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              언어 장벽 없는<br />세상을 만듭니다
            </h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 text-blue-100">
              분야별 커스텀 모델로 소규모 회의부터 대규모 컨퍼런스까지
              <br />어떤 환경에서든 완벽한 번역을 경험하세요.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="flex items-center justify-center bg-white text-blue-700 text-base px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 min-w-[160px]"
              >
                신청하기
              </Link>

              {/* Secondary CTA */}
              <button
                className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white text-base px-8 py-3.5 rounded-full font-semibold transition-colors duration-200 min-w-[160px]"
                onClick={() => {
                  // Mobile: open PDF directly in new tab (native PDF viewer)
                  if (isMobileDevice()) {
                    window.open(SERVICE_INTRODUCTION_URL, '_blank');
                  } else {
                    // Desktop: show iframe modal
                    setShowIntroduction(true);
                    setIframeLoading(true);
                  }
                }}
              >
                서비스 소개서
              </button>
            </div>

            {/* 통역방 입장하기 버튼 */}
            <div className="flex justify-center mb-16">
              <a
                href="https://cloud.elnino.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white text-base px-8 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
              >
                <Globe className="h-5 w-5" />
                통역방 입장하기
              </a>
            </div>

            {/* 스크롤 다운 인디케이터 */}
            <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-white/70 hover:text-white transition-colors animate-bounce"
                aria-label="아래로 스크롤"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 웨이브 디바이더 */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ marginBottom: '-1px', display: 'block' }}
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,48C960,64,1056,96,1152,96C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* 차별화 포인트 섹션 */}
      <section
        ref={featuresRef}
        className="py-24 bg-gray-50 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">차별화된 기술력</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Knoc만의 차별화 포인트</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              타 서비스와 다른 분야별 특화 번역 모델 기술로 안정적이고 정확한 번역 서비스를 제공합니다.
            </p>
          </div>

          <div className="space-y-24">
            {differentiators.map((item, index) => (
              <DifferentiatorItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 일반 특성 섹션 */}
      <section
        ref={commonRef}
        className="pt-24 pb-8 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">핵심 기능</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">놓칠 수 없는 주요 특성</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              최고의 번역 경험을 위한 필수 기능들을 모두 갖추었습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-stretch">
            {commonFeatures.map((feature, index) => (
              <FeatureItem key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section
        ref={ctaRef}
        className="py-24 bg-gradient-to-br from-blue-700 to-indigo-800 text-white relative overflow-hidden"
      >
        {/* 배경 요소 - 정적 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full filter blur-3xl opacity-15" />
          <div className="absolute bottom-0 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-700 rounded-full filter blur-3xl opacity-15" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            접속부터 사용까지 1분이면 충분합니다.
          </p>

          {/* 기대 효과 체크리스트 */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 backdrop-blur-sm">
              도입 시 기대효과
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
              {[
                '통역사 비용 절감',
                '행사 준비 시간 단축',
                '글로벌 참가자 확대',
                '다국어 동시 지원',
                '참가자 만족도 향상',
                '실시간 소통 가능',
                '별도 장비 불필요',
                '현장 운영 간소화'
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white/5 rounded-lg px-4 py-2.5 backdrop-blur-sm"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-white text-blue-700 text-sm md:text-lg px-6 md:px-10 py-3 md:py-5 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-shadow duration-200"
            >
              <Sparkles className="w-5 h-5" />
              도입 문의하기
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 고정 버튼 - 상단으로 스크롤 */}
      <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-50">
        <button
          onClick={() => scrollToSection(heroRef)}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 lg:p-4 rounded-full shadow-xl text-white hover:shadow-2xl transition-shadow duration-200"
          aria-label="맨 위로 이동"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* 서비스 소개서 iframe 모달 */}
      {showIntroduction && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
          onClick={() => setShowIntroduction(false)}
        >
          <div
            className="relative bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-semibold text-white">서비스 소개서</h3>
              <button
                onClick={() => setShowIntroduction(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* iframe 컨테이너 */}
            <div className="pt-16 h-full bg-gray-50">
              {/* 로딩 인디케이터 */}
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white pt-16 z-20">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 font-medium">로딩 중...</p>
                  </div>
                </div>
              )}
              <iframe
                src={SERVICE_INTRODUCTION_URL}
                className="w-full h-full border-0"
                title="서비스 소개서"
                allowFullScreen
                onLoad={() => setIframeLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Footer />
    </div>
  )
}