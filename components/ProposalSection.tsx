'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRightIcon,  CheckCircle, ChevronDown, Globe, X } from "lucide-react"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"

// 서비스 소개서 URL - 이 부분을 실제 URL로 변경하세요
const SERVICE_INTRODUCTION_URL = "https://gamma.app/embed/wmsjc2q5wzsaqjw";

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
  icon: string;
  title:string;
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
    icon: "🌐",
    title: "언어 조사 불필요",
    description: "발화자 언어는 자동 인식, 참가자는 원하는 언어로 번역 수신",
    details: "발화자의 언어는 자동으로 인식되고, 참가자는 원하는 언어를 직접 선택하여 번역을 받습니다. 회의 중에도 언어를 자유롭게 전환할 수 있어 사전 언어 조사가 필요 없습니다."
  },
  {
    icon: "⚡",
    title: "빠른 속도",
    description: "발화 직후 즉시 번역되어 자연스러운 대화 흐름 유지하며 번역 제공",
    details: "AI 최적화 알고리즘으로 최소한의 지연으로 번역합니다. 전후 맥락을 고려한 매끄러운 대화를 경험하세요."
  },
  {
    icon: "🗣️",
    title: "101개 언어 지원",
    description: "전 세계 주요 언어는 물론 소수 언어까지 폭넓게 지원",
    details: "영어와 중국어를 비롯한 언어부터 희소 언어까지 지원합니다. 모든 언어는 양방향 번역이 가능하며 지속적으로 업데이트됩니다."
  },
  {
    icon: "💰",
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
  index: number;
}

