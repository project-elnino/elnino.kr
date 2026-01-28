'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { CheckCircle, ChevronDown, Globe, X, Languages, Zap, MessageCircle, Coins } from "lucide-react"
import Topbar from "@/components/en/Topbar"
import Footer from "@/components/en/Footer"

// Service introduction URL - temporarily using Korean PDF
const SERVICE_INTRODUCTION_URL = "/KnocManual_English.pdf";

// Data type definitions
interface Stat {
  label: string;
  value: string;
}

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

// Differentiator data
const differentiators: Differentiator[] = [
  {
    id: "easy-setup",
    title: "Easy to Use",
    description: "No installation or language settings required - just open Chrome and start. Participants simply speak in their own language, and it's automatically detected and translated. Works on any device, mobile or laptop.",
    highlight: "Just need Chrome browser",
    stats: [
      { label: "Installation", value: "Not Required" },
      { label: "Language Setup", value: "Not Required" },
      { label: "Language Detection", value: "Auto" }
    ]
  },
  {
    id: "boosting-model",
    title: "Word & Context Boosting Model",
    description: "AI model specialized for specific industries and fields, boosting both keywords and context simultaneously. Guarantees up to 99% accuracy in professional fields such as medicine, law, IT, and finance.",
    highlight: "Enhanced accuracy compared to competitors",
    stats: [
      { label: "Accuracy", value: "99%" },
      { label: "Supported Fields", value: "10+" },
      { label: "Customizable", value: "Yes" }
    ]
  },
  {
    id: "scalable-solution",
    title: "Support for Various Scales",
    description: "Provides stable performance in all environments, from small 5-person meetings to large conferences with up to 1,000 participants. Automatically optimizes according to network conditions.",
    highlight: "Supports up to 1,000 simultaneous connections",
    stats: [
      { label: "Max Participants", value: "1,000" },
      { label: "Min Participants", value: "1" },
      { label: "Auto Network Optimization", value: "Yes" }
    ]
  }
]

// Common features data
const commonFeatures: Feature[] = [
  {
    icon: <Languages className="w-6 h-6" />,
    title: "No Language Survey Needed",
    description: "Speaker's language auto-detected, listeners receive translation in their chosen language",
    details: "The speaker's language is automatically detected, and listeners select their preferred language to receive translations. Languages can be switched freely during the meeting, eliminating the need for pre-meeting language surveys."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Speed",
    description: "Immediate translation after speech maintains natural conversation flow",
    details: "Experience smooth conversations with minimal delay using AI-optimized algorithms. Enjoy seamless dialogue considering context before and after."
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "101 Languages Support",
    description: "Wide support from major world languages to minority languages",
    details: "Supports languages from English and Chinese to rare languages. All languages support bidirectional translation and are continuously updated."
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Reasonable Pricing",
    description: "Maximize cost efficiency with reasonable pricing plans",
    details: "Provides reasonable and transparent billing with monthly subscriptions. Choose from various pricing plans based on company size or number of users."
  }
]

// Component Props type definitions
interface DifferentiatorItemProps {
  item: Differentiator;
  index: number;
}

interface FeatureItemProps {
  feature: Feature;
}

