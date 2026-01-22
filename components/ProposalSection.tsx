'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, CheckCircle, ChevronDown, Globe, X, Languages, Zap, MessageCircle, Coins, Sparkles } from "lucide-react"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"

// 파티클 데이터 (고정 값으로 hydration 오류 방지)
const particleData = [
  { left: 5, top: 10, duration: 4, delay: 0.2, xOffset: 5 },
  { left: 15, top: 25, duration: 5, delay: 0.8, xOffset: -8 },
  { left: 25, top: 60, duration: 3.5, delay: 1.2, xOffset: 10 },
  { left: 35, top: 40, duration: 6, delay: 0.5, xOffset: -5 },
  { left: 45, top: 80, duration: 4.5, delay: 1.8, xOffset: 7 },
  { left: 55, top: 15, duration: 5.5, delay: 0.3, xOffset: -10 },
  { left: 65, top: 70, duration: 3.8, delay: 1.5, xOffset: 8 },
  { left: 75, top: 35, duration: 4.2, delay: 0.7, xOffset: -6 },
  { left: 85, top: 55, duration: 5.2, delay: 1.1, xOffset: 4 },
  { left: 95, top: 20, duration: 4.8, delay: 0.4, xOffset: -7 },
  { left: 10, top: 85, duration: 3.2, delay: 1.6, xOffset: 9 },
  { left: 30, top: 5, duration: 5.8, delay: 0.9, xOffset: -4 },
  { left: 50, top: 45, duration: 4.3, delay: 1.3, xOffset: 6 },
  { left: 70, top: 90, duration: 3.6, delay: 0.6, xOffset: -9 },
  { left: 90, top: 50, duration: 5.1, delay: 1.4, xOffset: 3 },
];

// 파티클 컴포넌트
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// 카운터 애니메이션 컴포넌트
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const isNumeric = /^\d+/.test(value);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (isInView && isNumeric) {
      const animation = count.set(0);
      const controls = count.set(numericValue);

      let startTime: number;
      const duration = 1500;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        count.set(numericValue * easeOut);
        setDisplayValue(Math.round(numericValue * easeOut).toString());

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value.replace(/[^0-9+%]/g, ''));
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, isNumeric, numericValue, value, count]);

  if (!isNumeric) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

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
  index: number;
}

// 차별화 포인트 아이템 컴포넌트
function DifferentiatorItem({ item, index }: DifferentiatorItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
    >
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8 md:p-12 overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
        {/* 배경 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-60"></div>

        {/* 배경에 큰 숫자 */}
        <div className="absolute top-4 right-6 sm:right-8 text-7xl sm:text-8xl md:text-9xl font-black text-gray-100 select-none z-0 transition-all duration-500 group-hover:text-blue-100/80">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* 배경 블러 효과 */}
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 bg-blue-200 rounded-full filter blur-3xl opacity-30"
          animate={{ x: [0, 15, -10, 0], y: [0, -10, 15, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-200 rounded-full filter blur-3xl opacity-30"
          animate={{ x: [0, -15, 10, 0], y: [0, 10, -15, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 3 }}
        />

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
              <motion.div
                key={i}
                className="relative bg-white rounded-2xl p-3 sm:p-5 text-center shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden group"
                whileHover={{ y: -6, scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xl sm:text-2xl mb-1 whitespace-nowrap">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 하이라이트 정보 */}
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg">
            <CheckCircle className="inline-block h-5 w-5 mr-2" />
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
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full flex flex-col border border-gray-100 transition-shadow duration-300"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* 상단 컨텐츠 영역 */}
      <div className="p-6 flex-1">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
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
      {/* 스크롤 프로그레스 바 - 그라데이션 효과 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900/20 z-50 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left shadow-lg shadow-blue-500/50"
          style={{ scaleX }}
        />
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50 -translate-y-0.5"
          style={{
            left: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            opacity: useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])
          }}
        />
      </div>
      
      {/* 사이드 네비게이션 - 라벨 포함 */}
      <div className="fixed right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-end space-y-4">
          {[
            { ref: heroRef, section: 'hero', label: '소개' },
            { ref: featuresRef, section: 'features', label: '차별화' },
            { ref: commonRef, section: 'common', label: '기능' },
            { ref: ctaRef, section: 'cta', label: '시작' },
          ].map(({ ref, section, label }) => (
            <button
              key={section}
              onClick={() => scrollToSection(ref)}
              className="group flex items-center gap-3"
              aria-label={`${label} 섹션으로 이동`}
            >
              <span className={`text-xs font-medium px-2 py-1 rounded-md transition-all duration-300 ${
                activeSection === section
                  ? 'bg-blue-600 text-white opacity-100'
                  : 'bg-gray-800/80 text-white opacity-0 group-hover:opacity-100'
              }`}>
                {label}
              </span>
              <div className={`relative transition-all duration-300 ${
                activeSection === section ? 'w-4 h-4' : 'w-3 h-3 group-hover:w-3.5 group-hover:h-3.5'
              }`}>
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-blue-600 shadow-lg shadow-blue-600/50'
                    : 'bg-gray-400 group-hover:bg-gray-300'
                }`} />
                {activeSection === section && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 히어로 섹션 */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center text-white overflow-hidden"
      >
        {/* 애니메이션 그라데이션 배경 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-purple-900/50 via-transparent to-cyan-900/30"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-indigo-900/40 via-transparent to-blue-900/40"
            animate={{
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* 배경 애니메이션 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <FloatingParticles />
          <motion.div
            className="absolute top-20 left-5 w-48 h-48 lg:w-72 lg:h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-30"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-5 w-60 h-60 lg:w-96 lg:h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-25"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -20, 0],
              scale: [1, 0.9, 1.15, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-40 h-40 lg:w-64 lg:h-64 bg-purple-500 rounded-full filter blur-[80px] opacity-20"
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
              delay: 4
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
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8">
              {/* Primary CTA with glow */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-blue-200/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Link
                  href="/contact"
                  className="relative flex items-center justify-center gap-2 bg-white text-blue-700 text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  지금 신청하기
                  <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="default"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300"
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
                <motion.div
                  key={i}
                  className="flex items-center bg-white/5 rounded-lg px-4 py-2.5 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA 버튼 with glow */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-white/40 via-blue-200/40 to-white/40 rounded-full blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Link
                href="/contact"
                className="relative flex items-center justify-center gap-2 bg-white text-blue-700 text-sm md:text-lg px-6 md:px-10 py-3 md:py-5 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                도입 문의하기
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 고정 버튼 - 상단으로 스크롤 */}
      <motion.div
        className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => scrollToSection(heroRef)}
          className="relative group bg-gradient-to-br from-blue-600 to-indigo-600 p-3 lg:p-4 rounded-full shadow-xl text-white overflow-hidden"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="맨 위로 이동"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      </motion.div>

      {/* 서비스 소개서 iframe 모달 */}
      <AnimatePresence>
        {showIntroduction && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowIntroduction(false)}
          >
            {/* 배경 블러 */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center z-10">
                <h3 className="text-xl font-semibold text-white">서비스 소개서</h3>
                <motion.button
                  onClick={() => setShowIntroduction(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="닫기"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* iframe 컨테이너 */}
              <div className="pt-16 h-full bg-gray-50">
                {/* 로딩 인디케이터 */}
                <AnimatePresence>
                  {iframeLoading && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-white pt-16 z-20"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto">
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-blue-200"
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                        <p className="mt-4 text-gray-600 font-medium">로딩 중...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
      </AnimatePresence>

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