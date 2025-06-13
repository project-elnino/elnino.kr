'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ChevronRight, CheckCircle, ChevronDown, Globe } from "lucide-react"

// 데이터 타입 정의
interface Stat {
  label: string;
  value: string;
}

interface Differentiator {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  highlight: string;
  stats: Stat[];
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  details: string;
}

// 차별화 포인트 데이터
const differentiators: Differentiator[] = [
  {
    id: "boosting-model",
    title: "단어 & 맥락 부스팅 모델",
    description: "특정 산업과 분야에 특화된 AI 모델로 키워드와 문맥을 동시에 부스팅합니다. 의학, 법률, IT, 금융 등 전문 분야에서 최대 99%의 정확도를 보장합니다.",
    imageUrl: "/images/easy-setup.png",
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
    description: "5인 소규모 회의부터 5,000명 이상의 대규모 컨퍼런스까지 모든 환경에서 안정적인 성능을 제공합니다. 네트워크 상태에 따라 자동으로 최적화됩니다.",
    imageUrl: "/images/scalable-solution.png",
    highlight: "최대 5,000명 동시 접속 지원",
    stats: [
      { label: "최대 참가자", value: "5,000+" },
      { label: "최소 참가자", value: "1명" },
      { label: "네트워크 자동 최적화", value: "Yes" }
    ]
  },
  {
    id: "easy-setup",
    title: "간편 설치 & 사용",
    description: "프로그램 설치 만으로 시스템 구축이 완료됩니다. 발표자는 노트북 한 대, 참가자는 스마트폰만으로 원활한 번역 서비스를 이용할 수 있습니다.",
    imageUrl: "/images/easy-setup.png",
    highlight: "설치 소요시간 단 1분",
    stats: [
      { label: "설치 단계", value: "1단계" },
      { label: "필요 장비", value: "노트북 1대" },
      { label: "기술 지원", value: "24/7" }
    ]
  }
]

// 일반 특성 데이터
const commonFeatures: Feature[] = [
  {
    icon: "⚡",
    title: "빠른 속도",
    description: "발화 직후 즉시 번역되어 자연스러운 대화 흐름 유지하며 번역 제공",
    details: "AI 최적화 알고리즘으로 발화자의 말을 실시간으로 분석하여 최소한의 지연으로 번역합니다. 전후 맥락을 고려하여 번역하는 기술로 매끄러운 대화를 경험하세요."
  },
  {
    icon: "🗣️",
    title: "101개 언어 지원",
    description: "전 세계 주요 언어는 물론 소수 언어까지 폭넓게 지원",
    details: "영어, 중국어, 스페인어 등 주요 언어는 물론 아이슬란드어, 스와힐리어 같은 희소 언어까지 지원합니다. 모든 언어는 양방향 번역이 가능합니다."
  },
  {
    icon: "🌐",
    title: "언어 조사 불필요",
    description: "참가자의 언어를 본인이 직접 선택 가능",
    details: "참가자의 언어를 참가자가 직접 선택하여 사용 언어를 조사할 필요 없습니다. 사전 조사 없이 빠르게 시작할 수 있습니다."
  },
  {
    icon: "💰",
    title: "합리적 가격",
    description: "합리적 요금제로 비용 효율성 극대화",
    details: "월 구독제로 합리적 가격으로 최고의 경험을 제공합니다."
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

// 차별화 포인트 아이템 컴포넌트
function DifferentiatorItem({ item, index }: DifferentiatorItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      key={item.id}
      ref={ref}
      className="flex flex-col lg:flex-row items-center mx-auto relative max-w-6xl"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.2 }}
    >
      {/* 이미지 컨테이너 */}
      <div className="lg:w-1/2 px-4 lg:px-8 mb-12 lg:mb-0 relative">
        {/* 숫자 - 위치 조정 */}
        <div 
          className="absolute top-3 left-4 lg:left-8 text-6xl lg:text-8xl font-black text-gray-200 select-none"
          style={{ 
            zIndex: 10,
            pointerEvents: 'none' 
          }}
        >
          {(index + 1).toString().padStart(2, '0')}
        </div>
        
        {/* 이미지 박스 - 오버플로우 제한 */}
        <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden aspect-square w-full max-w-lg mx-auto">
          {/* 배경 블러 효과 - 애니메이션 범위 축소 */}
          <motion.div 
            className="absolute -top-5 -left-5 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-30"
            animate={{ 
              x: [0, 5, -3, 0],
              y: [0, -3, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-30"
            animate={{ 
              x: [0, -5, 3, 0],
              y: [0, 3, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* 이미지 */}
          <div className="p-8 flex items-center justify-center h-full relative">
            <Image 
              src={item.imageUrl} 
              alt={item.title}
              width={400}
              height={400}
              className="object-contain transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
      
      {/* 텍스트 영역 */}
      <div className="lg:w-1/2 px-4 lg:px-8">
        <div className="max-w-lg mx-auto lg:mx-0">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            {item.title}
          </h3>
          <div className="h-1 w-16 bg-blue-500 mb-6"></div>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {item.description}
          </p>
          
          {/* 통계 정보 - 3열 그리드 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {item.stats.map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 text-center transform transition-transform hover:translate-y-[-5px] shadow-sm hover:shadow-md">
                <p className="text-blue-600 font-bold text-xl mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg shadow-sm">
            {item.highlight}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 특성 아이템 컴포넌트
function FeatureItem({ feature }: FeatureItemProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md overflow-hidden"
      whileHover={{ scale: expanded ? 1.02 : 1.01 }}
      animate={{ 
        scale: expanded ? 1.02 : 1,
        zIndex: expanded ? 10 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-2xl text-2xl mb-6 shadow-sm">
          {feature.icon}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-700 mb-4">{feature.description}</p>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          {expanded ? '간략히 보기' : '자세히 보기'} 
          <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
      
      {/* 확장 패널 - Framer Motion 사용 */}
      <motion.div 
        className="bg-blue-50 overflow-hidden"
        animate={{ 
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
          padding: expanded ? "1rem 2rem" : "0 2rem"
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-700">{feature.details}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ProposalSection() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  
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

  // 활성 섹션 결정 - CTA 섹션 인식 개선
  useEffect(() => {
    const handleScroll = () => {      
      // 현재 활성 섹션 결정
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
              <Button 
                variant="outline" 
                size="default" 
                className="bg-white hover:bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/contact">
                    서비스 소개서
                  </Link>
                </motion.div>
              </Button>
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
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
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
        className="py-24 bg-white overflow-hidden"
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

          <div className="space-y-40">
            {differentiators.map((item, index) => (
              <DifferentiatorItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 일반 특성 섹션 - 2x2 그리드 + 상호작용 패널 */}
      <section 
        ref={commonRef}
        className="py-24 bg-gray-50 overflow-hidden"
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
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
            설치부터 활용까지 1분 안에 가능합니다.
          </p>
          
          {/* 기대 효과 체크리스트 */}
          <div className="max-w-md mx-auto mb-10 text-left">
            <p className="text-lg font-semibold mb-4 text-center">도입 시 기대효과</p>
            <ul className="space-y-3">
              {[
                '국제 회의 참여율 향상',
                '참가자 이해도 증진',
                '글로벌 고객 만족도 증가'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-2 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="default" 
              className="group bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full"
              asChild
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/contact">
                  도입 문의하기
                </Link>
              </motion.div>
            </Button>
          </div>
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

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  )
}