// Differentiator item component
function DifferentiatorItem({ item, index }: DifferentiatorItemProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8 md:p-12 overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-60"></div>

        {/* Background large number */}
        <div className="absolute top-4 right-6 sm:right-8 text-7xl sm:text-8xl md:text-9xl font-black text-gray-100 select-none z-0">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* Background blur effects - static */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-200 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-200 rounded-full filter blur-3xl opacity-20" />

        {/* Text content area */}
        <div className="relative z-10">
          {/* Index badge */}
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

          {/* Statistics - grid layout */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-xl">
            {item.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 sm:p-5 text-center shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200"
              >
                <p className="text-blue-600 font-bold text-xl sm:text-2xl mb-1 whitespace-nowrap">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Highlight info */}
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg">
            <CheckCircle className="inline-block h-5 w-5 mr-2" />
            {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature item component
function FeatureItem({ feature }: FeatureItemProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full flex flex-col border border-gray-100 transition-shadow duration-200">
      {/* Top content area */}
      <div className="p-6 flex-1">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-5 shadow-lg">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
      </div>

      {/* Divider */}
      <div className="px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* Detail content */}
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

  // Section references
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const commonRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  // Scroll progress - using Framer Motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Prevent horizontal scroll
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // Prevent scroll and ESC key handler when modal is open
  useEffect(() => {
    if (showIntroduction) {
      document.body.style.overflow = 'hidden';

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

  // Determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      const windowHeight = window.innerHeight
      const bodyHeight = document.body.scrollHeight

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

  // Scroll to specific section
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
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-blue-600 origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Side navigation */}
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
              aria-label={`Go to ${section} section`}
            />
          ))}
        </div>
      </div>

      {/* Hero section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center text-white overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-900" />

        {/* Background elements - static */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          <div className="absolute top-20 left-5 w-48 h-48 lg:w-72 lg:h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-20" />
          <div className="absolute bottom-20 right-5 w-60 h-60 lg:w-96 lg:h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 mt-16 sm:mt-8 backdrop-blur-sm">
              AI Real-time Translation Service
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Creating a World<br />Without Language Barriers
            </h1>
            <div className="h-1 w-24 bg-blue-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 text-blue-100">
              Experience perfect translation in any environment
              <br />from small meetings to large conferences with field-specific custom models.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
              <Link
                href="/en/contact"
                className="flex items-center justify-center bg-white text-blue-700 text-base px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 min-w-[160px]"
              >
                Apply Now
              </Link>
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
                Introduction
              </button>
            </div>

            {/* Enter Interpretation Room button */}
            <div className="flex justify-center mb-16">
              <a
                href="https://cloud.elnino.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white text-base px-8 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
              >
                <Globe className="h-5 w-5" />
                Enter Interpretation Room
              </a>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-white/70 hover:text-white transition-colors animate-bounce"
                aria-label="Scroll down"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
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

      {/* Differentiators section */}
      <section
        ref={featuresRef}
        className="py-24 bg-gray-50 overflow-hidden -mt-px"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">Differentiated Technology</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Knoc&apos;s Unique Differentiators</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide stable and accurate translation services with field-specific translation model technology that sets us apart from other services.
            </p>
          </div>

          <div className="space-y-24">
            {differentiators.map((item, index) => (
              <DifferentiatorItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Common features section */}
      <section
        ref={commonRef}
        className="pt-24 pb-8 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">Core Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Essential Features You Can&apos;t Miss</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We have all the essential features for the best translation experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-stretch">
            {commonFeatures.map((feature, index) => (
              <FeatureItem key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section
        ref={ctaRef}
        className="py-24 bg-gradient-to-br from-blue-700 to-indigo-800 text-white relative overflow-hidden"
      >
        {/* Background elements - static */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full filter blur-3xl opacity-15" />
          <div className="absolute bottom-0 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-700 rounded-full filter blur-3xl opacity-15" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Get Started Now</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            From access to use, all within 1 minute.
          </p>

          {/* Expected benefits checklist */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 backdrop-blur-sm">
              Expected Benefits
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
              {[
                'Reduced interpreter costs',
                'Shortened event preparation time',
                'Expanded global participants',
                'Simultaneous multi-language support',
                'Improved participant satisfaction',
                'Real-time communication',
                'No additional equipment needed',
                'Simplified on-site operations'
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

          {/* CTA button */}
          <div className="flex justify-center">
            <Link
              href="/en/contact"
              className="bg-white text-blue-700 text-sm md:text-lg px-5 md:px-8 py-3 md:py-5 rounded-full inline-flex items-center justify-center font-semibold shadow-xl hover:shadow-2xl transition-shadow duration-200"
            >
              Contact for Implementation
            </Link>
          </div>
        </div>
      </section>

      {/* Fixed button - scroll to top */}
      <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-50">
        <button
          onClick={() => scrollToSection(heroRef)}
          className="bg-white p-3 lg:p-4 rounded-full shadow-lg text-blue-600 hover:shadow-xl transition-shadow duration-200"
          aria-label="Go to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Service introduction iframe modal */}
      {showIntroduction && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowIntroduction(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-semibold text-gray-900">Service Introduction</h3>
              <button
                onClick={() => setShowIntroduction(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* iframe container */}
            <div className="pt-16 h-full">
              {/* Loading indicator */}
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white pt-16">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                  </div>
                </div>
              )}
              <iframe
                src={SERVICE_INTRODUCTION_URL}
                className="w-full h-full border-0"
                title="Service Introduction"
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