// --- [수정된 부분] 차별화 포인트 아이템 컴포넌트 ---
// 이미지를 사용하지 않는 카드 디자인으로 변경
function DifferentiatorItem({ item, index }: DifferentiatorItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="max-w-5xl mx-auto" // 카드 너비 확장
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
    >
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 md:p-12 overflow-hidden">
        {/* 배경에 큰 숫자로 디자인 요소 추가 */}
        <div className="absolute top-4 right-8 text-8xl md:text-9xl font-black text-gray-200/80 select-none z-0">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* 배경에 은은하게 움직이는 블러 효과 추가 */}
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [0, 10, -5, 0], y: [0, -5, 10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-50"
          animate={{ x: [0, -10, 5, 0], y: [0, 5, -10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        />

        {/* 텍스트 컨텐츠 영역 */}
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h3>
          <div className="h-1 w-16 bg-blue-500 mb-6"></div>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl">
            {item.description}
          </p>

          {/* 통계 정보 - 그리드 레이아웃 */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-xl">
            {item.stats.map((stat, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center transform transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md border border-gray-200/50">
                <p className="text-blue-600 font-bold text-xl sm:text-2xl mb-1 whitespace-nowrap">{stat.value}</p>
                <p className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 하이라이트 정보 */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg shadow-sm">
            <CheckCircle className="inline-block h-5 w-5 mr-2 text-blue-600" />
            {item.highlight}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 특성 아이템 컴포넌트
function FeatureItem({ feature }: FeatureItemProps) {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* 상단 컨텐츠 영역 */}
      <div className="p-6 flex-1">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl text-xl mb-4 shadow-sm">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-700 text-sm">{feature.description}</p>
      </div>
      
      {/* 구분선 - 모든 카드에서 동일한 위치 */}
      <div className="px-6">
        <div className="h-px bg-gray-200"></div>
      </div>
      
      {/* 상세 내용 */}
      <div className="bg-blue-50 px-6 py-4">
        <p className="text-gray-700 text-sm leading-relaxed">{feature.details}</p>
      </div>
    </motion.div>
  );
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
      {/* 스크롤 프로그레스 바 - Framer Motion으로 변경 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-blue-600 origin-left"
          style={{ scaleX }}
        ></motion.div>
      </div>
      
      {/* 사이드 네비게이션 - 위치 조정 */}
      <div className="fixed right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={() => scrollToSection(heroRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'hero' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="히어로 섹션으로 이동"
          />
          <button 
            onClick={() => scrollToSection(featuresRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'features' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="차별화 포인트 섹션으로 이동"
          />
          <button 
            onClick={() => scrollToSection(commonRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'common' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="주요 특성 섹션으로 이동"
          />
          <button 
            onClick={() => scrollToSection(ctaRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'cta' ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'}`}
            aria-label="CTA 섹션으로 이동"
          />
        </div>
      </div>

      {/* 히어로 섹션 */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden"
      >
        {/* 배경 애니메이션 요소 - 위치와 크기 조정 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
          <motion.div 
            className="absolute top-20 left-5 w-48 h-48 lg:w-64 lg:h-64 bg-blue-800 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, 15, -10, 0],
              y: [0, -10, 10, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-5 w-60 h-60 lg:w-80 lg:h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, -15, 10, 0],
              y: [0, 10, -10, 0],
              scale: [1, 0.95, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10 py-16 max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 backdrop-blur-sm">
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
            <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mb-8">
              <Button 
                size="default" 
                className="bg-white hover:bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/contact">
                    <span className="flex items-center justify-center">
                      지금 신청하기
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5" />
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
              </Button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  size="default" 
                  className="bg-white hover:bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full"
                  onClick={() => {
                    setShowIntroduction(true);
                    setIframeLoading(true);
                  }}
                >
                  서비스 소개서
                </Button>
              </motion.div>
            </div>
            
            {/* 통역방 입장하기 버튼 - 중앙에 추가 */}
            <div className="flex justify-center mb-16">
              <Button 
                variant="outline" 
                size="default" 
                className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full backdrop-blur-sm"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href="https://cloud.elnino.kr/" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center justify-center">
                      <Globe className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      통역방 입장하기
                    </span>
                  </a>
                </motion.div>
              </Button>
            </div>
            
            {/* 스크롤 다운 인디케이터 */}
            <motion.div 
              className="absolute bottom-9 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <button 
                onClick={() => scrollToSection(featuresRef)} 
                className="text-white/70 hover:text-white transition-colors"
                aria-label="아래로 스크롤"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </motion.div>
          </div>
        </motion.div>
        
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
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">차별화된 기술력</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Knoc만의 차별화 포인트</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              타 서비스와 다른 분야별 특화 번역 모델 기술로 안정적이고 정확한 번역 서비스를 제공합니다.
            </p>
          </motion.div>

          <div className="space-y-24">
            {differentiators.map((item, index) => (
              <DifferentiatorItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 일반 특성 섹션 - 2x2 그리드 + 상호작용 패널 */}
      <section 
        ref={commonRef}
        className="pt-24 pb-8 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">핵심 기능</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">놓칠 수 없는 주요 특성</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              최고의 번역 경험을 위한 필수 기능들을 모두 갖추었습니다.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
          >
            {commonFeatures.map((feature, index) => (
              <FeatureItem key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section 
        ref={ctaRef}
        className="py-24 bg-gradient-to-br from-blue-700 to-indigo-800 text-white relative overflow-hidden"
      >
        {/* 배경 요소 - 크기와 위치 조정 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, -10, 5, 0],
              y: [0, 5, -8, 0],
              scale: [1, 1.02, 0.98, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-700 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [0, 10, -5, 0],
              y: [0, -5, 8, 0],
              scale: [1, 0.98, 1.02, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            접속부터 사용까지 1분이면 충분합니다.
          </p>
          
          {/* 기대 효과 체크리스트 */}
          <div className="mx-auto mb-10 inline-block">
            <p className="text-lg font-semibold mb-4 text-center">도입 시 기대효과</p>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
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
                <div key={i} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* --- [수정된 부분] 버튼: Link를 a 태그로 변경 --- */}
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Link href="/contact" className="group bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full inline-flex items-center justify-center font-semibold shadow-sm">
                도입 문의하기
              </Link>
            </motion.div>
          </div>
          {/* --- [수정 완료] --- */}
        </motion.div>
      </section>

      {/* 고정 버튼 - 상단으로 스크롤 */}
      <motion.div 
        className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-50"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={() => scrollToSection(heroRef)}
          className="bg-white p-3 lg:p-4 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
          aria-label="맨 위로 이동"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </motion.div>

      {/* 서비스 소개서 iframe 모달 */}
      {showIntroduction && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowIntroduction(false)}
        >
          <motion.div 
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-semibold text-gray-900">서비스 소개서</h3>
              <button 
                onClick={() => setShowIntroduction(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="닫기"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* iframe 컨테이너 */}
            <div className="pt-16 h-full">
              {/* 로딩 인디케이터 */}
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white pt-16">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">로딩 중...</p>
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
          </motion.div>
        </motion.div>
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